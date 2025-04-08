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
    console.log(error);
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session: ClientSession = await mongoose.startSession();
  session.startTransaction();

  try {
    const requestBody = await request.json();
    const validationResult = zCreateDonationRequest.safeParse(requestBody);

    if (!validationResult.success) {
      console.log(validationResult.error);
      return NextResponse.json(
        { message: validationResult.error },
        { status: 400 }
      );
    }

    const {
      user,
      donationItems,
      entryDate,
      donor: donorField,
      receipt,
    } = validationResult.data;

    if (donationItems.length === 0) {
      return NextResponse.json(
        { message: 'donationItems array cannot be empty' },
        { status: 400 }
      );
    }

    // 1. Handle donor
    let donorId: mongoose.Types.ObjectId;
    if (typeof donorField === 'string') {
      donorId = new mongoose.Types.ObjectId(donorField);
    } else {
      const donorDoc = await Donor.create([donorField], { session });
      donorId = donorDoc[0]._id;
    }

    // 2. Handle donation items
    const donationItemIds: mongoose.Types.ObjectId[] = [];

    for (const donationItem of donationItems) {
      let itemId: mongoose.Types.ObjectId;
      if (typeof donationItem.item === 'string') {
        itemId = new mongoose.Types.ObjectId(donationItem.item);
      } else {
        const itemDoc = await Item.create([donationItem.item], { session });
        itemId = itemDoc[0]._id;
      }

      const donationItemDoc = await DonationItem.create(
        [
          {
            item: itemId,
            quantity: donationItem.quantity,
            barcode: donationItem.barcode,
            value: donationItem.value,
          },
        ],
        { session }
      );

      donationItemIds.push(donationItemDoc[0]._id);
    }

    // 3. Create donation
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

    // 4. Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Send email to donor
    const donor = await getDonorById(donorId.toString());
    if (donor) {
      const receiptTemplate = (await getAllMailMerge()).find(
        (value) => value.type === 'Receipt'
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
    return NextResponse.json({ error: 'Unknown Error' }, { status: 500 });
  }
}
