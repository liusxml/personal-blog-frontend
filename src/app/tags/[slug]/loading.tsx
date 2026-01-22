export default function TagLoading() {
    return (
        <main className="container mx-auto px-6 py-12">
            <div className="animate-pulse">
                {/* Header with tag */}
                <header className="mb-8 flex items-center gap-3">
                    <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: 'rgba(110, 38, 255, 0.3)' }}
                    />
                    <div
                        className="h-10 rounded-xl w-40"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    />
                    <div
                        className="h-5 rounded w-24"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    />
                </header>

                {/* Article Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-xl border"
                            style={{
                                backgroundColor: 'var(--color-bg-card)',
                                borderColor: 'var(--color-border)',
                            }}
                        >
                            <div
                                className="aspect-video w-full"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                            />
                            <div className="p-6 space-y-3">
                                <div
                                    className="h-6 rounded"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                />
                                <div
                                    className="h-4 rounded w-5/6"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                />
                                <div className="flex gap-4 pt-2">
                                    <div
                                        className="h-3 rounded w-20"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
