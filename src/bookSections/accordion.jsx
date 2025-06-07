import { ChevronDown, ChevronUp } from "lucide-react";
import { getStateIcon } from "@/lib/utils/menuStates";
import { BookMover } from "@/lib/utils/bookMover";
import { sectionOrder, sectionLabels, SectionComponents } from "@/lib/utils/bookSections";

export default function Accordion({ activeSection, sectionStates, goToSection, advanceFlow }) {
    return (
        <nav className="w-full max-w-md mx-auto my-4 rounded-xl shadow">
            <h3 className="h3 text-center">Your Booking</h3>
            
            <ul className="divide-y divide-back">
                {sectionOrder.map((section) => {
                    const Section = SectionComponents[section];
                    const isOpen = activeSection === section;
                    
                    return (
                        <li key={section}>
                            <button id={`accordion-header-${section}`} type="button"  aria-expanded={isOpen} aria-controls={`accordion-panel-${section}`}
                                className={`w-full flex items-center justify-between px-4 py-3 text-lg font-medium focus:outline-none
                                    ${isOpen ? "text-accent font-bold" : ""}
                                    ${sectionStates[section] === "complete" ? "text-success" : ""}
                                    ${sectionStates[section] === "locked" ? "opacity-50 cursor-not-allowed" : "hover:bg-accent/10 text-main"}`}
                                disabled={sectionStates[section] === "locked"}
                                onClick={() => sectionStates[section] !== "locked" && goToSection(section)}
                            >
                                <span>{sectionLabels[section]}</span>
                                <div className="flex items-center gap-2">
                                    {getStateIcon(sectionStates[section])}
                                    {isOpen ? ( <ChevronUp className="w-5 h-5" aria-hidden="true" /> ) : (
                                        <ChevronDown className="w-5 h-5" aria-hidden="true" /> )}
                                </div>
                            </button>

                            <div id={`accordion-panel-${section}`} role="region" hidden={!isOpen}
                                aria-labelledby={`accordion-header-${section}`}
                                className={`transition-all duration-300 ${isOpen ? "block px-2" : "hidden"}`}>
                                {isOpen && ( <BookMover section={Section} sectionKey={activeSection}
                                        onAdvance={() => advanceFlow(section)} /> )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}