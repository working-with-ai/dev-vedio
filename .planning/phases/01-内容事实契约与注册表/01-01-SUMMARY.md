---
phase: 01-内容事实契约与注册表
plan: 01
subsystem: testing
tags: [vitest, zod, brief, contract, publishing]
requires: []
provides:
  - VideoBriefSchema with required hook, proof, fact and source fields
  - derivePublishingSeed helper for script, cover and feed packaging
  - Minimal Vitest contract-test foundation
affects: [registry, api, publishing, render]
tech-stack:
  added: [vitest]
  patterns: [schema-first brief contract, publishing seed derivation]
key-files:
  created:
    - vitest.config.ts
    - src/shared/video-brief.ts
    - src/shared/video-brief.test.ts
  modified:
    - package.json
    - package-lock.json
key-decisions:
  - "显式引入 vitest 测试 API，而不是改全局 TS types，减少对现有编译配置的影响。"
  - "brief 保持 schema-first，先固化 hook/proof/packaging 字段，再让后续模板与发布层消费。"
patterns-established:
  - "Pattern: 所有内容合同先过 Zod，再由 helper 派生下游 seed。"
  - "Pattern: 合同测试使用 Vitest Node 环境，不依赖渲染 runtime。"
requirements-completed: [BRIEF-01, BRIEF-02, BRIEF-03]
duration: 18min
completed: 2026-03-29
---

# Phase 1: 内容事实契约与注册表 Summary

**结构化 brief 合同、发布 seed 派生与最小 Vitest 测试基础已经接入项目**

## Performance

- **Duration:** 18 min
- **Started:** 2026-03-29T07:45:00+08:00
- **Completed:** 2026-03-29T08:03:00+08:00
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments
- 新增 `VideoBriefSchema`，把 hook、proof、cover、短标题、短描述和来源链接变成强制合同
- 新增 `derivePublishingSeed()`，让脚本、封面和 feed 文案共享同一事实源
- 项目第一次具备可运行的合同测试入口，不再只靠 typecheck 护航

## Task Commits

本次按 inline execute-phase 完成，未单独切原子 git commit；原因是仓库存在大量并行中的未提交改动。所有任务都已通过本地验证代替 commit spot-check。

1. **Task 1: 安装合同测试基础设施并固定命令入口** - not committed (validated with `npm install` and `npx vitest run --passWithNoTests`)
2. **Task 2: 定义 VideoBriefSchema 与发布 seed 派生 helper** - not committed (validated with `npx vitest run src/shared/video-brief.test.ts`)
3. **Task 3: 用合同测试锁定拒绝路径与派生行为** - not committed (validated with `npm run typecheck` and Vitest)

## Files Created/Modified
- `package.json` - 增加 `test` / `test:contracts` 脚本和 `vitest`
- `package-lock.json` - 锁定新测试依赖
- `vitest.config.ts` - Node 环境测试配置
- `src/shared/video-brief.ts` - brief schema、类型和 publishing seed helper
- `src/shared/video-brief.test.ts` - BRIEF-01/02/03 对应的行为测试

## Decisions Made
- 用 `SourceLinkSchema` 规范化来源链接，避免后续发布文案阶段还要自行清洗 URL。
- `visualModules` 直接要求至少 3 项，确保“至少 3 种视觉模块轮换”变成输入约束，而不是口头约定。

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- `typecheck` 初次失败，因为测试文件缺少 `describe/it/expect` 的类型来源；通过在测试文件中显式导入 `vitest` API 解决。

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- registry 和 render contract 已经可以直接复用 `VideoBrief`
- 统一 discoverability 还未接线，需由 `01-03` 完成 Root / API 绑定

---
*Phase: 01-内容事实契约与注册表*
*Completed: 2026-03-29*
