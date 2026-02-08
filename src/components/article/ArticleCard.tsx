import Link from 'next/link';
import Image from 'next/image';
import { ArticleListVO } from '@/lib/types';

interface Props {
    article: ArticleListVO;
}

export default function ArticleCard({ article }: Props) {
    return (
        <Link href={`/articles/${article.id}`}>
            <article
                className="group overflow-hidden rounded-xl border transition-all hover:shadow-xl"
                style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border)',
                }}
            >
                {/* 封面图 */}
                {article.coverImage && (
                    <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                )}

                {/* 内容区 */}
                <div className="p-6">
                    {/* 标题 */}
                    <h3
                        className="mb-2 text-xl font-bold transition-colors group-hover:text-primary line-clamp-2"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        {article.title}
                    </h3>

                    {/* 摘要 - 固定3行显示 */}
                    {article.summary && (
                        <p
                            className="mb-4 text-sm line-clamp-3"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            {article.summary}
                        </p>
                    )}

                    {/* 元信息 */}
                    <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        <time>{new Date(article.publishTime).toLocaleDateString('zh-CN')}</time>
                        {article.viewCount !== undefined && <span>👁 {article.viewCount}</span>}
                        {article.commentCount !== undefined && <span>💬 {article.commentCount}</span>}
                    </div>
                </div>
            </article>
        </Link>
    );
}
