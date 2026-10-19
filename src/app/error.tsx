"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-6xl font-bold text-transparent">
            出错了
          </h1>
          <h2 className="text-xl font-semibold text-foreground">页面加载失败</h2>
          <p className="text-muted-foreground">抱歉，页面在加载过程中遇到了问题</p>
          {error.digest && (
            <p className="text-muted-foreground mt-2 font-mono text-xs">错误ID: {error.digest}</p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 font-medium text-black transition hover:opacity-90"
          >
            重试
          </button>
          <Link
            href="/"
            className="border-border hover:bg-accent inline-block rounded-lg border px-6 py-3 transition"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
