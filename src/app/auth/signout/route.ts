// @ts-ignore
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: CookieOptions }) =>
                        cookieStore.set(name, value, options)
                    );
                },
            },
        }
    );

    const { error } = await supabase.auth.signOut();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.redirect(new URL("/login", req.url), {
        status: 302,
    });
}
