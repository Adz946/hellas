import { useState, useEffect } from "react";
import { getFromStorage } from "@/lib/utils/bookStorage";
import { NumField } from '@/components/bookings/NumField';
import { SearchBar } from "@/components/bookings/SearchBar";
import { ConfirmBtn } from "@/components/bookings/ConfirmBtn";
import { ToggleGroup } from '@/components/bookings/ToggleGroup';
import { MapWithMarker } from "@/components/bookings/MapWithMarker";
import { validateLocationForm } from "@/lib/validation/locationValidator";

export default function SectionLocation({ onAdvance }) {
    const [savedData, setSavedData] = useState(null);
    useEffect(() => { setSavedData(getFromStorage("location")); }, []);

    const [location, setLocation] = useState({ address: "", coordinates: null });
    const [hasUnit, setHasUnit] = useState(null);
    const [unitNum, setUnitNum] = useState(null);
    
    useEffect(() => { 
        if (savedData) { 
            if (savedData.location) { setLocation(savedData.location); }
            if (savedData.hasUnit) { setHasUnit(savedData.hasUnit); }
            if (savedData.unitNum) { setUnitNum(savedData.unitNum); }
        } 
    }, [savedData]);

    const handleLocationChange = (newLocation) => { 
        setLocation(newLocation); 
        setHasUnit(null); 
        setUnitNum(null); 
    };

    const handleValidate = () => {
        const hasError = validateLocationForm({ location, hasUnit, unitNum });
        if (!hasError) { onAdvance(); }
    };

    return (
        <section className="sect">
            <h5 className="h5 text-center">Select Your Event Location</h5>

            <div className="w-full gap-4 flex flex-col justify-center items-center text-center">
                <SearchBar onAddressSelect={handleLocationChange} />
                <MapWithMarker coordinates={location.coordinates} onLocationChange={handleLocationChange} />

                <p className="text-center text-sm text-main"> {location.address ? location.address : ""} </p>
                <p id="location_error" className="hidden text-error text-center"></p>

                {location.address && (
                    <div className="w-full gap-4 flex flex-col items-center">
                        <ToggleGroup id="unit_toggle" title="Does it Have a Unit?" selected={hasUnit} onSelect={setHasUnit} 
                            options={[ { id: "yes", label: "Yes" }, { id: "no", label: "No" } ]} />

                        <p id="unit_toggle_error" className="hidden text-error text-center"></p>

                        {hasUnit === "yes" && (
                            <NumField id="unit_number" label="Unit Number" value={unitNum} min={1} max={120} 
                                onChange={setUnitNum} />
                        )}

                        <p id="unit_input_error" className="hidden text-error text-center"></p>
                    </div>
                )}
            </div>

            <ConfirmBtn section="location" onAdvance={handleValidate} />
        </section>
    );
}