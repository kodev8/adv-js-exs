import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import RelatedApts from '../../components/RelatedApts';

vi.mock('~/data/data.json', () => ({
    default: [
        {
            id: '1',
            title: { en: 'Apt 1', fr: 'Appt 1', es: 'Apto 1' },
            cover: '/apt1.jpg'
        },
        {
            id: '2',
            title: { en: 'Apt 2', fr: 'Appt 2', es: 'Apto 2' },
            cover: '/apt2.jpg'
        },
        {
            id: '3',
            title: { en: 'Apt 3', fr: 'Appt 3', es: 'Apto 3' },
            cover: '/apt3.jpg'
        }
    ]
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

describe('RelatedApts', () => {
    it('renders section title', () => {
        renderWithRouter(<RelatedApts aptId="1" />);
        expect(screen.getByText('You might also like')).toBeInTheDocument();
    });

    it('renders 3 related apartments', async () => {
        renderWithRouter(<RelatedApts aptId="1" />);
        
        await waitFor(() => {
            const apartments = screen.getAllByRole('article');
            expect(apartments.length).toBe(3);
        });
    });

    it('renders apartment titles in correct language', async () => {

        // render with french
        renderWithRouter(<RelatedApts aptId="1" />, { language: 'fr' });
        

        await waitFor(() => {
            const titles = screen.getAllByText(/Appt/);
            expect(titles.length).toBe(3);
            titles.forEach(title => {
                expect(title).toHaveTextContent('Appt');
            });
        });

        // render with english
        renderWithRouter(<RelatedApts aptId="1" />, { language: 'en' });

        await waitFor(() => {
            const titles = screen.getAllByText(/Apt/);
            expect(titles.length).toBe(3);
            titles.forEach(title => {
                expect(title).toHaveTextContent('Apt');
            });
        });


        // render with spanish
        renderWithRouter(<RelatedApts aptId="1" />, { language: 'es' });

        await waitFor(() => {
            const titles = screen.getAllByText(/Apto/);

            expect(titles.length).toBe(3);
            titles.forEach(title => {
                expect(title).toHaveTextContent('Apto');
            });
        });
    });



    it('renders apartment images with correct alt text', async () => {
        renderWithRouter(<RelatedApts aptId="1" />);
        
        await waitFor(() => {
            const images = screen.getAllByRole('img');
            expect(images.length).toBe(3);
            images.forEach(img => {
                expect(img).toHaveAttribute('alt');
            });
        });
    });

    it('renders links to apartment pages', async () => {
        renderWithRouter(<RelatedApts aptId="1" />);
        
        await waitFor(() => {
            const links = screen.getAllByRole('link');
            expect(links.length).toBe(3);
            links.forEach(link => {
                expect(link.getAttribute('href')).toMatch(/^\/apartment\//);
            });
        });
    });
}); 