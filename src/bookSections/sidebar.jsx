import { sectionOrder, sectionLabels } from "@/lib/utils/bookSections";
import { getStateIcon, getStateStyles } from "@/components/bookings/menuStates";

export default function Sidebar({ activeSection, sectionStates, goToSection }) {
    return (
        <aside className="b-menu py-5 min-w-[250px] max-w-[300px]">
            <h3 className="h3 text-center">Your Booking</h3>

            {sectionOrder.map((section) => (
                <button key={section} onClick={() => sectionStates[section] !== "locked" && goToSection(section)}
                    disabled={sectionStates[section] === "locked"} className={getStateStyles(sectionStates[section], 
                    activeSection === section)} >
                    <span>{sectionLabels[section]}</span>
                    {getStateIcon(sectionStates[section])}
                </button>
            ))}
        </aside>
    );
}