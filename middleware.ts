import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from "next-intl/middleware";

// Variables
import { LOCALES, DEFAULT_LOCALE } from "@/lib/variables";

// List of public paths that don't require authentication
const publicPaths = ['/login', '/register'];

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
    locales: LOCALES.map((locale) => locale.code),
    defaultLocale: DEFAULT_LOCALE,
});

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = request.cookies.get('token');

    // Check if the path is public
    const isPublicPath = publicPaths.some(path => pathname.includes(path));

    // If it's a public path and user is authenticated, redirect to home
    if (isPublicPath && session) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If it's not a public path and user is not authenticated, redirect to login
    if (!isPublicPath && !session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Apply internationalization middleware
    return intlMiddleware(request);
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
