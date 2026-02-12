"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const contactSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string().min(2, { message: "Message must be at least 2 characters" }),
});

export type ContactState = {
    success?: boolean;
    errors?: {
        email?: string[];
        message?: string[];
    };
    message?: string;
};

export async function sendContactMessage(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const rawData = {
        email: formData.get("email") as string,
        message: formData.get("message") as string,
    };

    console.log("Server Action received:", rawData);

    const validatedFields = contactSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation failed. Please check your inputs.",
        };
    }

    const { email, message } = validatedFields.data;

    try {
        // 1. Save to Supabase
        const { error: dbError } = await supabase.from("contacts").insert({
            email,
            message,
            name: "Anonymous", // Optional: Add name field to form if needed
        });

        if (dbError) {
            console.error("Database error:", dbError);
            return {
                success: false,
                message: "Failed to save message. Please try again.",
            };
        }

        // 2. TODO: Send Email Notification (Resend/NodeMailer)
        // await sendEmail({ to: "admin@revorgs.com", subject: "New Contact", html: `<p>${message}</p>` });

        return {
            success: true,
            message: "Message received! We'll allowlist your IP shortly.",
        };
    } catch (error) {
        console.error("Server error:", error);
        return {
            success: false,
            message: "An unexpected error occurred.",
        };
    }
}
