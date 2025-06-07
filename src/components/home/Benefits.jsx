import { CheckSquare } from 'lucide-react';
import { benefitCategories } from '@/lib/serviceList';

function BenefitItem({ item_1, item_2 }) {
    return (
        <div className="w-full pb-2 md:gap-4 flex flex-col md:flex-row items-center">
            <div className='w-1/2 gap-2 flex flex-row-reverse justify-end md:flex-row'>
                <p className='p'>{item_1}</p>
                <CheckSquare className='w-5 h-5 text-success' />
            </div>

            <div className='w-1/2 gap-2 flex flex-row md:justify-start'>
                <CheckSquare className='w-5 h-5 text-success' />
                <p className='p'>{item_2}</p>
            </div>
        </div>
    );
}

export default function BenefitBlock() {
    return (
        <div className='w-full'>
            {benefitCategories.map(([item_1, item_2], index) => (
                <BenefitItem key={index} item_1={item_1} item_2={item_2} />
            ))}
        </div>
    );
}