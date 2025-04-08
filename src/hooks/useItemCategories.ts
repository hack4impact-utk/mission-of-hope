import { ApiAutocompleteOption } from '@/components/ApiAutoComplete';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useItemCategoryOptions(): ApiAutocompleteOption[] {
  const [categoryOptions, setCategoryOptions] = useState<
    ApiAutocompleteOption[]
  >([]);
  const categoriesLoadedRef = useRef<boolean>(false);
  const loadCategories = useCallback(async () => {
    const categoryRes = await fetch('/api/categories');
    const categories = await categoryRes.json();
    setCategoryOptions(
      categories.map((categoryName: string) => ({ label: categoryName }))
    );
  }, []);

  useEffect(() => {
    if (!categoriesLoadedRef.current) {
      loadCategories();
      categoriesLoadedRef.current = true;
    }
  }, [loadCategories]);

  return categoryOptions;
}
