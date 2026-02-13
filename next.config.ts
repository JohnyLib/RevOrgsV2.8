import type { NextConfig } from "next";

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "revorgs.xyz",
      },
      {
        protocol: "https",
        hostname: "legalgrup.md",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
