"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const quoteSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    quote_details: z.object({
        selectedServices: z.array(z.string()),
        totals: z.object({
            oneTime: z.number(),
            monthly: z.number(),
            currency: z.enum(['EUR', 'MDL']),
            includeVAT: z.boolean(),
        }).optional(), // Optional for now to not break if structure changes, but strict better later
    }),
});

export type QuoteState = {
    success?: boolean;
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        _form?: string[];
    };
    message?: string;
};

export async function submitQuoteRequest(
    prevState: QuoteState,
    formData: FormData,
    quoteDetails: any // Passed separately or as hidden field? Better separately if we bind.
): Promise<QuoteState> {

    // Since we need to pass JSON object (quote details) which isn't easy in pure FormData without stringifying,
    // we can use bind in the component: submitAction_withData = submitQuoteRequest.bind(null, quoteDetails)
    // But wait, server actions signature with useActionState is (prevState, formData).
    // We can pass the details as a hidden JSON string field in the form.

    const rawData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        quote_details: quoteDetails || JSON.parse(formData.get("quote_details") as string || '{}'),
    };

    const validated = quoteSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            errors: validated.error.flatten().fieldErrors,
            message: "Please define all required fields correctly.",
        };
    }

    const { name, email, phone, quote_details } = validated.data;

    try {
        const supabase = await createClient();

        // 1. Save to DB
        // Cast to any to bypass type check since types are not yet generated for this new table
        const { error: dbError } = await (supabase as any)
            .from("quote_requests")
            .insert({
                name,
                email,
                phone,
                quote_details,
                status: 'new'
            });

        if (dbError) {
            console.error("DB Error:", dbError);
            return {
                success: false,
                message: "Failed to save quote request. Please try again.",
            };
        }

        // 2. Send Email
        const resendApiKey = process.env.RESEND_API_KEY;
        const adminEmail = process.env.ADMIN_EMAIL || "admin@revorgs.com";

        if (resendApiKey) {
            // Construct email body from details
            const servicesList = (quote_details.selectedServices as string[]).join(", ");
            const totals = quote_details.totals as any;

            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${resendApiKey}`,
                },
                body: JSON.stringify({
                    from: "RevOrgs Quotes <onboarding@resend.dev>",
                    to: [adminEmail],
                    subject: `New Quote Request from ${name}`,
                    html: `
                  <h1>New Quote Request</h1>
                  <p><strong>Client:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                  <hr/>
                  <h3>Quote Details:</h3>
                  <p><strong>Services:</strong> ${servicesList}</p>
                  <p><strong>Total Upfront:</strong> ${totals?.oneTime} ${totals?.currency}</p>
                  <p><strong>Monthly:</strong> ${totals?.monthly} ${totals?.currency}</p>
                  <p><strong>VAT Included:</strong> ${totals?.includeVAT ? 'Yes' : 'No'}</p>
                `,
                }),
            });
        }

        return {
            success: true,
            message: "Quote request submitted successfully! We will contact you soon.",
        };

    } catch (error) {
        console.error("Server Error:", error);
        return {
            success: false,
            message: "An unexpected error occurred.",
        };
    }
}
