import Link from 'next/link';
import type { ArticleListVO } from '@/lib/types';

interface ArticleCardProps {
    article: ArticleListVO;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Link href={`/articles/${article.id}`}>
            <article
                className="group h-full rounded-xl border p-6 transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border)',
                }}
            >
                {/* 标题 */}
                <h2
                    className="mb-3 text-2xl font-bold transition-colors group-hover:text-[var(--color-primary)]"
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    {article.title}
                </h2>

                {/* 摘要 */}
                <p
                    className="mb-4 line-clamp-3"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    {article.summary}
                </p>

                {/* 标签 */}
                {article.tags && article.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="rounded-full px-3 py-1 text-sm"
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

                {/* Meta 信息 */}
                <div
                    className="flex items-center justify-between border-t pt-4"
                    style={{ borderColor: 'var(--color-border)' }}
                >
                    <div
                        className="flex items-center gap-2"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        <span>{article.authorName}</span>
                        <span>·</span>
                        <span>{new Date(article.publishTime).toLocaleDateString('zh-CN')}</span>
                    </div>

                    <div
                        className="flex items-center gap-4 text-sm"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        <span>👁 {article.viewCount}</span>
                        <span>💬 {article.commentCount}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
