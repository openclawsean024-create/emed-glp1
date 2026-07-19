import { describe, it, expect } from "vitest";
import {
  weeklyAverageDeltaKg,
  trendDirection,
  extrapolatedGoal,
  requiresFourWeeks,
  chartDataPoints,
} from "@/lib/weights/trend";
import type { WeightRecord } from "@/types/domain";

// PRD §3 FR-003 AC-003 — 4-week threshold + weekly avg decline
describe("weight trend (PRD §3 FR-003 AC-003)", () => {
  // 5 weekly records, total drop 2.4 kg
  const weights: WeightRecord[] = [
    { id: "w1", userId: "u", date: "2026-06-21", weightKg: 80.0 },
    { id: "w2", userId: "u", date: "2026-06-28", weightKg: 79.4 },
    { id: "w3", userId: "u", date: "2026-07-05", weightKg: 78.6 },
    { id: "w4", userId: "u", date: "2026-07-12", weightKg: 78.0 },
    { id: "w5", userId: "u", date: "2026-07-19", weightKg: 77.6 },
  ];

  it("requiresFourWeeks gates chart display", () => {
    expect(requiresFourWeeks(weights)).toBe(true);
    expect(requiresFourWeeks(weights.slice(0, 3))).toBe(false);
  });

  it("weeklyAverageDeltaKg computes kg per week from sorted records", () => {
    // Total drop = 80 - 77.6 = 2.4 over 4 weeks => 0.6 kg/week decline => -0.6
    const delta = weeklyAverageDeltaKg(weights);
    expect(delta).toBeCloseTo(-0.6, 2);
  });

  it("trendDirection returns 'declining' for negative deltas", () => {
    expect(trendDirection(weights)).toBe("declining");
    // rising case: weight gains over time
    expect(
      trendDirection([weights[0], { ...weights[weights.length - 1], weightKg: 82 }]),
    ).toBe("rising");
    // flat case: identical weights across multiple entries
    expect(
      trendDirection([
        { id: "x", userId: "u", date: "2026-07-01", weightKg: 70 },
        { id: "y", userId: "u", date: "2026-07-08", weightKg: 70 },
      ]),
    ).toBe("flat");
  });

  it("extrapolatedGoal projects target date based on delta", () => {
    const goal = 70; // kg
    const weeksAway = extrapolatedGoal(weights, goal);
    // 7.6 kg to lose at 0.6 kg/week => ~12.66 weeks
    expect(weeksAway).toBeGreaterThan(12);
    expect(weeksAway).toBeLessThan(13.5);
  });

  it("chartDataPoints returns x/y-shaped points for Recharts", () => {
    const points = chartDataPoints(weights);
    expect(points).toHaveLength(5);
    expect(points[0]).toEqual({ x: "2026-06-21", y: 80 });
    expect(points.at(-1)).toEqual({ x: "2026-07-19", y: 77.6 });
  });

  it("empty input yields empty / sensible defaults", () => {
    expect(chartDataPoints([])).toEqual([]);
    expect(weeklyAverageDeltaKg([])).toBe(0);
    expect(extrapolatedGoal([], 70)).toBeNull();
    expect(trendDirection([])).toBe("flat");
  });
});
