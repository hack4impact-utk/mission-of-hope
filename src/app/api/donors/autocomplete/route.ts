import { NextResponse } from 'next/server';
import {
  createAPIHandler,
  ApiHandlerParams,
  AutocompleteApiResponse,
} from '@/server/utils/api';
import { DonorResponse } from '@/types/donors';
import DonorSchema, { DonorDocument } from '@/server/models/donors';
import { FilterQuery } from 'mongoose';

export const GET = createAPIHandler(async function (
  _,
  params: ApiHandlerParams
) {
  const options: FilterQuery<DonorDocument> = params.search
    ? {
        email: {
          $regex: params.search,
          $options: 'i',
        },
      }
    : {};

  try {
    const queryResults: DonorResponse[] = await DonorSchema.find(
      options,
      {},
      {
        skip: (params.page - 1) * params.limit,
        limit: params.limit,
      }
    );
    const formattedResult: AutocompleteApiResponse[] = queryResults.map(
      (item) => ({ value: item._id, label: item.email })
    );
    return NextResponse.json(formattedResult, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
});
