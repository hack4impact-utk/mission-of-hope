import dbConnect from '@/utils/db-connect';
import DonationSchema from '../models/donations';
import {
  CreateDonationRequest,
  DonationEntity,
  DonationResponse,
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

    console.log('Donation Call');
    //require("@/server/models/donationItem");
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
