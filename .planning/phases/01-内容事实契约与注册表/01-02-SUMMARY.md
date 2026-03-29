---
phase: 01-内容事实契约与注册表
plan: 02
subsystem: api
tags: [registry, remotion, metadata, videochannel, discoverability]
requires: []
provides:
  - Unified video template registry for all registered compositions
  - Platform profile metadata for Video Account / 视频号 style output
  - Safe-area, subtitle mode, output path and still mappings in one source
affects: [root, api, render, packaging]
tech-stack:
  added: []
  patterns: [metadata-first registry, helper-based template lookup]
key-files:
  created:
    - src/shared/video-registry.ts
    - src/shared/video-registry.test.ts
  modified: []
key-decisions:
  - "registry 先只存 metadata，不直接持有 React 组件，避免与 Root 建立循环依赖。"
  - "视频号 profile 作为首个平台 profile 进入 registry，先统一预算再做平台分化。"
patterns-established:
  - "Pattern: composition/still/output/platform metadata 统一集中在 shared registry。"
  - "Pattern: 所有 registry helper 都返回只读元数据，不掺杂渲染副作用。"
requirements-completed: [REG-01, REG-02]
duration: 14min
completed: 2026-03-29
---

# Phase 1: 内容事实契约与注册表 Summary

**统一模板 registry 已覆盖全部现有视频模板，并暴露 still、输出路径和平台预算元数据**

## Performance

- **Duration:** 14 min
- **Started:** 2026-03-29T07:56:00+08:00
- **Completed:** 2026-03-29T08:10:00+08:00
- **Tasks:** 3
- **Files modified:** 2

## Accomplishments
- 现有 13 个 composition 已全部进入统一 registry
- registry 明确记录 safe area、subtitle mode、output 和 videoChannel profile
- helper 已能按 compositionId / stillId / platform 读取模板元数据

## Task Commits

本次按 inline execute-phase 完成，未单独切原子 git commit；原因是仓库存在大量并行中的未提交改动。所有任务都已通过本地验证代替 commit spot-check。

1. **Task 1: 定义 registry entry schema 与平台 profile** - not committed (validated with `npx vitest run src/shared/video-registry.test.ts`)
2. **Task 2: 盘点当前 composition 并落地 metadata registry** - not committed (validated with helper lookups)
3. **Task 3: 为 registry 完整性和重复风险补测试** - not committed (validated with `npm run typecheck` and Vitest)

## Files Created/Modified
- `src/shared/video-registry.ts` - registry schema、统一模板 inventory 和查询 helper
- `src/shared/video-registry.test.ts` - registry 完整性、重复检测和 helper 行为测试

## Decisions Made
- 仍保留没有封面 still 的历史 composition，只是把 `stillId` 显式标成 `null`，避免假装支持封面。
- safe-area profile 直接使用结构化对象，而不是只存字符串枚举，方便后续 discoverability 直接返回可消费数据。

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Root / API 可以直接消费 registry，不再需要从多个文件拼模板清单
- render contract 还需把 registry 与 runtime catalog 对齐，这在 `01-03` 完成

---
*Phase: 01-内容事实契约与注册表*
*Completed: 2026-03-29*
