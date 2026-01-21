'use client';

import { useState } from 'react';
import { createComment, replyComment } from '@/lib/api';
import { CommentTargetType, CommentDTO } from '@/lib/types';

interface Props {
    targetType: CommentTargetType;
    targetId: string;
    parentId?: string;
    replyToUserId?: string;
    onSuccess: () => void;
    placeholder?: string;
}

export default function CommentForm({
    targetType,
    targetId,
    parentId,
    replyToUserId,
    onSuccess,
    placeholder = '发表你的看法...',
}: Props) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        try {
            const data: CommentDTO = {
                content: content.trim(),
                targetType,
                targetId,
                parentId,
                replyToUserId,
            };

            if (parentId) {
                await replyComment(data);
            } else {
                await createComment(data);
            }

            setContent('');
            onSuccess();
        } catch (error) {
            console.error('Failed to submit comment:', error);
            alert('发表评论失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                className="w-full p-3 border rounded-lg resize-none"
                style={{
                    backgroundColor: 'var(--color-bg-input)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-primary)',
                }}
                rows={3}
            />
            <button
                type="submit"
                disabled={loading || !content.trim()}
                className="px-4 py-2 rounded-lg disabled:opacity-50 hover:opacity-80 transition-opacity"
                style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                }}
            >
                {loading ? '发送中...' : '发送'}
            </button>
        </form>
    );
}
