import { Lock, Unlock, Check } from "lucide-react";

export const getStateIcon = (state) => {
    switch (state) {
        case "locked":
            return <Lock className="w-4 h-4 text-inactive ml-auto" />;
        case "current":
            return <Unlock className="w-4 h-4 text-accent ml-auto" />;
        case "complete":
            return <Check className="w-4 h-4 text-success ml-auto" />;
        default:
            return null;
    }
};

export const getStateStyles = (state, isActive) => {
    const baseStyles = "w-full flex items-center justify-between px-4 py-2 my-1 rounded-md transition-colors duration-150";
    
    if (state === "locked") {
        return `${baseStyles} opacity-50 cursor-not-allowed text-inactive`;
    }
    
    if (isActive) {
        return `${baseStyles} bg-accent/10 text-accent font-bold cursor-pointer`;
    }
    
    if (state === "complete") {
        return `${baseStyles} text-success hover:bg-success/15 cursor-pointer`;
    }
    
    return `${baseStyles} text-main hover:bg-accent/15`;
};