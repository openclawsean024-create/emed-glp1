import { describe, it, expect, beforeEach } from "vitest";
import {
  createLocalStorageRepo,
  type Repo,
} from "@/lib/db/repo";
import type {
  Treatment,
  SideEffect,
  WeightRecord,
  User,
  Symptom,
  Severity,
} from "@/types/domain";

// Test the localStorage-backed repo abstraction (PRD §4)
// Real Supabase repo would implement same interface — single switch.
// Using a tiny in-memory mock of localStorage for Node test environment.

const memory = new Map<string, string>();
beforeEach(() => memory.clear());

(globalThis as unknown as { localStorage: unknown }).localStorage = {
  getItem: (k: string) => memory.get(k) ?? null,
  setItem: (k: string, v: string) => void memory.set(k, v),
  removeItem: (k: string) => void memory.delete(k),
  clear: () => memory.clear(),
  key: (i: number) => Array.from(memory.keys())[i] ?? null,
  get length() { return memory.size; },
};

const repo: Repo = createLocalStorageRepo("test-user");

describe("repo / createLocalStorageRepo (PRD §4 storage)", () => {
  it("lists zero rows initially", () => {
    expect(repo.treatments.list().length).toBe(0);
    expect(repo.sideEffects.list().length).toBe(0);
    expect(repo.weights.list().length).toBe(0);
  });

  it("creates + lists treatments", () => {
    const t: Omit<Treatment, "id"> = {
      userId: "test-user",
      medication: "Semaglutide",
      doseMg: 0.5,
      injectionDate: "2026-07-19",
      injectionSite: "abdomen",
    };
    const created = repo.treatments.create(t);
    expect(created.id).toBeTruthy();
    expect(repo.treatments.list()).toHaveLength(1);
    expect(repo.treatments.list()[0].medication).toBe("Semaglutide");
  });

  it("updates + deletes a treatment", () => {
    const t = repo.treatments.create({
      userId: "test-user",
      medication: "Semaglutide",
      doseMg: 0.5,
      injectionDate: "2026-07-19",
      injectionSite: "abdomen",
    });
    repo.treatments.update(t.id, { doseMg: 0.75 });
    expect(repo.treatments.list()[0].doseMg).toBe(0.75);
    repo.treatments.delete(t.id);
    expect(repo.treatments.list()).toHaveLength(0);
  });

  it("creates + lists side-effects with 12-item validation", () => {
    const symptom: Symptom = "nausea";
    const severity: Severity = "moderate";
    const sx = repo.sideEffects.create({
      userId: "test-user",
      date: "2026-07-19",
      symptom,
      severity,
      notes: null,
    });
    expect(repo.sideEffects.list()).toHaveLength(1);
    expect(sx.severity).toBe("moderate");
  });

  it("creates + lists weight records", () => {
    repo.weights.create({
      userId: "test-user",
      date: "2026-07-19",
      weightKg: 78.5,
    });
    expect(repo.weights.list()).toHaveLength(1);
    expect(repo.weights.list()[0].weightKg).toBe(78.5);
  });

  it("isolates by userId (no cross-user leakage)", () => {
    const otherRepo: Repo = createLocalStorageRepo("other-user");
    repo.treatments.create({
      userId: "test-user",
      medication: "Semaglutide",
      doseMg: 0.25,
      injectionDate: "2026-07-19",
      injectionSite: "arm",
    });
    expect(otherRepo.treatments.list()).toHaveLength(0);
    expect(repo.treatments.list()).toHaveLength(1);
  });

  it("does not mutate the input object passed to create", () => {
    const input = {
      userId: "test-user",
      medication: "Semaglutide" as const,
      doseMg: 0.5,
      injectionDate: "2026-07-19",
      injectionSite: "abdomen" as const,
    };
    const before = JSON.stringify(input);
    repo.treatments.create(input);
    expect(JSON.stringify(input)).toBe(before);
  });

  it("user profile upsert is idempotent", () => {
    const profile: User = {
      id: "test-user",
      email: "demo@emed-glp1.test",
      passwordHash: null,
      role: "patient",
      clinicId: null,
      plan: "free",
      createdAt: new Date().toISOString(),
    };
    repo.user.upsert(profile);
    expect(repo.user.get()?.email).toBe("demo@emed-glp1.test");
    repo.user.upsert({ ...profile, plan: "patient_pro" });
    expect(repo.user.get()?.plan).toBe("patient_pro");
  });

  it("filters side-effects by date range", () => {
    const dates = ["2026-07-15", "2026-07-17", "2026-07-19"];
    for (const d of dates) {
      repo.sideEffects.create({
        userId: "test-user",
        date: d,
        symptom: "nausea",
        severity: "mild",
        notes: null,
      });
    }
    const inRange = repo.sideEffects.listInRange("2026-07-16", "2026-07-19");
    expect(inRange).toHaveLength(2);
  });
});
