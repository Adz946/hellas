'use client';
import React from "react";
import { Info } from "lucide-react";
import { NavShape } from "./NavShape";
import { usePathname } from "next/navigation";
import DisplayContact from "../ContactElements";

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="w-full h-full flex flex-col">

            <div className="w-full h-1/2 flex items-center justify-end gap-10 px-5">
                <a href="/" className={`nav-link animate nav-scale text-main text-lg 
                    ${pathname === "/" ? "nav-active" : "nav-inactive"}`}>Home</a>

                <a href="/book" className={`nav-link animate nav-scale text-accent text-2xl
                    ${pathname === "/book" ? "nav-active" : "nav-inactive"}`}>Book Now</a>
            </div>

            <div className="w-full h-1/2 flex items-center relative">
                <NavShape />

                <div className="h-full pr-5 gap-5 flex-grow flex justify-end items-center relative">
                    <DisplayContact classes={"text-main font-semibold text-right"} textSize={"text-md"} />
                </div>
            </div>
        </nav>
    );
}