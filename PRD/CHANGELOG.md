# eMed GLP-1 健康管理平台 — 變更日誌

> 本檔記錄本 repo 規格與基礎設施的所有重要變更。

---

## v3.0.2 — 2026-09-06 — 基礎設施層補完（Sean 10-repo-fleet）

**v3.0.2 完成於 2026-09-06 by Sean 10-repo-fleet**

### Added
- `PRD/SPEC.md` 新增 §B1–§B9「v3.0.2 基礎設施規格層」cover（既有 §A1–§A15 v3.0 產品層 frozen 保留）
- `PRD/CHANGELOG.md`（本檔）
- `.github/workflows/ci.yml`（4-job CI: lint / test / build / deploy-to-Vercel）
- `.gitignore` 補完

### Changed
- `PRD/SPEC.md` 標題改為 v3.0.2（v3.0 產品層 + v3.0.2 基礎設施層）
- README 維持 create-next-app 預設（已反映現況）

### Preserved（不動）
- `src/app/` — 6 個 App Router pages（landing / assessment / consultation / dashboard / medications / pricing）
- `src/components/` — Footer / Navigation
- `src/data/education-library.ts` — 30+ 篇衛教內容
- `src/lib/` — 7 個 domain lib
- `tests/unit/` — 11 個 vitest unit test 檔
- `supabase/migrations/` — DB schema（v1.5 規劃）
- `next.config.ts` / `vitest.config.ts` / `playwright.config.ts` / `eslint.config.mjs`
- `tsconfig.json` — strict mode
- `package.json` — npm scripts 已備齊（dev/build/start/lint/test/test:watch/test:coverage/test:e2e）

### Notes
- 本 repo 為 Next.js 16 + TypeScript + Tailwind 4 + Recharts + jsPDF + Zod + bcryptjs + Supabase + Stripe 整合
- 純前端 v1.0（landing + dashboard + medications + assessment + pricing）已實作
- v1.5 規劃：副作用記錄、體重趨勢、PDF 週報、Supabase + Stripe 金流
- GHA deploy target = `vercel`（next.js 16 + Vercel 官方支援）
- 注意：AGENTS.md 警告「This is NOT the Next.js you know - APIs/conventions/structure may differ from training data」，CI 用 node 20 跑 `npm run build`/`test`/`lint` 不直接調用 Next 16 內部 API，僅執行 surface-level script
- 醫療法規：依 §A1.5 Non-Goals 與 §A7 ADR-001「純追蹤工具，不做醫療建議」

---

## v3.0 — 2026-07-19 — 產品規格定版（Sophia CPO, frozen）

### Added
- §0 文件資訊表（版本 / 分數 / sweet spot / 行動建議）
- §1.5 Non-Goals（7 條：處方籤 / 線上看診 / 跨境 / 健保 / 醫療建議 / AI 診斷 / 處方提醒）
- §A3.4 Requirement Pool（P0/P1/P2）
- §A4 完整技術棧 + 資料模型（prisma-like schema）
- §A4.4 API 規格（v1.5）
- §A5.2 醫療等級安全（bcrypt 12 + AES-256 + RLS + 免責聲明）
- §A5.3 降級機制（7 條失敗場景）
- §A7 風險 + 4 條 ADR
- §A8 路線圖 + Sprint 拆解
- §A9 變現路徑（4 方案 + LTV/CAC 計算）
- §A10 競品分析 + Open Questions + 術語表
- §A15 市調重新驗證

### Notes
- 商業化分數 84.6/100（≥ 70 → GO）
- Sweet spot 7.8/10（≥ 7 → GO）
- 行動建議：🟢 GO（醫療法規風險以 §7 ADR + §12 SOP 控管）

---

## v1.0 — 2024 — 初版（OpenClaw 開發）

### Added
- Next.js 14 + TypeScript + Tailwind + Recharts + jsPDF 基本骨架
- Landing page + 簡單 dashboard
- 6 個 App Router pages

### Notes
- 初版以 create-next-app 為基礎，後於 v3.0 補完整產品規格
