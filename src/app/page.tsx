import ArticleList from '@/components/article/ArticleList';
import HeroSection from '@/components/home/HeroSection';
import FeaturedArticles from '@/components/home/FeaturedArticles';
import NewsletterSubscribe from '@/components/home/NewsletterSubscribe';
import { getArticles } from '@/lib/api';
import { ArticleListVO } from '@/lib/types';

export default async function Home() {
  // 获取文章列表（服务端渲染）
  let articles: ArticleListVO[] = [];
  let error: string | null = null;

  try {
    const pageResult = await getArticles({ current: 1, size: 10 });
    articles = pageResult.records;
  } catch (err) {
    error = err instanceof Error ? err.message : '获取文章失败';
    console.error('Failed to fetch articles:', err);
  }

  // 最新文章（用于 Hero）
  const latestArticle = articles[0];
  // Featured 文章（2-4篇）
  const featuredArticles = articles.slice(1, 4);
  // Recent 文章（5-10篇，取6篇）
  const recentArticles = articles.slice(4, 10);

  return (
    <main>
      {error ? (
        <div className="container mx-auto px-6 py-12">
          <div
            className="rounded-xl border p-8 text-center"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'var(--color-border)',
            }}
          >
            <p style={{ color: 'var(--color-error)' }}>
              {error}
            </p>
            <p
              className="mt-2 text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              请确保后端服务正在运行（http://localhost:8080）
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          {latestArticle && <HeroSection article={latestArticle} />}

          {/* Featured 区域 */}
          {featuredArticles.length > 0 && (
            <FeaturedArticles articles={featuredArticles} />
          )}

          {/* Recent 最新文章 */}
          <section className="py-16 bg-gradient-to-b from-transparent to-black/20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  最新文章
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  探索更多技术见解
                </p>
              </div>
              <ArticleList articles={recentArticles} />
            </div>
          </section>

          {/* Newsletter 订阅 */}
          <NewsletterSubscribe />
        </>
      )}
    </main>
  );
}
