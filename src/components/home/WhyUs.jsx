import { reasonCategories } from '@/lib/serviceList';

export default function WhyBlock() {
    return (
        <div className='w-full'>
            {reasonCategories.map((text, index) => (
                <p key={index} className="w-full p py-2">{text}</p>
            ))}
        </div>
    );
}