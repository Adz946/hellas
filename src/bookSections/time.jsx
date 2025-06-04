import { useState, useEffect } from "react";
import { getFromStorage } from '@/lib/utils/bookStorage';
import { TimeInput } from "@/components/bookings/TimeInput";
import { ConfirmBtn } from "@/components/bookings/ConfirmBtn";
import { TimeDuration } from "@/components/bookings/TimeDuration";
import { validateTimeForm } from "@/lib/validation/timeValidator";

export default function SectionTime({ onAdvance }) {
    const [savedData, setSavedData] = useState(null);
    useEffect(() => { setSavedData(getFromStorage("time")); }, []);

    const [start, setStart] = useState("");
    const [duration, setDuration] = useState(0);
    const [initialStack, setInitialStack] = useState([]);

    useEffect(() => {
        if (savedData) {
            if (savedData.start) { setStart(savedData.start); }
                
            if (savedData.duration) {
                setDuration(savedData.duration);
                
                const stack = [];
                let remaining = savedData.duration;
                const blocks = [120, 60, 30, 15];
                for (const block of blocks) {
                    while (remaining >= block) {
                        stack.push(block);
                        remaining -= block;
                    }
                }
                setInitialStack(stack);
            }
        }
    }, [savedData]);

    const validate = () => {
        const hasError = validateTimeForm({ start, duration });
        if (!hasError) { onAdvance(); }
    };

    const handleDurationChange = (newDuration) => { setDuration(newDuration); };

    return (
        <section className="sect">
            <h5 className="h5 text-center">Select Start Time</h5>

            <div className="w-1/2 flex flex-col gap-3">
                <TimeInput id="start_time" value={start} onChange={setStart} placeholder="11:00 AM" />
                <TimeDuration initialStack={initialStack} onChange={handleDurationChange} />
            </div>

            <ConfirmBtn section="time" onAdvance={validate} />
        </section>
    );
}