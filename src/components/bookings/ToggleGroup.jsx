export function ToggleGroup({ id, title, options, selected, onSelect, className = "" }) {
    return (
        <div id={id} className={`w-1/2 gap-3 flex flex-col text-center items-center ${className}`}>
            <h5 className="h5 w-full">{title}</h5>
            {options.map(opt => (
                <button key={opt.id} id={opt.id} onClick={() => onSelect(opt.id)}
                    className={`w-3/4 px-6 py-2 rounded-xl text-primary btn-scale ${ selected === opt.id ? "bg-accent" : "bg-inactive" }`} >
                    {opt.label}
                </button>
            ))}
            <p id={`${id}_error`} className="hidden text-error text-center"></p>
        </div>
    );
}