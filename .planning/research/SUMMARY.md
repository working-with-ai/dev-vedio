# Project Research Summary

**Project:** AI 技术短视频工厂
**Domain:** AI 技术短视频创作 / 自媒体视频生产系统（brownfield Remotion 流水线）
**Researched:** 2026-03-22
**Confidence:** MEDIUM

## Executive Summary

这不是一个要重做成“在线视频编辑器”或“自动发布平台”的项目，而是一个面向技术自媒体创作者的代码驱动短视频工厂。研究结论非常一致：专家做这类产品时，不会先重写框架，也不会先上数据库和拖拽编辑器，而是保留现有的 Remotion 渲染主干，在其上补齐三层基础设施：统一事实源、统一注册表、统一媒体清单。只有这样，模板化、首屏钩子、封面导出、标题描述生成这些能力才不会继续分散在 `Root.tsx`、脚本和人工回填里。

推荐路线也很明确：先把“内容输入契约 + Video Package Registry”做成单一事实源，再把 TTS、字幕、时长同步收敛为 `media manifest` 和 preflight QA，随后抽出 7 场景技术短视频模板运行时、Hook Pack、封面 Still 和平台安全区预设，最后再把标题、描述、hashtags、封面文案做成与成片同源的发布素材包。换句话说，这一轮最该建设的是“类型化模板系统 + 结构化产物管线”，不是更重的平台层。

最大的风险有五类：包装素材与视频事实漂移、标题承诺与首屏不一致、模板化后频道同质化、手机安全区与信息层级失控、以及音频/字幕/场景时长继续靠人工回填。对应的缓解方式也清晰：引入 content manifest 约束事实字段；要求标题/封面的核心承诺在前 3 到 5 秒兑现；准备 Hook 和封面变体池而不是单一样式；把安全区检查和首帧可读性作为门禁；用 media manifest 与预渲染校验取代手工同步。

## Key Findings

### Recommended Stack

栈结论偏保守但正确：继续沿用现有 `Remotion + TypeScript + Express` 主干，不做重写；把真正需要补强的部分放在类型契约、结构化输出、字体/图形基础设施和质量门禁上。研究中最硬的技术要求是 Remotion 版本一致性，以及把模板、发布素材、媒体元数据统一纳入同一套 schema 体系。

**Core technologies:**
- `Node.js 24 LTS`：运行时与脚本基座，适合当前 `tsx + Express + Remotion` 生产流。
- `remotion@4.0.438` 与全部 `@remotion/*@4.0.438`：唯一渲染核心，必须精确锁定同一 patch，不能保留 `^`。
- `TypeScript 5.9.3`：把输入文案、模板配置、发布素材、渲染 props 做成类型闭环。
- `Zod 4.3.6`：统一 `VideoBrief`、publish manifest、media manifest 与 API 输入校验。
- `Express 5.2.1`：继续作为薄编排层，负责渲染整包产物而不是承担复杂平台重构。
- `openai@6.32.0`：用于结构化生成标题、描述、封面文案和 Hook 候选，前提是消费结构化 facts 而不是长文案。

**Critical version requirements:**
- 所有 `remotion` / `@remotion/*` 必须锁定 `4.0.438` 同一 patch 版本。
- 推荐补 `@remotion/fonts`、`@remotion/shapes`、`@remotion/motion-blur`，但仅作为视觉基础设施，不改变主架构。
- `BullMQ + ioredis + pino` 只在真实并发出片时再引入，不应作为当前里程碑前置条件。

### Expected Features

功能研究显示，下一里程碑的核心不是“更多自动化”，而是“更稳的模板化 + 更完整的发布包装 + 更强的前三秒吸引力”。P1 功能都围绕这三点展开；P2 才开始拉高技术内容的辨识度和多变体能力；P3 明确延后，避免范围膨胀。

