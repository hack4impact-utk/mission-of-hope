import DonationItemSchema from '@/server/models/donationItem';
import {
  CreateDonationItemRequest,
  DonationItemEntity,
  DonationItemResponse,
} from '@/types/donation';
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

export async function createDonationItem(
  donationItem: CreateDonationItemRequest
): Promise<DonationItemEntity> {
  await dbConnect();

  const response = await DonationItemSchema.create(donationItem);
  return response;
}

export async function getDonationItems(): Promise<
  DonationItemResponse[] | null
> {
  try {
    await dbConnect();

    const donationItems: DonationItemResponse[] | null =
      await DonationItemSchema.find().populate('item');

    return donationItems;
  } catch (error) {
    return null;
  }
}
