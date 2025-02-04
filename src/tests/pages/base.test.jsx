import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import Apartment from '../../pages/Apartment';
import * as fetchApartmentModule from '~/services/apartment.service'; // Import the module

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: vi.fn(),
    };
});

vi.mock('react-loading', () => ({
    default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

const mockApartment = {
    id: '1',
    title: {
        en: 'Test Apartment 1',
        fr: 'Appartement Test 1',
        es: 'Apartamento de Prueba 1',
    },
    location: 'Test Location 1',
    description: {
        en: 'Test description 1',
        fr: 'Description test 1',
        es: 'Descripción de prueba 1',
    },
    equipments: {
        en: ['Equipment 1', 'Equipment 2'],
        fr: ['Équipement 1', 'Équipement 2'],
        es: ['Equipo 1', 'Equipo 2'],
    },
    pictures: ['/image1.jpg', '/image2.jpg', '/image3.jpg'],
    tags: ['Tag 1', 'Tag 2'],
    rating: 4,
    host: {
        name: 'Test Host 1',
        picture: '/host1.jpg',
    },
};

const renderWithRouter = (ui, { language = 'en' } = {}) => {
    const mockSetLanguage = vi.fn();
    const defaultProps = {
        allLanguages: ['en', 'fr', 'es'],
        setLanguage: mockSetLanguage,
        language,
    };

    return render(
        <BrowserRouter>
            <LanguageContext.Provider value={defaultProps}>
                {ui}
            </LanguageContext.Provider>
        </BrowserRouter>
    );
};

describe('Apartment', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        useParams.mockReturnValue({ id: '1' });
    });

    it('shows loading state initially', async () => {
        // Mock the fetchApartment function to return a promise that resolves after a delay
        const fetchApartmentSpy = vi
            .spyOn(fetchApartmentModule, 'default') // Spy on the default export
            .mockImplementationOnce(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(mockApartment);
                    }, 1000); // Simulate a delay of 1 second
                });
            });

        renderWithRouter(<Apartment />);

        // Check if the loading spinner is in the document
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        // Wait for the promise to resolve and check if the loading spinner is removed
        // await waitFor(() => {
        //     expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
        // });

        // Ensure the spy is only called once
        expect(fetchApartmentSpy).toHaveBeenCalledTimes(1);
    });
});