import dbConnect from '@/utils/db-connect';
import MailMergeSchema from '../models/mailMerge';
import { CreateMailMergeRequest, MailMergeResponse } from '@/types/mailMerge';

export async function getAllMailMerge(): Promise<MailMergeResponse[]> {
  try {
    await dbConnect();

    const response: MailMergeResponse[] = await MailMergeSchema.find();

    return response;
  } catch (error) {
    throw error;
  }
}

export async function createMailMerge(
  mailMerge: CreateMailMergeRequest
): Promise<MailMergeResponse> {
  await dbConnect();

  const response: MailMergeResponse = await MailMergeSchema.create(mailMerge);

  return response;
}
