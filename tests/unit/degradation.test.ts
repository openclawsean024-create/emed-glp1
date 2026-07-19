import { describe, it, expect, vi } from "vitest";
import { createDegradationRegistry } from "@/lib/reliability/degradation";

// PRD §5.3 — graceful degradation: primary 失敗 → fallback；recovered primary 等 5 min cool-down
describe("degradation registry (PRD §5.3)", () => {
  it("uses primary when primary succeeds", async () => {
    const reg = createDegradationRegistry();
    const e = reg.register({
      name: "primary-only",
      primary: async () => "ok",
      fallback: async () => "fallback",
      recoveryCoolingMs: 60_000,
    });
    expect(await reg.run(e)).toBe("ok");
    expect(reg.listDegraded()).toEqual([]);
  });

  it("falls back to fallback when primary throws", async () => {
    const reg = createDegradationRegistry();
    const e = reg.register({
      name: "pdf-engine",
      primary: async () => { throw new Error("jsPDF blew up"); },
      fallback: async () => "<html>HTML fallback</html>",
      recoveryCoolingMs: 300_000, // 5 minutes per PRD
    });
    const out = await reg.run(e);
    expect(out).toBe("<html>HTML fallback</html>");
    expect(reg.listDegraded()).toContain("pdf-engine");
  });

  it("cooling: does NOT retry primary during cooling window", async () => {
    const reg = createDegradationRegistry();
    const primary = vi.fn(async () => { throw new Error("still down"); });
    const e = reg.register({
      name: "supabase-db",
      primary,
      fallback: async () => "localStorage-cached",
      recoveryCoolingMs: 60_000,
    });
    // First call → primary throws → fallback
    await reg.run(e);
    // Second call within cooling → still fallback, primary NOT called again
    await reg.run(e);
    expect(primary).toHaveBeenCalledTimes(1);
  });

  it("cooling zero ms: retry primary every call", async () => {
    const reg = createDegradationRegistry();
    const primary = vi.fn(async () => "ok");
    const e = reg.register({
      name: "chart-render",
      primary,
      fallback: async () => "csv-fallback",
      recoveryCoolingMs: 0,
    });
    await reg.run(e);
    await reg.run(e);
    expect(primary).toHaveBeenCalledTimes(2);
  });

  it("recovers after cooling window passes", async () => {
    const reg = createDegradationRegistry();
    let recovered = false;
    const e = reg.register({
      name: "supabase-db-recover",
      primary: async () => {
        if (!recovered) throw new Error("down");
        return "primary";
      },
      fallback: async () => "fallback",
      recoveryCoolingMs: 5,
    });
    expect(await reg.run(e)).toBe("fallback");
    // simulate time pass
    await new Promise((r) => setTimeout(r, 10));
    recovered = true;
    expect(await reg.run(e)).toBe("primary");
    expect(reg.listDegraded()).toEqual([]);
  });
});
