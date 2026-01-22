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
    const [blessing, setBlessing] = useState('');

    useEffect(() => {
        setMounted(true);

        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            setTime({
                days: now.getDate(), // 当前日期（1-31）
                hours,
                minutes,
                seconds,
            });

            // 彩蛋：特殊时刻祝福语
            if (hours === 0 && minutes === 0 && seconds === 0) {
                setBlessing('🎉 新的一天开始啦！');
                setTimeout(() => setBlessing(''), 5000);
            } else if (minutes === 0 && seconds === 0) {
                setBlessing('⏰ 整点报时！');
                setTimeout(() => setBlessing(''), 3000);
            }
        };

        updateTime(); // 立即更新一次
        const interval = setInterval(updateTime, 1000); // 每秒更新

        return () => clearInterval(interval);
    }, []);

    // 防止水合不匹配：渲染骨架而不是 null
    if (!mounted) {
        return (
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-4">
                    <TimeUnitSkeleton />
                    <TimeUnitSkeleton />
                    <TimeUnitSkeleton />
                    <TimeUnitSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4">
            {blessing && (
                <div
                    className="animate-bounce text-2xl font-bold"
                    style={{
                        background: 'linear-gradient(135deg, #FF6B35 0%, #FFA500 50%, #FFD700 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    {blessing}
                </div>
            )}
            <div className="flex items-center justify-center gap-4">
                <TimeUnit value={time.days} label="日" />
                <TimeUnit value={time.hours} label="时" />
                <TimeUnit value={time.minutes} label="分" />
                <TimeUnit value={time.seconds} label="秒" />
            </div>

            {/* 开发测试按钮 - 可以删除 */}
            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => {
                        setBlessing('⏰ 整点报时！');
                        setTimeout(() => setBlessing(''), 3000);
                    }}
                    className="px-3 py-1 text-sm rounded-lg border"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-secondary)',
                    }}
                >
                    测试整点
                </button>
                <button
                    onClick={() => {
                        setBlessing('🎉 新的一天开始啦！');
                        setTimeout(() => setBlessing(''), 5000);
                    }}
                    className="px-3 py-1 text-sm rounded-lg border"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-secondary)',
                    }}
                >
                    测试午夜
                </button>
            </div>
        </div>
    );
}

// 骨架占位组件
function TimeUnitSkeleton() {
    return (
        <div
            className="flex flex-col items-center justify-center rounded-xl border px-6 py-6 animate-pulse"
            style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
                minWidth: '132px',
                minHeight: '122px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
        >
            <div
                className="h-14 w-16 rounded"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            />
            <div
                className="mt-2 h-4 w-8 rounded"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            />
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
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
