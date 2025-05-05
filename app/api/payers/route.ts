import { NextResponse } from 'next/server';
import { UserPayer } from '@/app/models/UserPayer';
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

        // Get all payers for the current user
        const payers = await UserPayer.find({ user_id: decoded.userId });

        return NextResponse.json(payers);
    } catch (error) {
        console.error('Error fetching payers:', error);
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

        // Create new payer
        const newPayer = await UserPayer.create({
            user_id: decoded.userId,
            name,
        });

        return NextResponse.json({
            id: newPayer._id,
            name: newPayer.name
        });
    } catch (error) {
        console.error('Error creating payer:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 