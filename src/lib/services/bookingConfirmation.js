// Run the Booking Confirmation Sender
import { sendBookingSMS } from "./sendSMS"
import { sendBookingEmail } from "./sendEmail"

export async function bookingConfirmation(type, contact, data) {  
    try {
        if (type === "email") { await sendBookingEmail(contact, data); }
        else if (type === "sms") { await sendBookingSMS(contact, data); }
        else { throw new Error(`Invalid Contact Type: ${type}`); }
        return true;
    }
    catch (e) { 
        console.log(`Error Occured: ${e}`); 
        throw e;
    }
}