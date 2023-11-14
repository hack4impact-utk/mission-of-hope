import { NextRequest, NextResponse } from 'next/server';
import { zCreateDonorRequest } from '@/types/persons';
import { createDonors } from '@/server/actions/donors';

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
  } catch {
    // create a response for any unknown errors
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
