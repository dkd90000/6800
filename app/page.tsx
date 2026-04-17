"use client";

import { useMemo, useState } from "react";
import { Search, TrendingUp, ShoppingBag, BarChart3 } from "lucide-react";

type KeywordMetric = {
  keyword: string;
  monthlySearch: number;
  trend: "상승" | "유지" | "하락";
  shoppingScore: number;
};

const SAMPLE_DATA: KeywordMetric[] = [
  { keyword: "러닝화", monthlySearch: 90500, trend: "상승", shoppingScore: 88 },
  { keyword: "캠핑의자", monthlySearch: 42100, trend: "유지", shoppingScore: 72 },
  { keyword: "스탠드 조명", monthlySearch: 37800, trend: "상승", shoppingScore: 81 },
  { keyword: "단백질바", monthlySearch: 52600, trend: "하락", shoppingScore: 69 },
  { keyword: "무선청소기", monthlySearch: 112000, trend: "상승", shoppingScore: 91 },
];

const trendColor: Record<KeywordMetric["trend"], string> = {
  상승: "#16a34a",
  유지: "#64748b",
  하락: "#dc2626",
};

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return SAMPLE_DATA;
    return SAMPLE_DATA.filter((item) => item.keyword.toLowerCase().includes(keyword));
  }, [query]);

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="badge">NEW APP</p>
        <h1>키워드 인사이트 미니 앱</h1>
        <p className="subtitle">검색량 · 트렌드 · 쇼핑 흐름을 빠르게 확인하는 MVP 화면입니다.</p>
      </section>

      <section className="search-box">
        <Search size={18} aria-hidden />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="키워드를 입력해 필터링하세요"
          aria-label="키워드 검색"
        />
      </section>

      <section className="stats-grid" aria-label="요약 지표">
        <article className="stat-card">
          <div className="icon-wrap"><BarChart3 size={18} aria-hidden /></div>
          <h2>평균 검색량</h2>
          <p>{Math.round(SAMPLE_DATA.reduce((acc, cur) => acc + cur.monthlySearch, 0) / SAMPLE_DATA.length).toLocaleString()}회</p>
        </article>
        <article className="stat-card">
          <div className="icon-wrap"><TrendingUp size={18} aria-hidden /></div>
          <h2>상승 키워드</h2>
          <p>{SAMPLE_DATA.filter((k) => k.trend === "상승").length}개</p>
        </article>
        <article className="stat-card">
          <div className="icon-wrap"><ShoppingBag size={18} aria-hidden /></div>
          <h2>평균 쇼핑 점수</h2>
          <p>{Math.round(SAMPLE_DATA.reduce((acc, cur) => acc + cur.shoppingScore, 0) / SAMPLE_DATA.length)}점</p>
        </article>
      </section>

      <section className="table-wrap" aria-label="키워드 리스트">
        <table>
          <thead>
            <tr>
              <th>키워드</th>
              <th>월간 검색수</th>
              <th>검색 추이</th>
              <th>쇼핑 흐름 점수</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.keyword}>
                <td>{item.keyword}</td>
                <td>{item.monthlySearch.toLocaleString()}</td>
                <td>
                  <span style={{ color: trendColor[item.trend], fontWeight: 700 }}>{item.trend}</span>
                </td>
                <td>{item.shoppingScore}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="empty">검색 결과가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
