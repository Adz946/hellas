import { Navbar } from "./Navbar";

export function NavSet() {
    return (
        <div className="w-full h-30 gap-10 flex flex-row justify-between bg-primary">
            <img src="/images/LOGO_LIGHT.png" alt="Hellas Logo Here" 
                className="h-full aspect-square transform transition-transform duration-300 ease-out hover:scale-110" />

            <Navbar />
        </div>
    );
}