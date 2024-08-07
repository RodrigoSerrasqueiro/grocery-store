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
      {
        protocol: "https",
        hostname: "pngfre.com",
        // port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        // port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gallery.yopriceville.com",
        // port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        // port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wallpapers.com",
        // port: "1337",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
