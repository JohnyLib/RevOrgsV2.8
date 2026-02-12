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
  metadataBase: new URL("https://rev-orgs-v2-8.vercel.app"),
  title: {
    default: "RevOrgs — Premium Web Development in Moldova",
    template: "%s | RevOrgs",
  },
  description:
    "RevOrgs is a web development agency in Chisinau, Moldova. We specialize in Next.js, React, and creating high-performance Single Page Applications (SPAs) for businesses.",
  keywords: [
    "Web Development Moldova",
    "IT Company Chisinau",
    "React Agency Moldova",
    "Next.js Developers",
    "Site Creation MD",
    "Web Design Moldova",
    "Software Development Chisinau",
    "RevOrgs",
  ],
  openGraph: {
    title: "RevOrgs — Premium Web Development in Moldova",
    description:
      "Crafting digital experiences with precision. Top-tier web agency in Republic of Moldova.",
    url: "https://rev-orgs-v2-8.vercel.app",
    siteName: "RevOrgs",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "RevOrgs Web Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RevOrgs — Web Agency Moldova",
    description: "Premium web development services in Chisinau, Moldova.",
    images: ["/api/og"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "RevOrgs",
    "url": "https://rev-orgs-v2-8.vercel.app",
    "areaServed": {
      "@type": "Country",
      "name": "Republic of Moldova"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chisinau",
      "addressCountry": "MD"
    },
    "description": "Premium Web Development Agency in Moldova.",
    "priceRange": "$$"
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${firaCode.variable} ${jetbrainsMono.variable} bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-mono antialiased transition-colors duration-300`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
