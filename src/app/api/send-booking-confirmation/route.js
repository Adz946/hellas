import { bookingConfirmation } from "@/lib/services/bookingConfirmation";

export async function POST(request) {
    try {
        const { type, contact, data } = await request.json();
        console.log('Attempting to send confirmation:', { type, contact, data });
        const success = await bookingConfirmation(type, contact, data);
        
        if (success) { 
            return Response.json({ success: true, message: 'Confirmation sent' });
        } else { 
            return Response.json({ success: false, error: 'Failed to send confirmation' }, { status: 500 });
        }
    } catch (error) {
        console.error('Booking confirmation error:', error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}