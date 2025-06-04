const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX;
const AUSTRALIA_BBOX = "140.9993,-37.505,159.1054,-28.157";

export const forwardGeocode = async (query) => {
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&country=AU&bbox=${AUSTRALIA_BBOX}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch address suggestions');
    return response.json();
};

export const reverseGeocode = async (lng, lat) => {
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
    );
    
    if (!response.ok) throw new Error('Failed to reverse geocode location');
    return response.json();
};