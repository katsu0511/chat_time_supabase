import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [process.env.ORIGIN_URL ?? ''],
};

export default nextConfig;
