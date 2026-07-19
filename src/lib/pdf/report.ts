// PRD §3 FR-004 AC-004 + §5.3 降級 — jsPDF + HTML fallback (zero deps install)
// Heavy modules (jsPDF) are loaded dynamically; HTML fallback is always available.

import type { SideEffect, Treatment, WeightRecord } from "@/types/domain";
import { SYMPTOMS, type Symptom } from "@/types/domain";

export interface ReportInput {
  userName: string;
  weekStart: string;
  weekEnd: string;
  weights: WeightRecord[];
  sideEffects: SideEffect[];
  treatments: Treatment[];
}

export interface ReportData {
  userName: string;
  weekStart: string;
  weekEnd: string;
  weightDeltaKg: number;
  totalDoseMg: number;
  weightCount: number;
  symptomCounts: Partial<Record<Symptom, number>>;
  severeCount: number;
  symptomBreakdown: { symptom: Symptom; count: number }[];
  doses: { date: string; med: string; mg: number; site: string | null }[];
}

export function buildReportData(input: ReportInput): ReportData {
  const sortedWeights = [...input.weights].sort((a, b) => a.date.localeCompare(b.date));
  const first = sortedWeights[0]?.weightKg ?? 0;
  const last = sortedWeights[sortedWeights.length - 1]?.weightKg ?? first;
  const weightDeltaKg = last - first;

  const counts: Partial<Record<Symptom, number>> = {};
  let severeCount = 0;
  for (const sx of input.sideEffects) {
    counts[sx.symptom] = (counts[sx.symptom] ?? 0) + 1;
    if (sx.severity === "severe") severeCount += 1;
  }
  const symptomBreakdown = SYMPTOMS.map((s) => ({
    symptom: s,
    count: counts[s] ?? 0,
  })).filter((s) => s.count > 0);

  const totalDoseMg = input.treatments.reduce((acc, t) => acc + t.doseMg, 0);
  const doses = input.treatments.map((t) => ({
    date: t.injectionDate,
    med: t.medication,
    mg: t.doseMg,
    site: t.injectionSite,
  }));

  return {
    userName: input.userName,
    weekStart: input.weekStart,
    weekEnd: input.weekEnd,
    weightDeltaKg,
    totalDoseMg,
    weightCount: input.weights.length,
    symptomCounts: counts,
    severeCount,
    symptomBreakdown,
    doses,
  };
}

/** Should escalate warning be displayed on the report? */
export function shouldEscalate(input: ReportInput): boolean {
  return input.sideEffects.some((sx) => sx.severity === "severe");
}

/**
 * Generate the actual PDF blob.
 * Uses dynamic import so jsPDF isn't loaded until needed.
 */
export async function generateReportPdf(input: ReportInput, _kind: "pdf"): Promise<Blob> {
  const data = buildReportData(input);
  // Dynamic import keeps initial bundle small + supports HTML degradation
  const jspdfModule = await import("jspdf");
  const jsPDF = jspdfModule.jsPDF ?? jspdfModule.default;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();

  doc.setFontSize(16);
  doc.text("eMed GLP-1 Weekly Report", 40, 40);
  doc.setFontSize(10);
  doc.text(`Patient: ${data.userName}`, 40, 60);
  doc.text(`Week: ${data.weekStart} → ${data.weekEnd}`, 40, 76);
  doc.text(`Weight delta: ${data.weightDeltaKg.toFixed(2)} kg  (${data.weightCount} entries)`, 40, 92);
  doc.text(`Total dose: ${data.totalDoseMg.toFixed(2)} mg`, 40, 108);

  doc.setFontSize(12);
  doc.text("Side Effects (12-item daily log)", 40, 140);

  let y = 160;
  doc.setFontSize(10);
  for (const sb of data.symptomBreakdown) {
    doc.text(`• ${sb.symptom}: ${sb.count}`, 50, y);
    y += 14;
    if (y > 760) {
      doc.addPage();
      y = 40;
    }
  }

  if (data.severeCount > 0) {
    doc.setTextColor(180, 0, 0);
    doc.text(
      `! ${data.severeCount} severe side-effect(s) recorded — please consult your physician.`,
      40,
      y + 14,
    );
    doc.setTextColor(0, 0, 0);
    y += 30;
  }

  if (data.doses.length > 0) {
    doc.setFontSize(12);
    doc.text("Medication Doses", 40, y + 8);
    y += 26;
    doc.setFontSize(10);
    for (const d of data.doses) {
      doc.text(`${d.date}  ${d.med} ${d.mg} mg  site=${d.site ?? "-"}`, 50, y);
      y += 14;
      if (y > 760) {
        doc.addPage();
        y = 40;
      }
    }
  }

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "This report is for tracking only. It does not replace professional medical advice.",
    40,
    doc.internal.pageSize.getHeight() - 24,
    { maxWidth: W - 80 },
  );

  const ab = doc.output("arraybuffer");
  return new Blob([ab], { type: "application/pdf" });
}

