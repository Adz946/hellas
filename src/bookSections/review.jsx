import { useState, useEffect } from "react";
import { securityVenues } from "@/lib/serviceList";
import { getFromStorage } from "@/lib/utils/bookStorage";
import { ReviewItem } from "@/components/bookings/ReviewItem";
import { formatDuration, formatDate } from "@/lib/utils/formatDuration";
import { User, Mail, Phone, Shield, Users, Badge, CakeSlice, Wine, Calendar, Clock, Hourglass, MapPin } from "lucide-react";

function SectionCard({ icon: Icon, title, children }) {
    return (
        <div className="w-full bg-surface rounded-2xl p-4 mb-4 hover:scale-105 hover:shadow-2xl hover:shadow-back
            transform transition-transform duration-300 ease-out">
            <div className="flex items-center justify-center mb-4 gap-2">
                <Icon className="text-accent w-6 h-6" />
                <h5 className="h5">{title}</h5>
            </div>
            {children}
        </div>
    );
}

export default function SectionReview() {
    const [contactData, setContactData] = useState(null);
    const [eventData, setEventData] = useState(null);
    const [dateData, setDateData] = useState(null);
    const [timeData, setTimeData] = useState(null);
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        setContactData(getFromStorage("contact"));
        setEventData(getFromStorage("event"));
        setDateData(getFromStorage("date"));
        setTimeData(getFromStorage("time"));
        setLocationData(getFromStorage("location"));
    }, []);

    const getServiceLabel = (serviceId) => {
        const service = securityVenues.find(venue => venue.id === serviceId);
        return service ? service.label : "Service not selected";
    };

    if (!contactData || !eventData || !dateData || !timeData || !locationData) {
        return (
        <section className="sect">
            <p className="text-error text-xl">Complete Previous Sections Before You Can Submit</p>
        </section>
        );
    }

    return (
        <section className="sect">
            {/* Contact Info */}
            <SectionCard icon={User} title="Contact Information">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    <ReviewItem content={contactData.name} label="Name / Company" icon={User} />
                    <ReviewItem content={contactData.email} label="Contact Email" icon={Mail} />
                    <ReviewItem content={contactData.mobile} label="Contact Mobile" icon={Phone} />
                </div>
            </SectionCard>

            {/* Event Details */}
            <SectionCard icon={Badge} title="Event Details">
                <div className={`grid ${eventData.audience === "under 18" ? "xl:grid-cols-3" : "xl:grid-cols-2"} 
                    grid-cols-1 gap-4`}>
                    <ReviewItem content={eventData.guest} label="Guest Count" icon={Users} />
                    <ReviewItem content={eventData.guard} label="Guard Count" icon={Badge} />
                    <ReviewItem content={eventData.audience} label="Audience Group" icon={CakeSlice} />
                    {eventData.audience !== "under 18" && (
                        <ReviewItem content={eventData.alcohol} label="Alcohol Presence" icon={Wine} />
                    )}
                </div>
            </SectionCard>

            {/* Date */}
            <SectionCard icon={Calendar} title="Date">
                <ReviewItem content={formatDate(dateData.date)} label="Date" icon={Calendar} />
            </SectionCard>

            {/* Time */}
            <SectionCard icon={Clock} title="Time">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <ReviewItem content={timeData.start} label="Start Time" icon={Clock} />
                    <ReviewItem content={formatDuration(timeData.duration)} label="Duration" icon={Hourglass} />
                </div>
            </SectionCard>

            {/* Location */}
            <SectionCard icon={MapPin} title="Location">
                <ReviewItem content={locationData.location.address} label="Location" icon={MapPin} />
            </SectionCard>

            {/* Service */}
            <SectionCard icon={Shield} title="Service">
                <ReviewItem content={getServiceLabel(contactData.service)} label="Service" icon={Shield} />
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {eventData.securityRoles?.map((role, idx) => (
                        <span key={idx} className="inline-flex items-center px-4 py-1 rounded-full bg-accent/10 text-accent 
                            text-sm font-medium"> <Shield className="mr-2 w-4 h-4" /> {role} </span>
                    ))}
                </div>
            </SectionCard>
        </section>
    );
}