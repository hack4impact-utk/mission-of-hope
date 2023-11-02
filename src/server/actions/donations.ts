import dbConnect from '@/utils/db-connect';
import DonationSchema from '../models/donations';
import { CreateDonationRequest, DonationResponse } from '@/types/donation';

export async function createDonation(
  donation: CreateDonationRequest
): Promise<DonationResponse> {
  await dbConnect();

  const response: DonationResponse = await DonationSchema.create(donation);

  return response;
}
