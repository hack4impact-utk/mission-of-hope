import { getDonationItemById } from '@/server/actions/donationItem';
import { zObjectId } from '@/types/objectId';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { donationItemId: string } }
) {
  const formId = params.donationItemId;
  const validationResult = zObjectId.safeParse(formId);
  if (!validationResult.success) {
    return NextResponse.json({ message: 'invalid id' }, { status: 400 });
  }

  const response = await getDonationItemById(formId);
  if (response === null) {
    return (
      NextResponse.json({ message: 'Donation Item not found' }), { status: 404 }
    );
  }
  return NextResponse.json(response, { status: 200 });
}
