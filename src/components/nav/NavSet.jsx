'use client'
import SetLogo from '../LogoSet';
import { Navbar } from "./Navbar";
import { Navblock } from "./Navblock";
import { useState, useEffect } from 'react';

export default function NavSet() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="w-full h-30 gap-10 flex flex-row justify-between bg-primary border-b-1 border-primary">
            <SetLogo classes={"h-full aspect-square animate img-scale"} wd={isMobile ? 200 : 150} ht={isMobile ? 150 : 200} />
            {isMobile ? <Navblock /> : <Navbar />}
        </div>
    );
}