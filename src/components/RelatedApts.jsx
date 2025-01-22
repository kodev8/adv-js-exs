import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apartmentsData from '~/data/data.json';
import useLanguage from '~/hooks/useLanguage';

export function RelatedApts({ aptId }) {
    const [relatedApts, setRelatedApts] = useState([]);
    const { language } = useLanguage();

    useEffect(() => {
        // choose 3 random apartments from the data
        const randomApts = apartmentsData
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        setRelatedApts(randomApts);
    }, [aptId]);

    return (
        <section className="related-section">
            <h2>You might also like</h2>
            <div className="related-container">
                {relatedApts.map((apartment) => (
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
            </div>
        </section>
    );
}

export default RelatedApts;
