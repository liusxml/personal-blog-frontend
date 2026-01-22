import type { ReactNode } from 'react';

export default function ArticleLayout({ children }: { children: ReactNode }) {
    return children;
}

// 禁用 Next.js 的自动滚动恢复，使用手动控制
export const dynamic = 'force-dynamic';
