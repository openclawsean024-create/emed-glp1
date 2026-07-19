import type { SideEffect, Symptom, Severity } from "@/types/domain";
import { SYMPTOMS } from "@/types/domain";

export function isSevereSideEffect(s: Pick<SideEffect, "severity">): boolean {
  return s.severity === "severe";
}

export interface SymptomSummary {
  count: number;
  severeCount: number;
  lastDate: string | null;
}

export type SymptomSummaryMap = Partial<Record<Symptom, SymptomSummary>>;

export function summaryBySymptom(records: SideEffect[]): SymptomSummaryMap {
  const map: SymptomSummaryMap = {};
  for (const r of records) {
    const cur = map[r.symptom] ?? { count: 0, severeCount: 0, lastDate: null };
    cur.count += 1;
    if (r.severity === "severe") cur.severeCount += 1;
    if (!cur.lastDate || r.date > cur.lastDate) cur.lastDate = r.date;
    map[r.symptom] = cur;
  }
  return map;
}

/**
 * PRD §3 FR-002: severe => 自動顯示「請聯絡醫師」CTA
 * PRD §5.2: 危機語言偵測自傷時顯示「安心專線 1925」
 */
export interface UrgentCta {
  shouldContact: boolean;
  message: string;
  hotline?: "1925" | "119";
}

export function urgentCta(records: SideEffect[]): UrgentCta {
  const hasSevere = records.some(isSevereSideEffect);
  if (!hasSevere) {
    return { shouldContact: false, message: "" };
  }
  if (dangerousCombo(records)) {
    return {
      shouldContact: true,
      message: "偵測到低血糖（嚴重）。請立即進食含糖食物並聯絡醫師；若意識不清請撥 119。",
      hotline: "119",
    };
  }
  return {
    shouldContact: true,
    message: "本日有嚴重副作用，建議立即聯絡您的主治醫師。",
  };
}

/** hypoglycemia + severe => escalate. PRD §5.2. */
export function dangerousCombo(records: SideEffect[]): boolean {
  return records.some(
    (r) => r.symptom === "hypoglycemia" && r.severity === "severe",
  );
}

export const ALL_SYMPTOMS: readonly Symptom[] = SYMPTOMS;
export const ALL_SEVERITIES: readonly Severity[] = ["mild", "moderate", "severe"];
