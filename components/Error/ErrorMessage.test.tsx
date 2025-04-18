import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
    test('renders error message passed as prop', () => {
        const errorMessage = 'Произошла ошибка при загрузке данных.';

        render(<ErrorMessage message={errorMessage} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    test('renders fallback text', () => {
        const errorMessage = 'Произошла ошибка при загрузке данных.';

        render(<ErrorMessage message={errorMessage} />);
        expect(screen.getByText('Пожалуйста, попробуйте позже.')).toBeInTheDocument();
    });
});

