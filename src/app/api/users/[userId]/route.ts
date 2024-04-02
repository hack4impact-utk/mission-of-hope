import { getUserById } from '@/server/actions/users';
import { zObjectId } from '@/types/objectId';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const formId = params.userId;
  const validationResult = zObjectId.safeParse(formId);
  if (!validationResult.success) {
    return NextResponse.json({ message: 'invalid id' }, { status: 400 });
  }

  const response = await getUserById(formId);
  if (response === null) {
    return NextResponse.json({ message: 'User not found' }), { status: 404 };
  }
  return NextResponse.json(response, { status: 200 });
}
