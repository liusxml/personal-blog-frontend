'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="
                fixed bottom-8 right-8 w-14 h-14 rounded-full
                bg-gradient-to-br from-primary to-purple-600
                flex items-center justify-center z-40
                transition-all duration-300
                hover:scale-110
                pulse-glow
            "
            aria-label="返回顶部"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </button>
    );
}
