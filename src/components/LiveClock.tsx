'use client';

import { useEffect, useState } from 'react';

export default function LiveClock() {
    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const updateTime = () => {
            const now = new Date();
            setTime({
                days: now.getDate(), // 当前日期（1-31）
                hours: now.getHours(),
                minutes: now.getMinutes(),
                seconds: now.getSeconds(),
            });
        };

        updateTime(); // 立即更新一次
        const interval = setInterval(updateTime, 1000); // 每秒更新

        return () => clearInterval(interval);
    }, []);

    if (!mounted) {
        return null; // 防止 SSR 不匹配
    }

    return (
        <div className="flex items-center justify-center gap-4">
            <TimeUnit value={time.days} label="Day" />
            <TimeUnit value={time.hours} label="Hours" />
            <TimeUnit value={time.minutes} label="Minutes" />
            <TimeUnit value={time.seconds} label="Seconds" />
        </div>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <div
            className="flex flex-col items-center justify-center rounded-xl border px-6 py-6"
            style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
                minWidth: '132px',
                minHeight: '122px',
            }}
        >
            <div
                className="text-5xl font-bold"
                style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #FFA500 50%, #FFD700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
            >
                {String(value).padStart(2, '0')}
            </div>
            <div
                className="mt-2 text-base"
                style={{ color: 'var(--color-text-muted)' }}
            >
                {label}
            </div>
        </div>
    );
}
