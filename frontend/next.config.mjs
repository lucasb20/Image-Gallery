/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './services/Loader.tsx'
      },
};

export default nextConfig;
