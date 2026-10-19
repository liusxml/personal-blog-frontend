export default function Loading() {
  return (
    <main className="container mx-auto px-6 py-12">
      {/* Hero Section Skeleton */}
      <section className="mb-16">
        <div className="animate-pulse">
          <div
            className="mb-4 h-12 rounded-xl"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          />
          <div
            className="mb-8 h-6 w-2/3 rounded-xl"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          />
        </div>
      </section>

      {/* Article Grid Skeleton */}
      <section>
        <div
          className="mb-8 h-8 w-32 animate-pulse rounded-xl"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse overflow-hidden rounded-xl border"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
              }}
            >
              {/* Image skeleton */}
              <div
                className="aspect-video w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              />

              {/* Content skeleton */}
              <div className="space-y-3 p-6">
                <div
                  className="h-6 rounded"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                />
                <div
                  className="h-4 w-5/6 rounded"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                />
                <div
                  className="h-4 w-4/6 rounded"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                />

                {/* Meta info skeleton */}
                <div className="flex gap-4 pt-2">
                  <div
                    className="h-3 w-20 rounded"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  />
                  <div
                    className="h-3 w-16 rounded"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
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
