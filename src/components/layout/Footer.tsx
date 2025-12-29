export default function Footer() {
    return (
        <footer
            className="border-t mt-24"
            style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
            }}
        >
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* About */}
                    <div>
                        <h3
                            className="mb-4 text-lg font-semibold"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            关于博客
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            这是一个基于 Next.js 和 Spring Boot 构建的现代化个人博客系统。
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3
                            className="mb-4 text-lg font-semibold"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            友情链接
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://nextjs.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-colors hover:text-[var(--color-primary)]"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    Next.js
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://spring.io/projects/spring-boot"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-colors hover:text-[var(--color-primary)]"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    Spring Boot
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3
                            className="mb-4 text-lg font-semibold"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            联系方式
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Email: your-email@example.com
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div
                    className="mt-8 border-t pt-8 text-center"
                    style={{ borderColor: 'var(--color-border)' }}
                >
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        © {new Date().getFullYear()} My Blog. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
