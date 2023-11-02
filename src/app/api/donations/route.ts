import { NextRequest, NextResponse } from 'next/server';
import { Donation } from '@/types/donation';
import { createDonation } from '@/server/actions/donations';
// import { CreateDonation } from '@/server/actions/donations';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const donation: Donation = body;

  const result = await createDonation(donation);
  if (!result) {
    return NextResponse.json(
      { message: 'Donation Not Found' },
      { status: 404 }
    );
  }
  console.log(result);

  return NextResponse.json({ response: 'succsess' }, { status: 200 });
}
