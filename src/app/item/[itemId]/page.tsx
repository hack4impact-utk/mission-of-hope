import { getItemById } from '@/server/actions/items';
import { ItemResponse } from '@/types/items';
import ItemIdView from '@/views/itemIdView';

export default async function ItemEditPage({
  params,
}: {
  params: { itemId: string };
}) {
  const item: ItemResponse = JSON.parse(
    JSON.stringify(await getItemById(params.itemId))
  );

  return <ItemIdView id={params.itemId} item={item}></ItemIdView>;
}
