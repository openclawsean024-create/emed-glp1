// PRD §4 — repository abstraction
// Single interface for both Supabase and localStorage; runtime picks based on env.

import type {
  Treatment,
  SideEffect,
  WeightRecord,
  User,
} from "@/types/domain";

type MaterialId = string;
const newId = (): string =>
  globalThis.crypto?.randomUUID?.() ?? `id-${Math.random().toString(36).slice(2)}-${Date.now()}`;

export interface Table<T> {
  list(): T[];
  get(id: string): T | null;
  create(input: Omit<T, "id"> & { id?: MaterialId }): T;
  update(id: string, patch: Partial<Omit<T, "id" | "userId">>): T | null;
  delete(id: string): boolean;
}

export interface Repo {
  treatments: Table<Treatment>;
  sideEffects: Table<SideEffect> & {
    listInRange(start: string, end: string): SideEffect[];
  };
  weights: Table<WeightRecord>;
  user: {
    get(): User | null;
    upsert(u: User): User;
  };
}

type LocalStorageLike = {
  getItem(k: string): string | null;
  setItem(k: string, v: string): void;
  removeItem(k: string): void;
};

function getLS(): LocalStorageLike | null {
  if (typeof window === "undefined") return null;
  return window.localStorage ?? null;
}

function load<T>(ls: LocalStorageLike, key: string): T[] {
  const raw = ls.getItem(key);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw) as T[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function save<T>(ls: LocalStorageLike, key: string, rows: T[]): void {
  ls.setItem(key, JSON.stringify(rows));
}

function makeTable<T extends { id: string; userId: string }>(
  ls: LocalStorageLike,
  key: string,
  userId: string,
): Table<T> {
  return {
    list() {
      return load<T>(ls, key).filter((r) => r.userId === userId);
    },
    get(id) {
      return load<T>(ls, key).find((r) => r.id === id && r.userId === userId) ?? null;
    },
    create(input) {
      const all = load<T>(ls, key);
      const row = { ...(input as object), id: input.id ?? newId() } as T;
      all.push(row);
      save(ls, key, all);
      return row;
    },
    update(id, patch) {
      const all = load<T>(ls, key);
      const idx = all.findIndex((r) => r.id === id && r.userId === userId);
      if (idx < 0) return null;
      const updated = { ...all[idx], ...patch } as T;
      all[idx] = updated;
      save(ls, key, all);
      return updated;
    },
    delete(id) {
      const all = load<T>(ls, key);
      const next = all.filter((r) => !(r.id === id && r.userId === userId));
      save(ls, key, next);
      return next.length !== all.length;
    },
  };
}

export function createLocalStorageRepo(userId: string): Repo {
  // On SSR (tests with jsdom), provide a per-test sandbox through localStorage shim
  const ls: LocalStorageLike = (() => {
    const direct = getLS();
    if (direct) return direct;
    return {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
    };
  })();

  const treatments = makeTable<Treatment>(ls, `emed.treatments.${userId}`, userId);
  const sideEffectsBase = makeTable<SideEffect>(ls, `emed.sideEffects.${userId}`, userId);

  const sideEffects: Repo["sideEffects"] = {
    ...sideEffectsBase,
    listInRange(start, end) {
      const rows = load<SideEffect>(ls, `emed.sideEffects.${userId}`);
      return rows
        .filter((r) => r.userId === userId && r.date >= start && r.date <= end)
        .sort((a, b) => a.date.localeCompare(b.date));
    },
  };

  const weights = makeTable<WeightRecord>(ls, `emed.weights.${userId}`, userId);

  return {
    treatments,
    sideEffects,
    weights,
    user: {
      get() {
        const raw = ls.getItem(`emed.user.${userId}`);
        return raw ? (JSON.parse(raw) as User) : null;
      },
      upsert(u) {
        ls.setItem(`emed.user.${userId}`, JSON.stringify(u));
        return u;
      },
    },
  };
}
