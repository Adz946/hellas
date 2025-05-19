import { CheckSquare } from 'lucide-react';

export function InfoRow({text_1, text_2}) {
    return (
        <div className="w-full flex flex-row gap-15 justify-center">
            <div className='w-1/2 flex flex-row gap-5 justify-end'>
                <p className='p'>{text_1}</p>
                <CheckSquare />
            </div>

            <div className='w-1/2 flex flex-row gap-5 justify-start'>
                <CheckSquare />
                <p className='p'>{text_2}</p>
            </div>
        </div>
    );
}