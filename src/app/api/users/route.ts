import { createUser } from '@/server/actions/users';
import { zCreateUserRequest } from '@/types/persons';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validateResult = zCreateUserRequest.safeParse(body);
    if (!validateResult.success) {
      return NextResponse.json(
        { message: validateResult.error },
        { status: 400 }
      );
    }

    const result = await createUser(validateResult.data);
    if (!result) {
      return NextResponse.json(
        { message: 'User creation failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ _id: result._id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
