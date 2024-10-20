import { DonorResponse } from '@/types/donors';
import { NextResponse, NextRequest } from 'next/server';
import { getDonorById, updateDonor } from '../../../../server/actions/donors';

export async function GET(
  _request: NextRequest,
  { params }: { params: { donorId: string } }
) {
  // Check if the request has a donorId
  if (!params || !params.donorId) {
    return NextResponse.json(
      { error: 'Invalid request, no volunteer ID provided' },
      { status: 400 }
    );
  }
  try {
    // Get the donor by id
    const result: DonorResponse | null = await getDonorById(params.donorId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // if the donor is not found, return a 500 error
    return NextResponse.json({ error: 'Donor not found' }, { status: 404 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { donorId: string } }
) {
  // Check if the request has a donorId
  if (!params || !params.donorId) {
    return NextResponse.json(
      { error: 'Invalid request, no donor ID provided' },
      { status: 400 }
    );
  }

  try {
    // Parse the JSON body from the request
    const updatedData = await request.json();

    // Update the donor by id
    const updatedDonor: DonorResponse | null = await updateDonor(
      params.donorId,
      updatedData
    );

    if (!updatedDonor) {
      return NextResponse.json({ error: 'Donor not found' }, { status: 404 });
    }

    return NextResponse.json(updatedDonor, { status: 200 });
  } catch (error) {
    // Handle any errors during parsing or updating
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to update donor information', details: message },
      { status: 500 }
    );
  }
}
