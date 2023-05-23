/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mysql2"]
  },
  env: {
    host: '58.84.143.251', 
    port: '3306', 
    user: 'root',
    password: 'Malmak-101', 
    database: 'badihbarakat', 
    DEV_HOST_URL: 'http://192.168.1.12:3000',             // 'http://localhost:3000',
    PROD_HOST_URL: 'https://app-badihbarakat-info.herokuapp.com'
  }
}

module.exports = nextConfig
