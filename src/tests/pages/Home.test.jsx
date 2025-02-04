import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import Home from '../../pages/Home';

vi.mock('~/data/data.json', () => ({
    default: [
        {
            id: '1',
            title: { en: 'Apartment 1', fr: 'Appartement 1', es: 'Apartamento 1' },
            cover: '/apt1.jpg'
        },
        {
            id: '2',
            title: { en: 'Apartment 2', fr: 'Appartement 2', es: 'Apartamento 2' },
            cover: '/apt2.jpg'
        }
    ]
}));

vi.mock('~/data/baseData.json', () => ({
    default: {
        home_banner_title: {
            en: 'Welcome',
            fr: 'Bienvenue',
            es: 'Bienvenidos'
        }
    }
}));

const renderWithRouter = (ui, { language = 'en' } = {}) => {
    return render(
        <BrowserRouter>
            <LanguageContext.Provider value={{ language }}>
                {ui}
            </LanguageContext.Provider>
        </BrowserRouter>
    );
};

describe('Home', () => {
    it('renders banner with correct title (en)', () => {
        renderWithRouter(<Home />);
        expect(screen.getByText('Welcome')).toBeInTheDocument();
    });



    it('renders banner with correct title (fr)', () => {
        renderWithRouter(<Home />, { language: 'fr' });
        expect(screen.getByText('Bienvenue')).toBeInTheDocument();
    });


    it('renders banner with correct title (es)', () => {
        renderWithRouter(<Home />, { language: 'es' });
        expect(screen.getByText('Bienvenidos')).toBeInTheDocument();
    });




    it('renders apartment cards', () => {
        renderWithRouter(<Home />);
        expect(screen.getByText('Apartment 1')).toBeInTheDocument();
        expect(screen.getByText('Apartment 2')).toBeInTheDocument();
    });


    it('renders apartment images', () => {
        renderWithRouter(<Home />);
        const images = screen.getAllByRole('img');
        expect(images.length).toBe(3); // 2 apartments + 1 banner image
    });

    it('renders apartment links', () => {
        renderWithRouter(<Home />);
        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/apartment/1');
        expect(links[1]).toHaveAttribute('href', '/apartment/2');
    });


    it('renders banner image', () => {
        renderWithRouter(<Home />);
        const bannerImage = screen.getByAltText('cabin key host');
        expect(bannerImage).toHaveAttribute('src', '/assets/cabin.jpg');
    });
});
