import { Phone, Mail } from 'lucide-react';

function DisplayMobile(textSize) {
    return (
        <a href="tel:0466309744" className="nav-contact hover:text-accent transition-colors">
            <Phone className="w-5 h-5" />
            <p className={textSize}>0466 309 744</p>
        </a>
    );
}

function DisplayEmail(textSize) {
    return (
        <a href="mailto:hellasscrt@gmail.com" className="nav-contact hover:text-accent transition-colors">
            <Mail className="w-5 h-5" />
            <p className={textSize}>hellasscrt@gmail.com</p>
        </a>
    );
}

export default function DisplayContact({classes, textSize}) {
    return ( <div className={classes}> {DisplayMobile(textSize)} {DisplayEmail(textSize)} </div> );
}