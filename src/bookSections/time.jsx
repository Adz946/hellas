import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { formatDuration } from '@/lib/utils/formatDuration';
import { ConfirmBtn } from '@/components/bookings/ConfirmBtn';
import { validateTimeForm } from '@/lib/validation/timeValidator';
import { InputWithIcon } from '@/components/bookings/InputWithIcon';

export default function SectionTime({ onAdvance }) {
    const [startTime, setStartTime] = useState('');
    const [modStack, setModStack] = useState([]);

    // Load saved data
    useEffect(() => {
        const stored = sessionStorage.getItem("time_data");
        if (stored) {
            try {
                const [data] = JSON.parse(stored);
                if (data?.start) setStartTime(data.start);
                if (data?.duration) {
                    const stack = [];
                    let remaining = data.duration;
                    const known = [120, 60, 30, 15];
                    for (const block of known) {
                        while (remaining >= block) {
                            stack.push(block);
                            remaining -= block;
                        }
                    }
                    setModStack(stack);
                }
            } catch (err) {
                console.warn("Invalid time_data in sessionStorage:", err);
            }
        }
    }, []);

    const totalDuration = modStack.reduce((sum, m) => sum + m, 0);
    const addDuration = (amount) => setModStack(prev => [...prev, amount]);

    const handleClear = () => {
        sessionStorage.setItem("cleared_mins", JSON.stringify(modStack));
        setModStack([]);
    };

    const handleUndo = () => {
        if (modStack.length > 0) {
            setModStack(prev => prev.slice(0, -1));
        } else {
            const stored = sessionStorage.getItem("cleared_mins");
            if (stored) {
                try {
                    const recovered = JSON.parse(stored);
                    if (Array.isArray(recovered) && recovered.length > 0) {
                        setModStack(recovered);
                        sessionStorage.removeItem("cleared_mins");
                    }
                } catch (err) {
                    console.warn("Invalid cleared_mins data:", err);
                }
            }
        }
    };

    const handleValidate = () => {
        const hasError = validateTimeForm({ start: startTime, duration: totalDuration });
        if (!hasError) { onAdvance(); }
    };

    return (
        <section className="sect flex flex-col items-center justify-center gap-6">
            <h5 className="h5 text-center">Select Start Time</h5>

            <div className="w-1/2 flex flex-col gap-3">
                <InputWithIcon id="start_time" type="time" placeholder="Start Time" icon={Clock} savedInfo={startTime} />

                <div className="w-full my-4 flex flex-col lg:flex-row gap-2 items-center justify-center text-main">
                    <p className="text-main text-lg">Duration</p>
                    <p className="bg-surface text-main px-4 py-2 rounded-md text-sm text-center">
                        {formatDuration(totalDuration)}
                    </p>
                </div>

                <div className="grid grid-rows-3 lg:grid-rows-none lg:grid-cols-3 gap-2">
                    <div className='grid grid-cols-2 lg:grid-cols-none lg:grid-rows-2 gap-2'>
                        <button onClick={() => addDuration(15)} className="btn-tr btn-time btn-tr-hover">+ 15min</button>
                        <button onClick={() => addDuration(30)} className="btn-tr btn-time btn-tr-hover">+ 30min</button>
                    </div>

                    <div className='grid grid-cols-2 lg:grid-cols-none lg:grid-rows-2 gap-2'>
                        <button onClick={() => addDuration(60)} className="btn-tr btn-time btn-tr-hover">+ 1hr</button>
                        <button onClick={() => addDuration(120)} className="btn-tr btn-time btn-tr-hover">+ 2hr</button>
                    </div>

                    <div className='grid grid-cols-2 lg:grid-cols-none lg:grid-rows-2 gap-2'>
                        <button onClick={handleClear} className="btn-tr btn-rem btn-tr-hover">CLEAR</button>
                        <button onClick={handleUndo} className="btn-tr btn-rem btn-tr-hover">UNDO</button>
                    </div>
                </div>
                
                <p id={`duration_time_error`} className="hidden text-error text-center"></p>
            </div>

            <ConfirmBtn section="time" onAdvance={handleValidate} />
        </section>
    );
}
