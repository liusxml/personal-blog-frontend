import type { CommentTreeVO } from '@/lib/types';

interface CommentSectionProps {
    comments: CommentTreeVO[];
}

export default function CommentSection({ comments }: CommentSectionProps) {
    if (comments.length === 0) {
        return (
            <div
                className="rounded-xl border p-8 text-center"
                style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border)',
                }}
            >
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    暂无评论，来抢沙发吧！
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
}

// 单个评论组件
function CommentItem({ comment }: { comment: CommentTreeVO }) {
    return (
        <div
            className="rounded-xl border p-6"
            style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
            }}
        >
            {/* 评论者信息 */}
            <div className="mb-3 flex items-center gap-3">
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold"
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-text-primary)',
                    }}
                >
                    {comment.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                    <div style={{ color: 'var(--color-text-primary)' }}>
                        {comment.userName}
                    </div>
                    <div
                        className="text-sm"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        {new Date(comment.createTime).toLocaleString('zh-CN')}
                    </div>
                </div>
            </div>

            {/* 评论内容 */}
            <div
                className="mb-3"
                style={{ color: 'var(--color-text-secondary)' }}
                dangerouslySetInnerHTML={{ __html: comment.contentHtml }}
            />

            {/* 点赞数 */}
            <div
                className="flex items-center gap-2 text-sm"
                style={{ color: 'var(--color-text-muted)' }}
            >
                <span>👍 {comment.likeCount}</span>
                {comment.isEdited && <span>· 已编辑</span>}
            </div>

            {/* 子评论 */}
            {comment.children && comment.children.length > 0 && (
                <div className="mt-4 space-y-4 border-l-2 pl-4" style={{ borderColor: 'var(--color-border)' }}>
                    {comment.children.map((child) => (
                        <CommentItem key={child.id} comment={child} />
                    ))}
                </div>
            )}
        </div>
    );
}
