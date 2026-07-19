import type { EducationArticle } from "@/types/domain";

/**
 * PRD §3 FR-005 AC-005 — 衛教內容庫搜尋
 * - case-insensitive
 * - matches across title, body, tags
 * - category filter
 */
export function searchArticles(
  articles: EducationArticle[],
  query: string,
  category?: EducationArticle["category"],
): EducationArticle[] {
  const q = query.trim().toLowerCase();
  const filtered = articles.filter((a) => {
    if (category && a.category !== category) return false;
    if (q.length === 0) return true;
    const haystacks = [a.title, a.body, ...a.tags];
    return haystacks.some((h) => h.toLowerCase().includes(q));
  });
  // rank: title hit > tag hit > body hit
  return filtered
    .map((a) => ({
      a,
      score: score(a, q),
    }))
    .sort((x, y) => y.score - x.score)
    .map((x) => x.a);
}

function score(a: EducationArticle, q: string): number {
  if (q.length === 0) return 1;
  let s = 0;
  if (a.title.toLowerCase().includes(q)) s += 100;
  if (a.tags.some((t) => t.toLowerCase().includes(q))) s += 50;
  if (a.body.toLowerCase().includes(q)) s += 10;
  return s;
}
