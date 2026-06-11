const nextConfig = {
  transpilePackages: ["@repo/ui"],
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
};

export default nextConfig;
