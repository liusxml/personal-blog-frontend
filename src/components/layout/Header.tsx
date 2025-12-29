import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
    return (
        <header
            className="sticky top-0 z-50 border-b backdrop-blur-md"
            style={{
                backgroundColor: 'color-mix(in srgb, var(--color-bg-main) 80%, transparent)',
                borderColor: 'var(--color-border)',
            }}
        >
            <nav className="container mx-auto flex h-16 items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/blog-logo.png"
                        alt="Blog Logo"
                        width={48}
                        height={48}
                        className="rounded-full"
                        quality={100}
                        unoptimized
                        priority
                    />
                    <span
                        className="text-2xl font-bold"
                        style={{
                            background: 'linear-gradient(135deg, #FF6B35 0%, #FFA500 50%, #FFD700 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        SX Lab
                    </span>
                </Link>

                {/* Navigation Links + Theme Toggle */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="transition-colors hover:text-[var(--color-primary)]"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        首页
                    </Link>
                    <Link
                        href="/about"
                        className="transition-colors hover:text-[var(--color-primary)]"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        关于
                    </Link>

                    {/* 主题切换按钮 */}
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}
