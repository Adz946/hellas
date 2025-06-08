'use client';
import Footer from './Footer';
import MobileFoot from './MobileFoot';
import { useState, useEffect } from 'react';

export default function FootSet() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <footer className="w-full px-5 text-main bg-surface border-t-2 border-inactive">
            {isMobile ? <MobileFoot /> : <Footer /> }
        </footer>
    )
}