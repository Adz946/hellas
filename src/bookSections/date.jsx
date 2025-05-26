'use client';
import { useState, useEffect } from 'react';
import Calendar from '@/components/bookings/Calendar';
import { ConfirmBtn } from "@/components/bookings/ConfirmBtn";

export default function SectionDate({ onAdvance }) {
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("dt_data");
        if (stored) {
            try {
                const [data] = JSON.parse(stored);
                if (data?.date) { setSelectedDate(new Date(data.date)); }
            } catch (err) {
                console.warn("Invalid dt_data in sessionStorage:", err);
            }
        }
    }, []);

    function showError() {
        const error = document.getElementById(`date_error`);
        if (error) {
            error.textContent = "Please select a date";
            error.classList.remove('hidden');
        }
    }

    function clearError() {
        const error = document.getElementById(`date_error`);
        if (error) {
            error.textContent = '';
            error.classList.add('hidden');
        }
    }

    const handleValidate = () => {
        clearError();

        if (!selectedDate) {
            showError();
            return;
        }

        sessionStorage.setItem("dt_data", JSON.stringify([{ date: selectedDate.toISOString().split("T")[0] }]));
        onAdvance();
    };

    return (
        <section className="sect flex flex-col items-center justify-center gap-6">
            <h5 className="h5 text-center">Select Your Event Date</h5>
            <div className='w-full mb-4 flex flex-col items-center'>
                <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} />
                <p id={`date_error`} className="hidden text-error text-center"></p>
            </div>
            <ConfirmBtn section="dt" onAdvance={handleValidate} />
        </section>
    );
}