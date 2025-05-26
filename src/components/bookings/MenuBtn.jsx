import { Check, Lock, Unlock } from 'lucide-react';

function getIcon(state) {
    switch (state) {
        case 'locked': return <Lock className="w-5 h-5 stroke-accent" />;
        case 'current': return <Unlock className="w-5 h-5 stroke-accent" />;
        case 'complete': return <Check className="w-5 h-5 stroke-accent" />;
        default: return null;
    }
}

function getColorClass(state) {
    switch (state) {
        case 'locked': return 'text-inactive';
        case 'current': return 'text-active';
        case 'complete': return 'text-success';
        default: return '';
    }
}

export function MenuBtn({ section, state, isActive, onSelect }) {
    const icon = getIcon(state);
    const colorClass = getColorClass(state);
    const isLocked = state === 'locked';

    const handleClick = () => {
        if (!isLocked) onSelect(section);
    };

    return (
        <div className="flex flex-row items-center justify-between w-full px-10">
            <button
                id={`${section}_section`}
                onClick={handleClick}
                disabled={isLocked}
                aria-disabled={isLocked}
                className={`
                    text-left text-lg mb-2 p-0 border-0 bg-transparent 
                    ${colorClass} 
                    ${isLocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} 
                    ${isActive ? 'underline' : ''}
                `}
            >
                {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>

            {icon && <span className={`ml-2`}>{icon}</span>}
        </div>
    );
}