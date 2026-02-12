"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const newsletterSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export type NewsletterState = {
    success?: boolean;
    errors?: {
        email?: string[];
    };
    message?: string;
};

export async function subscribeToNewsletter(prevState: NewsletterState, formData: FormData): Promise<NewsletterState> {
    const email = formData.get("email") as string;

    const validatedFields = newsletterSchema.safeParse({ email });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid email.",
        };
    }

    try {
        const supabase = await createClient();

        // Check if already subscribed
        const { data: existing } = await supabase
            .from("newsletter_subscribers")
            .select("id")
            .eq("email", email)
            .single();

        if (existing) {
            return {
                success: true,
                message: "You are already subscribed!",
            };
        }

        const { error } = await supabase.from("newsletter_subscribers").insert({
            email,
            status: "subscribed",
        });

        if (error) {
            console.error("Newsletter DB Error:", error);
            return {
                success: false,
                message: "Failed to subscribe. Please try again.",
            };
        }

        return {
            success: true,
            message: "Successfully subscribed to our newsletter!",
        };
    } catch (error) {
        console.error("Newsletter unexpected error:", error);
        return {
            success: false,
            message: "An error occurred.",
        };
    }
}
