/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  reactStrictMode: true,
  // swcMinify: true,
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  }
}

module.exports = nextConfig 