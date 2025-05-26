export function formatDuration(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs ? `${hrs} hr${hrs > 1 ? 's' : ''}` : ''} ${mins ? `${mins} min` : ''}`.trim();
}