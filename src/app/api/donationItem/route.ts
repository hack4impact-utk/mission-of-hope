import { getAllDonationItems } from '@/server/actions/donationItem';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await getAllDonationItems();
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
