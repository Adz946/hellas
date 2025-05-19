'use client';
import { securityVenues } from "@/lib/serviceList";
import { ConfirmBtn } from "@/components/bookings/ConfirmBtn";
import { User, Mail, Phone, ChevronDown } from "lucide-react";
import { InputWithIcon } from "@/components/bookings/InputWithIcon";


export default function SectionContact() {
    return (
        <section className="sect">
            <div className="w-1/2 p-2 gap-4 flex flex-col justify-center">
                <InputWithIcon id="contact_name" placeholder="Name or Company" icon={User} />
                <InputWithIcon id="contact_email" type="email" placeholder="Contact Email" icon={Mail} />
                <InputWithIcon id="contact_mobile" type="tel" placeholder="Contact Number [+61 or 04]" icon={Phone} />

                <div className="relative w-full">
                    <select id="contact_service" className="slc pr-10">
                        {securityVenues.map(({ id, label }) => ( <option key={id} value={id}>{label}</option> ))}
                    </select>

                    <ChevronDown className="chevron" />
                </div>
            </div>  

            <ConfirmBtn section="contact" />
        </section>  
    );  
}