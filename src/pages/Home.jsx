import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apartmentsData from '../data/data.json';
import baseData from '../data/baseData.json';
import useLanguage from '../hooks/useLanguage';

function Home() {
    const [apartments, setApartments] = useState([]);

    const { language } = useLanguage();

    useEffect(() => {
        setApartments(apartmentsData);
    }, []);

    return (
        <main>
            <section className="home-banner">
                <img src="/assets/cabin.jpg" alt="cabin key host" />
                <h2>{baseData.home_banner_title[language]}</h2>
            </section>

            <section className="cards-container">
                {apartments.map((apartment) => (
                    <Link key={apartment.id} to={`/apartment/${apartment.id}`}>
                        <article className="card">
                            <h3>{apartment.title[language]}</h3>
                            <img
                                className="card-img"
                                src={apartment.cover}
                                alt={apartment.title[language]}
                            />
                        </article>
                    </Link>
                ))}
            </section>
        </main>
    );
}

export default Home;
