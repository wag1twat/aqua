import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    env: {
        NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST || `https://${process.env.VERCEL_URL}`,
    },
};

export default nextConfig;
