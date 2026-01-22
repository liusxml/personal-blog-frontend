import { getCategoryBySlug, getArticles } from '@/lib/api';
import { ArticleListVO } from '@/lib/types';
import ArticleCard from '@/components/article/ArticleCard';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
    params: { slug: string };
}

// 动态生成分类 Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = params;

    try {
        const category = await getCategoryBySlug(slug);

        return {
            title: `${category.name} | SX Lab`,
            description: category.description || `${category.name}分类下的所有文章`,
            openGraph: {
                title: `${category.name} 分类`,
                description: category.description || `浏览 ${category.name} 分类下的所有文章`,
                type: 'website',
            },
        };
    } catch (error) {
        return {
            title: '分类不存在 | SX Lab',
        };
    }
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;

    let category = null;
    let articles: ArticleListVO[] = [];
    let error = null;

    try {
        category = await getCategoryBySlug(slug);
        const result = await getArticles({ categoryId: category.id });
        articles = result.records;
    } catch (err) {
        error = err instanceof Error ? err.message : '获取数据失败';
        console.error('Failed to fetch category:', err);
    }

    if (error || !category) {
        notFound();
    }

    return (
        <main className="container mx-auto px-6 py-12">
            {/* 分类头部 */}
            <header className="mb-8">
                <h1
                    className="text-3xl font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    {category.name}
                </h1>
                {category.description && (
                    <p
                        className="text-lg mt-2"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {category.description}
                    </p>
                )}
                <p
                    className="text-sm mt-1"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    {category.articleCount} 篇文章
                </p>
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
                        该分类下暂无文章
                    </p>
                </div>
            )}
        </main>
    );
}
