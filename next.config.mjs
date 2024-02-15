/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.100.53',
        pathname: '**'
      }
    ]
  },
  reactStrictMode: true
}

export default nextConfig
