# personal-blog-frontend

个人博客展示端，基于 Next.js 16 + React 19 构建的现代化博客前台，采用服务端渲染（SSR）优先策略，提供文章浏览、分类 / 标签导航、评论互动等核心功能，并内置完整的 SEO 优化方案。

---

## 技术栈

| 模块 | 技术 | 版本 |
|:---|:---|:---|
| 核心框架 | Next.js | 16.x（App Router） |
| UI 库 | React | 19.x |
| 语言 | TypeScript | 5.x |
| 样式 | Tailwind CSS | v4 |
| Markdown 渲染 | react-markdown | v10 |
| 代码高亮 | rehype-highlight + highlight.js | v7 / v11 |
| 文章目录锚点 | rehype-slug | v6 |
| GFM 语法支持 | remark-gfm | v4 |
| 排版样式 | @tailwindcss/typography | v0.5 |
| 图片灯箱 | yet-another-react-lightbox | v3 |
| 字体 | Geist / Geist Mono（Google Fonts） | — |

---

## 项目结构

```
personal-blog-frontend/
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── layout.tsx                    # 根布局（字体 + ThemeProvider + Header + Footer）
│   │   ├── page.tsx                      # 首页（SSR，force-dynamic）
│   │   ├── loading.tsx                   # 全局 Loading 骨架屏
│   │   ├── error.tsx                     # 全局错误边界
│   │   ├── not-found.tsx                 # 404 页面
│   │   ├── robots.ts                     # 自动生成 robots.txt
│   │   ├── sitemap.ts                    # 动态生成 sitemap.xml（含所有文章 URL）
│   │   ├── globals.css                   # 全局样式（CSS Variables + Tailwind）
│   │   ├── articles/
│   │   │   └── [id]/                     # 文章详情页（动态路由）
│   │   │       ├── page.tsx              # 文章详情（SSR + generateMetadata）
│   │   │       ├── layout.tsx            # 文章布局
│   │   │       └── loading.tsx           # 文章加载骨架屏
│   │   ├── categories/
│   │   │   └── [slug]/page.tsx           # 分类文章列表页
│   │   ├── tags/
│   │   │   └── [slug]/page.tsx           # 标签文章列表页
│   │   └── about/
│   │       └── page.tsx                  # 关于页面（含实时时钟）
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx                # 顶部导航（Logo + 菜单 + 移动端适配）
│   │   │   └── Footer.tsx                # 页脚
│   │   ├── home/
│   │   │   ├── HeroSection.tsx           # 首屏英雄区（最新文章 + 大图背景 + 动画 CTA）
│   │   │   ├── FeaturedArticles.tsx      # 精选文章卡片区
│   │   │   └── NewsletterSubscribe.tsx   # 订阅区
│   │   ├── article/
│   │   │   ├── ArticleCard.tsx           # 文章卡片
│   │   │   ├── ArticleList.tsx           # 文章列表容器
│   │   │   ├── ArticleContent.tsx        # 文章正文（Markdown 渲染器，代码高亮 + 复制）
│   │   │   ├── ArticleImage.tsx          # 文章封面图
│   │   │   ├── TableOfContents.tsx       # 浮动目录（IntersectionObserver 高亮当前章节）
│   │   │   ├── RelatedArticles.tsx       # 相关文章推荐
│   │   │   ├── ReadingProgress.tsx       # 顶部阅读进度条
│   │   │   ├── ScrollToTop.tsx           # 回到顶部按钮
│   │   │   └── CopyButton.tsx            # 代码块复制按钮
│   │   ├── comment/
│   │   │   ├── CommentSection.tsx        # 评论区入口（聚合组件）
│   │   │   ├── CommentList.tsx           # 评论树列表
│   │   │   ├── CommentItem.tsx           # 单条评论（含回复 + 点赞）
│   │   │   └── CommentForm.tsx           # 评论 / 回复表单
│   │   ├── ImageWithFallback.tsx         # 图片组件（带 fallback 兜底）
│   │   ├── LiveClock.tsx                 # 实时时钟（日/时/分/秒 + 整点彩蛋）
│   │   ├── ScrollRestoration.tsx         # 页面滚动位置恢复
│   │   └── ThemeProvider.tsx             # 主题提供者（dark mode）
│   │
│   ├── lib/
│   │   ├── api.ts                        # 统一 API 客户端（服务端 fetch，无认证）
│   │   └── types.ts                      # 全局 TypeScript 类型定义
│   │
│   └── config/
│       └── env.ts                        # 环境变量统一出口
│
├── public/                               # 静态资源（blog-logo.png 等）
├── .github/workflows/
│   └── docker-publish.yml                # CI/CD：main 分支推送后自动构建并发布 Docker 镜像
├── next.config.ts                        # Next.js 配置（standalone + 图片域名白名单）
├── Dockerfile                            # 多阶段构建（deps → builder → runner）
└── .env.local                            # 本地环境变量（不提交 Git）
```

