import { useState, useEffect } from 'react';
import aboutDataEn from '~/data/data.about.en.json';
import aboutDataFr from '~/data/data.about.fr.json';
import aboutDataEs from '~/data/data.about.es.json';
import AccordionItem from '~/components/AccordionItem';
import useLanguage from '~/hooks/useLanguage';

function About() {
    const [aboutData, setAboutData] = useState({});
    const { language } = useLanguage();

    useEffect(() => {
        switch (language) {
            case 'fr':
                setAboutData(aboutDataFr);
                break;
            case 'es':
                setAboutData(aboutDataEs);
                break;
            default:
                setAboutData(aboutDataEn);
                break;
        }
    }, [language]);

    return (
        <main className="about">
            <h1>{aboutData.title}</h1>
            <section>
                <img src="/assets/cabin.jpg" alt="key home about image" />
            </section>
            <article>{aboutData.description}</article>
            <div className="about-container">
                {aboutData.accordions?.map((accordion, index) => (
                    <AccordionItem
                        key={index}
                        title={accordion.title}
                        baseClass="accordion-about"
                        id={index}
                    >
                        {accordion.content}
                    </AccordionItem>
                ))}
            </div>
        </main>
    );
}

export default About;
