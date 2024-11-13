import { NextRequest, NextResponse } from 'next/server';
import { zCreateDonationRequest } from '@/types/donation';
import { createDonation, getAllDonations } from '@/server/actions/donations';
import { getDonorById } from '@/server/actions/donors';
import { getAllMailMerge } from '@/server/actions/mailMerge';
import { populateEmailTemplate } from '@/utils/string';
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
  try {
    const requestBody = await request.json();
    const validationResult = zCreateDonationRequest.safeParse(requestBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error },
        { status: 400 }
      );
    }

    // Create donation
    const result = await createDonation(validationResult.data);

    // Send email to donor
    const donor = await getDonorById(result.donor);
    if (donor) {
      const receiptTemplate = (await getAllMailMerge()).find(
        (value) => value.type == 'Receipt'
      );
      if (receiptTemplate) {
        const thing = populateEmailTemplate(
          receiptTemplate.body,
          donor,
          result.entryDate
        );
        await sendEmail([donor.email], receiptTemplate.subject, thing);
      }
    }

    return NextResponse.json({ _id: result._id }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
