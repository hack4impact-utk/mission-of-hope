import dbConnect from '@/utils/db-connect';
import ReceiptSchema, { ReceiptEntity } from '../models/receipts';

export async function getReciptNumber(): Promise<number | undefined> {
  try {
    await dbConnect();

    const response: ReceiptEntity | null = await ReceiptSchema.findOne();
    // ReceiptSchema.findById('receipt');
    console.log(response);

    return response?.seq;
  } catch (error) {
    throw error;
  }
}

export async function incrementReciptNumber(): Promise<number | undefined> {
  try {
    await dbConnect();

    const response: ReceiptEntity | null =
      await ReceiptSchema.findByIdAndUpdate(
        'receipt',
        { $inc: { seq: 1 } },
        { returnNewDocument: true, upsert: true }
      );

    return response?.seq;
  } catch (error) {
    throw error;
  }
}
