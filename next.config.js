/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  trailingSlash: true,

  async rewrites() {
    return [
      {
        source: "/asclepius/v1/api/clinics/",
        destination: "https://asclepius.pirveli.ge/asclepius/v1/api/clinics/",
      },
      {
        source: "/asclepius/v1/api/clinics/search",
        destination:
          "https://asclepius.pirveli.ge/asclepius/v1/api/clinics/search",
      },
      {
        source: "/asclepius/v1/api/clinics/:path*",
        destination:
          "https://asclepius.pirveli.ge/asclepius/v1/api/clinics/:path*",
      },
    ];
  },
};
