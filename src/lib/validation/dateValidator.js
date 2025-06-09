import { setToStorage, clearErrorMsg, setErrorMsg } from '../utils/bookStorage';

export function validateDateForm({ date }) {
    clearErrorMsg("date");

    if (!date) {
        setErrorMsg("date", "Please select a date");
        return true;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    setToStorage("date", { date: `${year}-${month}-${day}` });
    return false;
}