/** Render an HTML fallback when the PDF engine fails. PRD §5.3 降級機制. */
export function renderHtmlReport(input: ReportInput): string {
  const data = buildReportData(input);
  const banner = data.severeCount > 0
    ? `<div style="background:#fee2e2;border:1px solid #dc2626;padding:12px;color:#7f1d1d;border-radius:6px;margin:16px 0;">
         <strong>⚠ 嚴重副作用警示</strong> — 本週 ${data.severeCount} 次嚴重副作用紀錄，請立即與您的主治醫師聯繫。
       </div>`
    : "";

  const symptoms = data.symptomBreakdown
    .map((s) => `<li>${s.symptom} — ${s.count} 次</li>`)
    .join("");

  const doses = data.doses
    .map((d) => `<tr><td>${d.date}</td><td>${d.med}</td><td>${d.mg} mg</td><td>${d.site ?? "-"}</td></tr>`)
    .join("");

  return `
  <!doctype html>
  <html lang="zh-Hant">
  <head>
    <meta charset="utf-8" />
    <title>eMed GLP-1 Weekly Report — ${data.userName}</title>
  </head>
  <body style="font-family:system-ui;max-width:780px;margin:32px auto;padding:0 16px;color:#111;">
    <h1>eMed GLP-1 週報（HTML 列印版本）</h1>
    <p><strong>${data.userName}</strong>｜${data.weekStart} → ${data.weekEnd}</p>
    ${banner}
    <section>
      <h2>體重</h2>
      <p>本週體重變化：<strong>${data.weightDeltaKg >= 0 ? "+" : ""}${data.weightDeltaKg.toFixed(2)} kg</strong>（${data.weightCount} 筆紀錄）</p>
    </section>
    <section>
      <h2>12 項副作用分佈</h2>
      ${symptoms ? `<ul>${symptoms}</ul>` : "<p>本週無副作用紀錄。</p>"}
    </section>
    <section>
      <h2>藥物劑量歷程</h2>
      ${doses ? `<table border="1" cellpadding="6" cellspacing="0"><thead><tr><th>日期</th><th>藥物</th><th>劑量</th><th>部位</th></tr></thead><tbody>${doses}</tbody></table>` : "<p>本週無施打紀錄。</p>"}
      <p>總劑量：<strong>${data.totalDoseMg.toFixed(2)} mg</strong></p>
    </section>
    <footer style="margin-top:32px;font-size:12px;color:#666;">
      本報告僅供追蹤使用，不取代醫師專業判斷。
    </footer>
  </body>
  </html>`;
}

export type DegradedReport =
  | { kind: "pdf"; blob: Blob }
  | { kind: "html"; html: string };

/**
 * PRD §5.3 — graceful degradation. If the PDF engine is null/unavailable,
 * switch to the HTML render path (still a printable, complete report).
 */
export async function degradePdfEngine(
  input: ReportInput,
  engine: "pdf" | null,
): Promise<DegradedReport> {
  if (engine === null) {
    return { kind: "html", html: renderHtmlReport(input) };
  }
  try {
    const blob = await generateReportPdf(input, "pdf");
    return { kind: "pdf", blob };
  } catch {
    return { kind: "html", html: renderHtmlReport(input) };
  }
}

/** Convenience: open a Blob in a new tab or trigger download. Browser-only. */
export function blobDownloadUrl(blob: Blob): string {
  return URL.createObjectURL(blob);
}
