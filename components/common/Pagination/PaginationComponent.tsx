import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Delivery } from '@/type/type';
import { useRouter } from 'next/router';

interface PaginationComponentProps {
  filteredDeliveries: Delivery[];
}

export const PaginationComponent = ({
  filteredDeliveries,
}: PaginationComponentProps) => {
  const router = useRouter();
  const [page, setPage] = useState<number>(Number(router.query.page) || 1);

  useEffect(() => {
    const pageFromQuery = parseInt(router.query.page as string) || 1;
    setPage(pageFromQuery);
  }, [router.query.page]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    router.push(`?page=${value}`, undefined, { shallow: true });
  };

  return (
    <>
      <Pagination
        count={Math.ceil(filteredDeliveries.length / 5)}
        page={Number(page)}
        variant="outlined"
        color="primary"
        onChange={handlePageChange}
      />
    </>
  );
};
