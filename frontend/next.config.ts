import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Client-side configuration
  output: 'standalone',
  
  // Fix workspace root warning
  outputFileTracingRoot: process.cwd(),
  
  // Webpack config for better module handling
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

export default nextConfig;
