import { CommentTreeVO } from "@/lib/types";
import CommentItem from "./CommentItem";

interface Props {
  comments: CommentTreeVO[];
  onRefresh: () => void;
}

export default function CommentList({ comments, onRefresh }: Props) {
  if (!comments.length) {
    return (
      <div
        className="mt-8 rounded-xl border p-8 text-center"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border)",
        }}
      >
        <p style={{ color: "var(--color-text-secondary)" }}>暂无评论，来抢沙发吧！</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onRefresh={onRefresh} />
      ))}
    </div>
  );
}
