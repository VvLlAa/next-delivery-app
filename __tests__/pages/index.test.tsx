import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/pages';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const mockDeliveries = [
  { id: 1, name: 'Доставка 1' },
  { id: 2, name: 'Доставка 2' },
];

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: jest.fn(),
  }),
}));

describe('HomePage', () => {
  const mockStore = configureStore({
    reducer: {
      mainStore: () => ({
        deliveries: mockDeliveries,
        error: null,
      }),
    },
  });

  it('should display the “Delivery List” header', () => {
    render(
      <Provider store={mockStore}>
        <HomePage />
      </Provider>
    );

    expect(screen.getByText('Список доставок')).toBeInTheDocument();
  });

  it('should display an error message if there is one', () => {
    const mockStoreWithError = configureStore({
      reducer: {
        mainStore: () => ({
          deliveries: [],
          error: 'Ошибка загрузки данных',
        }),
      },
    });

    render(
      <Provider store={mockStoreWithError}>
        <HomePage />
      </Provider>
    );

    expect(screen.getByText('Ошибка загрузки данных')).toBeInTheDocument();
  });
});
