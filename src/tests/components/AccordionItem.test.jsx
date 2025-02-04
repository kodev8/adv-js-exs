import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AccordionItem from '../../components/AccordionItem';

describe('AccordionItem', () => {
    const mockTitle = 'Test Accordion';
    const mockContent = 'Test Content';
    const mockId = 'test-accordion';


    it('renders with basic props', () => {
        render(<AccordionItem title={mockTitle}>{mockContent}</AccordionItem>);
        expect(screen.getByText(mockTitle)).toBeInTheDocument();
        expect(screen.getByText(mockContent)).toBeInTheDocument();
    });

    it('toggles active state on click', () => {
        render(<AccordionItem title={mockTitle}>{mockContent}</AccordionItem>);
        const header = screen.getByText(mockTitle).parentElement;

        fireEvent.click(header);
        expect(header.parentElement).toHaveClass('active');

        fireEvent.click(header);
        expect(header.parentElement).not.toHaveClass('active');
    });

    it('handles function children correctly', () => {
        const mockFn = vi.fn();
        render(
            <AccordionItem title={mockTitle}>
                {({ isActive, setIsActive }) => {
                    mockFn(isActive);
                    return mockContent;
                }}
            </AccordionItem>
        );

        expect(mockFn).toHaveBeenCalledWith(false);
        expect(screen.getByText(mockContent)).toBeInTheDocument();
    });

    it('closes on blur when closeOnBlur is true', () => {

        render(
            <div>
                <AccordionItem testid={mockId} title={mockTitle} closeOnBlur={true}>
                    {mockContent}
                </AccordionItem>
                <div className='test-div'>
                    <p>Test</p>
                </div>
            </div>
        );


        const header = screen.getByText(mockTitle).parentElement;
        fireEvent.click(header);
        expect(header.parentElement).toHaveClass('active');

        fireEvent.blur(header);
        expect(header.parentElement).not.toHaveClass('active');


    });

    it('uses custom baseClass correctly', () => {
        const customBaseClass = 'custom-accordion';
        render(
            <AccordionItem testid={mockId} title={mockTitle} baseClass={customBaseClass}>
                {mockContent}
            </AccordionItem>
        );


        const accordion = screen.getByTestId(mockId);


        expect(accordion).toHaveClass(
            `${customBaseClass}-item`
        );

    });
});
