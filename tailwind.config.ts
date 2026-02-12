import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "terminal-black": "#0d1117",
                "code-blue": "#58a6ff",
                "code-green": "#3fb950",
                "code-purple": "#bc8cff",
                "code-yellow": "#d29922",
                "code-red": "#ff7b72",
                "code-gray": "#8b949e",
                "background-dark": "#0d1117",
                "background-light": "#ffffff",
            },
            animation: {
                blink: "blink 1s step-end infinite",
                "fade-in-up": "fadeInUp 0.5s ease-out forwards",
                marquee: "marquee 25s linear infinite",
            },
            keyframes: {
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
            },
            boxShadow: {
                "neon-blue": "0 0 5px theme('colors.code-blue'), 0 0 20px theme('colors.code-blue')",
                "neon-green": "0 0 5px theme('colors.code-green'), 0 0 20px theme('colors.code-green')",
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
