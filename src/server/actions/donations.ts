import dbConnect from '@/utils/db-connect';
import DonationSchema from '../models/donations';
import { Donation } from '@/types/donation';

export async function createDonation(donation: Donation): Promise<Donation> {
  await dbConnect();

  const response: Donation = await DonationSchema.create(donation);

  return response;
}
