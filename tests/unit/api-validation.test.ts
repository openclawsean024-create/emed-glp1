import { describe, it, expect } from "vitest";
import {
  validateTreatmentInput,
  validateSideEffectInput,
  validateWeightInput,
  TreatmentSchema,
  SideEffectSchema,
  WeightSchema,
} from "@/lib/api/schemas";

// PRD §4 API validation + zod schema tests
describe("api/schemas — validation (PRD §4 endpoints)", () => {
  describe("POST /api/treatments", () => {
    it("accepts valid Semaglutide treatment", () => {
      const r = TreatmentSchema.safeParse({
        medication: "Semaglutide",
        doseMg: 0.25,
        injectionDate: "2026-07-19",
        injectionSite: "abdomen",
      });
      expect(r.success).toBe(true);
    });

    it("rejects unknown medication", () => {
      const r = validateTreatmentInput({ medication: "Ozempic", doseMg: 0.25, injectionDate: "2026-07-19", injectionSite: "abdomen" });
      expect(r.ok).toBe(false);
    });

    it("rejects negative dose", () => {
      const r = validateTreatmentInput({ medication: "Semaglutide", doseMg: -1, injectionDate: "2026-07-19", injectionSite: "abdomen" });
      expect(r.ok).toBe(false);
    });

    it("rejects future date", () => {
      const r = validateTreatmentInput({ medication: "Semaglutide", doseMg: 0.5, injectionDate: "2099-01-01", injectionSite: null });
      expect(r.ok).toBe(false);
    });

    it("accepts Tirzepatide", () => {
      const r = validateTreatmentInput({ medication: "Tirzepatide", doseMg: 5, injectionDate: "2026-07-19", injectionSite: "arm" });
      expect(r.ok).toBe(true);
    });
  });

  describe("POST /api/side-effects", () => {
    it("accepts valid side-effect payload", () => {
      const r = SideEffectSchema.safeParse({
        date: "2026-07-19",
        symptom: "nausea",
        severity: "moderate",
        notes: "after lunch",
      });
      expect(r.success).toBe(true);
    });

    it("rejects unknown symptom", () => {
      const r = validateSideEffectInput({ date: "2026-07-19", symptom: "fever", severity: "mild" });
      expect(r.ok).toBe(false);
    });

    it("rejects unknown severity", () => {
      const r = validateSideEffectInput({ date: "2026-07-19", symptom: "nausea", severity: "extreme" });
      expect(r.ok).toBe(false);
    });

    it("accepts every PRD symptom", () => {
      const symptoms = ["nausea", "vomiting", "diarrhea", "constipation",
        "appetite_change", "headache", "fatigue", "injection_reaction",
        "hypoglycemia", "stomach_discomfort", "hair_loss", "mood_change"] as const;
      for (const s of symptoms) {
        const r = validateSideEffectInput({ date: "2026-07-19", symptom: s, severity: "mild" });
        expect(r.ok).toBe(true);
      }
    });
  });

  describe("POST /api/weights", () => {
    it("accepts valid weight (40-200 kg)", () => {
      const r = validateWeightInput({ date: "2026-07-19", weightKg: 75.5 });
      expect(r.ok).toBe(true);
    });

    it("rejects implausible high weight", () => {
      const r = validateWeightInput({ date: "2026-07-19", weightKg: 999 });
      expect(r.ok).toBe(false);
    });

    it("accepts weight parsing through schema", () => {
      const r = WeightSchema.safeParse({ date: "2026-07-19", weightKg: 60 });
      expect(r.success).toBe(true);
    });
  });
});
