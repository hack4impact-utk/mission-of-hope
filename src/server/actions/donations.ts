import dbConnect from '@/utils/db-connect';
import DonationSchema from '../models/donations';
import {
  CreateDonationRequest,
  DonationEntity,
  DonationResponse,
  UpdateDonationRequest,
} from '@/types/donation';
import UserSchema from '@/server/models/users';
import DonorSchema from '@/server/models/donors';
import DonationItemSchema from '@/server/models/donationItem';

UserSchema;
DonorSchema;
DonationItemSchema;

export async function createDonation(
  donation: CreateDonationRequest
): Promise<DonationEntity> {
  await dbConnect();

  const response: DonationEntity = await DonationSchema.create(donation);
  return response;
}

export async function getAllDonations(): Promise<DonationResponse[]> {
  try {
    await dbConnect();

    const response: DonationResponse[] = await DonationSchema.find().populate([
      'user',
      'donor',
      'items',
    ]);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getDonationById(
  id: string
): Promise<DonationResponse | null> {
  try {
    await dbConnect();

    const response: DonationResponse | null = await DonationSchema.findById(id)
      .populate(['user', 'donor', 'items'])
      .populate({
        path: 'items',
        populate: {
          path: 'item',
          model: 'Items',
        },
      });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateDonation(
  id: string,
  updatedData: UpdateDonationRequest
): Promise<DonationResponse | null> {
  await dbConnect();

  try {
    const donation: DonationResponse | null =
      await DonationSchema.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true }
      );

    return donation;
  } catch (error) {
    // Catch any errors and throw them
    throw error;
  }
}
