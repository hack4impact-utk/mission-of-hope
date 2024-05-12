import { useSearchParams } from 'next/navigation';

export default function useSearch() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  return searchQuery;
}
