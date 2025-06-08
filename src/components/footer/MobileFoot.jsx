import Image from 'next/image';
import SetLogo from '../LogoSet';
import DisplayContact from '../ContactElements';

export default function MobileFoot() {
    return (
        <div className="flex flex-col items-center gap-4 py-5">
            <div className="flex flex-col items-center gap-4">
                <DisplayContact classes={"w-full flex flex-col items-start"} textSize={"text-lg"} />

                <div className='w-full gap-5 flex flex-row items-center'>
                    <SetLogo />

                    <a href="https://www.instagram.com/hellassecurity" target="_blank" rel="noopener noreferrer">
                        <Image src="/images/INSTA.svg" alt="Instagram" width={50} height={50} />
                    </a>
                </div>
            </div>
        </div>
    );
}