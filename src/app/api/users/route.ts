import { getAllUsers } from '@/server/actions/users';
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
    request;
  } catch (e) {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
