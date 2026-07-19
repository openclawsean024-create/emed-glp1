import bcrypt from "bcryptjs";

/**
 * PRD §5.2 password policy: 8+ chars + English letter + digit.
 * bcrypt 12-rounds hashing.
 */
export type ValidationResult =
  | { ok: true }
  | { ok: false; reason: string };

export function validatePassword(pw: string): ValidationResult {
  if (pw.length < 8) return { ok: false, reason: "密碼至少需要 8 字元" };
  if (!/[A-Za-z]/.test(pw)) return { ok: false, reason: "密碼必須包含英文字母" };
  if (!/\d/.test(pw)) return { ok: false, reason: "密碼必須包含數字" };
  return { ok: true };
}

const BCRYPT_ROUNDS = 12;

export async function hashPassword(pw: string): Promise<string> {
  return bcrypt.hash(pw, BCRYPT_ROUNDS);
}

export async function verifyPassword(pw: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pw, hash);
}
