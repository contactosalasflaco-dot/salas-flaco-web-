import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cuando Shopify esté activo, habilitar su CDN:
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
