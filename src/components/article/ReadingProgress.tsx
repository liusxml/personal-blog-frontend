'use client';

import { useState, useEffect } from 'react';

export default function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setProgress(Math.min(100, Math.max(0, scrollPercent)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // 初始计算

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 h-1 z-50 transition-all duration-150"
            style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #6E26FF 0%, #FF6B35 50%, #FFD700 100%)',
                boxShadow: '0 0 10px rgba(110, 38, 255, 0.5)'
            }}
        />
    );
}
