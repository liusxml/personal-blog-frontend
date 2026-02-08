'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Error:', error)
    }, [error])

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center space-y-6 max-w-md">
                <div className="space-y-2">
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        出错了
                    </h1>
                    <h2 className="text-xl font-semibold text-foreground">
                        页面加载失败
                    </h2>
                    <p className="text-muted-foreground">
                        抱歉，页面在加载过程中遇到了问题
                    </p>
                    {error.digest && (
                        <p className="text-xs text-muted-foreground font-mono mt-2">
                            错误ID: {error.digest}
                        </p>
                    )}
                </div>

                <div className="flex gap-4 justify-center flex-wrap">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-medium rounded-lg hover:opacity-90 transition"
                    >
                        重试
                    </button>
                    <a
                        href="/"
                        className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition inline-block"
                    >
                        返回首页
                    </a>
                </div>
            </div>
        </div>
    )
}
