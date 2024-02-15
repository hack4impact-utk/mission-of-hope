import { NextRequest, NextResponse } from 'next/server';
import { getAllDonors } from '@/server/actions/donors';
import { DonorResponse } from '@/types/persons';

export async function GET(request: NextRequest) {
  if (request.method == 'GET') {
    try {
      const response: DonorResponse[] = await getAllDonors(); // Call getDonors function
      return NextResponse.json(response, { status: 200 }); // Return result with status 200 on success
    } catch (error) {
      console.error(error); // Log the error for debugging
      return NextResponse.json('Unknown error', { status: 500 }); // Return status 500 for unknown errors
    }
  }
}
