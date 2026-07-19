import { describe, it, expect } from "vitest";
import {
  nextInjectionSite,
  rotateSite,
  weeksOfTreatment,
  totalDoseMg,
} from "@/lib/treatments/engine";
import type { InjectionSite, Treatment } from "@/types/domain";

// PRD §3 FR-001 AC-001: 部位輪換提醒（腹部/大腿/手臂）
describe("treatment / injection-site rotation (PRD §3 FR-001 AC-001)", () => {
  it("cycles abdomen -> thigh -> arm -> abdomen", () => {
    const order: InjectionSite[] = ["abdomen", "thigh", "arm"];
    let cur: InjectionSite = "abdomen";
    const seen: InjectionSite[] = [cur];
    for (let i = 0; i < 5; i++) {
      cur = nextInjectionSite(cur);
      seen.push(cur);
    }
    expect(seen.slice(0, 4)).toEqual(["abdomen", "thigh", "arm", "abdomen"]);
  });

  it("returns abdomen as default when last site is null", () => {
    expect(nextInjectionSite(null)).toBe("abdomen");
  });

  it("rotateSite mutates a record and returns the new site", () => {
    const t = { injectionSite: "abdomen" as InjectionSite | null };
    const next = rotateSite(t);
    expect(next).toBe("thigh");
    expect(t.injectionSite).toBe("thigh");
  });
});

describe("treatment / dose math (engine helpers)", () => {
  const treatments: Treatment[] = [
    { id: "1", userId: "u", medication: "Semaglutide", doseMg: 0.25, injectionDate: "2026-07-01", injectionSite: "abdomen" },
    { id: "2", userId: "u", medication: "Semaglutide", doseMg: 0.5,  injectionDate: "2026-07-08", injectionSite: "thigh" },
    { id: "3", userId: "u", medication: "Semaglutide", doseMg: 1.0,  injectionDate: "2026-07-15", injectionSite: "arm" },
    { id: "4", userId: "u", medication: "Semaglutide", doseMg: 1.0,  injectionDate: "2026-07-22", injectionSite: "abdomen" },
  ];

  it("weeksOfTreatment counts unique weeks with doses", () => {
    expect(weeksOfTreatment(treatments)).toBe(4);
  });

  it("totalDoseMg sums every dose", () => {
    expect(totalDoseMg(treatments)).toBeCloseTo(2.75, 5);
  });

  it("engines are pure — empty input returns safe defaults", () => {
    expect(weeksOfTreatment([])).toBe(0);
    expect(totalDoseMg([])).toBe(0);
  });
});
