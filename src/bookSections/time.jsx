import { useState, useEffect } from "react";
import { TimeInput } from "@/components/bookings/TimeInput";
import { ConfirmBtn } from "@/components/bookings/ConfirmBtn";
import { TimeDuration } from "@/components/bookings/TimeDuration";
import { validateTimeForm } from "@/lib/validation/timeValidator";

export default function SectionTime({ onAdvance }) {
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState(0);
    const [initialStack, setInitialStack] = useState([]);

    useEffect(() => {
        const stored = sessionStorage.getItem("time_data");
        if (stored) {
            try {
                const [data] = JSON.parse(stored);
                if (data?.start) { setStartTime(data.start); }
                
                if (data?.duration) {
                    setDuration(data.duration);
                    
                    const stack = [];
                    let remaining = data.duration;
                    const blocks = [120, 60, 30, 15];
                    for (const block of blocks) {
                        while (remaining >= block) {
                            stack.push(block);
                            remaining -= block;
                        }
                    }
                    setInitialStack(stack);
                }
            } catch (err) { console.warn("Invalid time_data:", err); }
        }
    }, []);

    const validate = () => {
        const hasError = validateTimeForm({ start: startTime, duration: duration });
        if (!hasError) { onAdvance(); }
    };

    const handleDurationChange = (newDuration) => { setDuration(newDuration); };

    return (
        <section className="sect flex flex-col items-center justify-center gap-6">
            <h5 className="h5 text-center">Select Start Time</h5>

            <div className="w-1/2 flex flex-col gap-3">
                <TimeInput id="start_time" value={startTime} onChange={setStartTime} placeholder="11:00 AM" />
                <TimeDuration initialStack={initialStack} onChange={handleDurationChange} />
            </div>

            <ConfirmBtn section="time" onAdvance={validate} />
        </section>
    );
}