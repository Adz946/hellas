'use client';
import React from "react";
import { NavShape } from "./NavShape";
import { IconShape } from "./IconShape";
import { MessagesSquare } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="w-full h-full flex flex-col">

            <div className="w-full h-1/2 flex items-center justify-end gap-15 px-5">
                <a href="/" className={`font-semibold ${pathname === "/" ? "text-main" : "text-inactive"}`}>Home</a>
                <a href="/services" className={`font-semibold ${pathname === "/services" ? "text-main" : "text-inactive"}`}>Services</a>
                <a href="#" className={`font-semibold ${pathname === "/about" ? "text-main" : "text-inactive"}`}>Contact</a>
                <a href="#" className="text-accent text-xl font-semibold">Book Now</a>
            </div>

            <div className="w-full h-1/2 flex items-center gap-15 relative">
                <NavShape />

                <div className="h-full gap-5 flex-grow flex justify-end items-center relative">
                    <div className="text-main font-semibold text-right"> 
                        <p> 0466 309 744 </p>
                        <p> hellasscrt@gmail.com </p>
                    </div>
                    

                    <div className="relative flex items-center justify-center h-full aspect-square"> 
                        <IconShape /> 
                        
                        <MessagesSquare className="h-[2em] w-[2em] fill-surface absolute z-10 
                            transition-transform duration-300 hover:scale-110 hover:fill-primary" />
                    </div>
                </div>
            </div>
        </nav>
    );
}