import { useState } from "react";
import { forwardGeocode } from "@/lib/utils/geocoding";

export function SearchBar({ onAddressSelect }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        const input = e.target.value;
        setQuery(input);

        if (input.length > 2) {
            try {
                const data = await forwardGeocode(input);
                setResults(data.features || []);
            } catch (error) {
                console.error('Search error:', error);
                setResults([]);
            }
        } else {
            setResults([]);
        }
    };

    const handleSelect = (result) => {
        const { place_name, center } = result;
        onAddressSelect({ address: place_name, coordinates: center });
        setQuery(place_name);
        setResults([]);
    };

    return (
        <div className="w-2/3">
            <input type="text" value={query} onChange={handleSearch} className="w-full p-2 bg-surface rounded-md" 
                placeholder="Search for an address in NSW, Australia" />

            {results.length > 0 && (
                <ul className="w-full p-1 gap-1 flex flex-col bg-white">
                    {results.map((result) => (
                        <li key={result.id} onClick={() => handleSelect(result)} 
                            className="p-2 cursor-pointer lg:opacity-75 hover:opacity-100"> {result.place_name} </li>
                    ))}
                </ul>
            )}
        </div>
    );
}