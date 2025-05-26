'use client';
import { AnimatePresence, motion } from 'framer-motion';

import { useBookingFlow } from './BookManager';
import BookMenu from '@/bookSections/menu';
import SectionContact from '@/bookSections/contact'; 
import SectionEvent from '@/bookSections/event';
import SectionDate from '@/bookSections/date';
import SectionTime from '@/bookSections/time';

export default function Book() {
    const { activeSection, sectionStates, goToSection, advanceFlow } = useBookingFlow();

    const renderSection = () => {
        const SectionComponent = (() => {
            switch (activeSection) {
                case 'contact':
                    return <SectionContact onAdvance={() => advanceFlow('contact')} />;
                case 'event':
                    return <SectionEvent onAdvance={() => advanceFlow('event')} />;
                case 'date':
                    return <SectionDate onAdvance={() => advanceFlow('date')} />;
                case 'time':
                    return <SectionTime onAdvance={() => advanceFlow('time')} />;
                default:
                    return <div className="p-4">Not yet implemented.</div>;
            }
        })();

        return (
            <motion.div key={activeSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }} className="w-full">
                {SectionComponent}
            </motion.div>
        );
    };

    return (
        <main className="flex-grow bg-primary text-main flex flex-row">
            <BookMenu activeSection={activeSection} setActiveSection={goToSection} sectionStates={sectionStates} />
            <AnimatePresence mode="wait"> {renderSection()} </AnimatePresence>
        </main>
    );
}