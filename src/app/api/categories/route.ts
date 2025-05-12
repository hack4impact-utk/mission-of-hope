import { NextResponse } from 'next/server';
import Item from '@/server/models/items';

export async function GET() {
  try {
    const categories: string[] = (await Item.distinct('category'))
      .map((cat: string) => cat.trim())
      .filter((cat) => !!cat);
    return NextResponse.json(categories, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
