import { render, screen, waitFor } from '@testing-library/react';
import { useFilteredAndPaginatedDeliveries } from '@/hooks/useFilteredAndPaginatedDeliveries';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';

// Моковые данные
const mockDeliveries = [
    { id: 1, name: 'Доставка 1', status: 'delivered' },
    { id: 2, name: 'Доставка 2', status: 'pending' },
    { id: 3, name: 'Доставка 3', status: 'delivered' },
    { id: 4, name: 'Доставка 4', status: 'pending' },
    { id: 5, name: 'Доставка 5', status: 'delivered' },
    { id: 6, name: 'Доставка 6', status: 'pending' },
];

const mockStore = configureStore({
    reducer: {
        mainStore: () => ({
            deliveries: mockDeliveries,
            error: null,
        }),
    },
});

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const MockComponent = ({ selectedFilter }: { selectedFilter: string | null }) => {
    const { filteredDeliveries, paginatedDeliveries } = useFilteredAndPaginatedDeliveries(mockDeliveries, selectedFilter);

    return (
        <div>
            <h1>Список доставок</h1>
            <ul>
                {paginatedDeliveries.map((delivery) => (
                    <li key={delivery.id}>{delivery.name}</li>
                ))}
            </ul>
        </div>
    );
};

describe('useFilteredAndPaginatedDeliveries', () => {
    it('должен корректно фильтровать и пагинировать доставку', async () => {
        // Инициализируем начальную страницу как 1
        (useRouter as jest.Mock).mockReturnValue({
            query: { page: '1' },
        });

        render(
            <Provider store={mockStore}>
                <MockComponent selectedFilter={null} />
            </Provider>
        );

        // Проверяем, что на первой странице отображаются только первые 5 доставок
        expect(screen.getByText('Доставка 1')).toBeInTheDocument();
        expect(screen.getByText('Доставка 2')).toBeInTheDocument();
        expect(screen.getByText('Доставка 3')).toBeInTheDocument();
        expect(screen.getByText('Доставка 4')).toBeInTheDocument();
        expect(screen.getByText('Доставка 5')).toBeInTheDocument();

        // Проверяем, что на первой странице не отображаются другие элементы
        expect(screen.queryByText('Доставка 6')).not.toBeInTheDocument();

        // Мокаем изменение страницы на 2
        (useRouter as jest.Mock).mockReturnValue({
            query: { page: '2' },
        });

        render(
            <Provider store={mockStore}>
                <MockComponent selectedFilter={null} />
            </Provider>
        );

        // Используем waitFor, чтобы подождать, пока изменения отобразятся
        await waitFor(() => {
            // Проверяем, что на второй странице отображаются только оставшиеся доставки
            expect(screen.getByText('Доставка 6')).toBeInTheDocument();
            expect(screen.queryByText('Доставка 1')).not.toBeInTheDocument();
        });
    });

    it('должен фильтровать по статусу', async () => {
        render(
            <Provider store={mockStore}>
                <MockComponent selectedFilter="delivered" />
            </Provider>
        );

        // Проверяем, что отображаются только доставки с статусом "delivered"
        expect(screen.getByText('Доставка 1')).toBeInTheDocument();
        expect(screen.getByText('Доставка 3')).toBeInTheDocument();
        expect(screen.getByText('Доставка 5')).toBeInTheDocument();

        // Проверяем, что доставки с другим статусом не отображаются
        await waitFor(() => {
            expect(screen.queryByText('Доставка 2')).not.toBeInTheDocument();
            expect(screen.queryByText('Доставка 4')).not.toBeInTheDocument();
            expect(screen.queryByText('Доставка 6')).not.toBeInTheDocument();
        });
    });
});
