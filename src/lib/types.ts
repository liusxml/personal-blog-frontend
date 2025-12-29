// ============================================
// TypeScript 类型定义
// 对应后端 API 返回的数据结构
// ============================================

// 分页参数
export interface PageQuery {
    current?: number;
    size?: number;
    categoryId?: number;
    tagId?: number;
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
    id: number;
    title: string;
    summary: string;
    coverImage?: string;
    categoryName?: string;
    tags?: TagVO[];
    authorName: string;
    publishTime: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
}

export interface ArticleDetailVO {
    id: number;
    title: string;
    content: string;
    contentHtml: string;
    summary: string;
    coverImage?: string;
    categoryId?: number;
    categoryName?: string;
    tags?: TagVO[];
    authorId: number;
    authorName: string;
    authorAvatar?: string;
    publishTime: string;
    updateTime: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
}

export interface TagVO {
    id: number;
    name: string;
    color?: string;
}

// ============================================
// 评论相关类型
// ============================================

export enum CommentTargetType {
    ARTICLE = 'ARTICLE',
    COMMENT = 'COMMENT',
}

export interface CommentVO {
    id: number;
    content: string;
    contentHtml: string;
    userId: number;
    userName: string;
    userAvatar?: string;
    targetType: CommentTargetType;
    targetId: number;
    parentId?: number;
    replyToUserId?: number;
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
    targetId: number;
    parentId?: number;
    replyToUserId?: number;
}

// ============================================
// 用户相关类型
// ============================================

export interface UserVO {
    id: number;
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
