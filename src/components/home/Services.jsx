import { serviceCategories } from '@/lib/serviceList';

function ServiceItem({ text_1, text_2, icon }) {
    return (
        <div className='w-full pb-3 flex flex-col md:flex-row md:justify-evenly md:items-center'>
            {/* Mobile: Stacked layout with center alignment */}
            <div className="flex flex-col items-center gap-2 md:hidden">
                <span className="text-center scale-125 text-2xl">{icon}</span>
                <p className="p text-center font-medium">{text_1}</p>
                <p className="p text-center">{text_2}</p>
            </div>
            
            {/* Desktop: Original horizontal layout */}
            <div className="hidden md:flex md:w-full md:justify-evenly md:items-center">
                <p className="p text-right w-2/5">{text_1}</p>
                <span className="text-center scale-150">{icon}</span>
                <p className="p text-left w-2/5">{text_2}</p>
            </div>
        </div>
    );
}

export default function ServiceBlock() {
    return (
        <div className='w-full space-y-1 md:space-y-0'>
            {serviceCategories.map(({ labels, icon }, index) => (
                <ServiceItem key={index} text_1={labels[0]} text_2={labels[1]} icon={icon} />
            ))}
        </div>
    );
}