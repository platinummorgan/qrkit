/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['qrcode']
  },
  images: {
    formats: ['image/webp', 'image/avif']
  },
  // Enable static export for Vercel
  output: 'standalone',
  poweredByHeader: false,
  compress: true
}

module.exports = nextConfig