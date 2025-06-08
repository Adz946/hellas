import Image from 'next/image';
import SetLogo from '../LogoSet';
import DisplayContact from '../ContactElements';

export default function Footer() {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex items-center">
                <SetLogo classes={'h-full aspect-square animate img-scale'} />
            </div>

            <div className="flex flex-row items-center gap-5 text-sm">
                <DisplayContact classes={"flex flex-col"} textSize={"text-lg"} />

                <a href="https://www.instagram.com/hellassecurity"
                    target="_blank" rel="noopener noreferrer" className="ml-2">
                    <Image src="/images/INSTA.svg" alt="Instagram" width={40} height={40} 
                        className='h-full aspect-square animate icon-scale' />
                </a>
            </div>
        </div>
    )
}