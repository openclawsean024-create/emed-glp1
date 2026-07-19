import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ok: true,
    name: "emed-glp1",
    version: "3.0",
    uptimeSeconds: Math.floor(process.uptime()),
    now: new Date().toISOString(),
  });
}
