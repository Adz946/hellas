'use client';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';
import { useThemeLogo } from '@/lib/getColor';

export function Footer() {
    const logoColor = useThemeLogo();

    return (
        <footer className="w-full px-5 text-main flex flex-row items-center justify-between bg-surface border-t-2 border-inactive">
            <div className="flex items-center">
                <Image src={`/images/LOGO_${logoColor}.png`} alt="Hellas Security Logo" priority width={120} height={120} 
                    className='transform transition-transform duration-300 ease-out hover:scale-110' />
            </div>

            <div className="flex flex-row items-center gap-5 text-sm">
                <div className="flex flex-col">
                    <div className='flex flex-row gap-4 justify-end'>
                        <p className="p">0466 309 744</p>
                        <Phone />
                    </div>

                    <div className='flex flex-row gap-4 justify-end'>
                        <p className="p">hellasscrt@gmail.com</p>
                        <Mail />
                    </div>
                </div>

                <a href="https://www.instagram.com/hellassecurity"
                    target="_blank" rel="noopener noreferrer" className="ml-2" >
                    <Image src="/images/INSTA.svg" alt="Instagram" width={40} height={40} 
                        className='transform transition-transform duration-300 ease-out hover:scale-110' />
                </a>
            </div>
        </footer>
    );
}