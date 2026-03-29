# Phase 1: 内容事实契约与注册表 - Research

**Researched:** 2026-03-29
**Domain:** Remotion 短视频工厂中的内容合同、模板注册表与渲染发现统一化
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Phase 1 的 `VideoBrief` 不能只收主题和事实，必须把短视频 opening 关键字段变成一等公民：`hookLine`、`hookProof`、`coreContrast`、`coverTitle`、`coverSubtitle`、`shortTitle`、`shortDescription`、`cta`、`visualTheme`、`sourceLinks`。
- `VideoBrief` 必须支持“前三秒承诺”和“3-5 秒兑现证据”这类字段，确保首屏 hook、封面主承诺、标题和描述都能从同一事实源派生。
- `VideoBrief` 需要预留内容节奏提示字段，例如 `targetDurationSec`、`visualModules`、`sceneResetPlan`、`subtitleDensityMode`，哪怕具体视觉实现发生在后续 phase，也要在 Phase 1 先定义输入契约。
- Phase 1 的 registry 不能只记录 composition id；必须同时记录 still id、模板类型、输出路径、比例、safe-area profile、subtitle mode、是否支持 hook slot / cover slot / proof slot。
- registry 需要携带平台微约束，至少支持统一版“视频号 profile”，包括标题字符预算、描述字符预算、封面类型和默认输出 package 项。
- Root / CLI / API 的发现合同应全部依赖同一 registry，而不是各自维护 composition、still 和 output 入口。
- 当前项目后续生成的 feed-first 技术短视频，默认要把核心 promise 放进前 `1-2` 秒，并在 `3-5` 秒内给出第一层 proof；这条要求要能从 brief 层表达，而不是只靠剪辑经验。
- 技术类竖屏视频默认采用“至少 3 种视觉模块轮换”的策略，避免 7 个场景都复用同一张信息卡；Phase 1 先把这种需求表达成 `visualModules` / `sceneLayoutHints`，具体模板化在 Phase 3 实现。
- 标题、封面和视频描述要优先表达结果、冲突或红利，少用抽象概念词；Phase 1 需要保证这些包装字段与旁白共享同一事实源。

### the agent's Discretion
- `VideoBrief`、registry、platform profile 的具体 TypeScript / Zod 命名方式
- 统一 registry 的目录结构与导出形式
- 哪些字段放入必填，哪些字段使用默认值或推荐配置

### Deferred Ideas (OUT OF SCOPE)
- 自动批量生成多个标题 / 封面 / hook 变体进行测试
- 利用视频号发布后可修改一次封面 / 描述的能力做后链路优化
- 面向不同平台生成完全差异化 package

</user_constraints>

<research_summary>
## Summary

Phase 1 最适合采用“三层合同”方案：`VideoBrief` 负责事实源与 opening / packaging 关键字段，`VideoTemplateRegistry` 负责模板发现与平台能力元数据，`RenderContract` 负责把 brief 与 registry 绑定到 Root / CLI / API 的共同输入。这样可以先解决“信息和入口各自漂移”的问题，而不急着重构所有视觉模板。

从 Remotion 官方能力看，`calculateMetadata()` 适合把时长、props 和输出元数据变成数据驱动；从 YouTube / X / WeChat Channels 的官方创作建议看，标题、封面、前 `1-2` 秒钩子、字幕与短描述都应该被视为一套内容合同，而不是成片后的附属物。对当前仓库来说，最核心的不是“再加一个脚本”，而是先定义清楚哪些字段能稳定驱动旁白、封面、标题、描述和渲染发现。

当前仓库已经具备可复用的背景、字幕、动画和 composition 结构，但注册与 discoverability 仍集中在手写 `Root.tsx` 和 API 动态扫描上。推荐做法是：先建立 typed brief + typed registry + 最小测试基础设施，再将 Root / renderer / render route 统一切到 registry 驱动，最后让 render request 接受可验证的 brief 输入和 registry 输出。

**Primary recommendation:** 先在 Phase 1 建立 `VideoBriefSchema`、`VideoTemplateRegistry`、`RenderRequestSchema(brief-aware)` 和最小 Vitest 验证，再进入 Phase 2 的媒体 manifest 与 Phase 3 的模板运行时。
</research_summary>

