import ArticleCard from '../article/ArticleCard';
import { ArticleListVO } from '@/lib/types';

interface Props {
    articles: ArticleListVO[];
}

export default function FeaturedArticles({ articles }: Props) {
    // 取前3篇作为精选
    const featured = articles.slice(0, 3);

    if (featured.length === 0) return null;

    return (
        <section className="py-16">
            <div className="container mx-auto px-6">
                {/* 标题 */}
                <div className="text-center mb-12">
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        精选推荐
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        为您精心挑选的优质内容
                    </p>
                </div>

                {/* 卡片网格 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featured.map((article) => (
                        <div
                            key={article.id}
                            className="group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
                            style={{
                                height: '500px',
                                background: 'rgba(30, 30, 30, 0.7)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 158, 0, 0.2)',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            <ArticleCard article={article} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
