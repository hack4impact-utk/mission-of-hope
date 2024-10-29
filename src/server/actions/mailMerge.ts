import dbConnect from '@/utils/db-connect';
import MailMergeSchema from '../models/mailMerge';
import {
  CreateMailMergeRequest,
  MailMergeResponse,
  UpdateMailMergeRequest,
} from '@/types/mailMerge';

export async function getAllMailMerge(): Promise<MailMergeResponse[]> {
  try {
    await dbConnect();

    const response: MailMergeResponse[] = await MailMergeSchema.find();

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getMailMergeByType(
  type: string
): Promise<MailMergeResponse> {
  await dbConnect();

  const response = await MailMergeSchema.findOne({ type: type });

  if (!response) throw Error('Document not found');

  return response;
}

export async function createMailMerge(
  mailMerge: CreateMailMergeRequest
): Promise<MailMergeResponse> {
  await dbConnect();

  const response: MailMergeResponse = await MailMergeSchema.create(mailMerge);

  return response;
}

export async function updateMailMerge(
  id: string,
  update: UpdateMailMergeRequest
): Promise<MailMergeResponse> {
  await dbConnect();

  const response = await MailMergeSchema.findByIdAndUpdate(id, update);

  if (!response) throw Error('Document not found');

  return response;
}
