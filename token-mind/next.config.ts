import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
// const id = process.env.CIVIC_AUTH_SECRET;
const id  = "25560fd6-cce9-46ac-8a24-c5ff41272160"
const withCivicAuth = createCivicAuthPlugin({
  clientId: id!
});

export default withCivicAuth(nextConfig)