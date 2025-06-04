export function getFromStorage(key) {
    try {
        const stored = sessionStorage.getItem(`${key}_data`);
        if (stored) {
            const [data] = JSON.parse(stored);
            return data;
        }
    } catch (err) {
        console.warn(`Invalid ${key}_data in sessionStorage:`, err);
    }
    return null;
}

export function setToStorage(key, data) {
    sessionStorage.setItem(`${key}_data`, JSON.stringify([data]));
}

export function clearErrorMsg(key) {
    const error = document.getElementById(`${key}_error`);
    if (error) {
        error.textContent = '';
        error.classList.add('hidden');
    }
}

export function setErrorMsg(key, message) {
    const error = document.getElementById(`${key}_error`);
    if (error) {
        error.textContent = message;
        error.classList.remove('hidden');
    }
}