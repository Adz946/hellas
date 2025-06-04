import { useState, useEffect } from 'react';
import { getFromStorage } from '@/lib/utils/bookStorage';
import { NumField } from '@/components/bookings/NumField';
import { ConfirmBtn } from "@/components/bookings/ConfirmBtn";
import { ToggleGroup } from '@/components/bookings/ToggleGroup';
import { RoleSelector } from '@/components/bookings/RoleSelector';
import { validateEventForm } from '@/lib/validation/eventValidator';

export default function SectionEvent({ onAdvance }) {
    const [savedData, setSavedData] = useState(null);
    useEffect(() => { setSavedData(getFromStorage("event")); }, []);

    const [guest, setGuest] = useState(null);
    const [guard, setGuard] = useState(null);
    const [audience, setAudience] = useState(null); 
    const [alcohol, setAlcohol] = useState(null);
    const [securityRoles, setRoles] = useState([]);

    useEffect(() => {
        if (savedData) {
            if (savedData.guest) { setGuest(savedData.guest); }
            if (savedData.guard) { setGuard(savedData.guard); }
            if (savedData.audience) { setAudience(savedData.audience); }

            if (savedData.audience === "under 18") { setAlcohol("no"); } 
            else if (savedData.alcohol) { setAlcohol(savedData.alcohol); }

            if (savedData.securityRoles) { setRoles(savedData.securityRoles); }
        }
    }, [savedData]);

    const handleAudienceSelect = (group) => {
        setAudience(group);
        if (group === "under 18") { setAlcohol("no"); } 
        else { setAlcohol(null); }
    };  

    const handleValidate = () => {
        const hasError = validateEventForm({ guest, guard, audience, alcohol, securityRoles });
        if (!hasError) { onAdvance(); }
    };

    return (
        <section className="sect">
            <div className="w-1/2 p-2 gap-4 flex flex-col justify-center">
                <h5 className="h5 text-center">Guests & Guards</h5>
                <div className="w-full flex flex-row justify-center">
                    <NumField id="guest_count" label="Guest Count" value={guest} onChange={setGuest} />
                    <NumField id="guard_count" label="Guard Count" max={15} min={2} value={guard} onChange={setGuard} />
                </div>

                <div className="w-full p-2 flex flex-row justify-center">
                    <ToggleGroup id="audience_toggle" title="Audience Group" selected={audience} onSelect={handleAudienceSelect}
                        options={[ { id: "under 18", label: "- 18" }, { id: "over 18", label: "+ 18" }, ]} />

                    {audience === "under 18" ? (
                        <div className="w-1/2 gap-3 flex flex-col text-center items-center">
                            <h5 className="h5 w-full">Alcohol Presence</h5>
                            <p className="text-center text-sm text-primary w-3/4 bg-inactive rounded-xl p-2">
                                ⚠️ For this age group, alcohol service is automatically disabled in line with current event regulations.
                            </p>
                        </div>
                    ) : ( <ToggleGroup id="alcohol_toggle" title="Alcohol Presence" selected={alcohol} onSelect={setAlcohol}
                            options={[ { id: "yes", label: "Yes" }, { id: "no", label: "No" }, ]} /> )}
                </div>

                <RoleSelector selected={securityRoles} onChange={setRoles} />
            </div>  

            <ConfirmBtn section="event" onAdvance={handleValidate} />
        </section>  
    );  
}