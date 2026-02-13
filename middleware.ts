import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/middleware-utils'
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ['ro', 'ru'],

    // Used when no locale matches
    defaultLocale: 'ro'
});

export async function middleware(request: NextRequest) {
    const response = intlMiddleware(request);

    // If there's an auth code, we should let the callback route handle it
    // without potentially stripping cookies or redirecting too early.
    // However, updateSession is required to refresh the session token.
    await updateSession(request, response);

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images/ (public images) - Feel free to modify this exclusion
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
