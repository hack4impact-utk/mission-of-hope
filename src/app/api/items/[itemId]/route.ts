import { ItemResponse } from '@/types/items'; // Adjust the path and import the correct type for items
import { NextResponse, NextRequest } from 'next/server';
import { getItemById, updateItem } from '../../../../server/actions/items'; // Adjust the path to your item actions

// GET endpoint to retrieve an item by ID
export async function GET(
  _request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  // Check if the request has an itemId
  if (!params || !params.itemId) {
    return NextResponse.json(
      { error: 'Invalid request, no item ID provided' },
      { status: 400 }
    );
  }

  try {
    // Get the item by id
    const result: ItemResponse | null = await getItemById(params.itemId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // if the item is not found or another error occurs
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Item not found', details: message },
      { status: 500 }
    );
  }
}

// PUT endpoint to update an item by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  // Check if the request has an itemId
  if (!params || !params.itemId) {
    return NextResponse.json(
      { error: 'Invalid request, no item ID provided' },
      { status: 400 }
    );
  }

  try {
    // Parse the JSON body from the request
    const updatedData = await request.json();

    // Update the item by id
    const updatedItem: ItemResponse | null = await updateItem(
      params.itemId,
      updatedData
    );

    if (!updatedItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    // Handle any errors during parsing or updating
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to update item information', details: message },
      { status: 500 }
    );
  }
}
