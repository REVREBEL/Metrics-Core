/** @type {import("next").NextConfig} */

/**
 * Defines and returns an array of header configuration objects for the server.
 *
 * In this case, applies the specified HTTP headers to all routes matching the `/(.*)` pattern.
 * These headers instruct robots/crawlers (like search engines) to not index, follow, cache, or
 * create snippets of the site's pages or images.
 *
 * @returns {Array<Object>} List of header configurations for use in the server.
 */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ["192.168.8.220"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      },
    ];
  },
  experimental: {
    externalDir: true,
  },
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
