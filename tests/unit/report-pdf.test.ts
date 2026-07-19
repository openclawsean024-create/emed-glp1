import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  buildReportData,
  generateReportPdf,
  shouldEscalate,
  degradePdfEngine,
} from "@/lib/pdf/report";

// PRD §3 FR-004 AC-004 — jsPDF 自動產生，含 12 項副作用分佈 + 體重圖 + 劑量歷程
// PRD §5.3 降級：jsPDF 失敗切 HTML
describe("pdf report (PRD §3 FR-004 AC-004 + §5.3)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const inputs = {
    userName: "王小明",
    weekStart: "2026-07-13",
    weekEnd: "2026-07-19",
    weights: [
      { id: "w1", userId: "u", date: "2026-07-13", weightKg: 78.0 },
      { id: "w2", userId: "u", date: "2026-07-19", weightKg: 77.6 },
    ],
    sideEffects: [
      { id: "s1", userId: "u", date: "2026-07-13", symptom: "nausea" as const, severity: "mild" as const, notes: null },
      { id: "s2", userId: "u", date: "2026-07-15", symptom: "headache" as const, severity: "severe" as const, notes: null },
    ],
    treatments: [
      { id: "t1", userId: "u", medication: "Semaglutide" as const, doseMg: 0.5, injectionDate: "2026-07-15", injectionSite: "thigh" as const },
    ],
  };

  it("buildReportData aggregates symptoms, weights, doses", () => {
    const data = buildReportData(inputs);
    expect(data.userName).toBe("王小明");
    expect(data.weightDeltaKg).toBeCloseTo(-0.4, 2);
    expect(data.totalDoseMg).toBeCloseTo(0.5, 2);
    expect(data.symptomCounts.nausea).toBe(1);
    expect(data.symptomCounts.headache).toBe(1);
    expect(data.severeCount).toBe(1);
  });

  it("generateReportPdf returns Blob (jsPDF path)", async () => {
    // jsdom doesn't have full DOMRectList etc, but Blob is supported
    const blob = await generateReportPdf(inputs, "pdf");
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("application/pdf");
  });

  it("shouldEscalate triggers severe-side-effect warning", () => {
    expect(shouldEscalate(inputs)).toBe(true);
    const safe = { ...inputs, sideEffects: [] };
    expect(shouldEscalate(safe)).toBe(false);
  });

  it("degradePdfEngine falls back to HTML when PDF engine is null", async () => {
    const out = await degradePdfEngine(inputs, null);
    expect(out.kind).toBe("html");
    if (out.kind === "html") {
      expect(out.html.length).toBeGreaterThan(100);
      expect(out.html).toMatch(/王小明/);
    }
  });

  it("degradePdfEngine returns pdf blob when engine available", async () => {
    const out = await degradePdfEngine(inputs, "pdf");
    expect(out.kind).toBe("pdf");
    if (out.kind === "pdf") {
      expect(out.blob).toBeInstanceOf(Blob);
    }
  });
});
