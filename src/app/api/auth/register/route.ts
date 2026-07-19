import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword, validatePassword } from "@/lib/auth/password";
import { getSupabase } from "@/lib/db/client";
import { jsonError } from "../../_lib";

export const dynamic = "force-dynamic";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["patient", "clinic", "family"]).default("patient"),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("invalid JSON");
  }

  const parsed = RegisterSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return jsonError(`email: ${first?.message ?? "invalid"}`, 422);
  }
  const { email, password } = parsed.data;

  const v = validatePassword(password);
  if (!v.ok) return jsonError(v.reason, 422);

  const passwordHash = await hashPassword(password);

  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role: parsed.data.role } },
    });
    if (error) return jsonError(error.message, 400);
    return NextResponse.json({ ok: true, userId: data.user?.id ?? null });
  }

  // Demo fallback (no Supabase): return hash so caller can simulate sign-in locally.
  return NextResponse.json({
    ok: true,
    userId: `demo-${Buffer.from(email).toString("hex").slice(0, 8)}`,
    passwordHashLength: passwordHash.length,
    demo: true,
  });
}
