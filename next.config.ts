// next.config.ts
/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  experimental: {
    // Enable MCP server
    mcpServer: true,
  },
}

export default nextConfig;