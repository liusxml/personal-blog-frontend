// ============================================
// API 客户端函数
// 封装所有后端 API 调用
// ============================================

import env from '@/config/env';
import type {
    Result,
    PageResult,
    PageQuery,
    ArticleListVO,
    ArticleDetailVO,
    CommentTreeVO,
    CommentTargetType,
} from './types';

const API_BASE_URL = env.API_BASE_URL;

// ============================================
// 通用请求函数
// ============================================

async function request<T>(
    endpoint: string,
    options?: RequestInit
): Promise<Result<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
}

// ============================================
// 文章 API
// ============================================

/**
 * 获取文章列表（分页）
 */
export async function getArticles(
    query: PageQuery = {}
): Promise<PageResult<ArticleListVO>> {
    const params = new URLSearchParams();

    if (query.current) params.append('current', query.current.toString());
    if (query.size) params.append('size', query.size.toString());
    if (query.categoryId) params.append('categoryId', query.categoryId.toString());
    if (query.tagId) params.append('tagId', query.tagId.toString());

    const endpoint = `/api/v1/articles?${params.toString()}`;
    const result = await request<PageResult<ArticleListVO>>(endpoint);

    return result.data;
}

/**
 * 获取文章详情
 */
export async function getArticleById(id: number): Promise<ArticleDetailVO> {
    const result = await request<ArticleDetailVO>(`/api/v1/articles/${id}`);
    return result.data;
}

/**
 * 获取相关文章推荐
 */
export async function getRelatedArticles(
    id: number,
    limit: number = 5
): Promise<ArticleListVO[]> {
    const result = await request<ArticleListVO[]>(
        `/api/v1/articles/${id}/related?limit=${limit}`
    );
    return result.data;
}

// ============================================
// 评论 API
// ============================================

/**
 * 获取评论树
 */
export async function getComments(
    targetType: CommentTargetType,
    targetId: number
): Promise<CommentTreeVO[]> {
    const params = new URLSearchParams({
        targetType,
        targetId: targetId.toString(),
    });

    const result = await request<CommentTreeVO[]>(
        `/api/v1/comments/tree?${params.toString()}`
    );

    return result.data;
}

// ============================================
// 导出所有 API
// ============================================

export const api = {
    // 文章
    getArticles,
    getArticleById,
    getRelatedArticles,

    // 评论
    getComments,
};

export default api;
