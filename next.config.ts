import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.10.70",
        port: "5000",
        pathname: "/public/uploads/images/**",
      },
      {
        protocol: "https",
        hostname: "**", // keep your fallback
      },
    ],
  },
};

export default nextConfig;
