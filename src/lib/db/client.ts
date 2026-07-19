// PRD §4 — Supabase client (server + browser) wired from env.
// Falls back to localStorage on the client when no env is set, so demo / smoke tests
// still work even without a Supabase project attached.

"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getBrowserSupabase(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  cached = createClient(url, anon);
  return cached;
}

export function getSupabase(): SupabaseClient | null {
  return getBrowserSupabase();
}
