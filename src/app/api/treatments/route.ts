import { NextResponse } from "next/server";
import {
  TreatmentSchema,
  validateTreatmentInput,
} from "@/lib/api/schemas";
import { getSupabase } from "@/lib/db/client";
import { jsonError } from "../_lib";

export const dynamic = "force-dynamic";

// Server-side in-memory store for demo when no Supabase env.
// Per-process; cleared on cold start.
const memoryTreatments = new Map<string, { id: string; userId: string; medication: string; doseMg: number; injectionDate: string; injectionSite: string | null }[]>();

function storeKey(userId: string): string {
  return userId || "anonymous";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("invalid JSON");
  }
  const userId = req.headers.get("x-user-id") ?? "anonymous";

  const v = validateTreatmentInput(body);
  if (!v.ok) return jsonError(v.error, 422);

  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("treatments")
      .insert({
        user_id: userId,
        medication: v.value.medication,
        dose_mg: v.value.doseMg,
        injection_date: v.value.injectionDate,
        injection_site: v.value.injectionSite,
      })
      .select()
      .single();
    if (error) return jsonError(error.message, 500);
    return NextResponse.json({ ok: true, treatment: data });
  }

  // Demo: in-memory
  const list = memoryTreatments.get(storeKey(userId)) ?? [];
  const id = `t-${Math.random().toString(36).slice(2)}-${Date.now()}`;
  const row = { id, userId, ...v.value };
  list.push(row);
  memoryTreatments.set(storeKey(userId), list);
  return NextResponse.json({ ok: true, treatment: row, demo: true });
}

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id") ?? "anonymous";
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("treatments")
      .select("*")
      .eq("user_id", userId)
      .order("injection_date", { ascending: false });
    if (error) return jsonError(error.message, 500);
    return NextResponse.json({ ok: true, treatments: data });
  }
  const list = memoryTreatments.get(storeKey(userId)) ?? [];
  return NextResponse.json({ ok: true, treatments: [...list].reverse(), demo: true });
}
