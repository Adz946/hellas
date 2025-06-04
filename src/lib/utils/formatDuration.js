export function formatDuration(minutes) {
    if (!minutes || minutes === 0) return '0 min';
    
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    const hourStr = hrs ? `${hrs} hr${hrs > 1 ? 's' : ''}` : '';
    const minStr = mins ? `${mins} min` : '';
    
    return [hourStr, minStr].filter(Boolean).join(' ');
}

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
    });
};