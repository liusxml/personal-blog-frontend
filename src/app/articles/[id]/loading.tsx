export default function ArticleLoading() {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 xl:flex-row xl:gap-12">
        {/* Article Content Skeleton */}
        <article className="max-w-4xl min-w-0 flex-1">
          <div className="animate-pulse space-y-6">
            {/* Title */}
            <div
              className="h-12 w-3/4 rounded-xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            />

            {/* Meta info */}
            <div className="flex gap-4">
              <div
                className="h-4 w-24 rounded"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              />
              <div
                className="h-4 w-20 rounded"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              />
              <div
                className="h-4 w-20 rounded"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              />
            </div>

            {/* Cover image */}
            <div
              className="aspect-video w-full rounded-2xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            />

            {/* Content paragraphs */}
            <div className="space-y-4 pt-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="space-y-2">
                  <div
                    className="h-4 rounded"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  />
                  <div
                    className="h-4 w-11/12 rounded"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  />
                  <div
                    className="h-4 w-10/12 rounded"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  />
                </div>
              ))}
            </div>

            {/* Code block skeleton */}
            <div
              className="h-64 rounded-xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
            />

            {/* More content */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div
                    className="h-4 rounded"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  />
                  <div
                    className="h-4 w-5/6 rounded"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Related Articles Skeleton */}
          <div className="mt-16 border-t pt-8" style={{ borderColor: "var(--color-border)" }}>
            <div
              className="mb-6 h-8 w-32 animate-pulse rounded"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl p-4"
                  style={{ backgroundColor: "var(--color-bg-card)" }}
                >
                  <div
                    className="mb-2 h-6 rounded"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  />
                  <div
                    className="h-4 w-4/5 rounded"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* TOC Skeleton (Desktop) */}
        <aside className="hidden w-64 shrink-0 xl:block">
          <div
            className="sticky top-20 animate-pulse space-y-3 rounded-xl p-6"
            style={{ backgroundColor: "var(--color-bg-card)" }}
          >
            <div
              className="mb-4 h-5 w-24 rounded"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            />
            {[85, 70, 92, 65, 78].map((w, i) => (
              <div
                key={i}
                className="h-4 rounded"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  width: `${w}%`,
                }}
              />
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
