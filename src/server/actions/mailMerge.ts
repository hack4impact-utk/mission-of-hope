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

// Upsert a MailMerge document for the mailType of the argument object.
// Only updates the first document if multiple of the same mailType exist (this should never occur).
// Returns the new document and a boolean indicating which operation was performed
// True = update, False = insert
export async function upsertMailMerge(
  mailMerge: CreateMailMergeRequest
): Promise<[MailMergeResponse, boolean]> {
  await dbConnect();

  const result = await MailMergeSchema.findOneAndUpdate(
    { type: mailMerge.type },
    mailMerge,
    { new: true, upsert: true, includeResultMetadata: true }
  );

  const response = result.value;

  if (!response) {
    throw Error('Unable to insert or update document.');
  }

  // Not sure when lastErrorObject would ever be null
  return [response, result.lastErrorObject?.updatedExisting ?? false];
}
