/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    rewrites() {
        return [
            {
                source: '/api/admin/:path*',
                destination: 'http://188.120.239.41:9991/admin/:path*',
                // destination: 'http://localhost:3000/admin/:path*',
            }
        ]
    }
}

module.exports = nextConfig
