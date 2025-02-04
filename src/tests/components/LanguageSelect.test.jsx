import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageContext } from '../../context/LanguageContext';
import LanguageSelect from '../../components/LanguageSelect';

describe('LanguageSelect', () => {
    const mockSetLanguage = vi.fn();
    const defaultProps = {
        language: 'en',
        allLanguages: ['en', 'fr', 'es'],
        setLanguage: mockSetLanguage
    };

    const renderLanguageSelect = (props = {}) => {
        return render(
            <LanguageContext.Provider value={{ ...defaultProps, ...props }}>
                <LanguageSelect />
            </LanguageContext.Provider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders current language in uppercase', () => {
        renderLanguageSelect();
        const languageSelect = screen.getByTestId('language-select-accordion-test');
        const dropdown = screen.getByTestId('language-dropdown');
        expect(languageSelect).toHaveTextContent('EN');
        expect(dropdown).toBeInTheDocument();
        expect(dropdown).toHaveTextContent('FR');
        expect(dropdown).toHaveTextContent('ES');
        expect(dropdown).toHaveTextContent('EN');


    });


    it('shows language options when clicked', async() => {
        renderLanguageSelect();
        const languageSelect = screen.getByTestId('language-select-accordion-test');
        const header = languageSelect.firstChild;
        fireEvent.click(header);
        // wait for the dropdown to be visible

        await waitFor(() => {
            expect(languageSelect).toHaveClass('active');
        });



        const dropdown = screen.getByTestId('language-dropdown');
        expect(dropdown).toBeInTheDocument();
        expect(dropdown).toHaveTextContent('FR');
        expect(dropdown).toHaveTextContent('ES');

    });

    it('changes language when option is selected', async () => {
        renderLanguageSelect();
        const languageSelect = screen.getByTestId('language-select-accordion-test');
        const header = languageSelect.firstChild;
        fireEvent.click(header);
        const dropdown = screen.getByTestId('language-dropdown');
        fireEvent.click(dropdown.children[1]);
        expect(mockSetLanguage).toHaveBeenCalledWith('fr');

    });



    it('closes dropdown when language is selected', async() => {
        renderLanguageSelect();
        const languageSelect = screen.getByTestId('language-select-accordion-test');
        const header = languageSelect.firstChild;
        fireEvent.click(header);
        const dropdown = screen.getByTestId('language-dropdown');
        fireEvent.click(dropdown.children[1]);

   
        expect(languageSelect).not.toHaveClass('active');




    });

    it('closes on blur', () => {
        renderLanguageSelect();
        const languageSelect = screen.getByTestId('language-select-accordion-test');
        const header = languageSelect.firstChild;
        fireEvent.click(header);
        const dropdown = screen.getByTestId('language-dropdown');
        


        fireEvent.click(dropdown);
        expect(languageSelect).toHaveClass('active');
        fireEvent.blur(dropdown);
        
        expect(languageSelect).not.toHaveClass('active');
    });
}); 