/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Enable SPA-like page transitions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Optimize image loading
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    }

    // Optimize bundle size
    if (!isServer) {
      // Use source maps only in development
      config.devtool = process.env.NODE_ENV === 'development' ? 'source-map' : false;
      
      // Split chunks more aggressively
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](@next|next|react|react-dom)[\\/]/,
            priority: 40,
            chunks: 'all',
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            priority: 30,
            chunks: 'all',
            name(module) {
              // Add null check to prevent errors when module.context doesn't match the pattern
              const match = module.context ? module.context.match(/[\\/]node_modules[\\/](.+?)(?:[\\/]|$)/) : null;
              const packageName = match ? match[1] : 'vendor';
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      };
    }

    return config
  },
  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig
