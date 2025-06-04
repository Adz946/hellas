import { setToStorage, clearErrorMsg, setErrorMsg } from '../utils/bookStorage';

export function validateEventForm({ guest, guard, audience, alcohol, securityRoles }) {
    let hasError = false;
    ["guest_count", "guard_count", "audience_toggle", "alcohol_toggle", "event_roles"].forEach(clearErrorMsg);

    if (isNaN(guest) || guest < 1) {
        setErrorMsg("guest_count", "Enter a valid guest count");
        hasError = true;
    }

    if (isNaN(guard) || guard < 2) {
        setErrorMsg("guard_count", "Enter a valid guard count");
        hasError = true;
    }

    if (audience !== "under 18" && audience !== "over 18") {
        setErrorMsg("audience_toggle", "Select an audience group");
        hasError = true;
    }

    if (audience === "over" && (alcohol !== "yes" && alcohol !== "no")) {
        setErrorMsg("alcohol_toggle", "Specify alcohol presence");
        hasError = true;
    }

    if (!Array.isArray(securityRoles) || securityRoles.length === 0) {
        setErrorMsg("event_roles", "Pleae select at least 1 role");
        hasError = true;
    }

    if (!hasError) { 
        setToStorage("event", 
            { guest, guard, audience, alcohol: audience === "under 18" ? "no" : alcohol, securityRoles });
    }

    return hasError;
}