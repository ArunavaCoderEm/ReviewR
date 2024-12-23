/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Allows images from all HTTPS hosts
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during build processes
  },
  typescript: {
    ignoreBuildErrors: true, // Disable type checking during build
  },
};

export default nextConfig;
