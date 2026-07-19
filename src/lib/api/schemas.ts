// PRD §4 — request body validation for /api/treatments, /api/side-effects, /api/weights
// Uses Zod. Strict — no any, no coercion beyond z.coerce.

import { z } from "zod";
import { SYMPTOMS } from "@/types/domain";

type ZodSafeParse<T> = ReturnType<z.ZodType<T>["safeParse"]>;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const TreatmentSchema = z.object({
  medication: z.enum(["Semaglutide", "Tirzepatide"]),
  doseMg: z.number().positive().max(50),
  injectionDate: z
    .string()
    .regex(ISO_DATE, "Expected ISO date YYYY-MM-DD")
    .refine((d) => new Date(d).getTime() <= Date.now(), {
      message: "injectionDate cannot be in the future",
    }),
  injectionSite: z.enum(["abdomen", "thigh", "arm"]).nullable(),
});

export const SideEffectSchema = z.object({
  date: z.string().regex(ISO_DATE),
  symptom: z.enum(SYMPTOMS),
  severity: z.enum(["mild", "moderate", "severe"]),
  appetiteDirection: z.enum(["decreased", "increased", "unchanged"]).optional(),
  notes: z.string().max(500).nullable().optional(),
});

export const WeightSchema = z.object({
  date: z.string().regex(ISO_DATE),
  weightKg: z.number().min(20).max(300),
});

export type TreatmentInput = z.infer<typeof TreatmentSchema>;
export type SideEffectInput = z.infer<typeof SideEffectSchema>;
export type WeightInput = z.infer<typeof WeightSchema>;

export type Validation<T> = { ok: true; value: T } | { ok: false; error: string };

function fromZod<T>(r: ZodSafeParse<T>): Validation<T> {
  if (r.success) return { ok: true, value: r.data };
  const first = r.error.issues[0];
  return { ok: false, error: first ? `${first.path.join(".")}: ${first.message}` : "invalid" };
}

export function validateTreatmentInput(input: unknown): Validation<TreatmentInput> {
  return fromZod(TreatmentSchema.safeParse(input));
}

export function validateSideEffectInput(input: unknown): Validation<SideEffectInput> {
  return fromZod(SideEffectSchema.safeParse(input));
}

export function validateWeightInput(input: unknown): Validation<WeightInput> {
  return fromZod(WeightSchema.safeParse(input));
}