---

## 页面功能

### 首页（`/`）

使用 `force-dynamic` 强制服务端动态渲染，每次请求实时从后端获取最新文章，分三个区域展示：

| 区域 | 内容 | 来源 |
|:---|:---|:---|
| **英雄区（HeroSection）** | 最新文章（第 1 篇）+ 封面大图背景 + 渐变遮罩 + 动画 CTA 按钮 | articles[0] |
| **精选文章（FeaturedArticles）** | 3 张精选文章卡片网格 | articles[1–3] |
| **最新文章列表** | 最多 6 篇文章卡片 | articles[4–9] |

### 文章详情页（`/articles/[id]`）

- **SEO**：`generateMetadata` 动态生成 `<title>`、`<description>`、Open Graph、Twitter Card
- **布局**：左侧浮动目录（xl 宽屏以上显示），右侧文章正文 + 相关推荐 + 评论区
- **Markdown 渲染**：`react-markdown` + `remark-gfm`（GFM 语法）+ `rehype-highlight`（代码高亮）+ `rehype-slug`（锚点）
- **代码块**：自定义渲染器，hover 显示一键复制按钮
- **引用块**：根据 emoji 前缀（`💡 Note` / `⚠️ Warning` / `✨ Tip`）自动变色为蓝 / 黄 / 绿
- **阅读进度条**：页面顶部固定，随滚动同步更新
- **相关文章**：并行获取（`Promise.all`），推荐最多 5 篇

### 分类页（`/categories/[slug]`）

按分类 slug 筛选文章列表，展示分类名称和描述，支持分页

### 标签页（`/tags/[slug]`）

按标签 slug 筛选文章列表，支持分页

### 关于页（`/about`）

博主个人介绍静态页面，内嵌实时时钟组件（`LiveClock`）

---

## 核心组件

### ArticleContent — Markdown 渲染引擎

自定义各 Markdown 元素的渲染逻辑：

| 元素 | 定制内容 |
|:---|:---|
| `img` | 圆角 + 大阴影 + hover 过渡效果 |
| `pre`（代码块） | 深色背景 + 圆角 + hover 显示复制按钮 |
| `blockquote` | 根据 💡 / ⚠️ / ✨ 自动变色（蓝 / 黄 / 绿） |
| `table` | 全宽 + 圆角 + 渐变表头 + 边框 |
| `code`（行内代码） | 粉色文字 + 半透明背景 |

### TableOfContents — 文章目录

- 解析 Markdown 原始文本，正则提取 H1–H3 标题
- 与 `rehype-slug` 生成相同的锚点 ID（小写 + 连字符，完整保留中文字符）
- `IntersectionObserver` 实时高亮当前可见章节（延迟 500ms 初始化，等待浏览器滚动恢复）
- 支持折叠 / 展开，`sticky top-20` 粘性定位

### LiveClock — 实时时钟

- 每秒更新，以「日 / 时 / 分 / 秒」四格展示当前时间（大字体卡片样式）
- 整点触发「整点报时」彩蛋，午夜触发「新的一天开始啦」彩蛋（弹出渐变文字，自动消失）
- 防水合不匹配：SSR 阶段渲染 `animate-pulse` 骨架占位，客户端挂载后替换为真实时间

