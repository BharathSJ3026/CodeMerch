/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    qualities: [60, 75, 85],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [112, 256, 384],
    minimumCacheTTL: 31536000, // 1 year – immutable local assets
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
