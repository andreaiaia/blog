const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};

module.exports = nextConfig;
