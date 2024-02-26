import DonationItemSchema from '@/server/models/donationItem';
import { DonationItemResponse } from '@/types/donation';
import dbConnect from '@/utils/db-connect';

export async function getDonationItemById(
  id: string
): Promise<DonationItemResponse | null> {
  await dbConnect();

  const form: DonationItemResponse | null =
    await DonationItemSchema.findById(id).populate('item');

  return form;
}
