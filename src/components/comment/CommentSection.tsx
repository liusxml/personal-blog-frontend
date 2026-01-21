'use client';

import { useState, useEffect } from 'react';
import { getComments } from '@/lib/api';
import { CommentTreeVO, CommentTargetType } from '@/lib/types';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface Props {
    articleId: string;
}

export default function CommentSection({ articleId }: Props) {
    const [comments, setComments] = useState<CommentTreeVO[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const data = await getComments(CommentTargetType.ARTICLE, articleId);
            setComments(data);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [articleId]);

    return (
        <section className="mb-16">
            <h2
                className="mb-6 text-2xl font-bold"
                style={{ color: 'var(--color-text-primary)' }}
            >
                评论 ({comments.length})
            </h2>
            <CommentForm
                targetType={CommentTargetType.ARTICLE}
                targetId={articleId}
                onSuccess={fetchComments}
            />
            {loading ? (
                <div className="py-8 text-center" style={{ color: 'var(--color-text-muted)' }}>
                    加载中...
                </div>
            ) : (
                <CommentList comments={comments} onRefresh={fetchComments} />
            )}
        </section>
    );
}
