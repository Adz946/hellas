'use client';
import { useState, useEffect } from 'react';

const sectionOrder = ['contact', 'event', 'date', 'time', 'location', 'review'];

export function useBookingFlow() {
    const [activeSection, setActiveSection] = useState('contact');
    const [sectionStates, setSectionStates] = useState({});

    useEffect(() => {
        const storedStates = sessionStorage.getItem('bookingStates');
        const storedActive = sessionStorage.getItem('activeSection');

        if (storedStates) { setSectionStates(JSON.parse(storedStates)); } 
        else {
            const initial = {};
            sectionOrder.forEach((s, i) => { initial[s] = i === 0 ? 'current' : 'locked'; });
            setSectionStates(initial);
            sessionStorage.setItem('bookingStates', JSON.stringify(initial));
        }

        if (storedActive) { setActiveSection(storedActive); }
    }, []);

    const goToSection = (section) => {
        setActiveSection(section);
        sessionStorage.setItem('activeSection', section);
    };

    const advanceFlow = (fromSection) => {
        const currentIndex = sectionOrder.indexOf(fromSection);
        if (currentIndex < 0 || currentIndex + 1 >= sectionOrder.length) return;

        const toSection = sectionOrder[currentIndex + 1];

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