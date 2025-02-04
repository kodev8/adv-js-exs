import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import Header from '../../components/Header';

const renderWithRouter = (ui, { language = 'en' } = {}) => {
    const mockSetLanguage = vi.fn();
    const defaultProps = {
        allLanguages: ['en', 'fr', 'es'],
        setLanguage: mockSetLanguage
    };
    return render(
        <BrowserRouter>
            <LanguageContext.Provider value={{ ...defaultProps, language }}>

                {ui}
            </LanguageContext.Provider>
        </BrowserRouter>
    );
};

vi.mock('../../data/baseData.json', () => ({
    default: {
        home_nav: {
            en: 'Home',
            fr: 'Accueil',
            es: 'Inicio'
        },
        about_nav: {
            en: 'About',
            fr: 'À propos',
            es: 'Sobre nosotros'
        }
    }
}));


describe('Header', () => {
  
    it('renders logo and navigation links', () => {
        renderWithRouter(<Header />);
        expect(screen.getByText('KeyNest')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('renders navigation links in French', () => {
        renderWithRouter(<Header />, { language: 'fr' });
        expect(screen.getByText('Accueil')).toBeInTheDocument();
        expect(screen.getByText('À propos')).toBeInTheDocument();
    });

    it('renders navigation links in Spanish', () => {
        renderWithRouter(<Header />, { language: 'es' });
        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Sobre nosotros')).toBeInTheDocument();
    });

    it('includes language selector', () => {
        renderWithRouter(<Header />);
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders logo link correctly', () => {
        renderWithRouter(<Header />);
        const logoLink = screen.getByRole('link', { name: /KeyNest/i });
        expect(logoLink).toHaveAttribute('href', '/');
    });
}); 