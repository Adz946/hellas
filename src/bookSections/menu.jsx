'use client';
import { useEffect, useState } from 'react';
import { Check, Lock, Unlock } from 'lucide-react';

const sectionOrder = ['contact', 'event', 'date', 'time', 'location', 'review'];

function getIcon(state) {
    switch (state) {
        case "locked":
            return <Lock className="w-5 h-5" />
        case "current":
            return <Unlock className="w-5 h-5" />
        case "complete":
            return <Check className="w-5 h-5" />
    }
}

function stateColor(state) {
    switch (state) {
        case "locked":
            return "text-inactive"
        case "current":
            return "text-active"
        case "complete":
            return "text-success"
    }
}

export default function BookMenu() {
    const [sectionStates, setSectionStates] = useState({});

    useEffect(() => {
        const stored = sessionStorage.getItem('bookingStates');

        if (stored) { setSectionStates(JSON.parse(stored)); } 
        else {
            const initialState = {};
            sectionOrder.forEach((s, idx) => {
                initialState[s] = idx === 0 ? 'current' : 'locked';
            });
            setSectionStates(initialState);
            sessionStorage.setItem('bookingStates', JSON.stringify(initialState));
        }
    }, []);

    return (
        <aside className="b-menu">
            <h2 className="h2 text-center">Your Booking</h2>
            
            {sectionOrder.map((section) => {
                const state = sectionStates[section];
                const icon = getIcon(state);
                const colorClass = stateColor(state);

                return (    
                    <div key={section} className="flex flex-row items-center justify-between w-full px-10">
                        <p id={`${section}_section`} className={`text-lg mb-2 ${colorClass}`}>
                            {section.charAt(0).toUpperCase() + section.slice(1)} </p>
                        {icon && <span className={`ml-2 ${colorClass}`}>{icon}</span>}
                    </div>
                );
            })}
        </aside>
    );
}