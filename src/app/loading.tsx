export default function Loading() {
    return (
        <main className="container mx-auto px-6 py-12">
            {/* Hero Section Skeleton */}
            <section className="mb-16">
                <div className="animate-pulse">
                    <div
                        className="h-12 rounded-xl mb-4"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    />
                    <div
                        className="h-6 rounded-xl w-2/3 mb-8"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    />
                </div>
            </section>

            {/* Article Grid Skeleton */}
            <section>
                <div
                    className="h-8 rounded-xl w-32 mb-8 animate-pulse"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="animate-pulse overflow-hidden rounded-xl border"
                            style={{
                                backgroundColor: 'var(--color-bg-card)',
                                borderColor: 'var(--color-border)',
                            }}
                        >
                            {/* Image skeleton */}
                            <div
                                className="aspect-video w-full"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                            />

                            {/* Content skeleton */}
                            <div className="p-6 space-y-3">
                                <div
                                    className="h-6 rounded"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                />
                                <div
                                    className="h-4 rounded w-5/6"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                />
                                <div
                                    className="h-4 rounded w-4/6"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                />

                                {/* Meta info skeleton */}
                                <div className="flex gap-4 pt-2">
                                    <div
                                        className="h-3 rounded w-20"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    />
                                    <div
                                        className="h-3 rounded w-16"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
