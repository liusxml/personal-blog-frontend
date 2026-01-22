'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 1000);
    };

    return (
        <header
            className="sticky top-0 z-50 border-b backdrop-blur-md"
            style={{
                backgroundColor: 'color-mix(in srgb, var(--color-bg-main) 80%, transparent)',
                borderColor: 'var(--color-border)',
            }}
        >
            <nav className="container mx-auto flex h-16 items-center justify-between px-6">
                {/* Logo with spinning bird */}
                <Link href="/" className="flex items-center gap-3" onClick={handleLogoClick}>
                    <Image
                        src="/blog-logo.png"
                        alt="Blog Logo"
                        width={48}
                        height={48}
                        className="rounded-full"
                        style={{
                            filter: 'drop-shadow(0 0 8px rgba(255, 165, 0, 0.4))',
                            transform: isSpinning ? 'rotate(360deg)' : 'rotate(0deg)',
                            transition: 'transform 1s ease-in-out',
                        }}
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

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
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
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor">
                        <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className="border-t md:hidden"
                    style={{ borderColor: 'var(--color-border)' }}
                >
                    <div className="container mx-auto px-6 py-4">
                        <Link
                            href="/"
                            className="block py-2 transition-colors hover:text-primary"
                            style={{ color: 'var(--color-text-secondary)' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            首页
                        </Link>
                        <Link
                            href="/about"
                            className="block py-2 transition-colors hover:text-primary"
                            style={{ color: 'var(--color-text-secondary)' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            关于
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
