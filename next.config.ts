import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.app.goo.gl',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
