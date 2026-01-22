import { getArticleById, getRelatedArticles } from '@/lib/api';
import { ArticleListVO, ArticleDetailVO } from '@/lib/types';
import ArticleContent from '@/components/article/ArticleContent';
import TableOfContents from '@/components/article/TableOfContents';
import RelatedArticles from '@/components/article/RelatedArticles';
import CommentSection from '@/components/comment/CommentSection';
import ReadingProgress from '@/components/article/ReadingProgress';
import ScrollToTop from '@/components/article/ScrollToTop';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
    const { id } = await params;
    const articleId = id; // Keep as string for Snowflake ID precision

    // 并行获取数据
    let article: ArticleDetailVO | null = null;
    let relatedArticles: ArticleListVO[] = [];
    let error: string | null = null;

    try {
        [article, relatedArticles] = await Promise.all([
            getArticleById(articleId),
            getRelatedArticles(articleId, 5),
        ]);
    } catch (err) {
        error = err instanceof Error ? err.message : '获取文章失败';
        console.error('Failed to fetch article:', err);
    }

    if (error || !article) {
        return (
            <main className="container mx-auto px-6 py-12">
                <div
                    className="rounded-xl border p-8 text-center"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        borderColor: 'var(--color-border)',
                    }}
                >
                    <p style={{ color: 'var(--color-error)' }}>
                        {error || '文章不存在'}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <>
            <ReadingProgress />
            <main className="container mx-auto px-6 py-12">
                <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 max-w-6xl mx-auto">
                    <article className="flex-1 min-w-0 max-w-4xl">
                        <ArticleContent article={article} />
                        <RelatedArticles articles={relatedArticles} />
                        <CommentSection articleId={article.id} />
                    </article>
                    <aside className="hidden xl:block w-64 shrink-0">
                        <TableOfContents content={article.content} />
                    </aside>
                </div>
            </main>
            <ScrollToTop />
        </>
    );
}
