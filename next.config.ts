import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old standalone Vercel address forwards to the real site (permanent, 308).
      // Matches ONLY this exact host, so www.rakshithchandrashekar.com and all preview URLs are untouched.
      {
        source: "/:path*",
        has: [{ type: "host", value: "rakshith-portfolio-04.vercel.app" }],
        destination: "https://www.rakshithchandrashekar.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
