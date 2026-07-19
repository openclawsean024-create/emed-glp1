import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// PRD §4.3 + §5.2 — Supabase schema: tables + RLS + constraints smoke checks
describe("supabase migration: 20260719_init.sql (PRD §4.3 + §5.2 RLS)", () => {
  const sql = readFileSync(
    resolve(process.cwd(), "supabase/migrations/20260719_init.sql"),
    "utf-8",
  );

  it("creates the 5 PRD-required tables", () => {
    for (const t of ["users", "treatments", "side_effects", "weight_records", "subscriptions"]) {
      expect(sql).toMatch(new RegExp(`create\\s+table\\s+if\\s+not\\s+exists\\s+public\\.${t}`, "i"));
    }
  });

  it("enables RLS on every clinical table", () => {
    for (const t of ["users", "treatments", "side_effects", "weight_records", "subscriptions"]) {
      const pattern = new RegExp(`alter\\s+table\\s+public\\.${t}\\s+enable\\s+row\\s+level\\s+security`, "i");
      expect(sql).toMatch(pattern);
    }
  });

  it("restricts side_effects symptom to PRD's 12 values", () => {
    for (const s of [
      "nausea", "vomiting", "diarrhea", "constipation", "appetite_change", "headache",
      "fatigue", "injection_reaction", "hypoglycemia", "stomach_discomfort", "hair_loss", "mood_change",
    ]) {
      expect(sql).toContain(`'${s}'`);
    }
  });

  it("uses bcrypt password_hash column (PRD §5.2)", () => {
    expect(sql).toMatch(/password_hash\s+text/i);
  });

  it("constrains role to patient / clinic / family", () => {
    expect(sql).toMatch(/role.*check.*patient.*clinic.*family/);
  });
});
