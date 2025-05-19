'use client'
import Image from 'next/image';
import { Navbar } from "./Navbar";
import { useThemeLogo } from '@/lib/getColor';

export function NavSet() {
    const logoColor = useThemeLogo();

    return (
        <div className="w-full h-30 gap-10 flex flex-row justify-between bg-primary">
            <Image src={`/images/LOGO_${logoColor}.png`} alt="Hellas Security Logo" width={120} height={100} priority
                className="h-full aspect-square transform transition-transform duration-300 ease-out hover:scale-110" />

            <Navbar />
        </div>
    );
}