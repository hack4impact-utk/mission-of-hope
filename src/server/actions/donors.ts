import dbConnect from '@/utils/db-connect';
import DonorSchema from '../models/donors';
import { CreateDonorRequest, DonorResponse, DonorResponse } from '@/types/persons';


export async function getAllDonors(): Promise<DonorResponse[]> {
  await dbConnect();

  const response: DonorResponse[] = await DonorSchema.find();

  return response;
}

export async function createDonors(
  donor: CreateDonorRequest
): Promise<DonorResponse> {
  // Connect to the database
  await dbConnect();

  // Make a Donor using the mongoose create methods
  const response: DonorResponse = await DonorSchema.create(donor);


  return response;
}
