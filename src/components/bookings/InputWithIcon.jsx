export function InputWithIcon({ id, type = "text", placeholder = "", icon: Icon }) {
    return (
        <div className="relative w-full">
            <input id={id} type={type} placeholder={placeholder} className="inp pr-10" />
            {Icon && (<Icon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />)}
        </div>
    );
}
