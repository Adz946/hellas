import { isValidFullName } from '@adz946/true-name';
import { setToStorage, clearErrorMsg, setErrorMsg } from '../utils/bookStorage';

export function validateContactForm({ name, email, mobile, service }) {
    const rawMobile = mobile.trim().replace(/\s+/g, '');
    const normalizedMobile = rawMobile.startsWith('0') ? rawMobile.replace(/^0/, '+61') : rawMobile;

    let hasError = false;
    ['contact_name', 'contact_email', 'contact_mobile', 'contact_service'].forEach(clearErrorMsg);

    if (!isValidFullName(name.trim())) {
        setErrorMsg('contact_name', 'Enter a valid name (up to 3 words, no numbers)');
        hasError = true;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
        setErrorMsg('contact_email', 'Enter a valid email address');
        hasError = true;
    }

    if (!/^\+614\d{8}$/.test(normalizedMobile)) {
        setErrorMsg('contact_mobile', 'Enter a valid Australian mobile number');
        hasError = true;
    }

    if (!service) {
        setErrorMsg('contact_service', 'Please select a service');
        hasError = true;
    }

    if (!hasError) {
        setToStorage("contact", { name, email, mobile, service });
    }

    return hasError;
}