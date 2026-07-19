import type { InjectionSite, Treatment } from "@/types/domain";

const SITE_ORDER: InjectionSite[] = ["abdomen", "thigh", "arm"];

/** PRD §3 FR-001 AC-001 — rotating injection site to avoid lipohypertrophy. */
export function nextInjectionSite(current: InjectionSite | null): InjectionSite {
  if (current == null) return SITE_ORDER[0];
  const idx = SITE_ORDER.indexOf(current);
  return SITE_ORDER[(idx + 1) % SITE_ORDER.length];
}

/** Mutate-style: apply rotation to a treatment-like record. */
export function rotateSite(t: { injectionSite: InjectionSite | null }): InjectionSite {
  const next = nextInjectionSite(t.injectionSite);
  t.injectionSite = next;
  return next;
}

/** Count distinct weeks containing at least one injection. */
export function weeksOfTreatment(treatments: Treatment[]): number {
  const weeks = new Set<string>();
  for (const t of treatments) {
    const d = new Date(t.injectionDate);
    // ISO week-ish: year * 100 + weekOfYear
    const start = new Date(d.getFullYear(), 0, 1);
    const week = Math.floor(((d.getTime() - start.getTime()) / 86_400_000) / 7);
    weeks.add(`${d.getFullYear()}-${week}`);
  }
  return weeks.size;
}

/** Sum of all administered doses, in mg. */
export function totalDoseMg(treatments: Treatment[]): number {
  return treatments.reduce((acc, t) => acc + (Number.isFinite(t.doseMg) ? t.doseMg : 0), 0);
}
