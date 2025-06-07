'use client';
import { useState, useEffect } from "react";
import { useBookingFlow } from "./BookManager";
import Sidebar from "@/bookSections/sidebar";
import Accordion from "@/bookSections/accordion";
import { BookMover } from "@/lib/utils/bookMover";
import { SectionComponents } from "@/lib/utils/bookSections";

export default function Book() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { activeSection, sectionStates, goToSection, advanceFlow, } = useBookingFlow();

    return (
        <main className="flex-grow bg-primary text-main">
            {isMobile ? (
                <div className="flex flex-col">
                    <Accordion activeSection={activeSection} sectionStates={sectionStates} goToSection={goToSection} 
                        advanceFlow={advanceFlow} />
                </div>
            ) : (
                <div className="flex flex-row">
                    <Sidebar activeSection={activeSection} sectionStates={sectionStates} goToSection={goToSection} />
                    <div className="flex-grow">
                        <BookMover section={SectionComponents[activeSection]} activeSection={activeSection}
                            onAdvance={() => advanceFlow(activeSection)} />
                    </div>
                </div>
            )}
        </main>
    );
}