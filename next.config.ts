import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dilxbtgss/**', // Remplace par ton sous-domaine Cloudinary
      },
    ],
  },
};

export default nextConfig;
