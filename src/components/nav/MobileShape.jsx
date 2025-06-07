import React from "react";

export function MobileShape() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 100"
            preserveAspectRatio="none"
            className="absolute z-0 w-full h-full fill-surface"
        >
            <path d="
                M 180,0
                C 160,5 140,15 120,25
                C 100,35 80,50 60,65
                C 40,75 20,85 0,100
                L 300,100
                L 300,0
                Z
            " />
        </svg>
    );
}