export default function ArticleLoading() {
    return (
        <main className="container mx-auto px-6 py-12">
            <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 max-w-6xl mx-auto">
                {/* Article Content Skeleton */}
                <article className="flex-1 min-w-0 max-w-4xl">
                    <div className="animate-pulse space-y-6">
                        {/* Title */}
                        <div
                            className="h-12 rounded-xl w-3/4"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        />

                        {/* Meta info */}
                        <div className="flex gap-4">
                            <div
                                className="h-4 rounded w-24"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                            />
                            <div
                                className="h-4 rounded w-20"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                            />
                            <div
                                className="h-4 rounded w-20"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                            />
                        </div>

                        {/* Cover image */}
                        <div
                            className="aspect-video w-full rounded-2xl"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        />

                        {/* Content paragraphs */}
                        <div className="space-y-4 pt-8">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div
                                        className="h-4 rounded"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    />
                                    <div
                                        className="h-4 rounded w-11/12"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    />
                                    <div
                                        className="h-4 rounded w-10/12"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Code block skeleton */}
                        <div
                            className="h-64 rounded-xl"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                        />

                        {/* More content */}
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div
                                        className="h-4 rounded"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    />
                                    <div
                                        className="h-4 rounded w-5/6"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Related Articles Skeleton */}
                    <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
                        <div
                            className="h-8 rounded w-32 mb-6 animate-pulse"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="animate-pulse p-4 rounded-xl"
                                    style={{ backgroundColor: 'var(--color-bg-card)' }}
                                >
                                    <div
                                        className="h-6 rounded mb-2"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    />
                                    <div
                                        className="h-4 rounded w-4/5"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </article>

                {/* TOC Skeleton (Desktop) */}
                <aside className="hidden xl:block w-64 shrink-0">
                    <div
                        className="sticky top-20 animate-pulse space-y-3 p-6 rounded-xl"
                        style={{ backgroundColor: 'var(--color-bg-card)' }}
                    >
                        <div
                            className="h-5 rounded w-24 mb-4"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        />
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="h-4 rounded"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    width: `${Math.random() * 40 + 60}%`
                                }}
                            />
                        ))}
                    </div>
                </aside>
            </div>
        </main>
    );
}
