// Core domain types — mirrors PRD/SPEC.md §4.3 data model
// Pure types only, no runtime side-effects, so they're trivially testable.

export type UserRole = "patient" | "clinic" | "family";
export type Plan = "free" | "patient_pro" | "clinic" | "enterprise";

export interface User {
  id: string;
  email: string;
  passwordHash: string | null;
  role: UserRole;
  clinicId: string | null;
  plan: Plan;
  createdAt: string;
}

export type Medication = "Semaglutide" | "Tirzepatide";
export type InjectionSite = "abdomen" | "thigh" | "arm";

export interface Treatment {
  id: string;
  userId: string;
  medication: Medication;
  doseMg: number;
  injectionDate: string; // ISO
  injectionSite: InjectionSite | null;
}

// PRD §3 FR-002 — exactly 12 symptoms (食慾 covers 降低 / 增加 variant)
export const SYMPTOMS = [
  "nausea",             // 噁心
  "vomiting",           // 嘔吐
  "diarrhea",           // 腹瀉
  "constipation",       // 便祕
  "appetite_change",    // 食慾降低 / 增加（合併為 1 項，severity 決定方向）
  "headache",           // 頭痛
  "fatigue",            // 疲勞
  "injection_reaction", // 注射部位反應
  "hypoglycemia",       // 低血糖
  "stomach_discomfort", // 胃部不適
  "hair_loss",          // 脫髮
  "mood_change",        // 情緒變化
] as const;

export type Symptom = (typeof SYMPTOMS)[number];
export type AppetiteDirection = "decreased" | "increased" | "unchanged";
export type Severity = "mild" | "moderate" | "severe";

export interface SideEffectEntry {
  symptom: Symptom;
  severity: Severity;
  appetiteDirection?: AppetiteDirection;
  notes?: string | null;
}

export interface SideEffect {
  id: string;
  userId: string;
  date: string;       // ISO YYYY-MM-DD
  symptom: Symptom;
  severity: Severity;
  notes: string | null;
}

export interface WeightRecord {
  id: string;
  userId: string;
  date: string; // ISO YYYY-MM-DD
  weightKg: number;
}

export interface WeeklyReport {
  id: string;
  userId: string;
  weekStart: string;
  weekEnd: string;
  pdfUrl: string | null;
}

export interface EducationArticle {
  id: string;
  slug: string;
  title: string;
  category: "treatment" | "diet" | "exercise" | "side_effects" | "qa";
  body: string;             // markdown body
  physicianReviewed: boolean;
  reviewedBy: string | null;
  tags: string[];
}
