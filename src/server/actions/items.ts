import dbConnect from '@/utils/db-connect';
import ItemSchema from '../models/items';
import { CreateItemRequest, ItemResponse } from '@/types/items';
import items from '../models/items';

export async function createItem(
  items: CreateItemRequest
): Promise<ItemResponse> {
  await dbConnect();

  const response: ItemResponse = await ItemSchema.create(items);

  return response;
}