<standard_stack>
## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `zod` | current project `3.22.3` | 定义 brief、registry、render request 的边界合同 | 现有项目已大量使用，适合把“事实源”和“输入校验”变成单一真相 |
| `remotion` + `@remotion/*` | current project `4.0.435` | 注册 composition、渲染 still / video、动态 metadata | 官方推荐用 `calculateMetadata()` 统一动态时长、props 和输出配置 |
| `express` | current project `5.2.1` | 暴露统一 render / discoverability API | 现有服务层已存在，适合作为 registry 查询与渲染入口 |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `vitest` | latest stable | 为 schema、registry、route 合同提供最小单元测试 | 仓库当前没有测试 runner，Phase 1/2 需要先补最小验证基础设施 |
| `music-metadata` | current project `11.11.1` | 后续 Media Manifest 阶段读取真实音频时长 | Phase 2 会继续用，但 Phase 1 不应重新发明媒体读取逻辑 |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `zod` brief / registry contract | 手写 TypeScript interface + if/else 校验 | 会把 runtime 校验丢掉，无法稳定阻止缺字段输入 |
| Vitest | Jest | Jest 也能做，但当前仓库是纯 TS + Node 轻量结构，Vitest 更贴近最小增量落地 |
| API 动态扫描 composition | 手写多处列表或只依赖 `getCompositions()` | 仍会出现 Root、API、脚本对“有哪些模板”的认知漂移 |

**Installation:**
```bash
npm install --save-dev vitest
```
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Recommended Project Structure
```text
src/
├── shared/
│   ├── video-brief.ts        # brief schema + derivation helpers
│   ├── video-registry.ts     # typed template/still/platform registry
│   └── types.ts              # render request / response schema, imports brief contracts
├── server/
│   ├── routes/render.ts      # brief-aware render endpoint
│   └── services/renderer.ts  # registry-backed discoverability and render orchestration
└── Root.tsx                  # composition registration consuming registry metadata
```

### Pattern 1: Schema-first content contract
**What:** 用 Zod 先定义 `VideoBriefSchema`，再让脚本、封面、标题、描述、render request 共同依赖它。  
**When to use:** 当多个产物都需要共享事实源，且不能靠人工同步时。  
**Example:**
```typescript
const VideoBriefSchema = z.object({
  topic: z.string().min(1),
  hookLine: z.string().min(1),
  hookProof: z.string().min(1),
  coreFacts: z.array(z.string()).min(1),
  sourceLinks: z.array(z.string().url()).min(1),
  coverTitle: z.string().min(1),
  shortTitle: z.string().max(16),
  shortDescription: z.string().max(20),
});
```

### Pattern 2: Metadata-only registry first, component wiring second
**What:** 先建立不含 UI 组件引用的 metadata registry，只记录模板能力、still 映射、输出路径和平台 profile；再在 Root / API 中消费它。  
**When to use:** 当前 Root 已有大量手写注册项，先做 metadata 收敛能避免一开始就引入复杂的循环依赖。  
**Example:**
```typescript
export const videoTemplateRegistry = [
  {
    compositionId: "AIHarnessEngineer",
    stillId: "AIHarnessEngineerCover",
    templateType: "vertical-7-scene",
    aspectRatio: "9:16",
    safeAreaProfile: "short-video-mobile",
    subtitleMode: "single-line-bottom",
    output: {
      video: "out/AIHarnessEngineer.mp4",
      cover: "out/AIHarnessEngineer-cover.png",
    },
  },
] as const;
```

### Pattern 3: Brief enrichment before render
**What:** API / CLI 在进入 Remotion 渲染前，把 `brief` 解析成统一的 `inputProps` seed，而不是让每个 composition 自己在运行时猜字段。  
**When to use:** 当 render 接口要逐步转向“template + brief”而不是“compositionId + 任意 inputProps”时。  
**Example:**
```typescript
const parseResult = RenderRequestSchema.safeParse(req.body);
const resolved = resolveRenderInput({
  compositionId: parseResult.data.compositionId,
  brief: parseResult.data.brief,
  inputProps: parseResult.data.inputProps,
});
```

### Anti-Patterns to Avoid
- **Root-only truth:** 继续让 `src/Root.tsx` 成为唯一真实注册表，API 只靠 `getCompositions()` 反射结果，会保留 still、platform profile、output path 的漂移。
- **Concept-only brief:** brief 只有“主题、结论、事实”，没有 hook / cover / short copy 字段，会导致每条视频继续人工补 packaging。
- **Registry with component refs too early:** 一开始就把 React 组件、still 组件、defaultProps、output path 全塞进一个大对象，容易引入循环依赖并增加重构风险。
</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 边界校验 | 手写 `if (!x) throw` 链 | `zod` schemas | 字段多、平台预算多、默认值多，手写校验容易遗漏 |
| 动态时长 / props 绑定 | 每次手改 `Root.tsx` 中的 `durationInFrames` 和 defaultProps | Remotion `calculateMetadata()` + shared resolver | 官方已经支持 render 前统一计算 metadata |
| 版本兼容 | 让 `remotion` 与 `@remotion/*` 保持 caret 漂移 | exact-pinned 同版本族 | Remotion 官方明确建议所有 `@remotion/*` 与 `remotion` 同版本，并去掉 `^` |
| 测试缺口 | 仅靠 `npm run typecheck` | 最小 Vitest 套件 + typecheck | schema / registry 漂移是逻辑问题，类型检查抓不全 |

