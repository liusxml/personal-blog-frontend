import ArticleList from '@/components/article/ArticleList';
import LiveClock from '@/components/LiveClock';
import { getArticles } from '@/lib/api';

export default async function Home() {
  // 获取文章列表（服务端渲染）
  let articles = [];
  let error = null;

  try {
    const pageResult = await getArticles({ current: 1, size: 12 });
    articles = pageResult.records;
  } catch (err) {
    error = err instanceof Error ? err.message : '获取文章失败';
    console.error('Failed to fetch articles:', err);
  }

  return (
    <main className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1
          className="mb-4 text-5xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          欢迎来到
          <span
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #FFA500 50%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {' '}SX Lab
          </span>
        </h1>
        <p
          className="mx-auto max-w-2xl text-xl mb-8"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          分享技术见解，记录学习历程
        </p>

        {/* 实时时钟 */}
        <LiveClock />
      </section>

      {/* 文章列表 */}
      <section>
        <h2
          className="mb-8 text-3xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          最新文章
        </h2>

        {error ? (
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
        ) : (
          <ArticleList articles={articles} />
        )}
      </section>
    </main>
  );
}
