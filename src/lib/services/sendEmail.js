// Send Via Email
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const bodyMsg = (data) => {
    return `
        <h2>Your Booking For: ${data.date}</h2>
        <br />

        Hello ${data.name}! <br />
        Your booking for ${data.service} has been confirmed!
        <br /><br />

        Here are the details: <br />
        - Guard Count: ${data.guards} <br />
        - Start Time: ${data.start} <br />
        - Duration: ${data.duration} <br />
        - Location: ${data.location}
    `;
}

export const sendBookingEmail = async (contact, data) => {   
    const command = new SendEmailCommand({
        Source: `${process.env.NEXT_PUBLIC_SES_FROM_NAME} <${process.env.NEXT_PUBLIC_SES_FROM_EMAIL}>`,
        Destination: { ToAddresses: [contact] },
        Message: {
            Subject: { Data: "Hellas Bookings: Confirmation" },
            Body: { Html: { Data: bodyMsg(data) } }
        }
    });
    
    try {
        const result = await sesClient.send(command);
        return result;
    } catch (error) {
        console.error(`❌ Email failed:`, error.message);
        console.error(`❌ Error code:`, error.name);
        throw error;
    }
};