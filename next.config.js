const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dam.malt.com",
      },
      {
        protocol: "https",
        hostname: "labs.hackthebox.com",
      },
      {
        protocol: "https",
        hostname: "www.hackthebox.com",
      },
      {
        protocol: "https",
        hostname: "hackthebox.com",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);