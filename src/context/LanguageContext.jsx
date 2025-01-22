import { createContext, useState } from 'react';

export const LanguageContext = createContext({
    // language: "en",
    // setLanguage: () => { },
    // allLanguages: []
});

function LanguageContextProvider({ children }) {
    const [language, setLanguage] = useState('en');
    const allLanguages = ['en', 'fr', 'es'];

    return (
        <LanguageContext.Provider
            value={{ language, allLanguages, setLanguage }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageContextProvider;
