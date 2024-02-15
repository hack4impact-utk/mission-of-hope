import { createUser, getAllUsers } from '@/server/actions/users';
import { zCreateUserRequest } from '@/types/persons';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await getAllUsers();
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body against the schema
    const validateResult = zCreateUserRequest.safeParse(body);
    if (!validateResult.success) {
      return NextResponse.json(
        { message: validateResult.error },
        { status: 400 }
      );
    }

    // call the createUser function from the server actions
    const result = await createUser(validateResult.data);

    // Return the user ID if successful
    return NextResponse.json({ _id: result._id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
