'use client';

import Link from 'next/link';
import { ArticleListVO } from '@/lib/types';

interface Props {
    article: ArticleListVO;
}

export default function HeroSection({ article }: Props) {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            {/* 霓虹渐变背景 */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, rgba(255, 158, 0, 0.15) 0%, rgba(255, 0, 110, 0.1) 50%, rgba(0, 85, 255, 0.15) 100%)',
                }}
            />

            {/* 动态网格背景 */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 158, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 158, 0, 0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                }}
            />

            {/* 内容区 */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* 标签 */}
                    <div className="mb-6">
                        <span
                            className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                            style={{
                                background: 'rgba(255, 158, 0, 0.2)',
                                color: '#FF9E00',
                                border: '1px solid rgba(255, 158, 0, 0.3)',
                            }}
                        >
                            ✨ 最新文章
                        </span>
                    </div>

                    {/* 标题 */}
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                        style={{
                            background: 'linear-gradient(135deg, #FF9E00 0%, #FFD700 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {article.title}
                    </h1>

                    {/* 摘要 */}
                    <p
                        className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {article.summary}
                    </p>

                    {/* 元信息 */}
                    <div
                        className="flex items-center justify-center gap-6 mb-10 text-sm"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        <span>👤 {article.authorName}</span>
                        <span>📅 {new Date(article.publishTime).toLocaleDateString('zh-CN')}</span>
                        {article.viewCount !== undefined && <span>👁 {article.viewCount} 阅读</span>}
                    </div>

                    {/* CTA 按钮 */}
                    <Link href={`/articles/${article.id}`}>
                        <button
                            className="group relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            style={{
                                background: 'linear-gradient(135deg, #FF9E00 0%, #FFD700 100%)',
                                color: '#0F1419',
                                boxShadow: '0 10px 40px rgba(255, 158, 0, 0.3)',
                            }}
                        >
                            <span className="relative z-10">阅读全文 →</span>
                            <div
                                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: 'linear-gradient(135deg, #FFD700 0%, #FF9E00 100%)',
                                }}
                            />
                        </button>
                    </Link>
                </div>
            </div>

            {/* 底部渐变 */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32"
                style={{
                    background: 'linear-gradient(to bottom, transparent, var(--color-bg-main))',
                }}
            />
        </section>
    );
}
