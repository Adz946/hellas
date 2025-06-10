import { useState, useEffect } from "react";
import { securityVenues } from "@/lib/serviceList";
import { getFromStorage } from "@/lib/utils/bookStorage";
import { ReviewItem } from "@/components/bookings/ReviewItem";
import { SectionCard } from "@/components/bookings/SectionCards";
import { formatDuration, formatDate, formatMobile, capitalizeString } from "@/lib/utils/formatItems";
import { User, Mail, Phone, Shield, Users, Badge, CakeSlice, Wine, Calendar, Clock, Hourglass, MapPin, ArrowBigUpDash, Home } from "lucide-react";

export default function SectionReview() {
    const [message, setMessage] = useState("");
    const [msgClass, setMsgClass] = useState("hidden");
    const [contactType, setContactType] = useState("Email"); 

    const [contactData, setContactData] = useState(null);
    const [eventData, setEventData] = useState(null);
    const [dateData, setDateData] = useState(null);
    const [timeData, setTimeData] = useState(null);
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        const contactD = getFromStorage("contact");

        setContactData(contactD);
        setContactType(contactD.contact === "email" ? "Email" : "SMS");

        setEventData(getFromStorage("event"));
        setDateData(getFromStorage("date"));
        setTimeData(getFromStorage("time"));
        setLocationData(getFromStorage("location"));
    }, []);

    if (!contactData || !eventData || !dateData || !timeData || !locationData) {
        return (
        <section className="sect">
            <p className="text-error text-xl">Complete Previous Sections Before You Can Submit</p>
        </section>
        );
    }

    const getServiceLabel = (serviceId) => {
        const service = securityVenues.find(venue => venue.id === serviceId);
        return service ? service.label : "Service not selected";
    };

    const submitBooking = async () => {      
        setMsgClass("hidden"); setMessage("");

        try {
            const response = await fetch("/api/send-booking-confirmation", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    type: contactData.contact, 
                    contact: contactData.contact === "email" ? contactData.email : formatMobile(contactData.mobile), 
                    data: {
                        name: contactData.name,
                        service: getServiceLabel(contactData.service),
                        guards: eventData.guard,
                        date: formatDate(dateData.date),
                        start: timeData.start,
                        duration: formatDuration(timeData.duration),
                        location: locationData.location.address
                    }
                })
            })

            if (response.ok) {
                console.info("Booking Confirmation Sent");

                setMsgClass("text-success");
                setMessage(`Booking Confirmed & ${contactType} Sent`);
            } else {
                const error = await response.json();
                console.error(`Failed to send ${contactType} confirmation:`, error); 

                setMsgClass("text-error");
                setMessage(`Failed to send confirmation. Please try again.`);
            }
        }
         catch (error) { 
            console.error('Failed to send confirmation:', error); 

            setMsgClass("text-error");
            setMessage(`An error has occurred, please try again.`);
        }
    }

    return (
        <section className="sect">
            {/* Contact Info */}
            <SectionCard icon={User} title="Contact Information">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <ReviewItem content={contactData.name} label="Name / Company" icon={User} />
                    <ReviewItem content={contactData.email} label="Contact Email" icon={Mail} />
                    <ReviewItem content={contactData.mobile} label="Contact Mobile" icon={Phone} />
                    <ReviewItem content={contactType} label="Contact Method" icon={ArrowBigUpDash} />
                </div>
            </SectionCard>

            {/* Event Details */}
            <SectionCard icon={Badge} title="Event Details">
                <div className={`grid ${eventData.audience === "under 18" ? "xl:grid-cols-3" : "xl:grid-cols-2"} 
                    grid-cols-1 gap-4`}>
                    <ReviewItem content={eventData.guest} label="Guest Count" icon={Users} />
                    <ReviewItem content={eventData.guard} label="Guard Count" icon={Badge} />
                    <ReviewItem content={capitalizeString(eventData.audience)} label="Audience Group" icon={CakeSlice} />
                    {eventData.audience !== "under 18" && (
                        <ReviewItem content={capitalizeString(eventData.alcohol)} label="Alcohol Presence" icon={Wine} />
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
                <div className={`grid grid-cols-1 ${locationData.hasUnit === "yes" ? "xl:grid-cols-4" : ""}`}>
                    <ReviewItem content={locationData.location.address} label="Location" icon={MapPin} 
                        classes="xl:col-span-3" />

                    {locationData.hasUnit === "yes" && (
                        <ReviewItem content={`#${locationData.unitNum}`} label="Unit Number" icon={Home} />
                    )}
                </div>
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

            {/* Submit */}
            <div className="w-full flex flex-col items-center justify-center">
                <button id={`submit_button`} onClick={submitBooking} className='btn animate btn-scale'>Submit Booking</button> 
                <p className={`${msgClass} text-center`}>{message}</p>
            </div>
        </section>
    );
}