import env from '@/config/env';
import type {
    Result,
    PageResult,
    PageQuery,
    ArticleListVO,
    ArticleDetailVO,
    CommentTreeVO,
    CommentTargetType,
    CommentDTO,
    CategoryVO,
    CategoryTreeVO,
    TagVO,
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
export async function getArticleById(id: string): Promise<ArticleDetailVO> {
    const result = await request<ArticleDetailVO>(`/api/v1/articles/${id}`);
    return result.data;
}

/**
 * 获取相关文章推荐
 */
export async function getRelatedArticles(
    id: string,
    limit: number = 5
): Promise<ArticleListVO[]> {
    const result = await request<ArticleListVO[]>(
        `/api/v1/articles/${id}/related?limit=${limit}`
    );
    return result.data;
}

// ============================================
// 分类 API
// ============================================

/**
 * 获取分类树
 */
export async function getCategoryTree(): Promise<CategoryTreeVO[]> {
    const result = await request<CategoryTreeVO[]>('/api/v1/categories/tree');
    return result.data;
}

/**
 * 获取分类列表
 */
export async function getCategories(): Promise<CategoryVO[]> {
    const result = await request<CategoryVO[]>('/api/v1/categories');
    return result.data;
}

/**
 * 根据 slug 获取分类
 */
export async function getCategoryBySlug(slug: string): Promise<CategoryVO> {
    const result = await request<CategoryVO>(`/api/v1/categories/slug/${slug}`);
    return result.data;
}

// ============================================
// 标签 API
// ============================================

/**
 * 获取标签列表
 */
export async function getTags(orderBy = 'article_count', limit?: number): Promise<TagVO[]> {
    const params = new URLSearchParams({ orderBy });
    if (limit) params.append('limit', limit.toString());
    const result = await request<TagVO[]>(`/api/v1/tags?${params}`);
    return result.data;
}

/**
 * 获取热门标签
 */
export async function getHotTags(limit = 20): Promise<TagVO[]> {
    const result = await request<TagVO[]>(`/api/v1/tags/hot?limit=${limit}`);
    return result.data;
}

/**
 * 根据 slug 获取标签
 */
export async function getTagBySlug(slug: string): Promise<TagVO> {
    const result = await request<TagVO>(`/api/v1/tags/slug/${slug}`);
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
    targetId: string
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

/**
 * 创建评论
 */
export async function createComment(data: CommentDTO): Promise<string> {
    const result = await request<string>('/api/v1/comments', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    return result.data;
}

/**
 * 回复评论
 */
export async function replyComment(data: CommentDTO): Promise<string> {
    const result = await request<string>('/api/v1/comments/reply', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    return result.data;
}

/**
 * 点赞评论
 */
export async function likeComment(id: string): Promise<void> {
    await request<void>(`/api/v1/comments/${id}/like`, { method: 'POST' });
}

// ============================================
// 导出所有 API
// ============================================

export const api = {
    // 文章
    getArticles,
    getArticleById,
    getRelatedArticles,

    // 分类
    getCategoryTree,
    getCategories,
    getCategoryBySlug,

    // 标签
    getTags,
    getHotTags,
    getTagBySlug,

    // 评论
    getComments,
    createComment,
    replyComment,
    likeComment,
};

export default api;
