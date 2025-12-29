import ArticleCard from './ArticleCard';
import type { ArticleListVO } from '@/lib/types';

interface ArticleListProps {
    articles: ArticleListVO[];
}

export default function ArticleList({ articles }: ArticleListProps) {
    if (articles.length === 0) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    暂无文章
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}
