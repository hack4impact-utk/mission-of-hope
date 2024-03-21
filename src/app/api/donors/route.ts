import { NextRequest, NextResponse } from 'next/server';
import { getAllDonors, createDonors } from '@/server/actions/donors';
import { DonorResponse, zCreateDonorRequest } from '@/types/persons';

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


export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const validationResult = zCreateDonorRequest.safeParse(requestBody);

    // Check for invalid body
    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error },
        { status: 400 }
      );
    }

    // Creates a donor with mongoose driver
    const result = await createDonors(validationResult.data);

    return NextResponse.json({ _id: result._id }, { status: 201 });
  } catch (error) {
    // create a response for any unknown errors
    console.log(error);
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });

  }
}
