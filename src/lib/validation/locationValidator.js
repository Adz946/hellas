import { setToStorage, clearErrorMsg, setErrorMsg } from "../utils/bookStorage";

export function validateLocationForm({ location, hasUnit, unitNum }) {
    let hasError = false;
    ['location_error', 'unit_toggle_error', 'unit_input_error'].forEach(clearErrorMsg);

    if (!location.address || !location.coordinates) {
        setErrorMsg("location", "Please select a location on the map");
        hasError = true;
    }

    if (hasUnit === null) {
        setErrorMsg("unit_toggle", "Please specify if the location has a unit");
        hasError = true;
    }

    if (hasUnit === "yes" && (!unitNum || unitNum < 1)) {
        setErrorMsg("unit_input", "Please enter a valid unit number");
        hasError = true;
    }

    if (!hasError) {
        setToStorage("location", { location, hasUnit, unitNum: hasUnit === "yes" ? unitNum : null });
    }

    return hasError;
}