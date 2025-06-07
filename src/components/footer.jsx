'use client';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full p-5 text-main bg-surface border-t-2 border-inactive">
            {/* Mobile: Stacked and centered */}
            <div className="flex flex-col items-center gap-4 md:hidden">
                <div className="flex flex-col items-center gap-4">
                    <div className='w-full flex flex-col items-start'>
                        <a href="tel:0466309744" className="flex items-center gap-3 hover:text-accent transition-colors">
                            <Phone className="w-5 h-5" />
                            <p className="text-lg">0466 309 744</p>
                        </a>
                        
                        <a href="mailto:hellasscrt@gmail.com" className="flex items-center gap-3 hover:text-accent transition-colors">
                            <Mail className="w-5 h-5" />
                            <p className="text-lg">hellasscrt@gmail.com</p>
                        </a>
                    </div>

                    <div className='w-full gap-5 flex flex-row items-center'>
                        <Image src={`/images/LOGO.png`} alt="Hellas Security Logo" priority width={100} height={100} />

                        <a href="https://www.instagram.com/hellassecurity" target="_blank" rel="noopener noreferrer">
                            <Image src="/images/INSTA.svg" alt="Instagram" width={50} height={50} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Desktop: Original layout */}
            <div className="hidden md:flex flex-row items-center justify-between">
                <div className="flex items-center">
                    <Image src={`/images/LOGO.png`} alt="Hellas Security Logo" priority width={120} height={120} 
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
                        target="_blank" rel="noopener noreferrer" className="ml-2">
                        <Image src="/images/INSTA.svg" alt="Instagram" width={40} height={40} 
                            className='transform transition-transform duration-300 ease-out hover:scale-110' />
                    </a>
                </div>
            </div>
        </footer>
    );
}