**Must have (table stakes):**
- 参数化模板层：theme token、scene slot、manifest 驱动，解决新增视频靠复制 composition 的根问题。
- 配音 / 字幕 / 音乐的一键校准与出片前 QA：把音频、字幕、总时长、场景时长做成可校验的统一链路。
- 平台安全区与封面导出预设：先稳定支持 `9:16` 主视频与 `3:4` 封面。
- 统一发布素材包：一次产出成片、封面、16 字标题、描述、hashtags 和链接。
- 首屏钩子槽位与首 3 秒可视检查：保证封面和标题里的承诺能在开场快速兑现。

**Should have (competitive):**
- AI 技术内容专用爆点抽取器：优先提炼 Star 数、代码行数、速度提升、benchmark 等技术亮点。
- 技术内容视觉模块库：GitHub 卡片、终端面板、benchmark 对比、架构流、排行榜等可复用模块。
- 7 场景技术叙事编排器：把现有成功模式沉淀为稳定骨架，而不是继续复制旧视频。
- 多变体封面 / 标题 / Hook 预览包：让创作者在 2 到 3 个强 opening 中做人工选择。

**Defer (v2+):**
- 平台定制化标题、描述、封面策略。
- 自动发布 / 定时排程。
- 自动热点抓取与批量内容发现。
- 拖拽式时间线编辑器、数字人扩展等高范围需求。

### Architecture Approach

架构研究建议采用“单一注册表 + 双 manifest + 模板运行时”的增量方案：`VideoBrief/content manifest` 负责事实层，`Video Package Registry` 负责 composition/still/outputs 的单一真相，`media manifest` 负责音频/字幕/时长，`Template Runtime + Hook Pack` 负责 7 场景模板与首屏吸引力，`Publishing Composer` 负责标题/描述/封面等发布素材，最后由 `Render Orchestrator` 统一产出整包结果。现有 `src/compositions/` 不应被一次性推翻，而应先作为模板适配层继续存在。

**Major components:**
1. `VideoBrief / Content Manifest` — 定义项目名、核心结论、支持事实、来源链接、禁用表述与 CTA。
2. `Video Package Registry` — 统一登记视频 composition、封面 still、输出路径、manifest 路径与模板类型。
3. `Media Manifest Builder` — 统一输出音频文件、字幕数据、sceneDurations、totalFrames，替代手工回填。
4. `Template Runtime + Hook Pack` — 承载 7 场景竖屏模板、首屏 Hook 变体、主题 token 与安全区规则。
5. `Publishing Composer` — 从同一事实源生成标题、描述、hashtags、封面文案与发布清单。
6. `Render Orchestrator` — 串联视频渲染、封面导出、发布素材生成，对 CLI/API 暴露统一入口。

### Critical Pitfalls

1. **缺少事实层，包装素材与视频内容漂移** — 先建 `content manifest`，高风险数字和链接必须显式字段化，禁止模型自由补全。
2. **标题和封面很猛，但首屏 3 到 5 秒无法兑现承诺** — 建立 promise-payoff 规则，标题中的最大承诺必须在 Scene 1 明确出现。
3. **模板化后所有视频越来越像** — 做“模板骨架 + 变体池”，至少准备多套 Hook archetype、信息节奏和封面版式。
4. **安全区、信息层级和可读性被炫技动画破坏** — 把手机安全区、首帧可读性和每场景信息预算变成硬门禁。
5. **音频、字幕、sceneDurations 继续靠人工回填** — 统一落到 `media manifest`，渲染前执行自动校验，不通过即拒绝渲染。
6. **注册表、Studio、CLI、API 合同继续漂移** — 先收敛共享 registry，再扩模板与封面产物，保持 composition ID 稳定。

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: 内容事实契约与统一注册表
**Rationale:** 这是所有后续模板化、发布素材、封面导出的共同依赖；不先统一事实源和产物登记，后面所有自动化都会继续漂移。  
**Delivers:** `VideoBrief/content manifest` schema、`Video Package Registry`、`Root.tsx` 与 API 的一致性校验、发布素材 `base package + platform override` 空结构。  
**Addresses:** 参数化模板层前置条件、统一发布素材包前置条件。  
**Avoids:** Pitfall 1（事实漂移）、Pitfall 6（注册表漂移）、Pitfall 7（统一版包装被写死为唯一结构）。

