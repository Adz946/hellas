'use client';
import React from "react";
import { NavShape } from "./NavShape";
import { IconShape } from "./IconShape";
import { usePathname } from "next/navigation";
import { MessagesSquare } from "lucide-react";

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="w-full h-full flex flex-col">

            <div className="w-full h-1/2 flex items-center justify-end gap-15 px-5">
                <a href="/" className={`font-semibold transform transition-transform duration-500 ease-out hover:scale-125 
                    hover:text-main ${pathname === "/" ? "text-main" : "text-inactive scale-90"}`}>Home</a>

                <a href="/book" className={`text-accent text-xl font-semibold transform transition-transform duration-500 
                ease-out hover:scale-115 ${pathname !== "/book" ? "opacity-75 hover:opacity-100" : null}`}>Book Now</a>
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
                        
                        <MessagesSquare className="h-[2em] w-[2em] stroke-none fill-surface absolute z-10 
                            transition-transform duration-300 hover:scale-110 hover:fill-primary" />
                    </div>
                </div>
            </div>
        </nav>
    );
}