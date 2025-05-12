import { NextResponse } from 'next/server';

export type AutocompleteApiResponse = {
  value: string;
  label: string;
};

export type ApiHandlerParams = {
  page: number;
  limit: number;
  search: string;
};

type Handler = (
  request: Request,
  params: ApiHandlerParams
) => Promise<NextResponse>;

export function createAPIHandler(
  handler: Handler
): (request: Request) => Promise<Response> {
  return async function GET(request: Request): Promise<Response> {
    // Extract query parameters from the URL
    const { searchParams } = new URL(request.url);
    const page: number = parseInt(searchParams.get('page') ?? '1', 10);
    const limit: number = parseInt(searchParams.get('limit') ?? '100', 10);
    const search: string = searchParams.get('search') ?? '';

    try {
      // Invoke the handler with the original request and pagination/search parameters
      const result = await handler(request, { page, limit, search });
      return result;
    } catch (error) {
      console.error('Error in GET handler:', error);
      return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
    }
  };
}
