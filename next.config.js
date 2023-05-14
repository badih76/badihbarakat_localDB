/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mysql2"]
  },
  env: {
    host: 'containers-us-west-53.railway.app', 
    port: 7857, 
    user: 'root',
    password: 'D2JeDWNtMrfj1BbO8RfQ', 
    database: 'railway', 
    DEV_HOST_URL: 'http://192.168.1.12:3000',             // 'http://localhost:3000',
    PROD_HOST_URL: 'https://app-badihbarakat-info.herokuapp.com'
  }
}

module.exports = nextConfig
