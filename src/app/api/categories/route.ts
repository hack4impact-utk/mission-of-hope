import { NextResponse } from 'next/server';
import { createAPIHandler } from '@/server/utils/api';
import Item from '@/server/models/items';

export const GET = createAPIHandler(async function () {
  try {
    const categories: string[] = (await Item.distinct('category'))
      .map((cat: string) => cat.trim())
      .filter((cat) => !!cat);
    return NextResponse.json(categories, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
});
