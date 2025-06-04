import { setToStorage, clearErrorMsg, setErrorMsg } from '../utils/bookStorage';

export function validateTimeForm({ start, duration }) {
    let hasError = false;
    ['start_time', 'duration_time'].forEach(clearErrorMsg);

    if (!/^(0?[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/.test(start.trim())) {
        setErrorMsg("start_time", "Please select a start time");
        hasError = true;
    }

    if (duration < 180) {
        setErrorMsg('duration_time', "Minimum duration is 3 hours");
        hasError = true;
    }

    if (!hasError) { setToStorage("time", { start, duration }); }
    return hasError;
}