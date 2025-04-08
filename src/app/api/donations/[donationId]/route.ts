import { DonationResponse, zUpdateDonationRequest } from '@/types/donation';
import { zObjectId } from '@/types/objectId';
import { NextResponse, NextRequest } from 'next/server';
import { updateDonation } from '../../../../server/actions/donations';
import { MongoError } from 'mongodb';

export async function PUT(
  request: NextRequest,
  { params }: { params: { donationId: string } }
) {
  try {
    // Parse and validate the string from the params
    const validationId = zObjectId.safeParse(params.donationId);
    if (!validationId.success) {
      return NextResponse.json({ error: validationId.error }, { status: 400 });
    }

    if (!validationId.data) {
      return NextResponse.json(
        { error: 'Donation ID not found' },
        { status: 404 }
      );
    }

    // Parse the JSON body from the request and validate
    const requestBody = await request.json();
    const validationResult = zUpdateDonationRequest.safeParse(requestBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error },
        { status: 400 }
      );
    }

    // Update donation
    const donationRes: DonationResponse | null = await updateDonation(
      params.donationId,
      validationResult.data
    );

    if (!donationRes) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(donationRes, { status: 200 });
  } catch (error) {
    // Check for duplicate key error (unique constraint violation)
    if ((error as MongoError).code === 11000) {
      return NextResponse.json(
        { error: 'A donation with that receipt already exists.' },
        { status: 409 }
      );
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to update donation information', details: message },
      { status: 500 }
    );
  }
}
