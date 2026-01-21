'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { ArticleDetailVO } from '@/lib/types';
import 'highlight.js/styles/github-dark.css';

interface Props {
    article: ArticleDetailVO;
}

export default function ArticleContent({ article }: Props) {
    return (
        <div>
            {/* 文章头部 */}
            <header className="mb-8">
                <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ color: 'var(--color-text-primary)' }}>
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
                    <span>{article.authorName || '匿名作者'}</span>
                    <span>·</span>
                    <span>{new Date(article.publishTime).toLocaleDateString('zh-CN')}</span>
                    {article.viewCount !== undefined && (
                        <>
                            <span>·</span>
                            <span>👁 {article.viewCount} 次浏览</span>
                        </>
                    )}
                    {article.commentCount !== undefined && (
                        <>
                            <span>·</span>
                            <span>💬 {article.commentCount} 条评论</span>
                        </>
                    )}
                </div>

                {/* 标签 */}
                {article.tags && article.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="rounded-full px-4 py-2"
                                style={{
                                    backgroundColor: tag.color ? `${tag.color}20` : 'rgba(110, 38, 255, 0.1)',
                                    color: tag.color || 'var(--color-primary)',
                                }}
                            >
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* Markdown 内容 */}
            <div
                className="
                    prose prose-lg dark:prose-invert max-w-none mb-16
                    prose-headings:scroll-mt-20
                    prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8 prose-h1:mt-12
                    prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-6 prose-h2:mt-10
                    prose-h2:border-b prose-h2:pb-3
                    prose-h3:text-2xl prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-8
                    prose-p:leading-relaxed prose-p:text-base prose-p:mb-6
                    prose-li:leading-relaxed
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-code:text-pink-400 prose-code:before:content-none prose-code:after:content-none
                    prose-strong:text-primary prose-strong:font-semibold
                    prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2
                "
                style={{
                    color: 'var(--color-text-secondary)',
                    '--color-primary': 'var(--color-primary)',
                    '--color-border': 'var(--color-border)'
                } as React.CSSProperties}
            >
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeSlug]}
                    components={{
                        // 确保表格正确渲染
                        table: ({ node, ...props }) => (
                            <table
                                className="w-full border-collapse my-8 shadow-lg rounded-lg overflow-hidden"
                                style={{
                                    borderColor: 'var(--color-border)',
                                    background: 'linear-gradient(to bottom, rgba(110, 38, 255, 0.03), transparent)'
                                }}
                                {...props}
                            />
                        ),
                        thead: ({ node, ...props }) => (
                            <thead
                                style={{
                                    background: 'linear-gradient(135deg, rgba(110, 38, 255, 0.15), rgba(110, 38, 255, 0.08))',
                                    borderBottom: '2px solid var(--color-primary)'
                                }}
                                {...props}
                            />
                        ),
                        th: ({ node, ...props }) => (
                            <th
                                className="px-4 py-2 text-left font-semibold"
                                style={{
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text-primary)'
                                }}
                                {...props}
                            />
                        ),
                        td: ({ node, ...props }) => (
                            <td
                                className="px-4 py-2 border"
                                style={{
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text-secondary)'
                                }}
                                {...props}
                            />
                        ),
                        tbody: ({ node, ...props }) => (
                            <tbody {...props} />
                        ),
                        tr: ({ node, ...props }) => (
                            <tr
                                className="border-b"
                                style={{ borderColor: 'var(--color-border)' }}
                                {...props}
                            />
                        ),
                        // 代码块使用等宽字体
                        pre: ({ node, ...props }) => (
                            <pre
                                className="overflow-x-auto p-4 rounded my-4"
                                style={{
                                    backgroundColor: 'var(--color-bg-card)',
                                    fontFamily: 'monospace'
                                }}
                                {...props}
                            />
                        ),
                    }}
                >
                    {article.content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
