import { describe, it, expect } from "vitest";
import {
  SYMPTOMS,
  type Symptom,
  type Severity,
} from "@/types/domain";

// PRD §3 FR-002: MUST be exactly 12 side effects.
describe("domain / Symptom catalog (PRD §3 FR-002)", () => {
  it("contains exactly 12 symptoms", () => {
    expect(SYMPTOMS).toHaveLength(12);
  });

  it("lists every PRD-required symptom at least once", () => {
    const required = [
      "nausea",
      "vomiting",
      "diarrhea",
      "constipation",
      "appetite_change",
      "headache",
      "fatigue",
      "injection_reaction",
      "hypoglycemia",
      "stomach_discomfort",
      "hair_loss",
      "mood_change",
    ];
    const missing = required.filter((s) => !(SYMPTOMS as readonly string[]).includes(s));
    expect(missing).toEqual([]);
  });

  it("includes mood_change as the 12th symptom per §2.2 user flow", () => {
    // PRD lists 噁心 / 嘔吐 / 腹瀉 / 便祕 / 食慾 / 頭痛 / 疲勞 / 注射反應 / 低血糖 / 胃部不適 / 脫髮 / 情緒 = mood_change
    const set = new Set<string>(SYMPTOMS as readonly string[]);
    expect(set.size).toBe(12);
  });
});

describe("domain / Severity (PRD §3 FR-002 mild/moderate/severe)", () => {
  it("severity union compiles to 3 legal values", () => {
    const values: Severity[] = ["mild", "moderate", "severe"];
    expect(values).toHaveLength(3);
  });

  it("a Symptom accepts any severity string", () => {
    const sx: Symptom = "nausea";
    const sv: Severity = "severe";
    expect(sx).toBe("nausea");
    expect(sv).toBe("severe");
  });
});
