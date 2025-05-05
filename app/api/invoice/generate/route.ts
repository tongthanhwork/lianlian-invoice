import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

// Services
import { generatePdfService } from "@/services/invoice/server/generatePdfService";

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

        const result = await generatePdfService(req);
        return result;
    } catch (error) {
        console.error('Generate error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
