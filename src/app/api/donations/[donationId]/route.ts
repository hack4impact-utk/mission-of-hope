import { DonationResponse } from '@/types/donation';
import { NextResponse, NextRequest } from 'next/server';
import { updateDonation } from '../../../../server/actions/donations';

export async function PUT(
  request: NextRequest,
  { params }: { params: { donationId: string } }
) {
  if (!params || !params.donationId) {
    return NextResponse.json(
      { error: 'Invalid request, no donation ID provided' },
      { status: 400 }
    );
  }

  try {
    // Parse the JSON body from the request
    const updatedData = await request.json();

    // Update the donation by id
    const updatedDonation: DonationResponse | null = await updateDonation(
      params.donationId,
      updatedData
    );

    if (!updatedDonation) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedDonation, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to update donation information', details: message },
      { status: 500 }
    );
  }
}
