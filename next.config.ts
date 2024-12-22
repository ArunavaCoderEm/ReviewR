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
};

export default nextConfig;
