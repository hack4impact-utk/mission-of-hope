import { NextResponse } from 'next/server';
import { getAllUsers } from '@/server/actions/users';

export async function GET() {
  try {
    const result = await getAllUsers();
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
