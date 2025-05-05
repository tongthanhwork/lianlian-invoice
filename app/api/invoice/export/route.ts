import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

// Services
import { exportInvoiceService } from "@/services/invoice/server/exportInvoiceService";

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

        const result = await exportInvoiceService(req);
        return result;
    } catch (error) {
        console.error('Export error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
