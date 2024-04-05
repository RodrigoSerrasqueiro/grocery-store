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
        hostname: "aprende-ja.s3.sa-east-1.amazonaws.com",
        // port: "1337",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
