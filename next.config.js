/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  trailingSlash: true,

  images: {
    domains: ['s3.pirveli.ge'],
    disableStaticImages: true
  },

  async rewrites() {
    return [
     
      {
        source: "/asclepius/v1/:path*",
        destination:
          "https://asclepius.pirveli.ge/asclepius/v1/:path*",
      },
     
    ];
  },
};
