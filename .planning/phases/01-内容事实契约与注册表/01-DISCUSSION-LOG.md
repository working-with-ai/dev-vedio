# Phase 1: 内容事实契约与注册表 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.  
> Decisions are captured in `01-CONTEXT.md` — this log preserves the alternatives considered.

**Date:** 2026-03-29
**Phase:** 01-内容事实契约与注册表
**Areas discussed:** Brief 内容合同, Registry 与平台合同, 当前视频的优化方向

---

## Brief 内容合同

| Option | Description | Selected |
|--------|-------------|----------|
| 最小事实 brief | 只记录主题、核心结论、关键事实、来源链接 | |
| Hook-proof brief | 除基础事实外，明确首屏承诺、前三秒 proof、封面与短标题字段 | ✓ |
| 扩展编辑 brief | 把分镜、视觉模块、节奏提示、包装字段全部提前放入 brief | |

**User's choice:** 结合用户明确要求“查找外部平台最佳实践并优化当前视频”，本轮采用推荐默认项 `Hook-proof brief`，并补充少量节奏提示字段，避免继续只有主题事实、没有 opening contract。  
**Notes:** 这不是给 Phase 1 加新能力，而是把后续 phase 已经需要依赖的信息先收敛进 single source of truth。

---

## Registry 与平台合同

| Option | Description | Selected |
|--------|-------------|----------|
| 纯 composition registry | 仅记录 composition id 与输出路径 | |
| 发现 + 平台 metadata registry | 同时记录 still、safe area、subtitle mode、平台标题/描述预算 | ✓ |
| 全量 orchestration registry | 直接在 Phase 1 把 package orchestration 也做完整 | |

**User's choice:** 采用推荐默认项 `发现 + 平台 metadata registry`。  
**Notes:** 这样既不把 Phase 1 扩大成 package 编排阶段，也能保证后续计划具备视频号需要的封面 / 标题 / 描述 contract。

---

## 当前视频的优化方向

| Option | Description | Selected |
|--------|-------------|----------|
| 只做结构重构 | 不碰当前视频的 opening / cover / feed 文案表达 | |
| 轻量优化 | 保留现有概念框架，只做少量文案和视觉修补 | |
| 结果导向优化 | 强化首屏冲突、减少概念表达、增加视觉模块差异、压缩为更适合 feed 的版本 | ✓ |

**User's choice:** 采用推荐默认项 `结果导向优化`。  
**Notes:** 当前 `AIHarnessEngineer` 被作为 Phase 1 的 reference case，用来反推 brief 与 registry 需要提前表达哪些内容，而不是现在就把模板 phase 的实现做完。

---

## the agent's Discretion

- 具体 schema 字段命名
- registry 在 `src/Root.tsx`、`src/compositions/index.ts` 和 API renderer 中的接线方式
- 哪些平台字段作为必填，哪些作为 profile 默认值

## Deferred Ideas

- 自动生成多组封面 / 标题 / hook 变体做测试
- 发布后编辑视频号封面 / 描述的一次性优化工作流
- 平台级差异化 package（视频号 / 抖音 / 小红书 / B 站）
