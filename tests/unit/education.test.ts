import { describe, it, expect } from "vitest";
import { searchArticles } from "@/lib/education/search";
import type { EducationArticle } from "@/types/domain";

// PRD §3 FR-005 AC-005: 衛教內容庫 30+ 篇，分類 + 搜尋 + 醫師審核標章
describe("education / search (PRD §3 FR-005 AC-005)", () => {
  // 6 representative articles covering multiple categories
  const articles: EducationArticle[] = [
    {
      id: "a1",
      slug: "nausea-management",
      title: "噁心怎麼辦？5 招緩解 GLP-1 噁心感",
      category: "side_effects",
      body: "少量多餐、避免油炸、薑茶、藥物調整時程、立即聯絡醫師的時機",
      physicianReviewed: true,
      reviewedBy: "林醫師",
      tags: ["噁心", "副作用", "nausea"],
    },
    {
      id: "a2",
      slug: "low-glycemic-diet",
      title: "GLP-1 飲食指南：低 GI 食物清單",
      category: "diet",
      body: "低 GI 食物有助穩定血糖，建議優先選擇原型食物。",
      physicianReviewed: true,
      reviewedBy: "王營養師",
      tags: ["飲食", "diet", "GI"],
    },
    {
      id: "a3",
      slug: "injection-rotation",
      title: "施打部位輪換：避免硬塊的關鍵",
      category: "treatment",
      body: "腹部、大腿、上臂三區輪換，每次間隔 2 公分。",
      physicianReviewed: true,
      reviewedBy: "陳醫師",
      tags: ["施打", "部位", "輪換"],
    },
    {
      id: "a4",
      slug: "exercise-baseline",
      title: "GLP-1 期間運動處方：阻力 + 有氧",
      category: "exercise",
      body: "中等強度有氧 + 每週 2 次阻力訓練。",
      physicianReviewed: false,
      reviewedBy: null,
      tags: ["運動", "exercise"],
    },
    {
      id: "a5",
      slug: "common-qa",
      title: "GLP-1 十大常見 Q&A",
      category: "qa",
      body: "從劑量、療程長、保險到懷孕等十大問題。",
      physicianReviewed: true,
      reviewedBy: "張醫師",
      tags: ["QA", "問答"],
    },
    {
      id: "a6",
      slug: "fitness-cardio",
      title: "減重期有氧運動規劃",
      category: "exercise",
      body: "每週 150 分鐘中等強度有氧，搭配監測心率。",
      physicianReviewed: true,
      reviewedBy: null,
      tags: ["有氧", "運動"],
    },
  ];

  it("finds articles by Chinese keyword in title", () => {
    const r = searchArticles(articles, "噁心");
    expect(r.length).toBeGreaterThanOrEqual(1);
    expect(r[0].id).toBe("a1");
  });

  it("finds articles by English tag", () => {
    expect(searchArticles(articles, "nausea")[0].id).toBe("a1");
  });

  it("case-insensitive substring search across title/body/tags", () => {
    const r = searchArticles(articles, "diet");
    expect(r.map((a) => a.id)).toEqual(expect.arrayContaining(["a2"]));
  });

  it("filters by category", () => {
    const r = searchArticles(articles, "", "exercise");
    expect(r.every((a) => a.category === "exercise")).toBe(true);
    expect(r.map((a) => a.id)).toEqual(expect.arrayContaining(["a4", "a6"]));
  });

  it("returns empty array when no match", () => {
    expect(searchArticles(articles, "zzz-nothing-matches")).toEqual([]);
  });

  it("physicianReviewed flag is exposed on results", () => {
    const r = searchArticles(articles, "運動");
    const unreviewed = r.find((a) => a.id === "a4");
    expect(unreviewed?.physicianReviewed).toBe(false);
    const reviewed = r.find((a) => a.id === "a6");
    expect(reviewed?.physicianReviewed).toBe(true);
  });

  it("counts at least 30 articles in the bundled library", async () => {
    const lib = await import("@/data/education-library");
    expect(lib.EDUCATION_LIBRARY.length).toBeGreaterThanOrEqual(30);
    // every article must have physicianReviewed flag
    expect(lib.EDUCATION_LIBRARY.every((a) => typeof a.physicianReviewed === "boolean")).toBe(true);
  });
});
