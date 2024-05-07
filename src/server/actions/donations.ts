import dbConnect from '@/utils/db-connect';
import DonationSchema from '../models/donations';
import {
  CreateDonationRequest,
  DonationEntity,
  DonationResponse,
} from '@/types/donation';
import UserSchema from '@/server/models/users';
import DonorSchema from '@/server/models/donors';
UserSchema;
DonorSchema;

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
    ]);

    return response;
  } catch (error) {
    throw error;
  }
}