### ImageWithFallback — 图片容错

封装 `next/image`，图片加载失败时渲染渐变色占位背景，避免出现破图

---

## SEO 优化

| 功能 | 实现方式 |
|:---|:---|
| 页面标题 | 根布局设置默认，文章页 `generateMetadata` 动态覆盖 |
| Meta Description | 文章摘要或标题 |
| Open Graph | 文章标题、描述、作者、标签 |
| Twitter Card | `summary_large_image` 格式 |
| Sitemap | `sitemap.ts` 动态生成，含首页、关于页、所有文章 URL |
| Robots.txt | `robots.ts` 自动生成，禁止抓取 `/api/`、`/_next/` |
| 语言声明 | `<html lang="zh-CN">` |
| 语义化 HTML | `<header>` `<article>` `<nav>` `<aside>` `<main>` 等 |

---

## 架构设计

### 渲染策略

前台所有页面默认使用 **服务端渲染（SSR）**，数据在服务端 `fetch` 后直接注入 HTML，爬虫无需执行 JavaScript 即可获得完整内容：

```
HTTP 请求
   │
   ▼
Next.js Server（Node.js）
   │
   ├─ 服务端 getArticleById()  →  fetch  →  Spring Boot API
   │
   ├─ 服务端完成 Markdown 渲染（含语法高亮）
   │
   └─ 返回给浏览器完整 HTML（SEO 友好，无 FOUC）
```

> 首页使用 `export const dynamic = 'force-dynamic'`，确保每次请求都从后端实时获取最新文章，不受 Next.js Full Routes Cache 影响。

### API 客户端

前台 API 客户端（`lib/api.ts`）面向服务端调用设计：

- **无认证**：所有接口均为公开 API，不需要 JWT
- **统一封装**：`request<T>` 函数统一处理 HTTP 请求和错误
- **类型安全**：所有接口返回值均有 TypeScript 类型定义
- **环境变量**：通过 `config/env.ts` 读取 `NEXT_PUBLIC_API_BASE_URL`

### 图片域名白名单（`next.config.ts`）

| 域名 | 用途 |
|:---|:---|
| `s3.bitiful.net` | Bitiful OSS 存储的文章封面图 |
| `www.bing.com` | 必应壁纸图片 |

---

## API 接口对照

| 功能 | 接口 |
|:---|:---|
| 文章列表（分页） | `GET /api/v1/articles?current=&size=&categoryId=&tagId=` |
| 文章详情 | `GET /api/v1/articles/{id}` |
| 相关文章推荐 | `GET /api/v1/articles/{id}/related?limit=5` |
| 分类树 | `GET /api/v1/categories/tree` |
| 分类列表 | `GET /api/v1/categories` |
| 按 slug 获取分类 | `GET /api/v1/categories/slug/{slug}` |
| 标签列表 | `GET /api/v1/tags?orderBy=article_count&limit=` |
| 热门标签 | `GET /api/v1/tags/hot?limit=20` |
| 按 slug 获取标签 | `GET /api/v1/tags/slug/{slug}` |
| 评论树 | `GET /api/v1/comments/tree?targetType=ARTICLE&targetId=` |
| 发表评论 | `POST /api/v1/comments` |
| 回复评论 | `POST /api/v1/comments/reply` |
| 点赞评论 | `POST /api/v1/comments/{id}/like` |

---

## 本地开发

### 前置条件

