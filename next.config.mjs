/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        // port: "1337",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
