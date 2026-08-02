import { describe, it, expect } from "vitest";
import {
  isSevereSideEffect,
  summaryBySymptom,
  urgentCta,
  dangerousCombo,
} from "@/lib/side-effects/analyzer";
import type { SideEffect } from "@/types/domain";

// PRD §3 FR-002 AC-002 — 12-item daily log; severe => urge contact doctor
describe("side-effects / analyzer (PRD §3 FR-002 AC-002 + §5.2 危機語言)", () => {
  const build = (
    partial: Partial<SideEffect> & Pick<SideEffect, "symptom" | "severity">,
  ): SideEffect => ({
    id: partial.id ?? crypto.randomUUID(),
    userId: partial.userId ?? "u",
    date: partial.date ?? "2026-07-19",
    symptom: partial.symptom,
    severity: partial.severity,
    notes: partial.notes ?? null,
  });

  it("isSevereSideEffect returns true only for severity=severe", () => {
    expect(isSevereSideEffect(build({ symptom: "nausea", severity: "severe" }))).toBe(true);
    expect(isSevereSideEffect(build({ symptom: "nausea", severity: "moderate" }))).toBe(false);
    expect(isSevereSideEffect(build({ symptom: "nausea", severity: "mild" }))).toBe(false);
  });

  it("summaryBySymptom counts occurrences correctly", () => {
    const records = [
      build({ symptom: "nausea", severity: "mild" }),
      build({ symptom: "nausea", severity: "moderate" }),
      build({ symptom: "headache", severity: "severe" }),
    ];
    const s = summaryBySymptom(records);
    expect(s.nausea!.count).toBe(2);
    expect(s.headache!.count).toBe(1);
    expect(s.nausea!.severeCount).toBe(0);
    expect(s.headache!.severeCount).toBe(1);
  });

  it("urgentCta triggers on any severe entry", () => {
    const urgent = urgentCta([
      build({ symptom: "vomiting", severity: "mild" }),
      build({ symptom: "nausea", severity: "severe" }),
    ]);
    expect(urgent.shouldContact).toBe(true);
    expect(urgent.message).toMatch(/醫師/);
  });

  it("urgentCta stays silent for non-severe entries", () => {
    const calm = urgentCta([build({ symptom: "fatigue", severity: "mild" })]);
    expect(calm.shouldContact).toBe(false);
  });

  it("dangerousCombo flags hypoglycemia + severe", () => {
    expect(
      dangerousCombo([build({ symptom: "hypoglycemia", severity: "severe" })]),
    ).toBe(true);
    expect(
      dangerousCombo([build({ symptom: "hypoglycemia", severity: "mild" })]),
    ).toBe(false);
    expect(dangerousCombo([])).toBe(false);
  });
});
