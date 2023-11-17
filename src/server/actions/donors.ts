import dbConnect from '@/utils/db-connect';
import DonorSchema from '../models/donors';
import { DonorResponse } from '@/types/persons';

export async function getAllDonors(): Promise<DonorResponse[]> {
  await dbConnect();

  const response: DonorResponse[] = await DonorSchema.find();

  return response;
}
