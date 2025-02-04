import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../../pages/NotFound';

describe('NotFound', () => {
    it('renders 404 heading', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );
        expect(screen.getByText('404')).toBeInTheDocument();
    });

    it('renders error message', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );
        expect(
            screen.getByText("Oops! The page you're looking for doesn't exist.")
        ).toBeInTheDocument();
    });

    it('renders back to home link', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );
        const link = screen.getByText('Back to Home');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/');
    });

    it('has correct link class', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );
        const link = screen.getByText('Back to Home');
        expect(link).toHaveClass('back-home');
    });
});
