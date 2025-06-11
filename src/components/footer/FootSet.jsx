'use client';
import Footer from './Footer';
import MobileFoot from './MobileFoot';
import { useState, useEffect } from 'react';

function generateCopyright() {
    const currentYear = new Date().getFullYear();
    return `© ${currentYear} Hellas Security. All rights reserved.`;
}

export default function FootSet() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className='w-full flex flex-col bg-back border-t-2 border-inactive'>
            <footer className="w-full px-5 text-main bg-surface">
                {isMobile ? <MobileFoot /> : <Footer /> }
            </footer>
            
            <div className='w-full py-2 text-center border-t-2 border-inactive/25'> 
                <p className='text-main text-md'>{generateCopyright()}</p> 
            </div>
        </div>
    )
}