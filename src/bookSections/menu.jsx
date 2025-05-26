import { MenuBtn } from '@/components/bookings/MenuBtn';
const sectionOrder = ['contact', 'event', 'date', 'time', 'location', 'review'];

export default function BookMenu({ activeSection, setActiveSection, sectionStates }) {
    return (
        <aside className="b-menu">
            <h2 className="h2 text-center">Your Booking</h2>

            {sectionOrder.map((section) => (
                <MenuBtn key={section} section={section} state={sectionStates[section]}
                    isActive={activeSection === section} onSelect={setActiveSection} />
            ))}
        </aside>
    );
}