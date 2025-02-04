import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import Footer from '../../components/Footer';

const renderWithRouter = (ui, { language = 'en', setLanguage = vi.fn() } = {}) => {
    return render(
        <BrowserRouter>
            <LanguageContext.Provider value={{ language, setLanguage }}>
                {ui}
            </LanguageContext.Provider>
        </BrowserRouter>
    );
};

describe('Footer', () => {
    it('renders logo and copyright', () => {
        renderWithRouter(<Footer />);
        expect(screen.getByText('KeyNest')).toBeInTheDocument();
        expect(screen.getByText(/© 2024 KeyNest/)).toBeInTheDocument();
    });

    it('renders language buttons', () => {
        renderWithRouter(<Footer />);
        expect(screen.getByText('EN')).toBeInTheDocument();
        expect(screen.getByText('FR')).toBeInTheDocument();
        expect(screen.getByText('ES')).toBeInTheDocument();
    });

    it('handles language changes correctly', () => {
        const setLanguage = vi.fn();
        renderWithRouter(<Footer />, { setLanguage });

        fireEvent.click(screen.getByText('FR'));
        expect(setLanguage).toHaveBeenCalledWith('fr');

        fireEvent.click(screen.getByText('ES'));
        expect(setLanguage).toHaveBeenCalledWith('es');
    });

    it('shows selected language button state', () => {
        renderWithRouter(<Footer />, { language: 'fr' });
        expect(screen.getByText('FR').className).toContain('selected');
        expect(screen.getByText('EN').className).not.toContain('selected');
    });

    it('renders logo link correctly', () => {
        renderWithRouter(<Footer />);
        const logoLink = screen.getByRole('link', { name: /KeyNest/i });
        expect(logoLink).toHaveAttribute('href', '/');
    });
}); 