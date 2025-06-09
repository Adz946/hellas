// Send Via SMS
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	}
});

const headMsg = (date, name, service) => {
	return `[1/2] 
Your Booking For: ${date}

Hello ${name}!
Your booking for ${service} has been confirmed!`;
}

const detailMsg = (guards, start, duration, location) => {
	return `[2/2] 
Here are the details:
- Guard Count: ${guards}
- Start Time: ${start}
- Duration: ${duration}
- Location: ${location}`;
}

export const sendBookingSMS = async (contact, data) => {
	try {
		const confirmation = new PublishCommand({
			PhoneNumber: contact,
			Message: headMsg(data.date, data.name, data.service)
		});
		
		const confirmationResult = await snsClient.send(confirmation);
		await new Promise(resolve => setTimeout(resolve, 2000));

		const details = new PublishCommand({
			PhoneNumber: contact,
			Message: detailMsg(data.guards, data.start, data.duration, data.location)
		})

		const detailsResult = await snsClient.send(details);
		return { confirmationResult, detailsResult };
	}
	catch (error) {
		console.error(`❌ SMS failed:`, error.message);
		throw error;
	}
};