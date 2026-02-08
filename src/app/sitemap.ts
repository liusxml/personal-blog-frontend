import { MetadataRoute } from 'next'
import { getArticles } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'

    try {
        // 获取所有已发布文章
        const articlesResponse = await getArticles({
            current: 1,
            size: 1000, // 获取所有文章
        })

        const articles = articlesResponse.records || []

        // 文章页面
        const articleUrls = articles.map((article) => ({
            url: `${baseUrl}/articles/${article.id}`,
            lastModified: new Date(article.publishTime),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        }))

        // 静态页面
        const routes = [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily' as const,
                priority: 1.0,
            },
            {
                url: `${baseUrl}/about`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.5,
            },
        ]

        return [...routes, ...articleUrls]
    } catch (error) {
        console.error('Failed to generate sitemap:', error)
        // 返回至少包含首页的sitemap
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily' as const,
                priority: 1.0,
            },
        ]
    }
}
