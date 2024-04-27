import dbConnect from '@/utils/db-connect';
import ReceiptSchema, { ReceiptEntity } from '../models/receipts';

export async function incrementReceiptNumber(): Promise<number | undefined> {
  try {
    await dbConnect();

    const response: ReceiptEntity | null =
      await ReceiptSchema.findByIdAndUpdate(
        '662b2d23ad43af0622a45046',
        { $inc: { seq: 1 } },
        { returnNewDocument: true, upsert: true }
      );

    return response?.seq;
  } catch (error) {
    throw error;
  }
}
