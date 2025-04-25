import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/account123/**',
        search: '',
      },
    ],
  }
};
const id = process.env.CIVIC_AUTH_SECRET;
const withCivicAuth = createCivicAuthPlugin({
  clientId: id!
});

export default withCivicAuth(nextConfig)