### Phase 2: Media Manifest 与预渲染质量门禁
**Rationale:** 在模板抽象前，必须先让时序真相可重复生成，否则模板越多，字幕和音频错位越频繁。  
**Delivers:** 共享 TTS / subtitle pipeline、`media manifest`、`calculateMetadata()` 接入、音频数量/总帧数/sceneDurations/字幕覆盖率校验。  
**Uses:** `TypeScript + Zod + Vitest`，保持 `remotion@4.0.438` 统一版本。  
**Implements:** `Media Manifest Builder` 与 preflight QA。  
**Avoids:** Pitfall 5（时序错位），并为后续模板运行时提供稳定输入。

### Phase 3: 模板运行时、Hook Pack 与封面安全区
**Rationale:** 事实层和时序层稳定后，才适合抽 7 场景模板、首屏钩子和封面 Still；这是提升前三秒吸引力和复用效率的第一波用户可见价值。  
**Delivers:** `tech-short-vertical` 模板运行时、Hook archetype 变体池、safe-zone token、封面 Still 标准输出、旧竖屏 composition 适配。  
**Addresses:** 参数化模板层、首屏钩子槽位、平台安全区与封面导出预设。  
**Avoids:** Pitfall 2（承诺不兑现）、Pitfall 3（量产感）、Pitfall 4（可读性与安全区失控）。

### Phase 4: 统一发布素材包
**Rationale:** 当视频、封面、Hook 都由同一 facts 与模板驱动后，再做标题/描述/hashtags 才能真正稳定，不会反向猜内容。  
**Delivers:** `Publishing Composer`、16 字标题规则、描述与链接生成、hashtags、发布 JSON、成片/封面/文案的一体化输出。  
**Uses:** `openai@6.32.0` Structured Outputs，但只能消费结构化 facts。  
**Implements:** 发布素材作为一等产物，而不是渲染后的附加脚本。  
**Avoids:** Pitfall 1（事实漂移）、Pitfall 7（平台扩展无预留）、Pitfall 8（缺少来源与合规约束）。

### Phase 5: 技术视觉模块库与多变体预览
**Rationale:** 基础链路稳定后，再把“技术内容辨识度”和“人工挑选最佳 opening”的能力做出来，收益最大，返工最少。  
**Delivers:** GitHub 卡片、终端面板、benchmark 对比、架构流等视觉模块；多封面、多标题、多 Hook 预览包；有限 A/B 选择能力。  
**Addresses:** 技术内容视觉模块库、AI 技术爆点抽取器、多变体封面/标题/Hook 预览包。  
**Avoids:** Pitfall 3（频道同质化）和 Pitfall 4（视觉堆叠失控），同时为后续内容复盘留变体记录。

### Phase 6: 作业化与资产治理（按需触发）
**Rationale:** 只有当出片频率或并发需求显著提升后，才值得上 job queue 和目录治理；在此之前不应拖慢主线。  
**Delivers:** job ID、状态查询、失败重试、产物 manifest、清理策略，必要时引入 `BullMQ + ioredis + pino`。  
**Uses:** 现有 Express 渲染层外包一层 package job orchestration。  
**Implements:** `Render Orchestrator` 的稳态化版本。  
**Avoids:** Pitfall 9（同步接口阻塞、产物混乱、失败难恢复）。

### Phase Ordering Rationale

