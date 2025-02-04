import { useContext, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import AccordionItem from './AccordionItem';

function LanguageSelect() {
    const { language, allLanguages, setLanguage } = useContext(LanguageContext);
    return (
        <AccordionItem
            className="language-select"
            title={language.toUpperCase()}
            closeOnBlur={true}
            testid="language-select-accordion-test"
        >
            {({ setIsActive }) => (
                <div role="list" className="language-dropdown" data-testid="language-dropdown">
                    {allLanguages.map((lang) => (
                        <span
                            key={lang}
                            onClick={() => {
                                setLanguage(lang);
                                setIsActive(false);
                            }}
                        >
                            {lang.toUpperCase()}
                        </span>
                    ))}
                </div>
            )}
        </AccordionItem>
    );
}

export default LanguageSelect;
