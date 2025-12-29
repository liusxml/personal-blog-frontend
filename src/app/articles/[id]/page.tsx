import { getArticleById, getRelatedArticles, getComments } from '@/lib/api';
import { CommentTargetType } from '@/lib/types';
import CommentSection from '@/components/comment/CommentSection';
import ArticleCard from '@/components/article/ArticleCard';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
    const { id } = await params;
    const articleId = parseInt(id, 10);

    if (isNaN(articleId)) {
        notFound();
    }

    // 并行获取数据
    let article = null;
    let relatedArticles = [];
    let comments = [];
    let error = null;

    try {
        [article, relatedArticles, comments] = await Promise.all([
            getArticleById(articleId),
            getRelatedArticles(articleId, 3),
            getComments(CommentTargetType.ARTICLE, articleId),
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
        <main className="container mx-auto px-6 py-12">
            {/* 文章头部 */}
            <article className="mx-auto max-w-4xl">
                <header className="mb-8">
                    <h1
                        className="mb-4 text-4xl font-bold md:text-5xl"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        {article.title}
                    </h1>

                    {/* Meta 信息 */}
                    <div
                        className="flex flex-wrap items-center gap-4 border-b pb-6"
                        style={{
                            color: 'var(--color-text-muted)',
                            borderColor: 'var(--color-border)',
                        }}
                    >
                        <span>{article.authorName}</span>
                        <span>·</span>
                        <span>{new Date(article.publishTime).toLocaleDateString('zh-CN')}</span>
                        <span>·</span>
                        <span>👁 {article.viewCount} 次浏览</span>
                        <span>·</span>
                        <span>💬 {article.commentCount} 条评论</span>
                    </div>

                    {/* 标签 */}
                    {article.tags && article.tags.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="rounded-full px-4 py-2"
                                    style={{
                                        backgroundColor: 'rgba(110, 38, 255, 0.1)',
                                        color: 'var(--color-primary)',
                                    }}
                                >
                                    #{tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                {/* 文章内容 */}
                <div
                    className="prose prose-invert max-w-none mb-16"
                    style={{ color: 'var(--color-text-secondary)' }}
                    dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                />

                {/* 评论区 */}
                <section className="mb-16">
                    <h2
                        className="mb-6 text-2xl font-bold"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        评论 ({article.commentCount})
                    </h2>
                    <CommentSection comments={comments} />
                </section>
            </article>

            {/* 相关文章 */}
            {relatedArticles.length > 0 && (
                <section className="mx-auto max-w-6xl">
                    <h2
                        className="mb-6 text-2xl font-bold"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        相关文章
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {relatedArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
