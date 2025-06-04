export function InputWithIcon({ id, type = "text", placeholder = "", icon: Icon, savedInfo = "", onChange }) {
    return (
        <div className='w-full flex flex-col gap-2'>
            <div className="relative w-full">
                <input id={id} type={type} placeholder={placeholder} value={savedInfo} 
                    onChange={(e) => onChange(e.target.value)} className="inp pr-10" />
                {Icon && (<Icon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />)}
            </div>
            <p id={`${id}_error`} className="hidden text-error text-center"></p>
        </div>
    );
}