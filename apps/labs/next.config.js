/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@repo/ui'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext-files-dev.thonlabs.io',
      },
      {
        protocol: 'https',
        hostname: 'ext-files.thonlabs.io',
      },
    ],
  },
};
