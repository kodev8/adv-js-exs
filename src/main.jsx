import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import LanguageContextProvider from './context/LanguageContext';
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <LanguageContextProvider>
            <App />
        </LanguageContextProvider>
    </StrictMode>
);
