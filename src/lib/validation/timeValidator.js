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

export function validateTimeForm({ start, duration }) {
    let hasError = false;
    ['start_time', 'duration_time'].forEach(clearError);

    if (!start) {
        showError("start_time", "Please select a start time");
        hasError = true;
    }

    if (duration < 180) {
        showError('duration_time', "Minimum duration is 3 hours");
        hasError = true;
    }

    if (!hasError) {
        sessionStorage.setItem("time_data", JSON.stringify([{ start, duration }]));
    }

    return hasError;
}