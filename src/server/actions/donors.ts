import dbConnect from '@/utils/db-connect';
import DonorSchema from '../models/donors';
import { CreateDonorRequest, DonorResponse } from '@/types/persons';

export async function createDonors(
  donor: CreateDonorRequest
): Promise<DonorResponse> {
  // Connect to the MongoDB database
  await dbConnect();

  // Make a Donor using the mongoose create methods
  // FIXME: this line is wrong
  const request: DonorResponse = await DonorSchema.create(donor);
  return request;
}
