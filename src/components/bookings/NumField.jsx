export function NumField({ id, label, max = 50000, min = 1, value, onChange }) {
    const handleChange = (e) => { onChange(parseInt(e.target.value, 10)); };

    const handleBlur= (e) => {
        let newVal = parseInt(e.target.value, 10);

        if (isNaN(newVal)) newVal = min;
        if (newVal > max) newVal = max;
        if (newVal < min) newVal = min;

        onChange(newVal);
    };

    return (
        <div className="w-2/4 p-2 flex flex-col items-center">
            <input id={id} type="number" value={value ?? ""} onChange={handleChange} onBlur={handleBlur} inputMode="numeric" 
                pattern="[0-9]*" max={max} min={min} className="text-center text-2xl text-primary bg-inactive rounded-md w-full" />

            <hr className="w-full border-t border-inactive my-1" />
            <label htmlFor={id} className="text-md text-inactive">{label}</label>
            <p id={`${id}_error`} className="hidden text-error text-center"></p>
        </div>
    );
}