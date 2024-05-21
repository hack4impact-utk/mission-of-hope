import dbConnect from '@/utils/db-connect';
import ItemSchema from '../models/items';
import {
  CreateItemRequest,
  ItemResponse,
  UpdateItemRequest,
} from '@/types/items';

export async function getAllItems(): Promise<ItemResponse[]> {
  try {
    await dbConnect();

    const response: ItemResponse[] = await ItemSchema.find();

    return response;
  } catch (error) {
    throw error;
  }
}

export async function createItem(
  item: CreateItemRequest
): Promise<ItemResponse> {
  await dbConnect();

  const response: ItemResponse = await ItemSchema.create(item);

  return response;
}

export async function getItemById(id: string): Promise<ItemResponse | null> {
  try {
    await dbConnect();

    const response: ItemResponse | null = await ItemSchema.findById(id);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateItem(
  id: string,
  updatedData: UpdateItemRequest
): Promise<ItemResponse | null> {
  await dbConnect();

  try {
    // Find the donor by id and update it with new data
    const item: ItemResponse | null = await ItemSchema.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true } // This option returns the modified document
    );

    return item;
  } catch (error) {
    // Catch any errors and throw them
    throw error;
  }
}
