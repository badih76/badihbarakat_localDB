/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mysql2"]
  },
  env: {
    host: 'eu-cdbr-west-03.cleardb.net', //'58.84.143.251', 
    port: '3306', 
    user: 'b497fc3a1d6402',
    password: '43eda683', 
    database: 'heroku_861269146ee1eec', 
    DEV_HOST_URL: 'http://192.168.1.12:3000',             // 'http://localhost:3000',
    PROD_HOST_URL: 'https://app-badihbarakat-info.herokuapp.com'
  }
}

module.exports = nextConfig
