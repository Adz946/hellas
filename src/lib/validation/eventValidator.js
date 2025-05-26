function showError(id, message) {
    const error = document.getElementById(`${id}_error`);
    if (error) {
        error.textContent = message;
        error.classList.remove('hidden');
    }
}

function clearError(id) {
    const error = document.getElementById(`${id}_error`);
    if (error) {
        error.textContent = '';
        error.classList.add('hidden');
    }
}

export function validateEventForm({ guest, guard, audience, alcohol, securityRoles }) {
    let hasError = false;
    ["guest_count", "guard_count", "audience_toggle", "alcohol_toggle", "event_roles"].forEach(clearError);

    if (isNaN(guest) || guest < 1) {
        showError("guest_count", "Enter a valid guest count");
        hasError = true;
    }

    if (isNaN(guard) || guard < 2) {
        showError("guard_count", "Enter a valid guard count");
        hasError = true;
    }

    if (audience !== "under" && audience !== "over") {
        showError("audience_toggle", "Select an audience group");
        hasError = true;
    }

    if (audience === "over" && (alcohol !== "yes" && alcohol !== "no")) {
        showError("alcohol_toggle", "Specify alcohol presence");
        hasError = true;
    }

    if (!Array.isArray(securityRoles) || securityRoles.length === 0) {
        showError("event_roles", "Pleae select at least 1 role");
        hasError = true;
    }

    if (!hasError) {
        const data = {
            guest, guard, audience, alcohol: audience === "under" ? "no" : alcohol, securityRoles
        };  
        sessionStorage.setItem("event_data", JSON.stringify([data]));
    }

    return hasError;
}