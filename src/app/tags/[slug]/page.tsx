import { getTagBySlug, getArticles } from '@/lib/api';
import { ArticleListVO } from '@/lib/types';
import ArticleCard from '@/components/article/ArticleCard';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function TagPage({ params }: Props) {
    const { slug } = await params;

    let tag = null;
    let articles: ArticleListVO[] = [];
    let error = null;

    try {
        tag = await getTagBySlug(slug);
        const result = await getArticles({ tagId: tag.id });
        articles = result.records;
    } catch (err) {
        error = err instanceof Error ? err.message : '获取数据失败';
        console.error('Failed to fetch tag:', err);
    }

    if (error || !tag) {
        notFound();
    }

    return (
        <main className="container mx-auto px-6 py-12">
            {/* 标签头部 */}
            <header className="mb-8 flex items-center gap-3">
                <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: tag.color || '#6b7280' }}
                />
                <h1
                    className="text-3xl font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    {tag.name}
                </h1>
                <span
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    {tag.articleCount} 篇文章
                </span>
            </header>

            {/* 文章列表 */}
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <div
                    className="rounded-xl border p-8 text-center"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        borderColor: 'var(--color-border)',
                    }}
                >
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        该标签下暂无文章
                    </p>
                </div>
            )}
        </main>
    );
}
