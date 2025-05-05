import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

// Services
import { sendPdfToEmailService } from "@/services/invoice/server/sendPdfToEmailService";

export async function POST(req: NextRequest) {
    try {
        // Get token from cookies
        const token = req.headers.get('cookie')?.split(';')
            .find(c => c.trim().startsWith('token='))
            ?.split('=')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

        const emailSent = await sendPdfToEmailService(req);

        if (emailSent) {
            return new NextResponse("Email sent successfully", {
                status: 200,
            });
        } else {
            return new NextResponse("Failed to send email", {
                status: 500,
            });
        }
    } catch (error) {
        console.error('Send email error:', error);
        return new NextResponse("Failed to send email", { status: 500 });
    }
}
