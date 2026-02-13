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
  metadataBase: new URL("https://revorgs.xyz"),
  title: "RevOrgs - Freelance Web Developers",
  description: "Construim site-uri care generează clienți și automatizăm procesele pentru a-ți crește afacerea.",
  openGraph: {
    title: "RevOrgs - Freelance Web Developers",
    description: "Construim site-uri care generează clienți și automatizăm procesele pentru a-ți crește afacerea.",
    url: "https://revorgs.xyz",
    siteName: "RevOrgs",
    images: [
      {
        url: "https://revorgs.xyz/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RevOrgs - Freelance Web Developers",
    description: "Site-uri rapide și automatizare pentru business-ul tău.",
    images: ["https://revorgs.xyz/og-image.jpg"],
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
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.revorgs.xyz",
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
