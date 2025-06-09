import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, startOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

export default function Calendar({ selectedDate, onSelect }) {
    const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        if (selectedDate && !isSameMonth(selectedDate, currentDate)) {
            setCurrentDate(selectedDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        if (today.getDate() === lastDayOfMonth.getDate()) {
            setCurrentDate(new Date(today.getFullYear(), today.getMonth() + 1, 1));
        }
    }, []);

    const startDate = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 }); // Monday start

    const generateCalendarDays = () => {
        const days = [];
        let day = startDate;

        for (let i = 0; i < 42; i++) {
            days.push(day);
            day = addDays(day, 1);
        }

        return days;
    };

    const handlePrevMonth = () => {
        setDirection(-1);
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setDirection(1);
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const createDateOnly = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const days = generateCalendarDays();

    return (
        <div className="w-full max-w-md">
            {/* Header */}
            <div className="flex justify-between items-center text-main font-medium text-lg">
                <button onClick={handlePrevMonth} className="p-2"> <ChevronLeft className="w-5 h-5 text-main" /> </button>
                <div className="flex-grow text-center"> {format(currentDate, 'MMMM')} {format(currentDate, 'yyyy')} </div>
                <button onClick={handleNextMonth} className="p-2"> <ChevronRight className="w-5 h-5 text-main" /> </button>
            </div>

            {/* Separator */}
            <hr className="my-2 border-t border-main opacity-75" />

            {/* Weekdays */}
            <div className="grid grid-cols-7 text-sm text-inactive mb-1 text-center">
                {daysOfWeek.map((day) => (
                    <div key={day} className="uppercase">{day}</div>
                ))}
            </div>

            {/* Animated Calendar Grid */}
            <div className="relative overflow-hidden h-[180px]">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={format(currentDate, 'yyyy-MM')}
                        initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-7 text-sm gap-y-2 text-center absolute w-full"
                    >
                        {days.map((day, idx) => {
                            const isCurrentMonth = isSameMonth(day, currentDate);
                            const isSelected = isSameDay(day, selectedDate);
                            const isPast = day <= new Date(new Date().setHours(0, 0, 0, 0));
                            const isDisabled = !isCurrentMonth || isPast;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => !isDisabled && onSelect(createDateOnly(day))}
                                    disabled={isDisabled}
                                    className={`
                                        py-1 rounded-full w-8 h-8 mx-auto
                                        ${isSelected ? 'text-accent font-semibold' : 'text-inactive'}
                                        ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:text-accent cursor-pointer'}
                                    `}
                                >
                                    {format(day, 'd')}
                                </button>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}