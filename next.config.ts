import type { NextConfig } from "next";

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

export default nextConfig;
