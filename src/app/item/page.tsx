import { getAllItems } from '@/server/actions/items';
import ItemView from '@/views/itemView';

export default async function Home() {
  const rows = JSON.parse(JSON.stringify(await getAllItems()));

  return <ItemView items={rows}></ItemView>;
}
