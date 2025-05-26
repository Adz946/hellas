export function InputWithIcon({ id, type = "text", placeholder = "", icon: Icon, savedInfo = "" }) {
    return (
        <div className='w-full flex flex-col gap-2'>
            <div className="relative w-full">
                <input id={id} type={type} placeholder={placeholder} defaultValue={savedInfo} className="inp pr-10" />
                {Icon && (<Icon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />)}
            </div>
            <p id={`${id}_error`} className="hidden text-error text-center"></p>
        </div>
    );
}