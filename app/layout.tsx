import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "네이버 키워드 통합 분석 앱",
  description: "월간 검색수, 검색 추이, 쇼핑 흐름 통합 조회",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
