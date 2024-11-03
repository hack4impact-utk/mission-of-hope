import { getAllMailMerge, upsertMailMerge } from '@/server/actions/mailMerge';
import { zCreateMailMergeRequest } from '@/types/mailMerge';
import { NextRequest, NextResponse } from 'next/server';

// Upsert a MailMerge document
// If no document for the given mailType exists, one is created
// Otherwise, the existing one is updated (first if multiple)
export async function PUT(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const validationResult = zCreateMailMergeRequest.safeParse(requestBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error },
        { status: 400 }
      );
    }

    const [res, updated] = await upsertMailMerge(validationResult.data);

    return NextResponse.json({ _id: res._id }, { status: updated ? 200 : 201 });
  } catch {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await getAllMailMerge();
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
