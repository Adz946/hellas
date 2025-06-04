import { useState, useEffect } from 'react';
import Calendar from '@/components/bookings/Calendar';
import { getFromStorage } from '@/lib/utils/bookStorage';
import { ConfirmBtn } from "@/components/bookings/ConfirmBtn";
import { validateDateForm } from '@/lib/validation/dateValidator';

export default function SectionDate({ onAdvance }) {
    const [savedData, setSavedData] = useState(null);
    useEffect(() => { setSavedData(getFromStorage("date")); }, []);

    const [date, setDate] = useState(null);

    useEffect(() => {
        if (savedData) {
            if (savedData.date) { setDate(new Date(savedData.date)); }
        }
    }, [savedData]);

    const handleValidate = () => {
        const hasError = validateDateForm({ date });
        if (!hasError) { onAdvance(); }
    };

    return (
        <section className="sect">
            <h5 className="h5 text-center">Select Your Event Date</h5>
            <div className='w-full mb-4 flex flex-col items-center'>
                <Calendar selectedDate={date} onSelect={setDate} />
                <p id={`date_error`} className="hidden text-error text-center"></p>
            </div>
            <ConfirmBtn section="dt" onAdvance={handleValidate} />
        </section>
    );
}