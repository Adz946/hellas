import React, { useState, useEffect } from "react";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";

export function TimeInput({id, value = "", onChange, placeholder = "11:00 AM"}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hour, setHour] = useState(11);    
    const [minute, setMinute] = useState(0);   
    const [ampm, setAmpm] = useState("AM");  

    const minutes = [0, 15, 30, 45];

    useEffect(() => {
        if (value) {
            const parts = value.split(" ");
            if (parts.length === 2) {
                const [timeStr, period] = parts;
                const [h, m] = timeStr.split(":").map(Number);
                setHour(h >= 1 && h <= 12 ? h : 11);
                setMinute(minutes.includes(m) ? m : 0);
                setAmpm(period === "PM" ? "PM" : "AM");
            }
        }
    }, [value]);

    const displayValue = value || "";

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleHourChange = (increment) => {
        setHour(prev => {
            const newHour = prev + increment;
            if (newHour > 12) return 1;
            if (newHour < 1) return 12;
            return newHour;
        });
    };

    const handleMinuteChange = (increment) => {
        const currentIndex = minutes.indexOf(minute);
        const newIndex = (currentIndex + increment + 4) % 4;
        setMinute(minutes[newIndex]);
    };

    const handleAmPmChange = (newAmPm) => {
        setAmpm(newAmPm);
    };

    const handleTimeSave = () => {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${ampm}`;
        onChange(timeString);
        closeModal();
    };

    return (
        <div className="w-full flex flex-col gap-2">
            <div onClick={openModal} role="button" tabIndex={0}
                className="relative w-full group cursor-pointer"
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openModal(); }}
                aria-haspopup="dialog" aria-expanded={isModalOpen} aria-label={placeholder || "Select time"} >

                <div id={id} className="inp pr-10 flex items-center">
                    {displayValue || ( <span className="text-inactive">{placeholder}</span> )}
                </div>
                <Clock className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary 
                    group-focus-within:text-accent w-5 h-5" />
            </div>

            <p id={`${id}_error`} className="hidden text-error text-center"></p>

            {isModalOpen && (
                <div onClick={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-back 
                    bg-opacity-75 backdrop-blur-sm" >

                    <div onClick={(e) => e.stopPropagation()} className="bg-surface p-5 rounded-xl shadow-xl w-auto 
                        min-w-[220px] text-main" >
                        <h3 className="h5 text-center mb-4">Select Time</h3>
                        <div className="flex justify-around items-center my-4 text-2xl font-sans">
                            <div className="flex flex-col items-center">
                                <button aria-label="Increase hour" onClick={() => handleHourChange(1)}
                                    className="p-1.5 text-main hover:text-accent transition-colors" >
                                    <ChevronUp size={28} />
                                </button>
                                <span className="p-2 w-16 text-center text-3xl text-active tabular-nums">
                                    {hour.toString().padStart(2, "0")}
                                </span>
                                <button aria-label="Decrease hour" onClick={() => handleHourChange(-1)}
                                    className="p-1.5 text-main hover:text-accent transition-colors" >
                                    <ChevronDown size={28} />
                                </button>
                            </div>

                            <span className="text-3xl text-active pb-1">:</span>

                            <div className="flex flex-col items-center">
                                <button aria-label="Increase minute" onClick={() => handleMinuteChange(1)}
                                    className="p-1.5 text-main hover:text-accent transition-colors" >
                                    <ChevronUp size={28} />
                                </button>
                                <span className="p-2 w-16 text-center text-3xl text-active tabular-nums">
                                    {minute.toString().padStart(2, "0")}
                                </span>
                                <button aria-label="Decrease minute" onClick={() => handleMinuteChange(-1)}
                                    className="p-1.5 text-main hover:text-accent transition-colors" >
                                    <ChevronDown size={28} />
                                </button>
                            </div>

                            <div className="flex flex-col items-center">
                                <button onClick={() => handleAmPmChange("AM")} 
                                    className={`p-2 w-16 text-center text-3xl tabular-nums transition-colors ${
                                        ampm === "AM" ? "text-accent font-semibold" : "text-inactive hover:text-main"
                                    }`}> 
                                    AM 
                                </button>
                                <button onClick={() => handleAmPmChange("PM")} 
                                    className={`p-2 w-16 text-center text-3xl tabular-nums transition-colors ${
                                        ampm === "PM" ? "text-accent font-semibold" : "text-inactive hover:text-main"
                                    }`}> 
                                    PM 
                                </button>
                            </div>
                        </div>
                        
                        <div className="w-full flex justify-end gap-3 mt-5">
                            <button onClick={closeModal} className="w-1/2 py-2 bg-inactive text-primary rounded-lg 
                                hover:opacity-80 transition-opacity text-sm"> Cancel </button>
                            <button onClick={handleTimeSave} className="w-1/2 py-2 bg-accent text-back rounded-lg 
                                hover:bg-accent-hover transition-colors text-sm font-medium" > Save </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}