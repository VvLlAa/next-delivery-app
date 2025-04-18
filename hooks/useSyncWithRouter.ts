import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useSyncWithRouter(queryParam: string | null) {
  const router = useRouter();
  useEffect(() => {
    if (queryParam || queryParam === null) {
      router.push(`?page=1`, undefined, { shallow: true });
    }
  }, [queryParam]);
}
