import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const isPublicPath = path === '/login' || path === '/register';

    // Get the token from the cookies
    const token = request.cookies.get('token')?.value || '';

    // If the path is public and user is authenticated, redirect to home
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If the path is not public and user is not authenticated, redirect to login
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If there's a token, verify it for protected routes
    if (token && !isPublicPath) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            // You can add the decoded user info to the request headers if needed
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('x-user-id', (decoded as any).userId);
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch (error) {
            // If token is invalid, redirect to login
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // For public paths without token, allow access
    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/profile',
        '/api/auth/logout',
    ],
}; 