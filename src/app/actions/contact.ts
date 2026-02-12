"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

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
        const supabase = await createClient();

        // 1. Save to Supabase 'leads' table
        const { error: dbError } = await supabase.from("leads").insert({
            email,
            message,
            name: email.split("@")[0], // Default name from email
            source: "contact_form",
            status: "new",
        });

        if (dbError) {
            console.error("Database error:", dbError);
            return {
                success: false,
                message: "Failed to save message. Please try again.",
            };
        }

        // 2. Send Email Notification (Resend)
        const resendApiKey = process.env.RESEND_API_KEY;
        const adminEmail = process.env.ADMIN_EMAIL || "admin@revorgs.com";

        if (resendApiKey) {
            try {
                const res = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${resendApiKey}`,
                    },
                    body: JSON.stringify({
                        from: "RevOrgs Contact <onboarding@resend.dev>", // Or verified domain
                        to: [adminEmail],
                        subject: `New Lead: ${email}`,
                        html: `
                            <p><strong>New Contact Form Submission</strong></p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Message:</strong></p>
                            <p>${message}</p>
                        `,
                    }),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    console.error("Resend API Error:", errorData);
                }
            } catch (emailError) {
                console.error("Email sending failed:", emailError);
                // Don't fail the request if email fails, db save succeeded
            }
        } else {
            console.warn("RESEND_API_KEY not set. Skipping email notification.");
        }

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
