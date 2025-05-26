import { useState, useEffect } from 'react';
import { securityVenues } from "@/lib/serviceList";
import { ConfirmBtn } from "@/components/bookings/ConfirmBtn";
import { User, Mail, Phone, ChevronDown } from "lucide-react";
import { InputWithIcon } from "@/components/bookings/InputWithIcon";
import { validateContactForm } from "@/lib/validation/contactValidator";

export default function SectionContact({ onAdvance }) {
    const [savedData, setSavedData] = useState(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("contact_data");
        if (stored) {
            try {
                const [data] = JSON.parse(stored); 
                setSavedData(data);
            } catch (err) { console.warn("Invalid contact_data in sessionStorage:", err); }
        }
    }, []);

    useEffect(() => {
        if (savedData?.service) {
            const select = document.getElementById("contact_service");
            if (select) select.value = savedData.service;
        }
    }, [savedData]);

    const handleValidate = () => {
        const hasError = validateContactForm();
        console.log(`Error Status: ${hasError}`);
        if (!hasError) { onAdvance(); }
    };

    return (
        <section className="sect">
            <div className="w-1/2 p-2 gap-4 flex flex-col justify-center">
                <InputWithIcon id="contact_name" placeholder="Name or Company" 
                    icon={User} savedInfo={savedData?.name} />
                <InputWithIcon id="contact_email" type="email" placeholder="Contact Email" 
                    icon={Mail} savedInfo={savedData?.email} />
                <InputWithIcon id="contact_mobile" type="tel" placeholder="Contact Number [+61 or 04]"  
                    icon={Phone} savedInfo={savedData?.mobile} />

                <div className="relative w-full">
                    <select id="contact_service" className="slc pr-10">
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