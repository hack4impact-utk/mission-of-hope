import { DonorResponse } from '@/types/persons';
import { NextResponse, NextRequest } from 'next/server';
import { getDonorById } from '../../../../server/actions/donors';

export async function GET(
  _request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  if (!params || !params.volunteerId) {
    return NextResponse.json(
      { error: 'Invalid request, no volunteer ID provided' },
      { status: 400 }
    );
  }
  try {
    // Get the donor by id
    const result: DonorResponse | null = await getDonorById(params.volunteerId);
    // error checking to see if donor is found
    if (result) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Donor not found' }, { status: 500 });
    }
  } catch (error) {
    // Catch any errors and throw them
    throw error;
  }
}
