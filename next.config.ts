import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['scontent.xx.fbcdn.net', 'www.facebook.com'], // Adicione domínios relevantes.
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  compress: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  env: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
};

export default nextConfig;
