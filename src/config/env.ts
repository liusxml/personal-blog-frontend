// ============================================
// 环境变量配置
// ============================================

const env = {
    // API 基础 URL
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',

    // 是否开发环境
    isDevelopment: process.env.NODE_ENV === 'development',

    // 是否生产环境
    isProduction: process.env.NODE_ENV === 'production',
} as const;

export default env;
