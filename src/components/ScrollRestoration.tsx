'use client';

import { useEffect } from 'react';

/**
 * 手动滚动位置恢复组件
 * 解决 Loading Skeleton 导致的滚动位置跳动问题
 */
export default function ScrollRestoration() {
    useEffect(() => {
        // 保存滚动位置
        const saveScrollPosition = () => {
            sessionStorage.setItem('scrollPosition', String(window.scrollY));
        };

        // 在用户导航离开前保存滚动位置
        window.addEventListener('beforeunload', saveScrollPosition);

        // 恢复滚动位置（延迟执行，等待内容加载完成）
        const savedPosition = sessionStorage.getItem('scrollPosition');
        if (savedPosition) {
            // 重要：延迟恢复，确保 DOM 完全渲染
            const timer = setTimeout(() => {
                window.scrollTo(0, parseInt(savedPosition, 10));
                sessionStorage.removeItem('scrollPosition'); // 清除已使用的位置
            }, 300);

            return () => {
                clearTimeout(timer);
                window.removeEventListener('beforeunload', saveScrollPosition);
            };
        }

        return () => {
            window.removeEventListener('beforeunload', saveScrollPosition);
        };
    }, []);

    return null;
}
