import { isValidFullName } from '@adz946/true-name';
import { formatMobile } from '../utils/formatItems';
import { setToStorage, clearErrorMsg, setErrorMsg } from '../utils/bookStorage';

export function validateContactForm({ name, email, mobile, service, contact }) {
    let hasError = false;
    ['contact_name', 'contact_email', 'contact_mobile', 'contact_service', "contact_method"].forEach(clearErrorMsg);

    if (!isValidFullName(name.trim())) {
        setErrorMsg('contact_name', 'Enter a valid name (up to 3 words, no numbers)');
        hasError = true;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
        setErrorMsg('contact_email', 'Enter a valid email address');
        hasError = true;
    }

    if (!/^\+614\d{8}$/.test(formatMobile(mobile).replace(/\s/g, '')))  {
        setErrorMsg('contact_mobile', 'Enter a valid Australian mobile number');
        hasError = true;
    }

    if (!service) {
        setErrorMsg('contact_service', 'Select a service');
        hasError = true;
    }

    if (contact !== "email" && contact !== "sms") {
        setErrorMsg("contact_method", "Select a contact method");
        hasError = true;
    }

    if (!hasError) {
        setToStorage("contact", { name, email, mobile, service, contact });
    }

    return hasError;
}