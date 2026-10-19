import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-9xl font-bold text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-foreground">页面未找到</h2>
          <p className="text-muted-foreground mx-auto max-w-md">
            抱歉，您访问的页面不存在或已被删除
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 font-medium text-black transition hover:opacity-90"
          >
            返回首页
          </Link>
          <Link
            href="/"
            className="border-border hover:bg-accent rounded-lg border px-6 py-3 transition"
          >
            浏览文章
          </Link>
        </div>
      </div>
    </div>
  );
}
