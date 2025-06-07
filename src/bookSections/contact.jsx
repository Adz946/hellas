import { useState, useEffect } from 'react';
import { securityVenues } from "@/lib/serviceList";
import { getFromStorage } from '@/lib/utils/bookStorage';
import { ConfirmBtn } from "@/components/bookings/ConfirmBtn";
import { User, Mail, Phone, ChevronDown } from "lucide-react";
import { InputWithIcon } from "@/components/bookings/InputWithIcon";
import { validateContactForm } from "@/lib/validation/contactValidator";

export default function SectionContact({ onAdvance }) {
    const [savedData, setSavedData] = useState(null);
    useEffect(() => { setSavedData(getFromStorage("contact")); }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [service, setService] = useState("");

    useEffect(() => {
        if (savedData) {
            if (savedData.name) { setName(savedData.name); }
            if (savedData.email) { setEmail(savedData.email); }
            if (savedData.mobile) { setMobile(savedData.mobile); }
            if (savedData.service) { setService(savedData.service); }
        }
    }, [savedData]);

    const handleValidate = () => {
        const hasError = validateContactForm({ name, email, mobile, service });
        if (!hasError) { onAdvance(); }
    };

    return (
        <section className="sect">
            <div className="w-full xl:w-1/2 p-2 gap-4 flex flex-col justify-center">
                <InputWithIcon id="contact_name" placeholder="Full Name or Company" 
                    icon={User} savedInfo={name} onChange={setName} />
                <InputWithIcon id="contact_email" type="email" placeholder="Contact Email" 
                    icon={Mail} savedInfo={email} onChange={setEmail} />
                <InputWithIcon id="contact_mobile" type="tel" placeholder="Contact Number [+61 or 04]"  
                    icon={Phone} savedInfo={mobile} onChange={setMobile} />

                <div className="relative w-full">
                    <select id="contact_service" className="slc pr-10"  value={service || ""} 
                        onChange={(e) => setService(e.target.value)}>
                        <option value="">Select a service</option>
                        {securityVenues.map(({ id, label }) => ( <option key={id} value={id}>{label}</option> ))}
                    </select>

                    <ChevronDown className="chevron" />
                    <p id="contact_service_error" className="hidden text-error text-center"></p>
                </div>
            </div>  

            <ConfirmBtn section="contact" onAdvance={handleValidate} />
        </section>  
    );  
}