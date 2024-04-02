import dbConnect from '@/utils/db-connect';
import ItemSchema from '../models/items';
import { CreateItemRequest, ItemResponse } from '@/types/items';

export async function createItem(
  item: CreateItemRequest
): Promise<ItemResponse> {
  await dbConnect();

  const response: ItemResponse = await ItemSchema.create(item);

  return response;
}
