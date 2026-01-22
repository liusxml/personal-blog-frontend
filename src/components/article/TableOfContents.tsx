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
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        // 解析 Markdown 标题生成目录
        const headings = content.match(/^#{1,3}\s+.+$/gm) || [];
        const items = headings.map((heading) => {
            const match = heading.match(/^(#+)\s+(.+)$/);
            if (!match) return null;
            const text = match[2].replace(/[#*`]/g, ''); // 移除 Markdown 符号
            // 生成与 rehype-slug 相同的 ID（转小写，替换空格为连字符）
            const id = text
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\u4e00-\u9fa5-]/g, ''); // 保留中文、字母、数字、连字符
            return {
                id,
                text,
                level: match[1].length,
            };
        }).filter(Boolean) as TocItem[];
        setToc(items);
    }, [content]);

    useEffect(() => {
        if (toc.length === 0) return;

        // 等待浏览器完成初始滚动位置恢复
        const setupObserver = () => {
            const observer = new IntersectionObserver(
                (entries) => {
                    // 只在用户主动滚动时更新 activeId
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

            // 等待 DOM 完全渲染和浏览器滚动恢复
            const headingElements = document.querySelectorAll('h1[id], h2[id], h3[id]');
            headingElements.forEach((el) => observer.observe(el));

            return observer;
        };

        // 延迟设置 observer，让浏览器先完成滚动恢复
        const timer = setTimeout(setupObserver, 500);

        return () => {
            clearTimeout(timer);
        };
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
            className="sticky top-20 border rounded-lg backdrop-blur-sm overflow-hidden transition-all duration-300"
            style={{
                backgroundColor: 'rgba(30, 30, 30, 0.8)',
                borderColor: 'var(--color-border)',
                maxHeight: isCollapsed ? '60px' : 'calc(100vh - 120px)',
            }}
        >
            {/* 折叠/展开按钮 */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <span>📑</span> 目录
                </h3>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="transition-transform duration-300"
                    style={{
                        transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                        color: 'var(--color-text-muted)'
                    }}
                >
                    <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            {/* 目录列表 */}
            <div
                className="overflow-y-auto px-4 pb-4"
                style={{
                    maxHeight: isCollapsed ? '0' : 'calc(100vh - 180px)',
                    opacity: isCollapsed ? 0 : 1,
                    transition: 'max-height 0.3s ease, opacity 0.3s ease'
                }}
            >
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
            </div>
        </nav>
    );
}
