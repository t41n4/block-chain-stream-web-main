
const builderConfig = {
  // output: 'export',

  // Optional: Change the output directory `out` -> `dist`
  distDir: 'dist',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...builderConfig,
  // experimental: {
  //   serverActions: true,
  // },
  reactStrictMode: false,

  publicRuntimeConfig: {
    public_stream_server: process.env.PUBLIC_STREAM_SERVER,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
    domains: [
      'localhost',
      'firebasestorage.googleapis.com',
      'via.placeholder.com',
      'cdn.builder.io',
      'i1.sndcdn.com',
      'i.ytimg.com',
      'yt3.ggpht.com',
      'cdn.pixabay.com',
    ],
  },
};

console.log('nextConfig: ', nextConfig);
module.exports = nextConfig;
