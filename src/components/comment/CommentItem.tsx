'use client';

import { useState } from 'react';
import { CommentTreeVO, CommentTargetType } from '@/lib/types';
import { likeComment } from '@/lib/api';
import CommentForm from './CommentForm';

interface Props {
    comment: CommentTreeVO;
    onRefresh: () => void;
    depth?: number;
}

export default function CommentItem({ comment, onRefresh, depth = 0 }: Props) {
    const [showReply, setShowReply] = useState(false);
    const [likes, setLikes] = useState(comment.likeCount);
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        if (liked) return;
        try {
            await likeComment(comment.id);
            setLikes(prev => prev + 1);
            setLiked(true);
        } catch (error) {
            console.error('Failed to like comment:', error);
        }
    };

    return (
        <div className={`${depth > 0 ? 'ml-8 border-l-2 pl-4' : ''}`} style={depth > 0 ? { borderColor: 'var(--color-border)' } : {}}>
            <div
                className="rounded-xl border p-6"
                style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border)',
                }}
            >
                {/* 用户信息 */}
                <div className="flex gap-3 mb-3">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold"
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                        }}
                    >
                        {comment.userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                {comment.userName}
                            </span>
                            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                {new Date(comment.createTime).toLocaleString('zh-CN')}
                            </span>
                        </div>
                        <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                            {comment.content}
                        </p>
                        <div className="flex gap-4 mt-2 text-sm">
                            <button
                                onClick={handleLike}
                                disabled={liked}
                                className={`hover:text-primary transition-colors ${liked ? 'cursor-not-allowed' : ''}`}
                                style={{ color: liked ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
                            >
                                👍 {likes}
                            </button>
                            <button
                                onClick={() => setShowReply(!showReply)}
                                className="hover:text-primary transition-colors"
                                style={{ color: 'var(--color-text-muted)' }}
                            >
                                回复
                            </button>
                        </div>
                        {showReply && (
                            <div className="mt-4">
                                <CommentForm
                                    targetType={CommentTargetType.COMMENT}
                                    targetId={comment.id}
                                    parentId={comment.id}
                                    replyToUserId={comment.userId}
                                    onSuccess={() => {
                                        setShowReply(false);
                                        onRefresh();
                                    }}
                                    placeholder={`回复 @${comment.userName}`}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* 子评论 */}
            {comment.children && comment.children.length > 0 && (
                <div className="mt-4 space-y-4">
                    {comment.children.map((child) => (
                        <CommentItem
                            key={child.id}
                            comment={child}
                            onRefresh={onRefresh}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
