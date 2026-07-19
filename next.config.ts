import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React 19 strict mode
  reactStrictMode: true,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },

  // Exclude Firebase Admin from client bundles
  serverExternalPackages: ["firebase-admin", "pino", "pino-pretty"],

  // Webpack: mark server-only modules
  webpack(config, { isServer }) {
    if (!isServer) {
      // Prevent firebase-admin from being bundled on client
      config.resolve.alias = {
        ...config.resolve.alias,
        "firebase-admin": false,
      };
    }
    return config;
  },
};

export default nextConfig;
