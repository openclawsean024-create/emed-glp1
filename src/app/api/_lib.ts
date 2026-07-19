// Shared helpers for /api routes

import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function jsonError(message: string, status = 400): NextResponse {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export function fromZod<T>(r: { success: true; data: T } | { success: false; error: ZodError }): NextResponse | T {
  if (r.success) return r.data;
  const first = r.error.issues[0];
  return jsonError(first ? `${first.path.join(".")}: ${first.message}` : "invalid", 422);
}
