/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://github.com/vercel/next.js/issues/44273
  // Module not found: Can't resolve 'utf-8-validate' in '/project/sandbox/node_modules/ws/lib'
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    })
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = nextConfig
