---
phase: "01"
slug: 内容事实契约与注册表
status: ready
nyquist_compliant: true
wave_0_complete: false
created: 2026-03-29
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run src/shared/**/*.test.ts src/server/**/*.test.ts` |
| **Full suite command** | `npm run typecheck && npx vitest run` |
| **Estimated runtime** | ~25 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/shared/**/*.test.ts src/server/**/*.test.ts`
- **After every plan wave:** Run `npm run typecheck && npx vitest run`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 25 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | BRIEF-01 | infra | `npx vitest run --passWithNoTests` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | BRIEF-01, BRIEF-03 | unit | `npx vitest run src/shared/video-brief.test.ts` | ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 1 | BRIEF-02, BRIEF-03 | unit | `npx vitest run src/shared/video-brief.test.ts` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 1 | REG-01 | unit | `npx vitest run src/shared/video-registry.test.ts` | ❌ W0 | ⬜ pending |
| 01-02-02 | 02 | 1 | REG-01, REG-02 | unit | `npx vitest run src/shared/video-registry.test.ts` | ❌ W0 | ⬜ pending |
| 01-02-03 | 02 | 1 | REG-01, REG-02 | unit | `npx vitest run src/shared/video-registry.test.ts` | ❌ W0 | ⬜ pending |
| 01-03-01 | 03 | 2 | REG-02 | unit | `npx vitest run src/shared/render-contract.test.ts` | ❌ W0 | ⬜ pending |
| 01-03-02 | 03 | 2 | BRIEF-03, REG-01, REG-02 | integration | `npm run typecheck && npx vitest run src/shared/render-contract.test.ts` | ❌ W0 | ⬜ pending |
| 01-03-03 | 03 | 2 | REG-02 | integration | `npm run typecheck && npx vitest run src/shared/render-contract.test.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `package.json` — add `vitest` devDependency plus `test` / `test:contracts` scripts
- [ ] `vitest.config.ts` — Node test environment with `include: ["src/**/*.test.ts"]`
- [ ] `src/shared/video-brief.test.ts` — baseline tests for BRIEF-01/02/03
- [ ] `src/shared/video-registry.test.ts` — baseline tests for REG-01/02
- [ ] `src/shared/render-contract.test.ts` — baseline tests for brief-aware discovery and render binding

---

## Manual-Only Verifications

All phase behaviors have automated verification.

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** planned 2026-03-29
