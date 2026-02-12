"use client";

import React, { useActionState, useState } from "react";
import { sendContactMessage, ContactState } from "@/app/actions/contact";
import { Loader2 } from "lucide-react";

const initialState: ContactState = {
    message: "",
};

export function ContactForm() {
    const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);

    return (
        <form action={formAction} className="space-y-6">
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    &lt;Email&gt;
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="block w-full rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-gray-500 dark:focus:border-gray-400 sm:text-sm font-mono py-3 px-4"
                    placeholder="blooming@datedesign.com"
                />
                {state.errors?.email && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
                )}
            </div>
            <div>
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    &lt;Message&gt;
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="block w-full rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-gray-500 dark:focus:border-gray-400 sm:text-sm font-mono py-3 px-4"
                    placeholder="// Describe your project here..."
                ></textarea>
                {state.errors?.message && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.message[0]}</p>
                )}
            </div>

            {state.message && (
                <div className={`p-3 rounded text-sm ${state.success ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
                    {state.message}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Executing...
                    </>
                ) : (
                    "Execute ↵"
                )}
            </button>
        </form>
    );
}
