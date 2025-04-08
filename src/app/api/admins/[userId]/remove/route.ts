import { removeAdmin } from '@/server/actions/users';
import { zObjectId } from '@/types/objectId';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  _req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.userId);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error },
        { status: 400 }
      );
    }

    await removeAdmin(params.userId);

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
