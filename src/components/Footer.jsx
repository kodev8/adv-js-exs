import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import '../styles/footer.css';

function Footer() {
    const { language, setLanguage } = useContext(LanguageContext);
    return (
        <footer className="footer">
            <Link to="/" className="footer-logo">
                <span>KeyNest</span>
                <img src="/assets/key-logo-footer.svg" alt="KeyNest logo" />
            </Link>
            <p>&copy; 2024 KeyNest</p>
            <div className="change-language">
                <button
                    className={`${language === 'en' ? 'selected' : ''}`}
                    onClick={() => setLanguage('en')}
                >
                    EN
                </button>
                <button
                    className={`${language === 'fr' ? 'selected' : ''}`}
                    onClick={() => setLanguage('fr')}
                >
                    FR
                </button>
                <button
                    className={`${language === 'es' ? 'selected' : ''}`}
                    onClick={() => setLanguage('es')}
                >
                    ES
                </button>
            </div>
        </footer>
    );
}

export default Footer;
