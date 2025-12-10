import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators:false,
  typescript: {
    ignoreBuildErrors: true, // ignore TypeScript errors
  },
   webpack: (config, { dev }) => {
    if (dev) {
      config.devServer = config.devServer || {};
      config.devServer.client = {
        overlay: false,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**", // Allow all HTTP hosts
      },
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS hosts
      },
    ],
  },
};

export default nextConfig;
