import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import apartmentsData from '../data/data.json';
import { RelatedApts } from '../components/RelatedApts';
import AccordionItem from '~/components/AccordionItem';
import useLanguage from '../hooks/useLanguage';
import ReactLoading from 'react-loading';

function ApartmentFallback() {
    return <Navigate to="/404" />;
}

function Apartment() {
    const { id } = useParams();
    const [apartment, setApartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [descriptionActive, setDescriptionActive] = useState(false);
    const [equipmentActive, setEquipmentActive] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        const foundApartment = apartmentsData.find((apt) => apt.id === id);
        setApartment(foundApartment);
        setLoading(false);
        setCurrentImageIndex(0);
    }, [id]);

    const handleImageTransition = (newIndex) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentImageIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 300); // Match this with CSS transition duration
    };

    const nextImage = () => {
        if (apartment) {
            const newIndex =
                currentImageIndex === apartment.pictures.length - 1
                    ? 0
                    : currentImageIndex + 1;
            handleImageTransition(newIndex);
            setDirection('forward');
        }
    };

    const previousImage = () => {
        if (apartment) {
            const newIndex =
                currentImageIndex === 0
                    ? apartment.pictures.length - 1
                    : currentImageIndex - 1;
            handleImageTransition(newIndex);
            setDirection('previous');
        }
    };

    const getTransformValue = (index, currentIndex, totalImages) => {
        if (totalImages === 1) return 'translateX(0%)';
        let offset = index - currentIndex;

        // Handle looping cases
        if (currentIndex === 0 && index === totalImages - 1) {
            offset = -1;
        } else if (currentIndex === totalImages - 1 && index === 0) {
            offset = 1;
        }

        return `translateX(${offset * 100}%)`;
    };

    // Determine if an image should be animated
    const shouldAnimate = (index, currentIndex, totalImages) => {
        // Take current index as the image that we are going toward on click of either button (back or forward)
        if (totalImages === 1) return false;
        if (index === currentIndex) return true;

        // Special case for handling for 3 images
        if (totalImages === 3) {
            if (direction === 'forward' || direction == null) {
                if (currentIndex === 1) {
                    return index === 0 || index === 1;
                }
                if (currentIndex === 2) {
                    return index === 2 || index === 1;
                }
                if (currentIndex === 0) {
                    return index === 0 || index === 2;
                }
            }
            if (direction === 'previous') {
                if (currentIndex === 1) {
                    return index === 1 || index === 2;
                }
                if (currentIndex === 2) {
                    return index === 2 || index === 0;
                }
                if (currentIndex === 0) {
                    return index === 0 || index === 1;
                }
            }
            return false;
        }

        if (
            currentIndex === 0 &&
            index === totalImages - 1 &&
            direction === 'forward'
        )
            return true;
        if (
            currentIndex === totalImages - 1 &&
            index === 0 &&
            direction === 'previous'
        )
            return true;
        if (
            currentIndex === totalImages - 1 &&
            index === totalImages - 2 &&
            direction === 'previous'
        )
            return false;
        if (currentIndex === 0 && index === 1 && direction === 'forward')
            return false;
        if (index === currentIndex - 1 || index === currentIndex + 1)
            return true;
        return false;
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (loading)
        return (
            <div className="loading-container">
                <ReactLoading color="#c01e68" type="spin" />
            </div>
        );

    if (!apartment) return <ApartmentFallback />;

    return (
        <main>
            <div className="carousel">
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="carousel-item-overlay"
                ></div>

                <div className="carousel-track">
                    {apartment.pictures.map((picture, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${
                                index === currentImageIndex ? 'active' : ''
                            } ${
                                shouldAnimate(
                                    index,
                                    currentImageIndex,
                                    apartment.pictures.length
                                )
                                    ? 'animate'
                                    : ''
                            }`}
                            style={{
                                transform: getTransformValue(
                                    index,
                                    currentImageIndex,
                                    apartment.pictures.length
                                ),
                            }}
                        >
                            <img
                                src={picture}
                                alt={`${apartment.title[language]} - ${index + 1}`}
                            />
                        </div>
                    ))}
                    {apartment.pictures.length > 1 && (
                        <>
                            <button
                                className="back-arrow"
                                onClick={previousImage}
                                disabled={isTransitioning}
                            >
                                <img
                                    src="/assets/arrow_back.png"
                                    alt="back arrow"
                                />
                            </button>
                            <button
                                className="forward-arrow"
                                onClick={nextImage}
                                disabled={isTransitioning}
                            >
                                <img
                                    src="/assets/arrow_forward.png"
                                    alt="forward arrow"
                                />
                            </button>
                        </>
                    )}
                </div>

                {apartment.pictures.length > 1 && (
                    <div className="carousel-indicators">
                        {apartment.pictures.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${
                                    index === currentImageIndex ? 'active' : ''
                                }`}
                                onClick={() => handleImageTransition(index)}
                                disabled={isTransitioning}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="modal-close"
                            onClick={handleCloseModal}
                        >
                            ×
                        </button>
                        <div className="modal-image-container">
                            <img
                                src={apartment.pictures[currentImageIndex]}
                                alt={`${apartment.title[language]} - ${currentImageIndex + 1}`}
                            />
                            {apartment.pictures.length > 1 && (
                                <>
                                    <button
                                        className="modal-back-arrow"
                                        onClick={previousImage}
                                        disabled={isTransitioning}
                                    >
                                        <img
                                            src="/assets/arrow_back.png"
                                            alt="back arrow"
                                        />
                                    </button>
                                    <button
                                        className="modal-forward-arrow"
                                        onClick={nextImage}
                                        disabled={isTransitioning}
                                    >
                                        <img
                                            src="/assets/arrow_forward.png"
                                            alt="forward arrow"
                                        />
                                    </button>
                                </>
                            )}
                        </div>
                        {apartment.pictures.length > 1 && (
                            <div className="modal-indicators">
                                {apartment.pictures.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`modal-indicator ${
                                            index === currentImageIndex
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            handleImageTransition(index)
                                        }
                                        disabled={isTransitioning}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <article className="apartment">
                <h2>{apartment.title[language]}</h2>
                <p>{apartment.location}</p>
                <div className="tags-container">
                    {apartment.tags.map((tag, index) => (
                        <div key={index} className="tag">
                            {tag}
                        </div>
                    ))}
                </div>
                <div className="stars-container">
                    {[...Array(5)].map((_, index) => (
                        <img
                            key={index}
                            src={
                                index < apartment.rating
                                    ? '/assets/star-active.svg'
                                    : '/assets/star-inactive.svg'
                            }
                            alt={
                                index < apartment.rating
                                    ? 'active star'
                                    : 'inactive star'
                            }
                        />
                    ))}
                </div>
                <div className="greater">
                    <div className="greater-container">
                        <span>{apartment.host.name}</span>
                        <img
                            src={apartment.host.picture}
                            alt={apartment.host.name}
                        />
                    </div>
                </div>
            </article>

            <div className="apartment-accordion-container">
                {apartment.description && (
                    <AccordionItem
                        title="Description"
                        baseClass="accordion"
                        id={0}
                        isActive={descriptionActive}
                        setIsActive={setDescriptionActive}
                    >
                        {apartment.description[language]}
                    </AccordionItem>
                )}

                {apartment.equipments && (
                    <AccordionItem
                        title="Equipment"
                        baseClass="accordion"
                        id={1}
                        isActive={equipmentActive}
                        setIsActive={setEquipmentActive}
                    >
                        <ul>{apartment.equipments[language].map(
                            (equipment, index) => (
                                <li key={index}>{equipment}</li>
                                ))}
                            </ul>
                    </AccordionItem>
                )}
            </div>

            <RelatedApts aptId={id} />
        </main>
    );
}

export default Apartment;
