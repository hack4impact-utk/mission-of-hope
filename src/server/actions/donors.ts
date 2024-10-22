import {
  CreateDonorRequest,
  DonorResponse,
  UpdateDonorRequest, //deleted a duplicate DonorResponse
} from '@/types/donors';
import dbConnect from '@/utils/db-connect';
import DonorSchema from '../models/donors';

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

export async function updateDonor(
  id: string,
  updatedData: UpdateDonorRequest
): Promise<DonorResponse | null> {
  await dbConnect();

  try {
    // Find the donor by id and update it with new data
    const donor: DonorResponse | null = await DonorSchema.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true } // This option returns the modified document
    );

    return donor;
  } catch (error) {
    // Catch any errors and throw them
    throw error;
  }
}
