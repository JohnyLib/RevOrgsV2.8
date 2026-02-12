import type { Metadata } from "next";
import { Fira_Code, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RevOrgs — Web Agency",
  description:
    "RevOrgs is a premier Moldova web development agency specializing in modern SPAs, Next.js, and digital transformation.",
  keywords: [
    "web agency",
    "Moldova",
    "web development",
    "React",
    "Next.js",
    "SPA",
    "RevOrgs",
  ],
  openGraph: {
    title: "RevOrgs — Web Agency",
    description:
      "Crafting digital experiences with precision. Moldova-based web agency.",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${firaCode.variable} ${jetbrainsMono.variable} bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-mono antialiased transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
