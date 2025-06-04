import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { reverseGeocode } from "@/lib/utils/geocoding";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

export function MapWithMarker({ coordinates, onLocationChange }) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;      
        const defaultCoords = [151.2093, -33.8688];

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: defaultCoords,
            zoom: 12,
        });

        markerRef.current = new mapboxgl.Marker({ color: '#FF0000' })
            .setLngLat(defaultCoords)
            .addTo(mapRef.current);

        mapRef.current.on('click', async (e) => {
            const { lng, lat } = e.lngLat;
            markerRef.current.setLngLat([lng, lat]);

            try {
                const data = await reverseGeocode(lng, lat);
                const address = data.features[0]?.place_name || "Unknown location";
                onLocationChange?.({ address, coordinates: [lng, lat] });
            } 
            catch (error) { console.error('Geocoding error:', error); }
        });

        return () => {
            if (markerRef.current) markerRef.current.remove();
            if (mapRef.current) mapRef.current.remove();
        };
    }, []);
    
    useEffect(() => {
        if (markerRef.current && mapRef.current && 
            Array.isArray(coordinates) && coordinates.length === 2) {
            markerRef.current.setLngLat(coordinates);
            mapRef.current.flyTo({ center: coordinates, zoom: 12 });
        }
    }, [coordinates]);

    return <div ref={mapContainerRef} className="w-2/3" style={{ height: "50vh" }} />;
}