import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],  // 支持quality=100，消除警告
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.bitiful.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.bing.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
