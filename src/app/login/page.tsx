"use client";

import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { AlertCircle, Mail, Lock, Loader2 } from "lucide-react";

function LoginForm() {
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        // If middleware redirects here, it might add an error query param
        const err = searchParams.get("error");
        if (err) setError(decodeURIComponent(err));
    }, [searchParams]);

    const handleGoogleLogin = async () => {
        setError(null);
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);

        if (authMode === "signup") {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                }
            });
            if (error) {
                setError(error.message);
            } else {
                setMessage("Check your email for the confirmation link.");
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                setError(error.message);
            } else {
                // Successful login will be handled by middleware/redirect or auth state listener usually,
                // but for now let's just refresh or let the callback handle it if we used that flow.
                // Actually signInWithPassword returns a session. We should redirect.
                window.location.href = "/admin";
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Terminal/Brand */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-gray-900 border-r border-gray-800">
                <div>
                    <div className="font-mono text-2xl font-bold text-white mb-8">
                        <span className="text-code-green">&gt;</span> RevOrgs<span className="animate-blink">_</span>
                    </div>
                    <div className="font-mono text-gray-400 space-y-4">
                        <p className="text-green-400">$ systemctl start admin-panel</p>
                        <p>[OK] Loading core modules...</p>
                        <p>[OK] Initializing secure connection...</p>
                        <p className="animate-pulse">_ Waiting for authentication credentials...</p>
                    </div>
                </div>
                <div className="text-gray-600 text-sm font-mono">
                    © <span suppressHydrationWarning>{new Date().getFullYear()}</span> RevOrgs Inc. Restricted Access.
                </div>
            </div>

            {/* Right: Login Form */}
            <div className="bg-white dark:bg-background-dark flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center lg:text-left">
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white font-mono">
                            Admin Access
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Sign in to access the dashboard.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md flex items-start gap-3">
                            <AlertCircle className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" size={18} />
                            <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
                        </div>
                    )}

                    {message && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-md flex items-start gap-3">
                            <p className="text-sm text-green-600 dark:text-green-300">{message}</p>
                        </div>
                    )}

                    {/* Email Form */}
                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="focus:ring-code-blue focus:border-code-blue block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-terminal-black dark:text-white rounded-md py-2"
                                    placeholder="user@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    className="focus:ring-code-blue focus:border-code-blue block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-terminal-black dark:text-white rounded-md py-2"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <button
                                type="button"
                                onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
                                className="font-medium text-code-blue hover:text-code-purple transition-colors"
                            >
                                {authMode === "signin" ? "Need an account?" : "Already have an account?"}
                            </button>
                            {authMode === "signin" && (
                                <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Forgot password?</a>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-code-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                        >
                            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : (authMode === "signin" ? "Sign In with Email" : "Sign Up with Email")}
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-background-dark text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-sm shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-terminal-black hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-all"
                    >
                        {/* Google Icon */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen grid lg:grid-cols-2">
                <div className="hidden lg:flex flex-col justify-between p-12 bg-gray-900 border-r border-gray-800">
                    <div>
                        <div className="font-mono text-2xl font-bold text-white mb-8">
                            <span className="text-code-green">&gt;</span> RevOrgs<span className="animate-blink">_</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-background-dark flex flex-col justify-center items-center p-8">
                    <Loader2 className="animate-spin h-8 w-8 text-code-blue" />
                </div>
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
