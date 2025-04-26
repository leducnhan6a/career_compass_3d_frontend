export const config = {
    // Đảm bảo sử dụng API_END_POINT từ .env, và kiểm tra sự tồn tại của biến môi trường
    apiEndpoint: process.env.NEXT_PUBLIC_API_END_POINT || '', // Dùng giá trị mặc định nếu không có giá trị từ .env
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '', // Lấy URL Supabase từ .env
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY || '', // Lấy Supabase Key từ .env
    mongoUri: process.env.MONGO_URI || '', // Lấy Mongo URI từ .env
    posthog: {
        key: process.env.NEXT_PUBLIC_POSTHOG_KEY || '', // Key cho PostHog
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST || '', // Host cho PostHog
    },
    gtagId: process.env.GTAG_ID || '', // Google Tag ID từ .env
    discord: {
        serverChannelId: process.env.CHANNELID_DISCORD_SERVER || '', // Discord Server ID
        botToken: process.env.CHANNELID_DISCORD_BOT_TOKEN || '', // Discord Bot Token
    },
};

// Kiểm tra xem môi trường có phải là development không
export const isDev = process.env.NODE_ENV === 'development';
