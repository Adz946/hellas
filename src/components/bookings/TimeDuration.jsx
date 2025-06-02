import { useState, useEffect } from "react";

export function TimeDuration({ initialStack, onChange }) {
    const [modStack, setModStack] = useState([]);
    useEffect(() => { setModStack(initialStack); }, [initialStack]);

    const totalDuration = modStack.reduce((sum, m) => sum + m, 0);

    useEffect(() => {
        if (onChange) onChange(totalDuration);
    }, [totalDuration, onChange]);

    const formatDuration = (mins) => {
        if (mins === 0) return "0 minutes";
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        
        if (hours === 0) return `${minutes} min`;
        if (minutes === 0) return `${hours}h`;
        return `${hours}h ${minutes}m`;
    };

    const addDuration = (amount) => {
        setModStack(prev => [...prev, amount]);
    };

    const handleClear = () => {
        sessionStorage.setItem("cleared_stack", JSON.stringify(modStack));
        setModStack([]);
    };

    const handleUndo = () => {
        if (modStack.length > 0) { setModStack(prev => prev.slice(0, -1)); } 
        else {
            const stored = sessionStorage.getItem("cleared_stack");
            if (stored) {
                try {
                    const recovered = JSON.parse(stored);
                    if (Array.isArray(recovered) && recovered.length > 0) {
                        setModStack(recovered);
                        sessionStorage.removeItem("cleared_stack");
                    }
                } catch (err) { console.warn("Invalid cleared_stack data:", err); }
            }
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="w-full my-4 flex flex-col lg:flex-row gap-2 items-center justify-center">
                <p className="text-main text-lg">Duration</p>
                <p className="bg-surface text-main px-4 py-2 rounded-md text-sm text-center">
                    {formatDuration(totalDuration)}
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <button onClick={() => addDuration(15)} className="btn-tr btn-time btn-tr-hover"> + 15min </button>
                <button onClick={() => addDuration(30)} className="btn-tr btn-time btn-tr-hover"> + 30min </button>
                <button onClick={() => addDuration(60)} className="btn-tr btn-time btn-tr-hover"> + 1hr </button>
                <button onClick={() => addDuration(120)} className="btn-tr btn-time btn-tr-hover"> + 2hr </button>
            </div>

            <div className="flex gap-2">
                <button onClick={handleClear} className="btn-tr btn-rem btn-tr-hover flex-1"> CLEAR </button>
                <button onClick={handleUndo} className="btn-tr btn-rem btn-tr-hover flex-1"> UNDO </button>
            </div>

            <p id="duration_time_error" className="hidden text-error text-center"></p>
        </div>
    );
}