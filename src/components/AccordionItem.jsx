import { useState, useRef } from 'react';

function AccordionItem({
    title,
    children,
    className = "",
    closeOnBlur = false,
    baseClass = 'accordion',
    id,
    testid
}) {
    const [isActive, setIsActive] = useState(false);
    const buttonRef = useRef(null);
    
    const toggleAccordion = () => {
        setIsActive(!isActive);
    };

    const handleBlur = (e) => {
            if (
                closeOnBlur &&
                !buttonRef.current?.contains(document.activeElement)
        ) {
            setIsActive(false);
        }
    };

    const renderChildren = () => {
        if (typeof children === 'function') {
            return children({ isActive, setIsActive });
        }
        return children;
    };

    return (
        <div
            key={id}
            ref={buttonRef}
            data-testid={testid}
            id={id}
            tabIndex={0}
            role="button"
            className={`${className} ${
                baseClass.includes('about') ? baseClass : `${baseClass}-item`
            } ${isActive ? 'active' : ''}`}
            onBlur={handleBlur}
        >
            <div className={`${baseClass}-header`} onClick={toggleAccordion}>
                <h2>{title}</h2>
                <button>
                    <img src="/assets/arrow.svg" alt="arrow" />
                </button>
            </div>
            <div className={`${baseClass}-body`}>{renderChildren()}</div>
        </div>
    );
}

export default AccordionItem;
