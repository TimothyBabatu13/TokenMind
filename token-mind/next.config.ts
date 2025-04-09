import { createCivicAuthPlugin } from "@civic/auth/nextjs"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
const id = process.env.CIVIC_AUTH_SECRET;
const withCivicAuth = createCivicAuthPlugin({
  clientId: id!
});

export default withCivicAuth(nextConfig)