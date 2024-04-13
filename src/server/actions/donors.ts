import {
  CreateDonorRequest,
  DonorResponse, //deleted a duplicate DonorResponse
} from '@/types/persons';
import dbConnect from '@/utils/db-connect';
import DonorSchema from '../models/donors';

export async function getAllDonors(): Promise<DonorResponse[]> {
  await dbConnect();

  const response: DonorResponse[] = await DonorSchema.find();

  console.log(response);
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

export async function getDonorById(id: string): Promise<DonorResponse | null> {
  //Connect to the database
  await dbConnect();

  try {
    // Find the Donor by id and populate the item field
    const donor: DonorResponse | null = await DonorSchema.findById(id);

    return donor;
  } catch (error) {
    // Catch any errors and throw them
    throw error;
  }
}
