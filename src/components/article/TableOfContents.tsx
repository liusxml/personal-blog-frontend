'use client';

import { useEffect, useState, useCallback } from 'react';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface Props {
    content: string;
}

export default function TableOfContents({ content }: Props) {
    const [toc, setToc] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        // 解析 Markdown 标题生成目录
        const headings = content.match(/^#{1,3}\s+.+$/gm) || [];
        const items = headings.map((heading, index) => {
            const match = heading.match(/^(#+)\s+(.+)$/);
            if (!match) return null;
            return {
                id: `heading-${index}`,
                text: match[2].replace(/[#*`]/g, ''), // 移除 Markdown 符号
                level: match[1].length,
            };
        }).filter(Boolean) as TocItem[];
        setToc(items);
    }, [content]);

    useEffect(() => {
        if (toc.length === 0) return;

        // 使用 IntersectionObserver 监听标题可见性
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-80px 0px -80% 0px',
                threshold: 1.0
            }
        );

        // 给观察器一些时间等待 DOM 渲染
        setTimeout(() => {
            const headingElements = document.querySelectorAll('h1[id], h2[id], h3[id]');
            headingElements.forEach((el) => observer.observe(el));
        }, 100);

        return () => observer.disconnect();
    }, [toc]);

    const scrollToHeading = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, []);

    if (!toc.length) return null;

    return (
        <nav
            className="sticky top-20 p-6 border rounded-lg backdrop-blur-sm max-h-[calc(100vh-120px)] overflow-y-auto"
            style={{
                backgroundColor: 'rgba(30, 30, 30, 0.8)',
                borderColor: 'var(--color-border)',
            }}
        >
            <h3 className="font-bold mb-4 text-sm flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                <span>📑</span> 目录
            </h3>
            <ul className="space-y-1 text-sm">
                {toc.map((item) => (
                    <li
                        key={item.id}
                        style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                    >
                        <button
                            onClick={() => scrollToHeading(item.id)}
                            className={`
                w-full text-left py-1.5 px-3 rounded transition-all
                ${activeId === item.id
                                    ? 'bg-primary/20 font-medium'
                                    : 'hover:bg-primary/10'
                                }
              `}
                            style={{
                                color: activeId === item.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            }}
                        >
                            {item.text}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
