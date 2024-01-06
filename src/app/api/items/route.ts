import { NextRequest, NextResponse } from 'next/server';
import { createItem } from '@/server/actions/items';
import { zCreateItemRequest } from '@/types/items';
// import { CreateItem } from '@/server/actions/donations';

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const validationResult = zCreateItemRequest.safeParse(requestBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error },
        { status: 400 }
      );
    }

    const result = await createItem(validationResult.data);

    return NextResponse.json({ _id: result._id }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
