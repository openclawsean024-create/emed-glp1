import { NextResponse } from "next/server";
import {
  buildReportData,
  degradePdfEngine,
  type ReportInput,
} from "@/lib/pdf/report";
import { jsonError } from "../../_lib";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return jsonError("invalid JSON"); }
  const input = body as Partial<ReportInput>;
  if (!input?.userName || !input?.weekStart || !input?.weekEnd) {
    return jsonError("userName / weekStart / weekEnd required", 422);
  }
  const data = buildReportData({
    userName: input.userName,
    weekStart: input.weekStart,
    weekEnd: input.weekEnd,
    weights: input.weights ?? [],
    sideEffects: input.sideEffects ?? [],
    treatments: input.treatments ?? [],
  });
  try {
    const out = await degradePdfEngine(
      {
        userName: input.userName,
        weekStart: input.weekStart,
        weekEnd: input.weekEnd,
        weights: input.weights ?? [],
        sideEffects: input.sideEffects ?? [],
        treatments: input.treatments ?? [],
      },
      "pdf",
    );
    if (out.kind === "pdf") {
      const buf = Buffer.from(await out.blob.arrayBuffer());
      return new NextResponse(buf, {
        status: 200,
        headers: {
          "content-type": "application/pdf",
          "content-disposition": `attachment; filename="weekly-${input.weekStart}.pdf"`,
        },
      });
    }
    return NextResponse.json({ ok: true, kind: "html", data });
  } catch (e) {
    return jsonError(`pdf failed: ${(e as Error).message}`, 500);
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: "POST { userName, weekStart, weekEnd, weights, sideEffects, treatments }" });
}
