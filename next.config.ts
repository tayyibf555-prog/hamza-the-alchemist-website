import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // The Transmutation page moved from /method to /transmutation.
      { source: "/method", destination: "/transmutation", permanent: true },
    ];
  },
};

export default nextConfig;
