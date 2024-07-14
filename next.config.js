/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

const path = require('path')

// module.exports = {
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'myStyles')],
//   },
// }

module.exports = {
  extends: ['next/core-web-vitals', 'turbo', 'prettier'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'myStyles')],
  },
  transpilePackages: ['three'],
}

require('dotenv').config();
