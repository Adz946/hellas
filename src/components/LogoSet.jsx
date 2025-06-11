import Image from 'next/image';

export default function SetLogo({classes = "", wd = 100, ht = 100}) {
    return (
        <a href='/'>
            <Image src={`/images/LOGO.png`} alt="Hellas Security Logo" 
                priority width={wd} height={ht} className={classes} />
        </a>
    );
}