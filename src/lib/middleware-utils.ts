// @ts-ignore
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: CookieOptions }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: CookieOptions }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // Check for Admin Email
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail && user.email !== adminEmail) {
            return NextResponse.redirect(new URL('/', request.url)) // Or a 403 page
        }
    }

    // Redirect /login if already logged in
    if (request.nextUrl.pathname.startsWith('/login') && user) {
        if (process.env.ADMIN_EMAIL && user.email === process.env.ADMIN_EMAIL) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
        return NextResponse.redirect(new URL('/', request.url))
    }

    return supabaseResponse
}
