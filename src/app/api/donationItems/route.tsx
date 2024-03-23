import { createDonationItem } from '@/server/actions/donationItem';
import { zCreateDonationItemRequest } from '@/types/donation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const validationResult = zCreateDonationItemRequest.safeParse(requestBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error },
        { status: 400 }
      );
    }

    const result = await createDonationItem(validationResult.data);

    return NextResponse.json({ _id: result._id }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
