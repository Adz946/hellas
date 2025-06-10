export function capitalizeString(str) {
    if (!str || str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatMobile(mobile) {
    const rawMobile = mobile.trim().replace(/\s+/g, '');
    return rawMobile.startsWith('0') ? rawMobile.replace(/^0/, '+61') : rawMobile;
}

export function formatDuration(minutes) {
    if (!minutes || minutes === 0) return '0 min';
    
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    const hourStr = hrs ? `${hrs} hr${hrs > 1 ? 's' : ''}` : '';
    const minStr = mins ? `${mins} min` : '';
    
    return [hourStr, minStr].filter(Boolean).join(' ');
}

export const formatDate = (date) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Create a new date with local timezone to avoid shifts
    const safeDate = new Date(
        dateObj.getFullYear(), 
        dateObj.getMonth(), 
        dateObj.getDate()
    );
    
    return safeDate.toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
    });
};