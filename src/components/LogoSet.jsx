import Image from 'next/image';

export default function SetLogo({classes = "", size = 100}) {
    return (
        <a href='/'>
            <Image src={`/images/LOGO.png`} alt="Hellas Security Logo" 
                priority width={size} height={size} className={classes} />
        </a>
    );
}