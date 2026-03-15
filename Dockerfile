# syntax=docker/dockerfile:1
# ==============================================================================
# 第一阶段：安装依赖（deps）
# 使用独立阶段缓存 node_modules，仅在 package.json 变化时重新安装
# 参考：https://nextjs.org/docs/app/building-your-application/deploying#docker-image
# ==============================================================================
FROM node:20-alpine AS deps

WORKDIR /app

# ── 安全加固：只安装必要的系统依赖 ─────────────────────────────────────────
# libc6-compat 解决 Alpine 上部分 Node.js 原生模块的兼容问题
RUN apk add --no-cache libc6-compat

# ── 优化：先复制 lock 文件，利用 Docker 层缓存 ──────────────────────────────
# 仅当 package.json 或 package-lock.json 变化时才重新安装依赖
COPY package.json package-lock.json* ./

# ── 优化：RUN --mount=type=cache 挂载 npm 缓存目录 ──────────────────────────
# 即使 package.json 改变，已下载的包也不会重复下载，显著加速 CI/CD
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# ==============================================================================
# 第二阶段：构建（builder）
# 执行 next build，生成 standalone 输出（官方 Docker 部署推荐模式）
# 参考：https://nextjs.org/docs/app/api-reference/config/next-config-js/output
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# 复制依赖和源码
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ── NEXT_PUBLIC_API_URL：构建时注入，打包进客户端 JS ─────────────────────────
# 此变量在浏览器端使用（如 API 请求地址），必须在构建时确定
# 默认值指向生产环境的后端 API 域名
ARG NEXT_PUBLIC_API_BASE_URL=https://api.chonkybird.com
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# NEXT_TELEMETRY_DISABLED=1：禁用 Next.js 遥测数据收集（官方隐私保护建议）
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ==============================================================================
# 第三阶段：运行（runner）
# 仅包含 standalone 产物，镜像体积最小
# standalone 模式由 next.config.ts output: 'standalone' 开启
# ==============================================================================
FROM node:20-alpine AS runner

WORKDIR /app

# 生产环境变量
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

# ── 安全配置：创建非 root 用户（Next.js 官方指南要求）────────────────────────
# 参考：https://nextjs.org/docs/app/building-your-application/deploying#docker-image
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# ── standalone 产物分层复制 ──────────────────────────────────────────────────
# standalone/        → 最小化运行时（含 server.js + 所需 node_modules）
# .next/static/      → 静态资源（CSS/JS chunks，CDN 可托管）
# public/            → 公共资源（favicon、robots.txt 等）
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static
COPY --from=builder --chown=appuser:appgroup /app/public ./public

# 切换到非 root 用户运行
USER appuser

# 声明容器监听端口
EXPOSE 3000

# ── 健康检查 ─────────────────────────────────────────────────────────────────
# 通过 Next.js 内置 /api/health 或根路径判断服务是否就绪
# wget 是 Alpine 内置工具，无需额外安装
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget -qO- http://localhost:3000/ || exit 1

# ── 启动命令 ─────────────────────────────────────────────────────────────────
# standalone 模式使用 server.js 而非 npm start（更轻量，无需完整 Next.js 包）
# 参考：https://nextjs.org/docs/app/building-your-application/deploying#nodejs-server
CMD ["node", "server.js"]
