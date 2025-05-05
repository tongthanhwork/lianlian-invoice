import { NextResponse } from 'next/server';
import { UserReceiver } from '@/app/models/UserReceiver';
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

        // Get all receivers for the current user
        const receivers = await UserReceiver.find({ user_id: decoded.userId });

        // Get emails for each receiver
        const receiversWithDetails = await Promise.all(
            receivers.map(async (receiver) => {
                const emails = await UserReceiverEmail.find({
                    user_id: decoded.userId,
                    receiver_id: receiver._id
                });

                return {
                    id: receiver._id,
                    name: receiver.name,
                    emails: emails.map(e => e.email)
                };
            })
        );

        return NextResponse.json(receiversWithDetails);
    } catch (error) {
        console.error('Error fetching receivers:', error);
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

        const { name } = await request.json();
        await connectDB();

        // Create new receiver
        const newReceiver = await UserReceiver.create({
            user_id: decoded.userId,
            name,
        });

        return NextResponse.json({
            id: newReceiver._id,
            name: newReceiver.name
        });
    } catch (error) {
        console.error('Error creating receiver:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 