**Key insight:** Phase 1 真正要避免的不是“代码重复”，而是“事实源、模板发现、平台包装字段”分别手写，最终互相漂移。
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: 把 brief 做成“文案输入框”，不是“内容合同”
**What goes wrong:** brief 只存主题和结论，首屏 hook、封面、短标题、短描述仍在各脚本里各写各的。  
**Why it happens:** 误以为包装内容属于 Phase 4，因此 Phase 1 不需要管。  
**How to avoid:** Phase 1 先只定义字段与 derivation helper，不要求所有包装都 fully automated。  
**Warning signs:** 新视频继续需要手改 `docs/*copy.md` 才能对齐视频内容。

### Pitfall 2: Registry 只解决 composition list，不解决 still / platform metadata
**What goes wrong:** API 可以列出 composition，但不知道对应 cover still、输出文件名、安全区或平台字符预算。  
**Why it happens:** 只把 registry 当发现列表，而不是模板合同。  
**How to avoid:** registry 至少包含 `compositionId`、`stillId`、`templateType`、`output`、`safeAreaProfile`、`subtitleMode`、`platformProfiles`。  
**Warning signs:** 仍需要到 `Root.tsx`、`package.json`、`docs/*copy.md` 三处分别找一条视频的信息。

### Pitfall 3: 计划阶段忽视测试基础设施
**What goes wrong:** 执行时发现 schema / registry 无法稳定验证，只能靠人工读文件。  
**Why it happens:** 仓库当前没有测试 runner，容易把“补测试”不断往后拖。  
**How to avoid:** 在 Phase 1 的首个计划里顺手补最小 Vitest 基础设施，只覆盖 shared schema、registry 和 render contract。  
**Warning signs:** 所有 acceptance criteria 都变成“文件存在”“typecheck 通过”，缺少行为级验证。

### Pitfall 4: Root、API、脚本三端采用不同发现来源
**What goes wrong:** 新增 composition 后，Studio 里能看到，API 或脚本列表却不一致。  
**Why it happens:** discoverability 分别依赖手写数组、`getCompositions()` 和 npm scripts。  
**How to avoid:** 让 registry 成为 metadata 真相源，Root 注册和 API 列表都从它派生；脚本层至少引用相同的 output / template metadata。  
**Warning signs:** 增加一个 cover still 后，还得手工补 3 个地方。
</common_pitfalls>

<code_examples>
## Code Examples

Verified patterns from official sources:

### Dynamic metadata resolver
```typescript
// Source: https://www.remotion.dev/docs/calculate-metadata
import type { CalculateMetadataFunction } from "remotion";

export const calculateMetadata: CalculateMetadataFunction<MyProps> = ({ props }) => {
  return {
    durationInFrames: props.durationInFrames,
    props,
  };
};
```

### Minimal Vitest config for Node-side contract tests
```typescript
// Source basis: https://main.vitest.dev/config/globals
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.ts"],
  },
});
```

### Registry-backed render payload shape
```typescript
const RenderRequestSchema = z.object({
  compositionId: z.string().min(1),
  brief: VideoBriefSchema.optional(),
  inputProps: z.record(z.unknown()).default({}),
  outputFileName: z.string().optional(),
});
```
</code_examples>

<sota_updates>
## State of the Art (2024-2026)

What's changed recently:

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| 手工固定时长和 props | `calculateMetadata()` 动态驱动 metadata | Remotion 4.x | 适合把时长、props、输出名与 brief / manifest 统一起来 |
| 把 captions 当后处理 | 官方 captions 文档明确拆成导入、转录、显示、导出 | Remotion 4.x docs 持续完善 | 字幕是合同的一部分，不应只在脚本末尾补 |
| `@remotion/*` 自由漂移版本 | 官方明确要求同版本并移除 `^` | Remotion transitions docs (2026 docs snapshot) | 当前项目应考虑在后续 phase 收敛版本策略，避免渲染警告 |
| Shorts 只能 60 秒 | YouTube Shorts 已支持最长 3 分钟 | 2024-10 | “更长”成为可能，但前 `1-2` 秒钩子反而更重要 |

**New tools/patterns to consider:**
- `calculateMetadata()`：为 Phase 2/3 的 media manifest 与 template runtime 提供天然承接点。
- `Vitest` 最小 Node 合同测试：足够覆盖 Zod schema、registry 完整性和 route 校验，不需要先上重型 E2E。

**Deprecated/outdated:**
- 继续把 registry 只理解成“可用 composition 名单”已经不够用了；短视频工厂需要 platform-aware metadata。
- 只依赖 `npm run typecheck` 作为质量门已不够，尤其是 schema / registry / discoverability 这类数据逻辑。
</sota_updates>

