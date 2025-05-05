import { NextResponse } from 'next/server';
import { UserReceiverEmail } from '@/app/models/UserReceiverEmail';
import connectDB from '@/app/lib/mongodb';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
    try {
        // Get token from cookies
        const token = request.headers.get('cookie')?.split(';')
            .find(c => c.trim().startsWith('token='))
            ?.split('=')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };

        await connectDB();
        const emails = await UserReceiverEmail.find({
            user_id: decoded.userId
        });

        return NextResponse.json(emails);
    } catch (error) {
        console.error('Error fetching receiver emails:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // Get token from cookies
        const token = request.headers.get('cookie')?.split(';')
            .find(c => c.trim().startsWith('token='))
            ?.split('=')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };

        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        await connectDB();
        const newEmail = await UserReceiverEmail.create({
            user_id: decoded.userId,
            email
        });

        return NextResponse.json(newEmail);
    } catch (error) {
        console.error('Error creating receiver email:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 