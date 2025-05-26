import { isValidFullName } from '@adz946/true-name';

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

export function validateContactForm() {
    const name = document.getElementById('contact_name')?.value.trim();
    const email = document.getElementById('contact_email')?.value.trim();
    const mobile = document.getElementById('contact_mobile')?.value.trim() || '';
    const service = document.getElementById('contact_service')?.value;
    
    const rawMobile = mobile.replace(/\s+/g, '');
    const normalizedMobile = rawMobile.startsWith('0') ? rawMobile.replace(/^0/, '+61') : rawMobile;

    let hasError = false;
    ['contact_name', 'contact_email', 'contact_mobile', 'contact_service'].forEach(clearError);

    if (!isValidFullName(name)) {
        showError('contact_name', 'Enter a valid name (up to 3 words, no numbers)');
        hasError = true;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        showError('contact_email', 'Enter a valid email address');
        hasError = true;
    }

    if (!/^\+614\d{8}$/.test(normalizedMobile)) {
        showError('contact_mobile', 'Enter a valid Australian mobile number');
        hasError = true;
    }

    if (!service) {
        showError('contact_service', 'Please select a service');
        hasError = true;
    }

    if (!hasError) {
        const contactData = { name, email, mobile, service };
        sessionStorage.setItem('contact_data', JSON.stringify([contactData]));
    }

    return hasError;
}