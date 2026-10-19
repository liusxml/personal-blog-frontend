"use client";

import { useState } from "react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // 简单的邮箱验证
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("请输入有效的邮箱地址");
      setIsSubmitting(false);
      return;
    }

    // 模拟订阅（实际项目中调用 API）
    setTimeout(() => {
      setMessage("感谢订阅！我们会将最新文章发送到您的邮箱。");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section
      className="my-16 py-20"
      style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #FF9E00 100%)",
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <div className="mx-auto max-w-2xl">
          {/* 图标 */}
          <div className="mb-6">
            <span className="text-6xl">✉️</span>
          </div>

          {/* 标题 */}
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">订阅获取更新</h2>

          {/* 描述 */}
          <p className="mb-8 text-lg text-white/80">
            第一时间获取最新技术文章，每周精选内容直达您的邮箱
          </p>

          {/* 表单 */}
          <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="输入您的邮箱地址"
              className="max-w-md flex-1 rounded-xl border-2 border-white/30 bg-white/20 px-6 py-4 text-lg text-white placeholder-white/60 backdrop-blur-sm transition-all focus:border-white focus:outline-none"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background: "white",
                color: "#7c3aed",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              {isSubmitting ? "订阅中..." : "立即订阅"}
            </button>
          </form>

          {/* 消息提示 */}
          {message && <p className="mt-4 text-sm text-white/90">{message}</p>}

          {/* 隐私说明 */}
          <p className="mt-6 text-sm text-white/60">
            我们尊重您的隐私，绝不会向第三方分享您的邮箱地址
          </p>
        </div>
      </div>
    </section>
  );
}
