import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/app/lib/mongodb';
import User from '@/app/models/User';

export async function GET(req: Request) {
    try {
        // Get token from cookies
        const token = req.headers.get('cookie')?.split(';')
            .find(c => c.trim().startsWith('token='))
            ?.split('=')[1];

        if (!token) {
            return NextResponse.json(
                { error: 'No token provided' },
                { status: 401 }
            );
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };

        // Connect to database
        await connectDB();

        // Find user
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
        );
    }
} 