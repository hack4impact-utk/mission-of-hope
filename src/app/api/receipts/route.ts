import { incrementReceiptNumber } from '@/server/actions/receipts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await incrementReceiptNumber();
    const receipt_number = String(result).padStart(6, '0');
    return NextResponse.json(receipt_number, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
