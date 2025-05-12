// app/api/donations/[donationId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose, { ClientSession } from 'mongoose';
import { MongoError } from 'mongodb';
import {
  zUpdateDonationRequest,
  UpdateDonationRequest,
} from '@/types/donation';
import Donation, { DonationDocument } from '@/server/models/donations';
import DonationItem from '@/server/models/donationItem';
import Donor from '@/server/models/donors';
import Item from '@/server/models/items';
import { getDonorById } from '@/server/actions/donors';
import { getAllMailMerge } from '@/server/actions/mailMerge';
import { populateEmailTemplate } from '@/utils/string';
import { sendEmail } from '@/server/actions/email';

export async function GET(
  _req: NextRequest,
  { params }: { params: { donationId: string } }
) {
  const { donationId } = params;
  if (!mongoose.Types.ObjectId.isValid(donationId)) {
    return NextResponse.json(
      { message: 'Invalid donation ID' },
      { status: 400 }
    );
  }

  try {
    const donation = await Donation.findById(donationId)
      .populate('donor')
      .populate({ path: 'items', populate: { path: 'item' } });

    if (!donation) {
      return NextResponse.json(
        { message: 'Donation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(donation, { status: 200 });
  } catch (error) {
    console.error('[DONATION_GET_ONE_ERROR]', error);
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { donationId: string } }
) {
  const { donationId } = params;
  if (!mongoose.Types.ObjectId.isValid(donationId)) {
    return NextResponse.json(
      { message: 'Invalid donation ID' },
      { status: 400 }
    );
  }

  const session: ClientSession = await mongoose.startSession();
  session.startTransaction();

  try {
    const body = await req.json();
    const result = zUpdateDonationRequest.safeParse(
      body as UpdateDonationRequest
    );
    if (!result.success) {
      console.error('[DONATION_UPDATE_VALIDATION]', result.error);
      const validation = result.error.flatten();
      return NextResponse.json({ validation }, { status: 400 });
    }
    const {
      user,
      items: donationItems,
      entryDate,
      donor: donorField,
      receipt,
    } = result.data;

    if (!donationItems || donationItems.length === 0) {
      return NextResponse.json(
        { message: 'The donation must contain at least one item' },
        { status: 400 }
      );
    }

    let donorId: mongoose.Types.ObjectId;
    if (typeof donorField === 'string') {
      donorId = new mongoose.Types.ObjectId(donorField);
    } else {
      const [donorDoc] = await Donor.create([donorField], { session });
      donorId = donorDoc._id;
    }

    const existing = (await Donation.findById(donationId).session(
      session
    )) as DonationDocument;
    if (!existing) {
      await session.abortTransaction();
      return NextResponse.json(
        { message: 'Donation not found' },
        { status: 404 }
      );
    }
    if (existing.items.length > 0) {
      await DonationItem.deleteMany(
        { _id: { $in: existing.items } },
        { session }
      );
    }

    const newItemIds: mongoose.Types.ObjectId[] = [];
    for (const di of donationItems) {
      let itemId: mongoose.Types.ObjectId;
      if (typeof di.item === 'string') {
        itemId = new mongoose.Types.ObjectId(di.item);
      } else {
        const [itemDoc] = await Item.create([di.item], { session });
        itemId = itemDoc._id;
      }

      const [diDoc] = await DonationItem.create(
        [
          {
            item: itemId,
            quantity: di.quantity,
            barcode: di.barcode,
            value: di.value,
          },
        ],
        { session }
      );
      newItemIds.push(diDoc._id);
    }

    await Donation.findByIdAndUpdate(
      donationId,
      {
        user,
        items: newItemIds,
        entryDate,
        donor: donorId,
        receipt,
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    const donor = await getDonorById(donorId.toString());
    if (donor) {
      const template = (await getAllMailMerge()).find(
        (t) => t.type === 'Receipt'
      );
      if (template) {
        const bodyText = populateEmailTemplate(template.body, donor, entryDate);
        await sendEmail([donor.email], template.subject, bodyText);
      }
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    if ((err as MongoError).code === 11000) {
      return NextResponse.json(
        { message: 'A donation with that receipt already exists.' },
        { status: 409 }
      );
    }

    console.error('[DONATION_UPDATE_ERROR]', err);
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
