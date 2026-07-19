import type { WeightRecord } from "@/types/domain";

export function sortByDate(records: WeightRecord[]): WeightRecord[] {
  return [...records].sort((a, b) => a.date.localeCompare(b.date));
}

/** PRD §3 FR-003 AC-003 gating condition. */
export function requiresFourWeeks(records: WeightRecord[]): boolean {
  return sortByDate(records).length >= 4;
}

/** Negative = losing, positive = gaining. */
export function weeklyAverageDeltaKg(records: WeightRecord[]): number {
  const sorted = sortByDate(records);
  if (sorted.length < 2) return 0;
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const weeks = Math.max(
    1,
    Math.round(
      (new Date(last.date).getTime() - new Date(first.date).getTime()) /
        (7 * 86_400_000),
    ),
  );
  return (last.weightKg - first.weightKg) / weeks;
}

export type Trend = "declining" | "rising" | "flat";

export function trendDirection(records: WeightRecord[]): Trend {
  if (records.length < 2) return "flat";
  const delta = weeklyAverageDeltaKg(records);
  if (delta < -0.1) return "declining";
  if (delta > 0.1) return "rising";
  return "flat";
}

/** Returns weeks remaining to target — null if not declining or no path. */
export function extrapolatedGoal(records: WeightRecord[], targetKg: number): number | null {
  const sorted = sortByDate(records);
  if (sorted.length < 2) return null;
  const delta = weeklyAverageDeltaKg(sorted);
  if (delta >= 0) return null;
  const current = sorted[sorted.length - 1].weightKg;
  if (current <= targetKg) return 0;
  return (current - targetKg) / Math.abs(delta);
}

export interface ChartPoint {
  x: string;
  y: number;
}

export function chartDataPoints(records: WeightRecord[]): ChartPoint[] {
  return sortByDate(records).map((r) => ({ x: r.date, y: r.weightKg }));
}
