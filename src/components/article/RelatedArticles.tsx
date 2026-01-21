import Link from 'next/link';
import { ArticleListVO } from '@/lib/types';

interface Props {
    articles: ArticleListVO[];
}

export default function RelatedArticles({ articles }: Props) {
    if (!articles.length) return null;

    return (
        <section className="mb-16">
            <h2
                className="mb-6 text-2xl font-bold"
                style={{ color: 'var(--color-text-primary)' }}
            >
                相关文章
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {articles.map((article) => (
                    <Link
                        key={article.id}
                        href={`/articles/${article.id}`}
                        className="block p-4 border rounded-lg hover:border-primary transition-colors"
                        style={{
                            backgroundColor: 'var(--color-bg-card)',
                            borderColor: 'var(--color-border)',
                        }}
                    >
                        <h3
                            className="font-medium line-clamp-2 mb-2"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            {article.title}
                        </h3>
                        <p
                            className="text-sm line-clamp-2"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            {article.summary}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
