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
      {
        source: "/asclepius/v1/api/clinics/:path*/doctors",
        destination:
          "https://asclepius.pirveli.ge/asclepius/v1/api/clinics/:path*/doctors",
      },
      {
        source: "/asclepius/v1/api/doctors/freelancers:path*",
        destination:
          "https://asclepius.pirveli.ge/asclepius/v1/api/doctors/freelancers:path*",
      },
      {
        source: "/asclepius/v1/api/payment/bog/checkout/orders",
        destination:
          "https://asclepius.pirveli.ge/asclepius/v1/api/payment/bog/checkout/orders",
      },
    ];
  },
};
