const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, 
  },
  assetPrefix: isProd ? '/demographfy-ai' : '',
  basePath: isProd ? '/demographfy-ai' : '',
  output: 'export',
};

export default nextConfig;