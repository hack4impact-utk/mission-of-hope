import { NextRequest, NextResponse } from 'next/server';
import { zCreateDonationRequest } from '@/types/donation';
import { createDonation } from '@/server/actions/donations';
// import { CreateDonation } from '@/server/actions/donations';

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

    const result = await createDonation(requestBody);
    if (!result) {
      return NextResponse.json(
        { message: 'Donation Not Found' },
        { status: 404 }
      );
    }
    console.log(result);

    return NextResponse.json({ message: 'succsess' }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
