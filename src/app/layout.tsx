import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Blog - 我的技术博客",
  description: "基于 Next.js 16 和 Spring Boot 的现代化个人博客系统",
  keywords: ["技术博客", "Next.js", "Spring Boot", "全栈开发"],
  authors: [{ name: "SX Lab" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "http://localhost:3002",
    siteName: "SX Lab",
    title: "Personal Blog - 我的技术博客",
    description: "分享技术见解，记录学习历程",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
