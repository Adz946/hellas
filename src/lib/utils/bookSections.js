import SectionContact from "@/bookSections/contact";
import SectionEvent from "@/bookSections/event";
import SectionDate from "@/bookSections/date";
import SectionTime from "@/bookSections/time";
import SectionLocation from "@/bookSections/location";
import SectionReview from "@/bookSections/review";

export const sectionOrder = ['contact', 'event', 'date', 'time', 'location', 'review'];

export const sectionLabels = {
    contact: "Contact",
    event: "Event",
    date: "Date",
    time: "Time",
    location: "Location",
    review: "Review"
};

export const SectionComponents = {
    contact: SectionContact,
    event: SectionEvent,
    date: SectionDate,
    time: SectionTime,
    location: SectionLocation,
    review: SectionReview
};