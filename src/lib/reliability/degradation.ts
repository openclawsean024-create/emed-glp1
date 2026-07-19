// PRD §5.3 — graceful degradation registry.
// A service goes down → automatically switch to fallback within 30s.
// After main service recovers, wait 5 minutes before cutting back (avoid avalanche).

export interface DegradationEntry<T> {
  readonly name: string;
  readonly primary: () => Promise<T>;
  readonly fallback: () => Promise<T>;
  /** when the primary last failed; null = healthy. */
  failedSince: number | null;
  /** minimum ms between primary failure and recovery attempt. */
  recoveryCoolingMs: number;
}

export interface DegradationRegistry {
  register<T>(entry: Omit<DegradationEntry<T>, "failedSince">): DegradationEntry<T>;
  run<T>(entry: DegradationEntry<T>): Promise<T>;
  listDegraded(): string[];
}

export function createDegradationRegistry(): DegradationRegistry {
  const entries = new Map<string, DegradationEntry<unknown>>();
  return {
    register<T>(e: Omit<DegradationEntry<T>, "failedSince">) {
      const entry = { ...e, failedSince: null } as DegradationEntry<T>;
      entries.set(entry.name, entry as unknown as DegradationEntry<unknown>);
      return entry;
    },
    async run<T>(entry: DegradationEntry<T>): Promise<T> {
      const now = Date.now();
      const cooledDown =
        entry.failedSince === null ||
        now - entry.failedSince >= entry.recoveryCoolingMs;
      if (!cooledDown) {
        return entry.fallback();
      }
      try {
        const out = await entry.primary();
        entry.failedSince = null; // recovered
        return out;
      } catch {
        entry.failedSince = now;
        return entry.fallback();
      }
    },
    listDegraded() {
      const out: string[] = [];
      for (const [name, entry] of entries) {
        if (entry.failedSince !== null) out.push(name);
      }
      return out;
    },
  };
}
