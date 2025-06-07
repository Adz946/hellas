import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { MobileShape } from "./MobileShape";
import { usePathname } from "next/navigation";

export function Navblock() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="w-full h-full flex flex-col relative">
            {/* Top section with hamburger */}
            <div className="w-full h-full flex items-center justify-end">
                <MobileShape />

                <button  onClick={toggleMenu} aria-label="Toggle navigation menu"
                    className="text-main pr-5 hover:text-accent transition-colors duration-300 z-50 relative">
                    {isOpen ? <X size={28} /> : <Menu size={28} />} </button>
            </div>

            {/* Mobile menu overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-primary/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center gap-8">
                        <a href="/"  onClick={() => setIsOpen(false)} className={`text-2xl font-semibold transform 
                            transition-all duration-500 ease-out hover:scale-125 hover:text-accent 
                            ${pathname === "/" ? "text-accent" : "text-main"}`} > Home </a>

                        <a href="/book" onClick={() => setIsOpen(false)} className={`text-3xl font-bold transform 
                            transition-all duration-500 ease-out hover:scale-125  text-accent 
                            ${pathname !== "/book" ? "opacity-75 hover:opacity-100" : ""}`} > Book Now </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
