import { incrementReciptNumber } from '@/server/actions/receipts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await incrementReciptNumber();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
