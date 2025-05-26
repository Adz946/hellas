import { useState } from "react";
import { securityRoles } from '@/lib/serviceList';
import { X, PlusCircle, MinusCircle } from "lucide-react";

export function RoleSelector({ selected, onChange }) {
    const [showOptions, setShowOptions] = useState(false);
    const [pending, setPending] = useState([]);

    const openSelector = () => {
        const available = securityRoles.filter(role => !selected.includes(role));
        setPending([]); 
        setShowOptions(true);
    };

    const togglePending = (role) => {
        setPending(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);
    };

    const applySelection = () => {
        onChange([...selected, ...pending]);
        setPending([]);
        setShowOptions(false);
    };

    const cancelSelection = () => {
        setPending([]);
        setShowOptions(false);
    };

    const removeSelected = (role) => { onChange(selected.filter(r => r !== role)); };

    const availableRoles = securityRoles.filter(role => !selected.includes(role));
    const isLastRowOdd = selected.length === 0 || selected.length % 2 === 0;

    return (
        <div className="w-full py-2 flex flex-col items-center gap-4 relative">
            {/* Selected roles grid */}
            <h5 className="h5 text-center">Security Roles</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl">
                {selected.map(role => (
                    <button key={role} onClick={() => removeSelected(role)}
                        className="w-full px-4 py-2 bg-surface text-main rounded-xl text-sm flex justify-between items-center"
                    >
                        <span>{role}</span>
                        <MinusCircle className="w-4 h-4 opacity-70 hover:opacity-100" />
                    </button>
                ))}

                <button onClick={openSelector} className={`w-full px-4 py-2 bg-inactive text-primary rounded-xl text-sm flex 
                    justify-between items-center ${isLastRowOdd ? "md:col-span-2" : ""}`}>
                    <span>Select Role</span> <PlusCircle className="w-4 h-4 opacity-70 hover:opacity-100" /> 
                </button>
            </div>

            {/* Modal Overlay */}
            {showOptions && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-back">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-5 relative z-50">
                        <div className="flex justify-between items-center mb-4">
                            <h5 className="font-semibold text-main text-md">Select Service Roles</h5>
                            <button onClick={cancelSelection} className="text-inactive hover:text-error">
                                <X className="w-5 h-5" /> </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                            {availableRoles.map(role => (
                                <button
                                    key={role}
                                    onClick={() => togglePending(role)}
                                    className={`w-full cursor-pointer px-3 py-2 rounded text-back text-sm hover:bg-accent-hover
                                        ${ pending.includes(role) ? "bg-accent" : "bg-inactive" }`}
                                >
                                    {role}
                                </button>
                            ))}

                            {availableRoles.length === 0 && (
                                <p className="text-center col-span-2 text-sm text-inactive">All roles selected</p>
                            )}
                        </div>

                        <button onClick={applySelection} disabled={pending.length === 0}
                            className="w-full py-2 bg-accent text-back rounded-xl text-sm disabled:opacity-50">
                            Confirm Selection ({pending.length})
                        </button>
                    </div>
                </div>
            )}

            <p id="event_roles_error" className="hidden text-error text-sm text-center"></p>
        </div>
    );
}