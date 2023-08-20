/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    rewrites() {
        return [
            {
                source: '/api/admin/:path*',
                destination: 'http://188.120.239.41:9991/admin/:path*',
            },
            {
                source: '/api/files/:path*',
                destination: 'http://188.120.239.41:9991/files/:path*',
            }
        ]
    }
}

module.exports = nextConfig
