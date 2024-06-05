import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [searchString, setSearchString] = useState<string>(searchQuery);

  const setSearchQuery = (query: string) => {
    setSearchString(query);
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    router.push(`?${params.toString()}`);
  };

  return { searchString, searchQuery, setSearchQuery };
}
