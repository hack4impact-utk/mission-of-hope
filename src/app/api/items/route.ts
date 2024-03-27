import { NextResponse } from 'next/server';
import { getAllItems } from '@/server/actions/items';

export async function GET() {
  try {
    const result = await getAllItems();
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
