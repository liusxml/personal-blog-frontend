import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-9xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold text-foreground">
                        页面未找到
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        抱歉，您访问的页面不存在或已被删除
                    </p>
                </div>

                <div className="flex gap-4 justify-center flex-wrap">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-medium rounded-lg hover:opacity-90 transition"
                    >
                        返回首页
                    </Link>
                    <Link
                        href="/"
                        className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition"
                    >
                        浏览文章
                    </Link>
                </div>
            </div>
        </div>
    )
}
