import DonationItemSchema from '@/server/models/donationItem';
import { DonationItemResponse } from '@/types/donation';
import dbConnect from '@/utils/db-connect';
import ItemSchema from '@/server/models/items';
ItemSchema;
export async function getDonationItemById(
  id: string
): Promise<DonationItemResponse | null> {
  try {
    await dbConnect();

    const form: DonationItemResponse | null =
      await DonationItemSchema.findById(id).populate('item');

    return form;
  } catch (error) {
    return null;
  }
}

export async function getAllDonationItems(): Promise<DonationItemResponse[]> {
  try {
    await dbConnect();

    const response: DonationItemResponse[] =
      await DonationItemSchema.find().populate('item');

    return response;
  } catch (error) {
    throw error;
  }
}
