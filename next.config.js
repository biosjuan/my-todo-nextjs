/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
      {
        source: '/jso/:path*',
        destination: 'https://jsonplaceholder.typicode.com/:path*',
      },
    ];
  },
  images: {
    domains: ['via.placeholder.com'], // Add the hostname(s) here
  },
};

module.exports = nextConfig;