## Validation Architecture

### Recommended Validation Split

- **Wave 0 foundation:** 安装 `vitest`，增加 `vitest.config.ts`，为 `src/shared/` 的合同层补最小测试入口。
- **Plan 01-01:** 验证 `VideoBriefSchema` 的必填字段、字符预算和 derivation helper。
- **Plan 01-02:** 验证 registry 无重复 ID、每个 entry 都有 output / still / platform profile metadata。
- **Plan 01-03:** 验证 render request 能接受 brief，API 返回的 discoverability 数据来自 registry，而不是手写散落列表。

### Validation Rules

- 每个计划至少要有一个可运行的 `vitest` 用例，不接受只靠人工读文件。
- `npm run typecheck` 是基础门，不替代 contract tests。
- route 层优先测 schema 与 response shape，不在 Phase 1 引入端到端渲染测试。
- 任何新增 registry 字段，都要有测试证明它被 discoverability 层暴露出来。

<open_questions>
## Open Questions

1. **Phase 1 是否要让所有现有 composition 立即支持 brief 输入？**
   - What we know: 路线图要求“同一份 brief 是视频脚本、封面文案、标题和描述的单一事实源”，但没有要求所有旧 composition 当场重构为模板。
   - What's unclear: 是先支持 reference compositions（如 `AIHarnessEngineer` / `WeChatClawBot`），还是只在 shared contract 层打通。
   - Recommendation: 计划阶段先要求“render contract brief-aware + shared derivation helper + reference path coverage”，不要把所有旧视频的 props 重构塞进 Phase 1。

2. **Registry 在 Phase 1 是否应直接驱动 `Root.tsx` 全量注册？**
   - What we know: 这是最终方向；但当前 `Root.tsx` 默认 props 很多，直接一步到位风险较高。
   - What's unclear: 是否采用“metadata registry + thin Root adapter”还是“registry 直接持有 component / still refs”。
   - Recommendation: 先做 metadata registry，再在 `Root.tsx` 建一层 adapter；避免第一轮就引入循环依赖和大面积改动。
</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- [Remotion calculateMetadata docs](https://www.remotion.dev/docs/calculate-metadata) — 动态 metadata、props 变换、render 前单次执行模型
- [Remotion captions docs](https://www.remotion.dev/docs/captions) — 字幕导入、转录、显示、导出能力边界
- [Remotion transitions docs](https://www.remotion.dev/docs/transitions) — `remotion` 与 `@remotion/*` 版本对齐要求
- [YouTube Blog: creator basics](https://blog.youtube/creator-and-artist-stories/youtube-creator-how-to-start/) — title / description / thumbnail 与前 1-2 秒抓人原则
- [YouTube Help: captions](https://support.google.com/youtube/answer/13818789?hl=en) — captions 的可达性与样式配置
- [YouTube Blog: tall updates coming to Shorts](https://blog.youtube/news-and-events/tall-updates-coming-to-shorts/) — Shorts 最长时长变化
- [Vitest config docs](https://main.vitest.dev/config/globals) — globals / TypeScript config 的官方配置方式

### Secondary (MEDIUM confidence)
- [X Ads Best Practices](https://business.x.com/de/advertising/ads-best-practices) — 前几秒动作、字幕覆盖、移动端视频识别原则
- [Weixin/WeChat Channels LinkedIn update](https://www.linkedin.com/posts/teamwechat_weixin-wechat-channels-activity-7338460332169850881-AHJM) — 视频号描述 20 字、封面可改一次的公开产品说明
- `docs/research/remotion-videochannel-best-practices-2026-03-29.md` — 已将多源资料收敛成对本仓库的可执行解释

### Tertiary (LOW confidence - needs validation)
- 当前渲染阶段出现的 `zod` 版本提示是否需要在 Phase 1 就处理。Recommendation: 记录为后续工程卫生项，Phase 1 先确保 registry / brief / tests 落地。
</sources>

<metadata>
## Metadata

**Research scope:**
- Core technology: Remotion registry / metadata / render contract
- Ecosystem: Zod, Express, Vitest, YouTube / X / WeChat Channels 创作规则
- Patterns: schema-first brief, metadata-first registry, brief enrichment before render
- Pitfalls: contract drift, manual registration drift, no test runner

**Confidence breakdown:**
- Standard stack: HIGH — 基于官方文档和当前仓库栈
- Architecture: HIGH — 与现有 Root / renderer / route 结构直接对应
- Pitfalls: HIGH — 已从当前代码和已交付视频中观察到
- Code examples: HIGH — 来自官方文档的稳定模式

**Research date:** 2026-03-29
**Valid until:** 2026-04-28
</metadata>

---

*Phase: 01-内容事实契约与注册表*
*Research completed: 2026-03-29*
*Ready for planning: yes*
