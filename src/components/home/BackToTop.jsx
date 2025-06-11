'use client';
import { useState, useEffect } from 'react';
import { ArrowBigUpDash } from 'lucide-react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => { setIsVisible(window.pageYOffset > 300); };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

    return (
        <> {isVisible && (
            <button onClick={scrollToTop} aria-label="Back To Top" className={`btn-top flex flex-col items-center 
                justify-center rounded-2xl animate btn-top-scale`}> <ArrowBigUpDash /> <p>Top</p> </button>
        )} </>
    );
}