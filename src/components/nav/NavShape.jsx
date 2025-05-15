import React from "react";

export function NavShape() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 100"
            preserveAspectRatio="none"
            className="absolute z-0 w-full h-full fill-surface"
        >
            <path d="
                M 80,0
                C 70,5 60,30 40,40
                C 40,35 10,80 0,100
                L 300,100
                L 300,0
                Z
            " />
        </svg>
    );
}