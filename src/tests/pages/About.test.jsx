import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { LanguageContext } from '../../context/LanguageContext';
import About from '../../pages/About';

vi.mock('~/data/data.about.en.json', () => ({
    default: {
        title: 'About Us',
        description: 'English description',
        accordions: [
            { title: 'Section 1', content: 'Content 1' },
            { title: 'Section 2', content: 'Content 2' }
        ]
    }
}));

vi.mock('~/data/data.about.fr.json', () => ({
    default: {
        title: 'À propos',
        description: 'Description française',
        accordions: [
            { title: 'Section 1 FR', content: 'Contenu 1' },
            { title: 'Section 2 FR', content: 'Contenu 2' }
        ]
    }
}));

vi.mock('~/data/data.about.es.json', () => ({
    default: {
        title: 'Sobre nosotros',
        description: 'Descripción española',
        accordions: [
            { title: 'Sección 1', content: 'Contenido 1' },
            { title: 'Sección 2', content: 'Contenido 2' }
        ]
    }
}));

const renderAbout = (language = 'en') => {
    return render(
        <LanguageContext.Provider value={{ language }}>
            <About />
        </LanguageContext.Provider>
    );
};

describe('About', () => {
    it('renders English content by default', async () => {
        renderAbout();
        
        await waitFor(() => {
            expect(screen.getByText('About Us')).toBeInTheDocument();
            expect(screen.getByText('English description')).toBeInTheDocument();
        });
    });

    it('renders French content when language is French', async () => {
        renderAbout('fr');
        
        await waitFor(() => {
            expect(screen.getByText('À propos')).toBeInTheDocument();
            expect(screen.getByText('Description française')).toBeInTheDocument();
        });
    });

    it('renders Spanish content when language is Spanish', async () => {
        renderAbout('es');
        
        await waitFor(() => {
            expect(screen.getByText('Sobre nosotros')).toBeInTheDocument();
            expect(screen.getByText('Descripción española')).toBeInTheDocument();
        });
    });

    it('renders accordion sections', async () => {
        renderAbout();
        
        await waitFor(() => {
            expect(screen.getByText('Section 1')).toBeInTheDocument();
            expect(screen.getByText('Section 2')).toBeInTheDocument();
        });
    });

    it('renders about image', () => {
        renderAbout();
        const image = screen.getByAltText('key home about image');
        expect(image).toHaveAttribute('src', '/assets/cabin.jpg');

    });
}); 