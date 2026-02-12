import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/middleware-utils'

export async function middleware(request: NextRequest) {
    // If there's an auth code, we should let the callback route handle it
    // without potentially stripping cookies or redirecting too early.
    // However, updateSession is required to refresh the session token.
    return await updateSession(request)
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
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
