/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  // Skip type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Make sure we're not using cached data
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
          {
            key: 'X-Version',
            value: 'new-version-feb-27-2024',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
