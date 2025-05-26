// src/components/bookings/CustomTimePicker.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";

export function CustomTimePicker({
    id,
    value,
    onChange,
    placeholder = "HH:MM",
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState("");

    // Internal state for the modal's hour and minute selection
    const [modalHour, setModalHour] = useState(12);
    const [modalMinute, setModalMinute] = useState(0);

    const minuteIncrements = [0, 15, 30, 45];

    // Function to parse the HH:MM value and update modal state
    const parseValueToModalState = useCallback(
        (val) => {
            if (val && val.includes(":")) {
                const [h, m] = val.split(":").map(Number);
                if (!isNaN(h) && h >= 0 && h <= 23) {
                    setModalHour(h);
                } else {
                    setModalHour(12); // Default if invalid
                }
                if (!isNaN(m) && minuteIncrements.includes(m)) {
                    setModalMinute(m);
                } else {
                    // Snap to the nearest valid 15-minute interval or default
                    setModalMinute(
                        minuteIncrements.find((inc) => inc >= m) ?? 0
                    );
                }
            } else {
                // Default values if no value is provided or format is wrong
                setModalHour(12);
                setModalMinute(0);
            }
        },
        [minuteIncrements]
    );

    // Update displayValue when the main `value` prop changes
    useEffect(() => {
        alert(`VAL: ${value}`);
        if (value) {
            setDisplayValue(value); // Assuming value is already "HH:MM"
            parseValueToModalState(value);
        } else {
            setDisplayValue("");
            // Set a default for the modal if no value
            setModalHour(12);
            setModalMinute(0);
        }
    }, [value, parseValueToModalState]);

    // Open modal and sync its internal state with the current value
    const openModal = () => {
        parseValueToModalState(
            value ||
                `${String(modalHour).padStart(2, "0")}:${String(
                    modalMinute
                ).padStart(2, "0")}`
        );
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleHourChange = (increment) => {
        setModalHour((prev) => (prev + increment + 24) % 24);
    };

    const handleMinuteChange = (increment) => {
        setModalMinute((prev) => {
            let currentIndex = minuteIncrements.indexOf(prev);
            // If prev minute is not in increments (e.g. initial state), default to 0's index
            if (currentIndex === -1) currentIndex = 0;
            const newIndex =
                (currentIndex + increment + minuteIncrements.length) %
                minuteIncrements.length;
            return minuteIncrements[newIndex];
        });
    };

    const handleTimeSave = () => {
        const newTime = `${String(modalHour).padStart(2, "0")}:${String(
            modalMinute
        ).padStart(2, "0")}`;
        onChange(newTime);
        setDisplayValue(newTime); // Update display immediately
        closeModal();
    };

    return (
        <div className="w-full flex flex-col gap-2">
            <div
                className="relative w-full group cursor-pointer"
                onClick={openModal}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openModal();
                }}
                aria-haspopup="dialog"
                aria-expanded={isModalOpen}
                aria-label={placeholder || "Select time"}
            >
                <div
                    id={id} // For <label htmlFor={id}>
                    className="inp pr-10 flex items-center" //
                >
                    {displayValue || (
                        <span className="text-inactive">{placeholder}</span>
                    )}{" "}
                    {/* */}
                </div>
                <Clock // Directly using Clock from lucide-react
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-accent w-5 h-5" //
                />
            </div>
            {/* Error message paragraph - parent component (SectionTime) should handle error state and display */}
            <p id={`${id}_error`} className="hidden text-error text-center"></p>{" "}
            {/* */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-back bg-opacity-75 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    {" "}
                    {/* */}
                    <div
                        className="bg-surface p-5 rounded-xl shadow-xl w-auto min-w-[220px] text-main" //
                        onClick={(e) => e.stopPropagation()} // Prevent modal closing when clicking inside
                    >
                        <h3 className="h5 text-center mb-4">Select Time</h3>{" "}
                        {/* */}
                        <div className="flex justify-around items-center my-4 text-2xl font-sans">
                            {" "}
                            {/* */}
                            {/* Hours Column */}
                            <div className="flex flex-col items-center">
                                <button
                                    aria-label="Increase hour"
                                    onClick={() => handleHourChange(1)}
                                    className="p-1.5 text-main hover:text-accent transition-colors"
                                >
                                    {" "}
                                    {/* */}
                                    <ChevronUp size={28} />
                                </button>
                                <span className="p-2 w-16 text-center text-3xl text-active tabular-nums">
                                    {String(modalHour).padStart(2, "0")}
                                </span>{" "}
                                {/* */}
                                <button
                                    aria-label="Decrease hour"
                                    onClick={() => handleHourChange(-1)}
                                    className="p-1.5 text-main hover:text-accent transition-colors"
                                >
                                    {" "}
                                    {/* */}
                                    <ChevronDown size={28} />
                                </button>
                            </div>
                            <span className="text-3xl text-active pb-1">:</span>{" "}
                            {/* */}
                            {/* Minutes Column */}
                            <div className="flex flex-col items-center">
                                <button
                                    aria-label="Increase minute"
                                    onClick={() => handleMinuteChange(1)}
                                    className="p-1.5 text-main hover:text-accent transition-colors"
                                >
                                    {" "}
                                    {/* */}
                                    <ChevronUp size={28} />
                                </button>
                                <span className="p-2 w-16 text-center text-3xl text-active tabular-nums">
                                    {String(modalMinute).padStart(2, "0")}
                                </span>{" "}
                                {/* */}
                                <button
                                    aria-label="Decrease minute"
                                    onClick={() => handleMinuteChange(-1)}
                                    className="p-1.5 text-main hover:text-accent transition-colors"
                                >
                                    {" "}
                                    {/* */}
                                    <ChevronDown size={28} />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={closeModal}
                                className="py-2 px-4 bg-inactive text-primary rounded-lg hover:opacity-80 transition-opacity text-sm" //
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleTimeSave}
                                className="py-2 px-4 bg-accent text-back rounded-lg hover:bg-accent-hover transition-colors text-sm font-medium" //
                            >
                                Set Time
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
