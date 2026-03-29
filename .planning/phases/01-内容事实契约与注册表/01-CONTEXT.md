# Phase 1: 内容事实契约与注册表 - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1 的边界不是去直接重做视觉模板，而是先把“什么信息必须进入 brief，什么元数据必须进入 registry，什么内容 contract 能驱动视频脚本 / 封面 / 标题 / 描述 / 渲染发现”固化下来。这样后续的 media manifest、模板运行时和发布 package 才能建立在同一份事实源上，而不是继续靠 `Root.tsx`、脚本和人工回填各自维护。

</domain>

<decisions>
## Implementation Decisions

### Brief 内容合同
- **D-01:** Phase 1 的 `VideoBrief` 不能只收主题和事实，必须把短视频 opening 关键字段变成一等公民：`hookLine`、`hookProof`、`coreContrast`、`coverTitle`、`coverSubtitle`、`shortTitle`、`shortDescription`、`cta`、`visualTheme`、`sourceLinks`。
- **D-02:** `VideoBrief` 必须支持“前三秒承诺”和“3-5 秒兑现证据”这类字段，确保首屏 hook、封面主承诺、标题和描述都能从同一事实源派生。
- **D-03:** `VideoBrief` 需要预留内容节奏提示字段，例如 `targetDurationSec`、`visualModules`、`sceneResetPlan`、`subtitleDensityMode`，哪怕具体视觉实现发生在后续 phase，也要在 Phase 1 先定义输入契约。

### Registry 与平台合同
- **D-04:** Phase 1 的 registry 不能只记录 composition id；必须同时记录 still id、模板类型、输出路径、比例、safe-area profile、subtitle mode、是否支持 hook slot / cover slot / proof slot。
- **D-05:** registry 需要携带平台微约束，至少支持统一版“视频号 profile”，包括标题字符预算、描述字符预算、封面类型和默认输出 package 项。
- **D-06:** Root / CLI / API 的发现合同应全部依赖同一 registry，而不是各自维护 composition、still 和 output 入口。

### 当前视频的优化方向
- **D-07:** 当前项目后续生成的 feed-first 技术短视频，默认要把核心 promise 放进前 `1-2` 秒，并在 `3-5` 秒内给出第一层 proof；这条要求要能从 brief 层表达，而不是只靠剪辑经验。
- **D-08:** 技术类竖屏视频默认采用“至少 3 种视觉模块轮换”的策略，避免 7 个场景都复用同一张信息卡；Phase 1 先把这种需求表达成 `visualModules` / `sceneLayoutHints`，具体模板化在 Phase 3 实现。
- **D-09:** 标题、封面和视频描述要优先表达结果、冲突或红利，少用抽象概念词；Phase 1 需要保证这些包装字段与旁白共享同一事实源。

### the agent's Discretion
- `VideoBrief`、registry、platform profile 的具体 TypeScript / Zod 命名方式
- 统一 registry 的目录结构与导出形式
- 哪些字段放入必填，哪些放入推荐字段或带默认值的可选字段

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope and requirements
- `.planning/PROJECT.md` — 本轮核心价值、前三秒优先级、统一发布素材原则和 brownfield 约束
- `.planning/REQUIREMENTS.md` — `BRIEF-01/02/03`、`REG-01/02/03` 的正式要求映射
- `.planning/ROADMAP.md` — Phase 1 的目标、成功标准和 `01-01 ~ 01-03` 的计划分解

### External best-practice synthesis
- `docs/research/remotion-videochannel-best-practices-2026-03-29.md` — Remotion、YouTube、X、WeChat Channels 的外部最佳实践摘要，以及它们对本仓库 brief / registry 的影响

### Current reference implementation and packaging
- `docs/ai-harness-engineer-voiceover-script.md` — 当前技术短视频脚本基线，用于验证 brief 是否能同时驱动脚本与 hook
- `docs/ai-harness-engineer-copy.md` — 当前标题 / 描述 / hashtag 产物，暴露了“概念先行、结果感不足”的现状

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/SceneBackground.tsx` — 已提供统一背景、粒子、光晕和 HUD，可作为模板层的通用底板
- `src/components/KaraokeSubtitle.tsx` — 已有字幕渲染能力，后续只需让 brief / manifest 驱动其模式
- `src/shared/animations.ts` 与 `src/shared/animations-vertical.ts` — 已有共享动画入口，可被未来 registry / template runtime 复用
- `src/compositions/AIHarnessEngineer/Cover.tsx` — 已存在 still 输出路径和封面渲染模式，可作为统一 cover contract 的现成参考

### Established Patterns
- 每条视频已有 `schema.ts` + `index.tsx` + 可选 `Cover.tsx` 的 composition 结构
- `src/Root.tsx` 是 composition 注册和默认 props 的集中入口，但目前仍偏人工维护
- voiceover / subtitle / render 通过独立脚本分段推进，说明当前系统已经有流水线，只缺统一合同

### Integration Points
- `src/Root.tsx` — 统一 registry 的首要落点，需要取代分散的 composition / still 注册方式
- `src/compositions/index.ts` — 对外导出 composition / schema 的集中层
- `src/server/services/renderer.ts` — API discoverability 和统一渲染入口的关键连接点
- `scripts/generate-voiceover-*.ts` 与 `scripts/sync-subtitle-*.ts` — 后续由 brief / manifest 驱动的媒体生产链路入口

</code_context>

<specifics>
## Specific Ideas

- 本次讨论聚焦在“用外部平台最佳实践反推 Phase 1 输入合同”，没有扩展 Phase 1 范围。
- 当前 `AIHarnessEngineer` 视频被用作 reference case，主要暴露出 4 个问题：
  - 7 个场景过度复用同一类信息卡，pattern interrupt 不够
  - 首屏有结论，但视觉动作不够强
  - 封面主承诺偏概念，不够结果导向
  - 标题与描述还没有完全贴合视频号式的超短 feed 文案
- 后续优化这条视频时，建议优先替换成这些模块：
  - `Prompt Engineer -> Harness Engineer` 的角色切换对比
  - `Demo ✓ / Production ✗` 的故障对撞卡
  - `Harness` 系统结构图
  - “谁先吃到红利”的收益 scoreboard

</specifics>

<deferred>
## Deferred Ideas

- 自动批量生成多个标题 / 封面 / hook 变体进行测试 — 更适合放到 `VIS-02` / Phase 4 或 v2
- 利用视频号“发布后可改一次封面和描述”的能力，接入发布后再优化工作流 — 不属于 Phase 1 范围
- 面向抖音 / 小红书 / B 站生成平台定制版标题、描述和封面排版 — 属于 Platform Specialization / v2

</deferred>

---

*Phase: 01-内容事实契约与注册表*
*Context gathered: 2026-03-29*
