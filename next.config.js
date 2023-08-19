/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images-na.ssl-images-amazon.com', 'i.gr-assets.com', 'images.unsplash.com'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
