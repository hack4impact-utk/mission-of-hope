import { NextResponse } from 'next/server';
import {
  createAPIHandler,
  ApiHandlerParams,
  AutocompleteApiResponse,
} from '@/server/utils/api';
import { ItemResponse } from '@/types/items';
import ItemSchema, { ItemDocument } from '@/server/models/items';
import { FilterQuery } from 'mongoose';

export const GET = createAPIHandler(async function (
  _,
  params: ApiHandlerParams
) {
  const options: FilterQuery<ItemDocument> = params.search
    ? {
        name: {
          $regex: params.search,
          $options: 'i',
        },
      }
    : {};

  try {
    const queryResults: ItemResponse[] = await ItemSchema.find(
      options,
      {},
      {
        skip: (params.page - 1) * params.limit,
        limit: params.limit,
      }
    );
    const formattedResult: AutocompleteApiResponse[] = queryResults.map(
      (item) => ({ value: item._id, label: item.name })
    );
    return NextResponse.json(formattedResult, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
});
