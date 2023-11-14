import dbConnect from '@/utils/db-connect';
import DonorSchema from '../models/donors';
import { CreateDonorRequest, DonorResponse } from '@/types/persons';

export async function createDonors(
  donor: CreateDonorRequest
): Promise<DonorResponse> {
  // Connect to the database
  await dbConnect();

  // Make a Donor using the mongoose create methods
  // TODO: I think this line is causing the error
  const response: DonorResponse = await DonorSchema.create(donor);
  return response;
}
