import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

describe("Apartment loading state", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        useParams.mockReturnValue({ id: '1' });

    });

    it('shows loading state initially', async () => {
        const fetchApartmentSpy = vi
            .spyOn(fetchApartmentModule, 'default')
            .mockImplementationOnce(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(mockApartment);
                    }, 100) // show
                });
            });


        renderWithRouter(<Apartment />);

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(fetchApartmentSpy).toHaveBeenCalledTimes(1);
    });

    it('redirects to 404 for invalid apartment id', async () => {
        useParams.mockReturnValue({ id: 'invalid-id' });
        renderWithRouter(<Apartment />);
        
        await waitFor(() => {
            expect(window.location.pathname).toBe('/404');
        });
    });
    
    
})

describe("Test with mock apartment", () => {
    let fetchApartmentSpy;
    beforeEach(() => {

        vi.clearAllMocks();
        useParams.mockReturnValue({ id: '1' });
        fetchApartmentSpy = vi
            .spyOn(fetchApartmentModule, 'default')
            .mockImplementationOnce(() => {
                return mockApartment
            
            });
    });
    

    describe('Apartment', () => {
    

  

        it('renders apartment details in English', async () => {
      
            renderWithRouter(<Apartment />);
        
            expect(fetchApartmentSpy).toHaveBeenCalledTimes(1);

            await waitFor(() => {
                expect(screen.getByTestId('apartment-title')).toHaveTextContent('Test Apartment 1');
                expect(screen.getByText('Test Location 1')).toBeInTheDocument();
                expect(screen.getByText('Test description 1')).toBeInTheDocument();
                expect(screen.getByText('Equipment 1')).toBeInTheDocument();
                expect(screen.getByText('Equipment 2')).toBeInTheDocument();
                expect(screen.getByText('Tag 1')).toBeInTheDocument();
                expect(screen.getByText('Tag 2')).toBeInTheDocument();
            });


        });


        it('renders apartment details in French', async () => {
            renderWithRouter(<Apartment />, { language: 'fr' });
        
            await waitFor(() => {
                expect(screen.getByTestId('apartment-title')).toHaveTextContent('Appartement Test 1');
                expect(screen.getByText('Test Location 1')).toBeInTheDocument();
                expect(screen.getByText('Description test 1')).toBeInTheDocument();
                expect(screen.getByText('Équipement 1')).toBeInTheDocument();
                expect(screen.getByText('Équipement 2')).toBeInTheDocument();
            });

        });

        it('renders apartment details in Spanish', async () => {
            renderWithRouter(<Apartment />, { language: 'es' });
        
            await waitFor(() => {
                expect(screen.getByTestId('apartment-title')).toHaveTextContent('Apartamento de Prueba 1');
                expect(screen.getByText('Test Location 1')).toBeInTheDocument();
                expect(screen.getByText('Descripción de prueba 1')).toBeInTheDocument();
                expect(screen.getByText('Equipo 1')).toBeInTheDocument();
                expect(screen.getByText('Equipo 2')).toBeInTheDocument();
            });

        });

        it('renders host information', async () => {
            renderWithRouter(<Apartment />);
        

            await waitFor(() => {
                expect(screen.getByText('Test Host 1')).toBeInTheDocument();
                const hostImage = screen.getByAltText('Test Host 1');
                expect(hostImage).toHaveAttribute('src', '/host1.jpg');

            });
        });

        it('renders rating stars correctly', async () => {
            renderWithRouter(<Apartment />);
        
            await waitFor(() => {
                const activeStars = screen.getAllByAltText('active star');
                const inactiveStars = screen.getAllByAltText('inactive star');
                expect(activeStars).toHaveLength(4); // Rating is 4
                expect(inactiveStars).toHaveLength(1); // 5 total - 4 active = 1 inactive
            });
        });

        it('renders tags', async () => {
            renderWithRouter(<Apartment />);
        
            await waitFor(() => {
                expect(screen.getByText('Tag 1')).toBeInTheDocument();
                expect(screen.getByText('Tag 2')).toBeInTheDocument();
            });
        });

        describe('Image Carousel', () => {
            it('renders all apartment images', async () => {
                renderWithRouter(<Apartment />);
            
                await waitFor(() => {
                    const images = screen.getAllByRole('img');
                    const carouselImages = images.filter(img =>
                        img.alt.startsWith('Test Apartment 1 -')
                    );
                    expect(carouselImages).toHaveLength(3);
                });
            });

            it('shows navigation arrows when multiple images', async () => {
                renderWithRouter(<Apartment />);
            
                await waitFor(() => {
                    expect(screen.getByAltText('back arrow')).toBeInTheDocument();
                    expect(screen.getByAltText('forward arrow')).toBeInTheDocument();
                });
            });

            it('cycles through images when clicking arrows', async () => {
                renderWithRouter(<Apartment />);
                let forwardArrow;
                let backArrow;
                let getActiveImage;
                await waitFor(() => {
                    const carouselTrack = screen.getByTestId('carousel-track');


                    forwardArrow = screen.getByAltText('forward arrow');
                    backArrow = screen.getByAltText('back arrow');
                    const images = carouselTrack.querySelectorAll('.carousel-image');
                    expect(images).toHaveLength(3);

                    getActiveImage = () => {
                        const innerImages = carouselTrack.querySelectorAll('.carousel-image');
                        var activeImage;
                        innerImages.forEach(img => {
                            if (img.parentElement.classList.contains('active')) {

                                activeImage = img;
                            }
                        });
                        return activeImage;
                    }
                });



                // forward arrow
                expect(getActiveImage().alt).toBe('Test Apartment 1 - 1');
                await waitFor(() => {
                    fireEvent.click(forwardArrow);
                    expect(getActiveImage().alt).toBe('Test Apartment 1 - 2');
                });
                await waitFor(() => {
                    fireEvent.click(forwardArrow);
                    expect(getActiveImage().alt).toBe('Test Apartment 1 - 3');
                });
                await waitFor(() => {
                    fireEvent.click(forwardArrow);

                    expect(getActiveImage().alt).toBe('Test Apartment 1 - 1');
                });

                // back arrow
                expect(getActiveImage().alt).toBe('Test Apartment 1 - 1');
                await waitFor(() => {
                    fireEvent.click(backArrow);
                    expect(getActiveImage().alt).toBe('Test Apartment 1 - 3');
                });

            });
        });




        describe('Modal', () => {
            it('opens modal when clicking on image', async () => {
                renderWithRouter(<Apartment />);
                await waitFor(() => {
                const carouselItemOverlay = screen.getByTestId('carousel-item-overlay');
                    fireEvent.click(carouselItemOverlay);
                });

                const overlay = screen.getByTestId('modal-overlay');
                expect(overlay).toBeInTheDocument();

            });

            it('closes modal when clicking close button', async () => {
                renderWithRouter(<Apartment />);
                await waitFor(() => {
                    const carouselItemOverlay = screen.getByTestId('carousel-item-overlay');

                    fireEvent.click(carouselItemOverlay);
                });

                const overlay = screen.getByTestId('modal-overlay');
                expect(overlay).toBeInTheDocument();

                await waitFor(() => {
                    const closeButton = screen.getByTestId('modal-close-button');
                    fireEvent.click(closeButton);
                    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();

                });

            });

            it('shows navigation in modal for multiple images', async () => {
                renderWithRouter(<Apartment />);
            
                await waitFor(() => {
                    const overlay = screen.getByTestId('carousel-item-overlay');
                    fireEvent.click(overlay);
                    expect(screen.getByTestId('modal-back-arrow')).toBeInTheDocument();
                    expect(screen.getByTestId('modal-forward-arrow')).toBeInTheDocument();
                });

            });
        });

        describe('Accordions', () => {
            it('toggles description accordion', async () => {
                renderWithRouter(<Apartment />);
            
                await waitFor(() => {
                    const descriptionAccordion = screen.getByText('Description').parentElement;
                    fireEvent.click(descriptionAccordion);
                    expect(descriptionAccordion.parentElement).toHaveClass('active');
                
                    fireEvent.click(descriptionAccordion);
                    expect(descriptionAccordion.parentElement).not.toHaveClass('active');
                });
            });

            it('toggles equipment accordion', async () => {
                renderWithRouter(<Apartment />);
            

                await waitFor(() => {
                    const equipmentAccordion = screen.getByText('Equipment').parentElement;
                    fireEvent.click(equipmentAccordion);
                    expect(equipmentAccordion.parentElement).toHaveClass('active');
                
                    fireEvent.click(equipmentAccordion);
                    expect(equipmentAccordion.parentElement).not.toHaveClass('active');
                });
            });
        });
    });

})