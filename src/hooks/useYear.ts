import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useYear() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const yearQuery = searchParams.get('year') || '';
  const [selectedYear, setSearchString] = useState<string>(yearQuery);

  const setYearQuery = (query: string) => {
    setSearchString(query);
    const params = new URLSearchParams(searchParams.toString());
    if (query && Number(query) > 0) {
      params.set('year', query);
    } else {
      params.delete('year');
    }
    router.push(`?${params.toString()}`);
  };

  return { selectedYear, yearQuery, setYearQuery };
}
