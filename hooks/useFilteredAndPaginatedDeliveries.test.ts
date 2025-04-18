import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useFilteredAndPaginatedDeliveries } from './useFilteredAndPaginatedDeliveries';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useFilteredAndPaginatedDeliveries', () => {
  const mockDeliveries = [
    {
      id: '1',
      status: 'в пути',
      createdAt: '2023-01-01',
      fromAddress: 'Москва',
      toAddress: 'СПб',
    },
    {
      id: '2',
      status: 'доставлено',
      createdAt: '2023-01-02',
      fromAddress: 'Москва',
      toAddress: 'Новосибирск',
    },
    {
      id: '3',
      status: 'в пути',
      createdAt: '2023-01-03',
      fromAddress: 'СПб',
      toAddress: 'Москва',
    },
    {
      id: '4',
      status: 'доставлено',
      createdAt: '2023-01-04',
      fromAddress: 'СПб',
      toAddress: 'Екатеринбург',
    },
    {
      id: '5',
      status: 'в пути',
      createdAt: '2023-01-05',
      fromAddress: 'Екатеринбург',
      toAddress: 'Москва',
    },
    {
      id: '6',
      status: 'доставлено',
      createdAt: '2023-01-06',
      fromAddress: 'Москва',
      toAddress: 'Томск',
    },
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push: jest.fn(),
    });
  });

  it('returns all deliveries without filter', () => {
    const { result } = renderHook(() =>
      useFilteredAndPaginatedDeliveries(mockDeliveries, null)
    );

    expect(result.current.filteredDeliveries).toEqual(mockDeliveries);
    expect(result.current.paginatedDeliveries).toEqual(
      mockDeliveries.slice(0, 5)
    );
  });

  it('correctly filters deliveries by status', () => {
    const { result } = renderHook(() =>
      useFilteredAndPaginatedDeliveries(mockDeliveries, 'доставлено')
    );

    expect(result.current.filteredDeliveries).toEqual([
      {
        id: '2',
        status: 'доставлено',
        createdAt: '2023-01-02',
        fromAddress: 'Москва',
        toAddress: 'Новосибирск',
      },
      {
        id: '4',
        status: 'доставлено',
        createdAt: '2023-01-04',
        fromAddress: 'СПб',
        toAddress: 'Екатеринбург',
      },
      {
        id: '6',
        status: 'доставлено',
        createdAt: '2023-01-06',
        fromAddress: 'Москва',
        toAddress: 'Томск',
      },
    ]);
    expect(result.current.paginatedDeliveries).toEqual([
      {
        id: '2',
        status: 'доставлено',
        createdAt: '2023-01-02',
        fromAddress: 'Москва',
        toAddress: 'Новосибирск',
      },
      {
        id: '4',
        status: 'доставлено',
        createdAt: '2023-01-04',
        fromAddress: 'СПб',
        toAddress: 'Екатеринбург',
      },
      {
        id: '6',
        status: 'доставлено',
        createdAt: '2023-01-06',
        fromAddress: 'Москва',
        toAddress: 'Томск',
      },
    ]);
  });

  it('pagination', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '2' },
      push: jest.fn(),
    });

    const { result } = renderHook(() =>
      useFilteredAndPaginatedDeliveries(mockDeliveries, null)
    );

    expect(result.current.paginatedDeliveries).toEqual([
      {
        id: '6',
        status: 'доставлено',
        createdAt: '2023-01-06',
        fromAddress: 'Москва',
        toAddress: 'Томск',
      },
    ]);
  });
});
