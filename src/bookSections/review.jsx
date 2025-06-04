import { useState, useEffect } from "react";
import { securityVenues } from "@/lib/serviceList";
import { getFromStorage } from "@/lib/utils/bookStorage";
import { ReviewItem } from "@/components/bookings/ReviewItem";
import { formatDuration, formatDate } from "@/lib/utils/formatDuration";
import { User, Mail, Phone, Shield, Users, Badge, CakeSlice, Wine, Calendar, Clock, Hourglass, MapPin } from "lucide-react";

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
        )
    }

    return (
        <section className="sect">
            <h5 className="h5">Contact Info</h5>
            <div className="w-full px-2 mb-6 gap-2 flex flex-col lg:flex-row justify-center items-center">
                <ReviewItem content={contactData.name} label={"Name / Company"} icon={User} width={"w-1/3"} />
                <ReviewItem content={contactData.email} label={"Contact Email"} icon={Mail} width={"w-1/3"} />
                <ReviewItem content={contactData.mobile} label={"Contact Mobile"} icon={Phone} width={"w-1/3"} />
            </div>

            <h5 className="h5">Event Details</h5>
            <div className="w-full px-2 mb-6 gap-2 flex flex-col lg:flex-row justify-center items-center">
                <ReviewItem content={eventData.guest} label={"Guest Count"} icon={Users} 
                    width={eventData.audience === "under 18" ? "w-1/3" : "w-1/4"}  />
                <ReviewItem content={eventData.guard} label={"Guard Count"} icon={Badge}
                    width={eventData.audience === "under 18" ? "w-1/3" : "w-1/4"}  />
                <ReviewItem content={eventData.audience} label={"Audience Group"} icon={CakeSlice} 
                    width={eventData.audience === "under 18" ? "w-1/3" : "w-1/4"}  />

                {eventData.audience !== "under 18" && (
                    <ReviewItem content={eventData.alcohol} label={"Alcohol Presence"} icon={Wine} width={"w-1/4"} />
                )}
            </div>

            <h5 className="h5">Date / Time</h5>
            <div className="w-full px-2 mb-6 gap-2 flex flex-col lg:flex-row justify-center items-center">
                <ReviewItem content={formatDate(dateData.date)} label={"Date"} icon={Calendar} width={"w-1/3"} />
                <ReviewItem content={timeData.start} label={"Start Time"} icon={Clock} width={"w-1/3"} />
                <ReviewItem content={formatDuration(timeData.duration)} label={"Duration"} icon={Hourglass} width={"w-1/3"} />
            </div>

            <h5 className="h5">Location</h5>
            <div className="w-full px-2 mb-6 gap-2 flex flex-col lg:flex-row justify-center items-center">
                <ReviewItem content={locationData.location.address} label={"Location"} icon={MapPin} width={"w-3/4"} />
            </div>

            <h5 className="h5">Service</h5>
            <div className="w-full px-2 mb-6 gap-4 flex flex-col justify-center items-center">
                <ReviewItem content={getServiceLabel(contactData.service)} label={"Service"} icon={Shield} width={"w-3/4"} />

                <div className="w-full flex flex-wrap justify-center gap-4">
                    {eventData.securityRoles.map((role, index) => (
                        <span key={index} className="w-full md:w-80 py-2 bg-surface text-main text-md text-center rounded-xl">
                            {role}</span>
                    ))}
                </div>
            </div>
        </section>
    )
}