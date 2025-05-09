const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
