'use client';
import { useState, useEffect } from 'react';
const sectionOrder = ['contact', 'event', 'date', 'time', 'location', 'review'];

export function useBookingFlow() {
    const [activeSection, setActiveSection] = useState('contact');
    const [sectionStates, setSectionStates] = useState({});
    const [returnTarget, setReturnTarget] = useState(null);

    useEffect(() => {
        const storedStates = sessionStorage.getItem('bookingStates');
        const storedActive = sessionStorage.getItem('activeSection');
        const storedReturnTarget = sessionStorage.getItem('returnTarget');

        if (storedStates) { 
            setSectionStates(JSON.parse(storedStates)); 
        } else {
            const initial = {};
            sectionOrder.forEach((s, i) => { initial[s] = i === 0 ? 'current' : 'locked'; });
            setSectionStates(initial);
            sessionStorage.setItem('bookingStates', JSON.stringify(initial));
        }

        if (storedActive) { setActiveSection(storedActive); }
        if (storedReturnTarget) { setReturnTarget(storedReturnTarget); }
    }, []);

    const goToSection = (section) => {
        const currentIndex = sectionOrder.indexOf(activeSection);
        const targetIndex = sectionOrder.indexOf(section);
        
        // If going backwards to fix a previous section, set return target
        if (targetIndex < currentIndex && sectionStates[activeSection] === 'current') {
            setReturnTarget(activeSection);
            sessionStorage.setItem('returnTarget', activeSection);
        }
        
        setActiveSection(section);
        sessionStorage.setItem('activeSection', section);
    };

    const advanceFlow = (fromSection) => {
        const currentIndex = sectionOrder.indexOf(fromSection);
        if (currentIndex < 0) return;

        const normalNextSection = sectionOrder[currentIndex + 1];
        let toSection = normalNextSection;
        
        if (returnTarget && normalNextSection) {
            const returnIndex = sectionOrder.indexOf(returnTarget);
            const normalNextIndex = sectionOrder.indexOf(normalNextSection);
            
            if (returnIndex > normalNextIndex) {
                toSection = returnTarget;
                setReturnTarget(null);
                sessionStorage.removeItem('returnTarget');
            }
        }
        
        if (!toSection) return; 
        
        const updated = {
            ...sectionStates,
            [fromSection]: 'complete',
            [toSection]: 'current',
        };

        setSectionStates(updated);
        sessionStorage.setItem('bookingStates', JSON.stringify(updated));
        goToSection(toSection);
    };

    return {
        activeSection,
        sectionStates,
        goToSection,
        advanceFlow,
    };
}