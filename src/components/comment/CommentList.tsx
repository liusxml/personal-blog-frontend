import { CommentTreeVO } from '@/lib/types';
import CommentItem from './CommentItem';

interface Props {
    comments: CommentTreeVO[];
    onRefresh: () => void;
}

export default function CommentList({ comments, onRefresh }: Props) {
    if (!comments.length) {
        return (
            <div
                className="rounded-xl border p-8 text-center mt-8"
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
        <div className="space-y-6 mt-8">
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    onRefresh={onRefresh}
                />
            ))}
        </div>
    );
}
