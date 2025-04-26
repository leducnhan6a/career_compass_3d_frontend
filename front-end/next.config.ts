// next.config.js
import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    // Dùng middleware trong Next.js
    middleware: true,
  },
  images: {
    domains: ['images.unsplash.com', 'cdn.pixabay.com'],
  },
  env: {
    NEXT_PUBLIC_API_END_POINT: process.env.API_END_POINT,
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.SUPABASE_KEY,
    MONGO_URI: process.env.MONGO_URI,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    GTAG_ID: process.env.GTAG_ID,
    CHANNELID_DISCORD_SERVER: process.env.CHANNELID_DISCORD_SERVER,
    CHANNELID_DISCORD_BOT_TOKEN: process.env.CHANNELID_DISCORD_BOT_TOKEN,
  },
};

module.exports = nextConfig;