- 先做事实层和注册表，是因为模板、封面、标题、描述都依赖单一真相；否则只是在复制现有分叉。
- 再做 media manifest 和 QA，是因为时序错误会污染所有模板，属于必须先收敛的基础风险。
- 模板运行时与 Hook/封面应早于发布素材包，因为发布包装必须与首屏和视频事实同源。
- 视觉模块库和多变体预览适合放在基础设施稳定之后，否则会把“风格探索”变成“重复返工”。
- 作业化与资产治理应设为按需阶段，避免在单人高频本地出片阶段过早引入 Redis 和队列复杂度。

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 5:** AI 技术爆点抽取器和多变体预览的评估标准不够固定，需要补充 prompt 设计、候选筛选和人工复盘机制研究。
- **Phase 6:** 是否引入 `BullMQ + Redis` 取决于真实吞吐、部署形态和失败恢复需求，建议在规划时做规模阈值研究。

Phases with standard patterns (skip research-phase):
- **Phase 1:** Zod schema、registry 收敛、`Root.tsx` 注册拆分属于成熟重构模式，研究已足够。
- **Phase 2:** `calculateMetadata()`、manifest loader、preflight QA 都有明确的 Remotion 和仓库现状支撑。
- **Phase 3:** 模板运行时、Still 封面、安全区 token 和 Hook Pack 都是现有能力的增量抽象，模式清晰。
- **Phase 4:** 基于结构化 facts 生成统一版发布素材有明确的 Stack 与 Pitfalls 约束，可直接规划。

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | 关键推荐基于 Remotion、OpenAI、Node 等官方文档和明确版本要求，结论稳定。 |
| Features | MEDIUM | P1/P2/P3 划分合理，但包含较多产品判断和竞品归纳，需要在真实工作流中验证。 |
| Architecture | MEDIUM | 方案与仓库现实高度匹配，但模板运行时和 registry 的具体落地仍带有设计推断。 |
| Pitfalls | MEDIUM | 风险识别很强，且与现有仓库痛点一致，但部分平台化与合规策略仍需实施时细化。 |

**Overall confidence:** MEDIUM

### Gaps to Address

- **规模阈值尚未量化：** 何时从本地/同步流程升级到 job queue，需要在规划阶段明确“每日出片量、并发量、失败恢复时间”阈值。
- **首屏质量缺少量化评估标准：** 目前主要依赖经验法则，需要在规划中定义简化版人工评审表或代理指标。
- **平台差异暂未深入：** v1 明确先做统一版包装，但标题长度、封面裁切、描述结构的差异化规则仍要留到后续验证。
- **测试基础设施尚未落地：** 研究推荐 `Vitest + coverage + pixelmatch`，但仓库当前没有测试 runner，规划时需要纳入。
- **OpenAI 生成质量需结合中文短标题场景验证：** Structured Outputs 适合做结构化字段，但标题张力与技术术语表达仍需要样本校准。

## Sources

### Primary (HIGH confidence)
- `.planning/PROJECT.md` — 项目目标、约束、范围与成功标准
- `src/Root.tsx`、`src/server/services/renderer.ts`、`src/server/routes/render.ts`、`src/compositions/*` — 当前 brownfield 结构与注册漂移现状
- Remotion docs — Composition、Still、`calculateMetadata()`、`getCompositions()`、`renderMedia()`、`renderStill()`、Fonts、Shapes、Motion Blur
- OpenAI docs — Responses API、Structured Outputs
- Node.js Releases — Node 24 LTS 状态

### Secondary (MEDIUM confidence)
- BullMQ docs — 队列、worker、任务状态建模
- Pino project docs / repo — 结构化日志能力
- CapCut、Descript、VEED、Opus、Canva、Captions 产品页面 — 模板、封面、字幕、发布包装、首屏优化竞品参考
- TikTok / YouTube 平台政策与创意最佳实践 — 误导性包装、重复内容、缩略图测试等风险边界

### Tertiary (LOW confidence)
- 无单独 LOW 级核心来源；当前不确定性主要来自产品取舍和阶段节奏，而非文档可信度不足

---
*Research completed: 2026-03-22*
*Ready for roadmap: yes*
