import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { MobileShape } from "./MobileShape";
import { usePathname } from "next/navigation";
import DisplayContact from "../ContactElements";

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
                <div className="fixed h-full inset-0 bg-primary/90 backdrop-blur-sm z-40 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center gap-8">
                        <a href="/"  onClick={() => setIsOpen(false)} className={`text-main text-2xl font-semibold opacity-50
                            ${pathname === "/" ? "opacity-100" : ""}`} > Home </a>

                        <a href="/book" onClick={() => setIsOpen(false)} className={`text-accent text-3xl font-bold opacity-50
                            ${pathname === "/book" ? "opacity-100" : ""}`} > Book Now </a>

                        <DisplayContact classes={"w-full gap-4 flex flex-col text-main"} textSize={"text-lg"} />
                    </div>
                </div>
            )}
        </nav>
    );
}