- Node.js 20+（推荐使用 [vfox](https://vfox.linspiration.dev/) 管理，见 `.vfox.toml`）
- 后端服务已启动（`personal-blog-backend`，默认监听 `localhost:8080`）

### 启动步骤

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8080" > .env.local

# 3. 启动开发服务器（端口 3002，避免与 admin:3001、frontend:3000 冲突）
npm run dev
```

访问 http://localhost:3002

### 可用脚本

| 命令 | 说明 |
|:---|:---|
| `npm run dev` | 开发服务器（端口 3002，热重载） |
| `npm run build` | 构建生产包（standalone 输出） |
| `npm run start` | 启动生产服务（需先 build） |
| `npm run lint` | ESLint 代码检查 |

### 环境变量

| 变量 | 说明 | 默认值 |
|:---|:---|:---|
| `NEXT_PUBLIC_API_BASE_URL` | 后端 API 基础 URL（**构建时**打包进客户端 JS） | `http://localhost:8080` |
| `NEXT_PUBLIC_SITE_URL` | 站点根 URL（用于 sitemap / robots 生成） | `http://localhost:3002` |

> ⚠️ `NEXT_PUBLIC_API_BASE_URL` 在 `next build` 时打包进客户端 JS，**运行时无法通过环境变量修改**。如需指向自定义后端，请重新构建镜像。

---

## 构建与部署

### Docker 多阶段构建

| 阶段 | 基础镜像 | 作用 |
|:---|:---|:---|
| `deps` | `node:20-alpine` | 安装 npm 依赖（BuildKit 缓存挂载加速） |
| `builder` | `node:20-alpine` | 执行 `next build`，生成 standalone 产物 |
| `runner` | `node:20-alpine` | 仅包含运行时产物，最小化镜像体积 |

关键配置：

- `next.config.ts` 中 `output: 'standalone'`：生成自包含运行时，无需完整 `node_modules`
- 以非 root 用户（`appuser`）运行，符合安全规范
- `HEALTHCHECK`：每 30 秒 `wget` 探活 `http://localhost:3000/`

### GitHub Actions CI/CD

推送到 `main` 分支时自动触发 `.github/workflows/docker-publish.yml`：

```
push to main
     │
     ▼
Checkout → Docker Login → Setup Buildx → Build & Push
                                              │
                          标签：latest + sha-<commit>
                          构建参数：NEXT_PUBLIC_API_BASE_URL=https://api.chonkybird.com
                          缓存：GitHub Actions Cache（GHA）
```

**所需 GitHub Secrets / Variables：**

| 名称 | 类型 | 说明 |
|:---|:---|:---|
| `DOCKERHUB_USERNAME` | Variable | Docker Hub 用户名 |
| `DOCKERHUB_TOKEN` | Secret | Docker Hub Access Token |

### 运行 Docker 镜像

```bash
docker run -d \
  -p 3000:3000 \
  liusxml/personal-blog-frontend:latest
```

---

## 开发规范

### 渲染模式选择

```tsx
// ✅ 默认：Server Component（SSR），直接 async/await，无需标注
export default async function ArticlesPage() {
  const articles = await getArticles()
  return <ArticleList articles={articles} />
}

// ✅ 需要客户端交互（useState / useEffect / 浏览器 API）时才声明 'use client'
'use client'
export default function TableOfContents({ content }: Props) {
  const [activeId, setActiveId] = useState('')
  // ...
}
```

### API 调用规范

```ts
// ✅ 服务端直接 await，数据随 HTML 返回给浏览器
const article = await getArticleById(id)

// ✅ 并行请求，减少总等待时间
const [article, related] = await Promise.all([
  getArticleById(id),
  getRelatedArticles(id, 5),
])
```

### 样式规范

- 主题色值通过 CSS Variables（`var(--color-primary)` 等）声明在 `globals.css`，组件通过 `style` prop 引用
- 响应式断点遵循 Tailwind 移动优先原则（`md:` `xl:` 等）
- 暗色模式通过 `ThemeProvider` + `dark:` Tailwind 变体支持
- 动画优先使用 CSS `@keyframes`（`animate-fade-in`、`animate-slide-up` 等）

### 文件命名规范

| 类型 | 命名规范 | 示例 |
|:---|:---|:---|
| 页面 | `page.tsx` | `app/articles/[id]/page.tsx` |
| 布局 | `layout.tsx` | `app/layout.tsx` |
| 组件 | PascalCase | `ArticleContent.tsx` |
| 工具函数 | camelCase | `api.ts`, `types.ts` |
| 配置 | camelCase | `env.ts` |
