import { setToStorage, clearErrorMsg, setErrorMsg } from '../utils/bookStorage';

export function validateDateForm({ date }) {
    clearErrorMsg("date");

    if (!date) {
        setErrorMsg("date", "Please select a date");
        return true;
    }

    setToStorage("date", { date: date.toISOString().split("T")[0] });
    return false;
}