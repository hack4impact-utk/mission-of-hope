import DonationItemSchema from '@/server/models/donationItem';
import {
  CreateDonationItemRequest,
  DonationItemEntity,
  DonationItemResponse,
  UpdateDonationItemRequest,
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

export async function createDonationItem(
  donationItem: CreateDonationItemRequest
): Promise<DonationItemEntity> {
  await dbConnect();

  const response = await DonationItemSchema.create(donationItem);
  return response;
}

export async function updateDonationItem(
  id: string,
  updatedData: UpdateDonationItemRequest
): Promise<DonationItemResponse | null> {
  await dbConnect();

  try {
    const donationItem: DonationItemResponse | null =
      await DonationItemSchema.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true }
      );

    return donationItem;
  } catch (error) {
    // Catch any errors and throw them
    throw error;
  }
}
