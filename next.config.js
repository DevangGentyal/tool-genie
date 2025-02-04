/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  reactStrictMode: true,
  // swcMinify: true,
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
    SEARCH_ENGINE_ID: process.env.SEARCH_ENGINE_ID || "",
  }
}

module.exports = nextConfig 