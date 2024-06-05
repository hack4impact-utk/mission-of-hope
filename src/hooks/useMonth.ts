import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useMonth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const monthQuery = searchParams.get('month') || '';
  const [selectedMonth, setSearchString] = useState<string>(monthQuery);

  const setMonthQuery = (query: string) => {
    setSearchString(query);
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('month', query);
    } else {
      params.delete('month');
    }
    router.push(`?${params.toString()}`);
  };

  return { selectedMonth, monthQuery, setMonthQuery };
}
