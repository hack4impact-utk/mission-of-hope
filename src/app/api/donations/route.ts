import { NextRequest, NextResponse } from 'next/server';
import { zCreateDonationRequest } from '@/types/donation';
import { getAllDonations } from '@/server/actions/donations';
import { getDonorById } from '@/server/actions/donors';
import { getAllMailMerge } from '@/server/actions/mailMerge';
import { populateEmailTemplate } from '@/utils/string';
import { MongoError } from 'mongodb';
import mongoose, { ClientSession } from 'mongoose';
import Donation from '@/server/models/donations';
import DonationItem from '@/server/models/donationItem';
import Donor from '@/server/models/donors';
import Item from '@/server/models/items';
import { sendEmail } from '@/server/actions/email';

export async function GET() {
  try {
    const result = await getAllDonations();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[DONATION_GET_ALL_ERROR]', error);
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session: ClientSession = await mongoose.startSession();
  session.startTransaction();

  try {
    const requestBody = await request.json();
    const parseResult = zCreateDonationRequest.safeParse(requestBody);

    if (!parseResult.success) {
      console.error('[DONATION_CREATE_VALIDATION]', parseResult.error);
      const validation = parseResult.error.flatten();
      return NextResponse.json({ validation }, { status: 400 });
    }

    const {
      user,
      items: donationItems,
      entryDate,
      donor: donorField,
      receipt,
    } = parseResult.data;

    if (donationItems.length === 0) {
      return NextResponse.json(
        { message: 'The donation must contain at least one item' },
        { status: 400 }
      );
    }

    let donorId: mongoose.Types.ObjectId;
    if (typeof donorField === 'string') {
      donorId = new mongoose.Types.ObjectId(donorField);
    } else {
      const donorDoc = await Donor.create([donorField], { session });
      donorId = donorDoc[0]._id;
    }

    const donationItemIds: mongoose.Types.ObjectId[] = [];
    for (const di of donationItems) {
      let itemId: mongoose.Types.ObjectId;
      if (typeof di.item === 'string') {
        itemId = new mongoose.Types.ObjectId(di.item);
      } else {
        const itemDoc = await Item.create([di.item], { session });
        itemId = itemDoc[0]._id;
      }

      const diDoc = await DonationItem.create(
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
      donationItemIds.push(diDoc[0]._id);
    }

    await Donation.create(
      [
        {
          user,
          items: donationItemIds,
          entryDate,
          donor: donorId,
          receipt,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    const donor = await getDonorById(donorId.toString());
    if (donor) {
      const receiptTemplate = (await getAllMailMerge()).find(
        (t) => t.type === 'Receipt'
      );
      if (receiptTemplate) {
        const body = populateEmailTemplate(
          receiptTemplate.body,
          donor,
          entryDate
        );
        await sendEmail([donor.email], receiptTemplate.subject, body);
      }
    }

    return NextResponse.json({ message: 'Success' }, { status: 201 });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if ((error as MongoError).code === 11000) {
      return NextResponse.json(
        { message: 'A donation with that receipt already exists.' },
        { status: 409 }
      );
    }

    console.error('[DONATION_CREATE_ERROR]', error);
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
