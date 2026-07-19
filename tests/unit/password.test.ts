import { describe, it, expect } from "vitest";
import {
  validatePassword,
  hashPassword,
  verifyPassword,
} from "@/lib/auth/password";

// PRD §5.2 — bcrypt 12 + 8 chars + alnum
describe("auth / password policy (PRD §5.2)", () => {
  describe("validatePassword", () => {
    it("rejects password shorter than 8 chars", () => {
      const r = validatePassword("Ab1");
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.reason).toMatch(/8/);
    });

    it("rejects password without digit", () => {
      const r = validatePassword("onlyLetters!");
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.reason).toMatch(/數字|數|digit/i);
    });

    it("rejects password without letter (digit-only)", () => {
      const r = validatePassword("12345678");
      expect(r.ok).toBe(false);
    });

    it("accepts 8-char alnum password", () => {
      expect(validatePassword("abcd1234").ok).toBe(true);
      expect(validatePassword("Test1234").ok).toBe(true);
    });

    it("rejects empty string", () => {
      expect(validatePassword("").ok).toBe(false);
    });
  });

  describe("hashPassword / verifyPassword", () => {
    it("produces a non-equal hash from plain text", async () => {
      const hash = await hashPassword("abcd1234");
      expect(hash).not.toBe("abcd1234");
      expect(hash.length).toBeGreaterThan(20);
    });

    it("verifies a correct password", async () => {
      const hash = await hashPassword("abcd1234");
      expect(await verifyPassword("abcd1234", hash)).toBe(true);
    });

    it("rejects an incorrect password", async () => {
      const hash = await hashPassword("abcd1234");
      expect(await verifyPassword("abcd9999", hash)).toBe(false);
    });

    it("two hashes of the same password differ (salt randomness)", async () => {
      const a = await hashPassword("abcd1234");
      const b = await hashPassword("abcd1234");
      expect(a).not.toBe(b);
      expect(await verifyPassword("abcd1234", a)).toBe(true);
      expect(await verifyPassword("abcd1234", b)).toBe(true);
    });
  });
});
