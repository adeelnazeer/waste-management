import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'output: export' to allow API routes to work on Vercel
  // Vercel will automatically optimize static pages and use serverless functions for API routes
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "naeem.ie",
        pathname: "/gallery_gen/**",
      },
      {
        protocol: "https",
        hostname: "naeem.ie",
        pathname: "/gallery/**",
      },
    ],
  },
  // SEO optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
};

export default nextConfig;
