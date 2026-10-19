"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { ArticleDetailVO } from "@/lib/types";
import CopyButton from "./CopyButton";
import "highlight.js/styles/github-dark.css";

interface Props {
  article: ArticleDetailVO;
}

export default function ArticleContent({ article }: Props) {
  return (
    <div>
      {/* 文章头部 */}
      <header className="mb-8">
        <h1
          className="mb-4 text-4xl font-bold md:text-5xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          {article.title}
        </h1>

        {/* Meta 信息 */}
        <div
          className="flex flex-wrap items-center gap-4 border-b pb-6"
          style={{
            color: "var(--color-text-muted)",
            borderColor: "var(--color-border)",
          }}
        >
          <span>{article.authorName || "匿名作者"}</span>
          <span>·</span>
          <span>{new Date(article.publishTime).toLocaleDateString("zh-CN")}</span>
          {article.viewCount !== undefined && (
            <>
              <span>·</span>
              <span>👁 {article.viewCount} 次浏览</span>
            </>
          )}
          {article.commentCount !== undefined && (
            <>
              <span>·</span>
              <span>💬 {article.commentCount} 条评论</span>
            </>
          )}
        </div>

        {/* 标签 */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full px-4 py-2"
                style={{
                  backgroundColor: tag.color ? `${tag.color}20` : "rgba(110, 38, 255, 0.1)",
                  color: tag.color || "var(--color-primary)",
                }}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Markdown 内容 */}
      <div
        className="prose prose-xl mb-16 max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-h1:mt-12 prose-h1:mb-10 prose-h1:text-4xl prose-h1:font-bold prose-h2:mt-12 prose-h2:mb-8 prose-h2:border-b prose-h2:pb-4 prose-h2:text-3xl prose-h2:font-bold prose-h3:mt-10 prose-h3:mb-6 prose-h3:text-2xl prose-h3:font-semibold prose-p:mb-8 prose-p:text-lg prose-p:leading-[1.8] prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:pl-6 prose-strong:font-semibold prose-strong:text-primary prose-code:rounded prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-pink-400 prose-code:before:content-none prose-code:after:content-none prose-ol:my-8 prose-ul:my-8 prose-li:mb-3 prose-li:leading-[1.75]"
        style={
          {
            color: "var(--color-text-secondary)",
            "--color-primary": "var(--color-primary)",
            "--color-border": "var(--color-border)",
          } as React.CSSProperties
        }
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSlug]}
          components={{
            // 图片样式（暂不实现lightbox，避免类型问题）
            img: ({ ...props }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                {...props}
                alt={props.alt || ""}
                className="my-10 w-full rounded-2xl shadow-2xl transition-shadow hover:shadow-primary/20"
                style={{
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                }}
              />
            ),
            // 代码块复制按钮
            pre: ({ children, ...props }) => {
              const codeString = String(children).replace(/\n$/, "");
              return (
                <div className="group relative">
                  <pre
                    className="my-8 overflow-x-auto rounded-xl border border-white/10 p-5"
                    style={{
                      backgroundColor: "rgba(20, 20, 20, 0.8)",
                      fontFamily: "monospace",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                    }}
                    {...props}
                  >
                    {children}
                  </pre>
                  <CopyButton code={codeString} />
                </div>
              );
            },
            // 强调框增强
            blockquote: ({ children, ...props }) => {
              const text = String(children);
              const isNote = text.includes("💡") || text.includes("Note");
              const isWarning = text.includes("⚠️") || text.includes("Warning");
              const isTip = text.includes("✨") || text.includes("Tip");

              return (
                <blockquote
                  className={`my-8 rounded-r-lg border-l-4 py-4 pl-6 ${
                    isNote
                      ? "border-blue-500 bg-blue-500/10"
                      : isWarning
                        ? "border-yellow-500 bg-yellow-500/10"
                        : isTip
                          ? "border-green-500 bg-green-500/10"
                          : "border-primary bg-primary/5"
                  } `}
                  style={{
                    boxShadow: `0 0 20px ${
                      isNote
                        ? "rgba(59, 130, 246, 0.1)"
                        : isWarning
                          ? "rgba(234, 179, 8, 0.1)"
                          : isTip
                            ? "rgba(34, 197, 94, 0.1)"
                            : "rgba(255, 158, 0, 0.1)"
                    }`,
                  }}
                  {...props}
                >
                  {children}
                </blockquote>
              );
            },
            // 确保表格正确渲染
            table: ({ ...props }) => (
              <table
                className="my-10 w-full border-collapse overflow-hidden rounded-xl shadow-2xl"
                style={{
                  borderColor: "var(--color-border)",
                  background: "linear-gradient(to bottom, rgba(26, 77, 92, 0.15), transparent)",
                  boxShadow: "0 0 40px rgba(26, 77, 92, 0.25), 0 20px 60px rgba(0, 0, 0, 0.4)",
                }}
                {...props}
              />
            ),
            thead: ({ ...props }) => (
              <thead
                style={{
                  background:
                    "linear-gradient(135deg, rgba(26, 77, 92, 0.3), rgba(26, 77, 92, 0.15))",
                  borderBottom: "2px solid #1A4D5C",
                  boxShadow: "0 4px 20px rgba(26, 77, 92, 0.3)",
                }}
                {...props}
              />
            ),
            th: ({ ...props }) => (
              <th
                className="px-6 py-4 text-left text-base font-bold"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-primary)",
                  textShadow: "0 0 10px rgba(26, 77, 92, 0.5)",
                }}
                {...props}
              />
            ),
            td: ({ ...props }) => (
              <td
                className="border px-4 py-2"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
                {...props}
              />
            ),
            tbody: ({ ...props }) => <tbody {...props} />,
            tr: ({ ...props }) => (
              <tr className="border-b" style={{ borderColor: "var(--color-border)" }} {...props} />
            ),
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
