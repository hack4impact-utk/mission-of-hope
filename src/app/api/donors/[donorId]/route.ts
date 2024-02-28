import { DonorResponse } from '@/types/persons';
import { NextResponse, NextRequest } from 'next/server';
import { getDonorById } from '../../../../server/actions/donors';

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
    return NextResponse.json({ error: 'Donor not found' }, { status: 500 });
  }
}
