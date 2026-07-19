import { NextResponse } from "next/server";
import { validateWeightInput } from "@/lib/api/schemas";
import { getSupabase } from "@/lib/db/client";
import { jsonError } from "../_lib";

export const dynamic = "force-dynamic";

const memoryStore = new Map<string, unknown[]>();

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return jsonError("invalid JSON"); }
  const userId = req.headers.get("x-user-id") ?? "anonymous";
  const v = validateWeightInput(body);
  if (!v.ok) return jsonError(v.error, 422);

  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("weight_records")
      .insert({
        user_id: userId,
        date: v.value.date,
        weight_kg: v.value.weightKg,
      })
      .select()
      .single();
    if (error) return jsonError(error.message, 500);
    return NextResponse.json({ ok: true, weight: data });
  }
  const list = memoryStore.get(userId) ?? [];
  const row = { id: `w-${Math.random().toString(36).slice(2)}-${Date.now()}`, userId, ...v.value };
  list.push(row);
  memoryStore.set(userId, list);
  return NextResponse.json({ ok: true, weight: row, demo: true });
}

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id") ?? "anonymous";
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("weight_records")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });
    if (error) return jsonError(error.message, 500);
    return NextResponse.json({ ok: true, weights: data });
  }
  return NextResponse.json({ ok: true, weights: memoryStore.get(userId) ?? [], demo: true });
}
