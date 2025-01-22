import { NavLink, Link } from 'react-router-dom';
import LanguageSelect from './LanguageSelect';
import useLanguage from '../hooks/useLanguage';
import baseData from '../data/baseData.json';
import '../styles/header.css';

function Header() {
    const { language } = useLanguage();

    return (
        <header className="header">
            <nav>
                <Link to="/" className="header-logo">
                    <span>KeyNest</span>
                    <img src="/assets/key-logo.svg" alt="KeyNest logo" />
                </Link>
                <ul>
                    <li>
                        <NavLink
                            className={({ isActive }) => {
                                return isActive ? 'active' : '';
                            }}
                            to="/"
                        >
                            {baseData.home_nav[language]}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => {
                                return isActive ? 'active' : '';
                            }}
                            to="/about"
                        >
                            {baseData.about_nav[language]}
                        </NavLink>
                    </li>
                    <li>
                        <LanguageSelect />
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
