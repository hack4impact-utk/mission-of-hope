import { getAllUsers, updateAllowedUsers } from '@/server/actions/users';
import { zUpdateAllowedUsersRequest } from '@/types/users';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await getAllUsers();
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // TODO: Authenticate permission to perform this action

    const req = await request.json();
    const validationResult = zUpdateAllowedUsersRequest.safeParse(req);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error },
        { status: 400 }
      );
    }

    updateAllowedUsers(validationResult.data);
    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
