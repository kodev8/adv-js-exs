import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import CountContextProvider from './context/count/CountContextProvider';
import UserContextProvider from './context/user/UserContextProvider';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserContextProvider>
            <CountContextProvider>
                <App />
            </CountContextProvider>
        </UserContextProvider>
    </StrictMode>
);
