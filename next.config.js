/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // https://nextjs.org/docs/pages/api-reference/components/image#domains
    // domains: ['images-na.ssl-images-amazon.com', 'i.gr-assets.com', 'images.unsplash.com'],
    // https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'i.gr-assets.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
