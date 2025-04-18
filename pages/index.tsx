import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState, wrapper } from '@/store';
import { mockDeliveries } from '@/utils/mockData';
import {
  fetchDeliveriesError,
  fetchDeliveriesSuccess,
} from '@/store/main/mainStore';
import { Filter } from '@/components/common/Filter/Filter';
import { BasicTable } from '@/components/common/Table/BasicTable';
import { PaginationComponent } from '@/components/common/Pagination/PaginationComponent';
import { useFilteredAndPaginatedDeliveries } from '@/hooks/useFilteredAndPaginatedDeliveries';
import useSyncWithRouter from '@/hooks/useSyncWithRouter';
import { GetServerSideProps } from 'next';
import { ErrorMessage } from '@/components/Error/ErrorMessage';

export default function HomePage() {
  const { deliveries, error } = useSelector(
    (state: AppState) => state.mainStore
  );
  const [selectedFilter, setSelectedFilter] = useState<string | null>('');
  const { filteredDeliveries, paginatedDeliveries } =
    useFilteredAndPaginatedDeliveries(deliveries, selectedFilter);

  useSyncWithRouter(selectedFilter);

  if (error !== null) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container">
      <h1>Список доставок</h1>
      <Filter setSelectedFilter={setSelectedFilter} />
      <BasicTable deliveries={paginatedDeliveries} />
      <PaginationComponent filteredDeliveries={filteredDeliveries} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    try {
      store.dispatch(fetchDeliveriesError(null));
      // В реальном приложении:
      // const response = await axios.get('/api/main');
      //  store.dispatch(fetchDeliveriesSuccess(mockDeliveries));
      // Моковые данные

      store.dispatch(fetchDeliveriesSuccess(mockDeliveries));

      return {
        props: {},
      };
    } catch (error) {
      store.dispatch(fetchDeliveriesError(error));
      return {
        props: {},
      };
    }
  });
