import AddItemView from '@/views/addItemView';
import { getUniqueCategories } from '@/server/actions/items';

export default async function AddItemPage() {
  const categories = await getUniqueCategories();

  return (
    <>
      <AddItemView categories={categories} />
    </>
  );
}
