---
phase: 01-内容事实契约与注册表
plan: 03
subsystem: api
tags: [render, root, registry, discoverability, zod]
requires:
  - phase: 01-01
    provides: structured brief contract and publishing seed helper
  - phase: 01-02
    provides: registry metadata and platform profiles
provides:
  - brief-aware render request schema
  - registry-backed discovery payload for API consumers
  - Root/catalog coverage checks against registry
affects: [phase-2, media-manifest, packaging, studio]
tech-stack:
  added: []
  patterns: [catalog-registry binding, pure render resolver, discovery payload builder]
key-files:
  created:
    - src/compositions/catalog.ts
    - src/shared/render-contract.ts
    - src/shared/render-contract.test.ts
  modified:
    - src/Root.tsx
    - src/shared/types.ts
    - src/server/services/renderer.ts
    - src/server/routes/render.ts
key-decisions:
  - "Root 先通过 catalog-derived ID sets 消费统一目录，再保留现有 composition 定义，避免一次性重写所有默认 props。"
  - "API discoverability 基于 registry/catalg 生成，不再把 getCompositions 的裸 ID 直接暴露给上层。"
patterns-established:
  - "Pattern: resolveRenderInput 在进入 Remotion 前统一合并 brief 与 publishing seed。"
  - "Pattern: buildDiscoveryPayload 作为 API discoverability 的单一出口。"
requirements-completed: [BRIEF-03, REG-01, REG-02]
duration: 24min
completed: 2026-03-29
---

# Phase 1: 内容事实契约与注册表 Summary

**Root、renderer 和 render API 已接到统一的 brief + registry 合同，模板发现不再只返回裸 composition ID**

## Performance

- **Duration:** 24 min
- **Started:** 2026-03-29T08:02:00+08:00
- **Completed:** 2026-03-29T08:26:00+08:00
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments
- render request 已支持结构化 brief，并在渲染前统一派生 publishing seed
- `/api/render/compositions` 现在返回 still、output、safe area、subtitle mode 和平台预算
- Root 已对 catalog / registry 对齐做启动期校验，降低入口漂移风险

## Task Commits

本次按 inline execute-phase 完成，未单独切原子 git commit；原因是仓库存在大量并行中的未提交改动。所有任务都已通过本地验证代替 commit spot-check。

1. **Task 1: 建立 catalog adapter 与共享 render resolver** - not committed (validated with `npx vitest run src/shared/render-contract.test.ts`)
2. **Task 2: 让 render route 与 renderer 变成 brief-aware discoverability 入口** - not committed (validated with `npm run typecheck`)
3. **Task 3: 用 catalog 驱动 Root 注册并补统一合同测试** - not committed (validated with real `/api/render/compositions` request)

## Files Created/Modified
- `src/compositions/catalog.ts` - composition/still catalog 与 registry 绑定
- `src/shared/render-contract.ts` - render resolver、discoverability builder、coverage assertion
- `src/shared/render-contract.test.ts` - render contract 行为测试
- `src/shared/types.ts` - brief-aware request schema 与 discoverability schema
- `src/server/services/renderer.ts` - registry-backed render/discovery service
- `src/server/routes/render.ts` - API 请求校验和 discoverability 输出
- `src/Root.tsx` - Root 启动时校验 catalog/registry 覆盖，并基于 catalog ID 集消费注册清单

## Decisions Made
- 保持 `render-contract` 为纯函数层，不把 bundle 或 IO 副作用写进共享合同逻辑，方便测试。
- API 仍会扫描 bundle 内真实 composition 列表，但只把通过 catalog / registry 收敛后的元数据返回给客户端。

## Deviations from Plan

### Auto-fixed Issues

**1. [Blocking] render contract 的 coverage 校验最初错误地从 catalog 反推 registry**
- **Found during:** Task 3 (统一合同测试)
- **Issue:** `assertRegistryCoverage()` 最初读取了错误的数据源，无法正确发现 registry/catalg 不一致
- **Fix:** 改为直接对比 `videoTemplateRegistry`、`videoCompositionCatalog` 和 `videoStillCatalog`
- **Files modified:** `src/shared/render-contract.ts`
- **Verification:** `npx vitest run src/shared/render-contract.test.ts`
- **Committed in:** not committed

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** 这是正确性修复，没有扩大范围。

## Issues Encountered

- `/api/render/compositions` 的真实验证需要先启动本地服务并触发一次 Remotion bundle；接口可用，但首次请求会比纯单测慢。

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 2 可以直接在现有 brief + registry + discoverability 合同上叠加 media manifest 与 QA 门禁
- 现有视频模板还未抽象到统一 runtime，这将由后续 Phase 3 继续收口

---
*Phase: 01-内容事实契约与注册表*
*Completed: 2026-03-29*
