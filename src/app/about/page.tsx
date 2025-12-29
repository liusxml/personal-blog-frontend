export default function AboutPage() {
    return (
        <main className="container mx-auto px-6 py-12">
            <div className="mx-auto max-w-3xl">
                {/* 标题 */}
                <h1
                    className="mb-8 text-4xl font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    关于我
                </h1>

                {/* 内容卡片 */}
                <div
                    className="rounded-xl border p-8 space-y-6"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        borderColor: 'var(--color-border)',
                    }}
                >
                    <section>
                        <h2
                            className="mb-4 text-2xl font-semibold"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            👋 你好
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            欢迎来到我的个人博客！这里是我分享技术见解、记录学习历程的地方。
                        </p>
                    </section>

                    <section>
                        <h2
                            className="mb-4 text-2xl font-semibold"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            🛠️ 技术栈
                        </h2>
                        <p
                            className="mb-4"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            这个博客系统采用现代化的全栈技术构建：
                        </p>
                        <ul
                            className="list-disc list-inside space-y-2"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            <li>
                                <strong style={{ color: 'var(--color-primary)' }}>前端</strong>
                                : Next.js 14, TypeScript, Tailwind CSS
                            </li>
                            <li>
                                <strong style={{ color: 'var(--color-primary)' }}>后端</strong>
                                : Spring Boot 3, MyBatis-Plus, MySQL 9.4
                            </li>
                            <li>
                                <strong style={{ color: 'var(--color-primary)' }}>特色</strong>
                                : 向量搜索、评论系统、文件上传
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2
                            className="mb-4 text-2xl font-semibold"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            📬 联系方式
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            如果你有任何问题或建议，欢迎通过以下方式联系我：
                        </p>
                        <ul
                            className="mt-4 space-y-2"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            <li>📧 Email: your-email@example.com</li>
                            <li>🐙 GitHub: github.com/yourusername</li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
