import dbConnect from '@/utils/db-connect';
import ItemSchema from '../models/items';
import { ItemResponse } from '@/types/items';

export async function getAllItems(): Promise<ItemResponse[]> {
  try {
    await dbConnect();

    const response: ItemResponse[] = await ItemSchema.find();

    return response;
  } catch (error) {
    throw error;
  }
}
