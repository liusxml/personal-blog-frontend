// ============================================
// TypeScript 类型定义
// 对应后端 API 返回的数据结构
// ============================================

// 分页参数
export interface PageQuery {
    current?: number;
    size?: number;
    categoryId?: string;
    tagId?: string;
}

// 分页结果
export interface PageResult<T> {
    records: T[];
    total: number;
    current: number;
    size: number;
    pages: number;
}

// 统一响应结构
export interface Result<T> {
    code: number;
    message: string;
    data: T;
    success: boolean;
}

// ============================================
// 文章相关类型
// ============================================

export interface ArticleListVO {
    id: string;
    title: string;
    summary: string;
    coverImage?: string;
    coverImageId?: string;
    categoryName?: string;
    tags?: TagVO[];
    authorName: string;
    publishTime: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
}

export interface ArticleDetailVO {
    id: string;
    title: string;
    content: string;
    contentHtml: string;
    summary: string;
    coverImage?: string;
    categoryId?: string;
    categoryName?: string;
    tags?: TagVO[];
    authorId?: string;
    authorName?: string;
    authorAvatar?: string;
    publishTime: string;
    updateTime: string;
    viewCount?: number;
    likeCount?: number;
    commentCount?: number;
}

export interface TagVO {
    id: string;
    name: string;
    slug: string;
    color?: string;
    articleCount: number;
}

// ============================================
// 分类相关类型
// ============================================

export interface CategoryVO {
    id: string;
    name: string;
    slug: string;
    description?: string;
    sortOrder: number;
    articleCount: number;
    parentId?: string;
}

export interface CategoryTreeVO extends CategoryVO {
    children: CategoryTreeVO[];
}

// ============================================
// 评论相关类型
// ============================================

export enum CommentTargetType {
    ARTICLE = 'ARTICLE',
    COMMENT = 'COMMENT',
}

export interface CommentVO {
    id: string;
    content: string;
    contentHtml: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    targetType: CommentTargetType;
    targetId: string;
    parentId?: string;
    replyToUserId?: string;
    replyToUserName?: string;
    likeCount: number;
    createTime: string;
    updateTime?: string;
    isEdited: boolean;
}

export interface CommentTreeVO extends CommentVO {
    children: CommentTreeVO[];
}

export interface CommentDTO {
    content: string;
    targetType: CommentTargetType;
    targetId: string;
    parentId?: string;
    replyToUserId?: string;
}

// ============================================
// 用户相关类型
// ============================================

export interface UserVO {
    id: string;
    username: string;
    email: string;
    nickname?: string;
    avatar?: string;
    bio?: string;
    createTime: string;
}

export interface LoginDTO {
    username: string;
    password: string;
}

export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
    nickname?: string;
}

export interface LoginVO {
    token: string;
    user: UserVO;
}
