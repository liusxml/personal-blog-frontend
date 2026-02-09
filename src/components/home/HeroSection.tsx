'use client';

import Link from 'next/link';
import { ArticleListVO } from '@/lib/types';
import { ImageWithFallback } from '@/components/ImageWithFallback';

interface Props {
    article: ArticleListVO;
}

export default function HeroSection({ article }: Props) {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
            {/* 大图背景 */}
            {article.coverImage ? (
                <>
                    <ImageWithFallback
                        src={article.coverImage}
                        fileId={article.coverImageId}
                        alt={article.title}
                        fill
                        priority
                        unoptimized
                        className="object-cover"
                        sizes="100vw"
                    />
                    {/* 彩色渐变遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 via-purple-500/30 to-blue-500/40" />
                </>
            ) : (
                /* 无图片时的渐变背景 */
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255, 158, 0, 0.15) 0%, rgba(255, 0, 110, 0.1) 50%, rgba(0, 85, 255, 0.15) 100%)',
                    }}
                />
            )}

            {/* 内容区 */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* 标签 */}
                    <div className="mb-6 animate-fade-in">
                        <span
                            className="inline-block px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
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
                        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up"
                        style={{
                            background: 'linear-gradient(135deg, #FF9E00 0%, #FFD700 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 40px rgba(255, 158, 0, 0.3)',
                        }}
                    >
                        {article.title}
                    </h1>

                    {/* 摘要 */}
                    <p
                        className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto animate-fade-in-delay"
                        style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        {article.summary || ''}
                    </p>

                    {/* 元信息 */}
                    <div
                        className="flex items-center justify-center gap-6 mb-10 text-sm animate-fade-in-delay-2"
                        style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            textShadow: '0 1px 5px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <span>👤 {article.authorName}</span>
                        <span>📅 {new Date(article.publishTime).toLocaleDateString('zh-CN')}</span>
                        {article.viewCount !== undefined && <span>👁 {article.viewCount} 阅读</span>}
                    </div>

                    {/* CTA 按钮 - 加入发光效果 */}
                    <Link href={`/articles/${article.id}`}>
                        <button
                            className="group relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 animate-fade-in-delay-3"
                            style={{
                                background: 'linear-gradient(135deg, #FF9E00 0%, #FFD700 100%)',
                                color: '#0F1419',
                                boxShadow: '0 10px 40px rgba(255, 158, 0, 0.4), 0 0 20px rgba(255, 200, 0, 0.3)',
                                animation: 'pulse-glow 2s infinite',
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

            <style jsx>{`
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 10px 40px rgba(255, 158, 0, 0.4), 0 0 20px rgba(255, 200, 0, 0.3); }
                    50% { box-shadow: 0 10px 50px rgba(255, 158, 0, 0.6), 0 0 30px rgba(255, 200, 0, 0.5); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-up {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
                .animate-slide-up {
                    animation: slide-up 1s ease-out;
                }
                .animate-fade-in-delay {
                    animation: fade-in 1s ease-out 0.3s both;
                }
                .animate-fade-in-delay-2 {
                    animation: fade-in 1s ease-out 0.5s both;
                }
                .animate-fade-in-delay-3 {
                    animation: fade-in 1s ease-out 0.7s both;
                }
            `}</style>
        </section>
    );
}
