# Architecture Research

**Domain:** AI 技术短视频创作 / 自媒体视频生产系统（基于现有 Remotion + Express brownfield 演进）  
**Researched:** 2026-03-22  
**Confidence:** MEDIUM

## Standard Architecture

### System Overview

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                         Authoring / Planning Layer                          │
├──────────────────────────────────────────────────────────────────────────────┤
│  VideoBrief  HookPlan  ThemePreset  PublishBrief  SourceLink/Keywords       │
└──────────────┬──────────────┬──────────────┬──────────────┬──────────────────┘
               │              │              │              │
┌──────────────┴───────────────────────────────────────────────────────────────┐
│                  Video Package Registry (single source of truth)            │
├──────────────────────────────────────────────────────────────────────────────┤
│ slug · templateId · compositionId · stillId · render targets · manifests    │
│ scene spec · audio files · subtitle files · cover/title/description outputs  │
└──────────────┬───────────────────────┬───────────────────────┬───────────────┘
               │                       │                       │
┌──────────────┴─────────────┐ ┌───────┴──────────────┐ ┌─────┴───────────────┐
│ Template Runtime           │ │ Media Prep Pipeline   │ │ Publishing Composer │
│ shared scenes + hook packs │ │ TTS + subtitle sync   │ │ cover + title + desc│
│ video composition + still  │ │ media manifest        │ │ publish manifest    │
└──────────────┬─────────────┘ └───────┬──────────────┘ └─────┬───────────────┘
               │                       │                       │
┌──────────────┴───────────────────────┴───────────────────────┴───────────────┐
│                    Render Orchestration (Remotion + Express)                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ Root registry · getCompositions/selectComposition · renderMedia/renderStill  │
│ API routes · output naming · static serving · package-level job entry        │
└──────────────┬──────────────────────────────────────────────┬────────────────┘
               │                                              │
┌──────────────┴──────────────┐                 ┌─────────────┴────────────────┐
│ Runtime Assets             │                 │ Final Outputs                 │
│ public/audio public/music  │                 │ out/*.mp4 out/*.png           │
│ generated/manifests/*.json │                 │ generated/publish/*.json      │
└─────────────────────────────┘                 └──────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `VideoBrief` | 定义一条视频的事实源：主题、核心数字、金句、链接、脚本段落、目标平台 | TypeScript + Zod schema，来自人工粘贴文案与编辑后的结构化配置 |
| `Video Package Registry` | 作为统一注册表，描述视频 composition、封面 still、模板类型、产物路径、默认 props | `src/video-core/registry/*.ts` 导出强类型对象 |
| `Template Runtime` | 提供可复用模板能力：7 场景竖屏、16:9 讲解、统一场景骨架、共享动画与字幕/音频编排 | Remotion 组件、共享场景 scaffold、hook pack |
| `Hook Pack` | 专门负责前三秒视觉钩子，如大数字、对比、徽章、倒计时、冲击副标题 | `src/video-core/hooks/` 下的纯展示组件与规则 |
| `Media Manifest Builder` | 把 TTS 输出、字幕同步结果、总时长、场景时长整理成机器可读 manifest | `scripts/pipeline/*` 输出 JSON manifest |
| `Publishing Composer` | 从同一份 brief 产出封面文案、16 字标题、描述、标签和成片清单 | `src/video-core/publishing/*` 生成 JSON 与 still props |
| `Render Orchestrator` | 执行包级别产出：视频、封面、发布文案；暴露 API/CLI 入口 | Express service + Remotion renderer + job runner |

## Recommended Project Structure

```text
src/
├── video-core/                 # 新增：增量抽出的通用视频领域层
│   ├── registry/               # Video package registry，统一 composition/still/outputs
│   ├── specs/                  # VideoBrief、HookPlan、PublishBrief、MediaManifest schema
│   ├── templates/              # 可复用模板运行时（竖屏技术短视频、横版讲解等）
│   ├── hooks/                  # 前三秒 hook pack：数字冲击、对比、标签、首屏信息层
│   ├── publishing/             # 标题、描述、标签、封面 props 生成
│   └── runtime/                # 字幕、音频、scene timeline、theme token 共享逻辑
├── compositions/               # 保留现有目录；迁移期作为模板适配层
├── server/
│   ├── routes/                 # HTTP transport
│   ├── services/               # renderer、tts、publish bundle orchestration
│   └── jobs/                   # 可选：后续异步化渲染时直接承接
├── data/                       # 仅保留需要随源码版本化的稳定数据
└── shared/                     # 跨层通用类型

scripts/
├── pipeline/                   # 抽取共享 TTS / subtitle / manifest 生成逻辑
└── presets/                    # 每条视频的轻量入口，避免 1 视频 2 脚本大量复制

generated/
├── manifests/                  # 每条视频的 media manifest（sceneDurations/subtitles）
├── publish/                    # 标题、描述、标签、发布清单 JSON
└── previews/                   # 临时导出的封面、预览图、辅助产物
```

### Structure Rationale

- **`src/video-core/`:** 这是本轮最该新增的一层。它把“模板化、hook 组件、发布素材产出、统一 registry”从 `Root.tsx` 和各 composition 目录里抽出来，但不破坏既有 Remotion 入口。
- **`src/compositions/`:** brownfield 期不应删除。现有 `OpenClawAI`、`AutoResearch` 等先作为适配器继续跑，只把共享逻辑慢慢迁移到模板层。
- **`scripts/pipeline/`:** 当前 `generate-voiceover-*` 与 `sync-subtitle-*` 重复度很高，应该先抽公共库，再保留每个视频的轻量 preset 入口。
- **`generated/`:** 这是为了把“生成物”和“源码”分开。音频继续留在 `public/` 供 Remotion `staticFile()` 使用，但时长/字幕/发布文案等机器产物不要继续手工塞进 `Root.tsx`。

## Architectural Patterns

### Pattern 1: Video Package Registry As Single Source Of Truth

**What:** 用一个共享注册表同时描述视频 composition、封面 still、模板类型、输入配置、输出文件和发布素材路径。  
**When to use:** 所有新视频，以及已有 composition 的渐进迁移。  
**Trade-offs:** 需要先补一层 schema 和 registry，但能一次性解决 `Root.tsx` 与 render API 漂移、默认 props 四散的问题。

**Example:**
```typescript
export const autoResearchPackage: VideoPackage = {
  slug: "autoresearch",
  templateId: "tech-short-vertical/v1",
  compositions: {
    video: "AutoResearch",
    cover: "AutoResearchCover",
  },
  manifests: {
    media: "generated/manifests/autoresearch.media.json",
    publish: "generated/publish/autoresearch.json",
  },
  outputs: {
    video: "out/AutoResearch.mp4",
    cover: "out/AutoResearch-cover.png",
  },
};
```

### Pattern 2: Content Spec -> Derived Media Manifest

**What:** 把“人工可编辑的视频内容”和“根据 TTS/字幕计算出来的时长、字幕、音频路径”分成两层。  
**When to use:** 只要音频长度会变化，就不要再手工把 `durationInFrames` 和 `sceneDurations` 回写到 `Root.tsx`。  
**Trade-offs:** 每条视频会多一个 manifest 文件，但换来可重复生成和更少人工回填。

**Example:**
```typescript
export const calculateMetadata = async ({ props }) => {
  const media = await loadMediaManifest(props.slug);

  return {
    durationInFrames: media.totalFrames,
    props: {
      ...props,
      sceneDurations: media.sceneDurations,
      precomputedSubtitles: media.subtitles,
      audio: {
        ...props.audio,
        voiceoverAudioFiles: media.audioFiles,
      },
    },
    defaultOutName: props.slug,
  };
};
```

### Pattern 3: Template Runtime + Hook Pack

**What:** 模板负责场景编排和主题 token；hook pack 专门负责前三秒吸引力，不把 hook 写死在每个视频里。  
**When to use:** 竖屏 7 场景技术短视频最适合先做成模板运行时。  
**Trade-offs:** 单条视频的自由发挥会受一点约束，但换来更快出片和更稳定的“首屏抓人”质量。

**Example:**
```typescript
const video = createVerticalTechShort({
  hook: {
    kind: "metric-shock",
    primaryNumber: "4.4w+",
    supportingLine: "630行代码",
  },
  scenes: ["pain", "core", "proof", "proof-2", "paradigm", "cta"],
  theme: "cyber-green",
});
```

### Pattern 4: Publishing Assets As First-Class Outputs

**What:** 视频系统的最终产物不只是 MP4，还包括封面 PNG、标题、描述、标签、链接和产出清单。  
**When to use:** 本项目当前明确要求“统一版标题 + 描述 + 封面”时。  
**Trade-offs:** 需要增加一层 publish composer，但这是把成片能力真正变成“可发稿件”的关键。

**Example:**
```typescript
await runVideoPackage("autoresearch");

// 输出：
// - out/AutoResearch.mp4
// - out/AutoResearch-cover.png
// - generated/publish/autoresearch.json
```

## Data Flow

### Request Flow

```text
[人工粘贴文案 / 选择旧视频复用]
    ↓
[VideoBrief]
    ↓
[HookPlan + ThemePreset + PublishBrief]
    ↓
[TTS 生成] → [音频文件 public/audio/*.mp3]
    ↓
[字幕同步] → [MediaManifest sceneDurations + subtitles]
    ↓
[Video Package Registry 解析目标 composition/still]
    ↓
[Remotion calculateMetadata/selectComposition]
    ↓
[renderMedia 渲染视频] + [renderStill 渲染封面]
    ↓
[Publishing Composer 生成标题/描述/标签]
    ↓
[out/*.mp4 + out/*.png + generated/publish/*.json]
```

### State Management

```text
[VideoBrief / Preset]
    ↓
[Registry Resolver]
    ↓
[Template Props] ← [MediaManifest]
    ↓
[Composition / Still]
```

### Key Data Flows

1. **成片数据流：** `VideoBrief -> TTS -> Subtitle Sync -> MediaManifest -> Video Composition -> MP4`
2. **封面数据流：** `VideoBrief + HookPlan + ThemePreset -> Cover Still Props -> PNG`
3. **发布文案数据流：** `VideoBrief + Hook metrics + SourceLink -> title/description/tags JSON`
4. **API 数据流：** `render package request -> registry lookup -> render target resolution -> asset bundle response`

## Suggested Build Order

### Incremental Build Order

1. **先建 `Video Package Registry`**
   - 这是所有后续能力的依赖中心。
   - 先解决 `Root.tsx` 与 `src/server/services/renderer.ts` 的 composition 漂移问题。

2. **再建 `Media Manifest Builder`**
   - 先把 TTS / subtitle 输出变成标准 manifest。
   - 这一步完成后，才能停止手工回填 `durationInFrames` 与 `sceneDurations`。

3. **再抽 `Template Runtime` 和 `Hook Pack`**
   - 先做竖屏 7 场景模板。
   - 已有 `OpenClawAI` / `ClawSkills` / `AutoResearch` 迁移收益最高。

4. **再建 `Publishing Composer`**
   - 让同一份 brief 同时驱动封面、标题、描述，不再从 `Root.tsx` 或 JSX 反向猜内容。

5. **最后加 `Package Render Orchestrator`**
   - 对外提供“渲染整包产物”的新入口。
   - 老的 `/api/render` 保留，新入口只是在其上组合调用。

### Dependency Edges

```text
VideoBrief
  ├──> HookPlan
  ├──> PublishBrief
  └──> TtsScript

TtsScript
  └──> AudioFiles
        └──> SubtitleSync
              └──> MediaManifest

HookPlan + ThemePreset + MediaManifest
  └──> Template Runtime
        ├──> Video Composition
        └──> Cover Still

Video Package Registry
  ├──> Root.tsx registration
  ├──> Render API validation
  └──> Publishing Composer
```

## Brownfield Integration Notes

### Existing Remotion Codebase Notes

| Brownfield Area | Current State | Incremental Recommendation |
|-----------------|---------------|----------------------------|
| `src/Root.tsx` | 已成为超大手工注册文件，内联 defaultProps、字幕、时长、封面 still | 把每条视频的注册信息拆到 registry 模块，`Root.tsx` 只遍历 registry 输出 `<Composition />` / `<Still />` |
| Render API | `getAvailableCompositions()` 仅硬编码两个 composition，和实际注册不一致 | API 改为读取共享 registry，并在启动时用 `getCompositions()` 做一致性校验 |
| 竖屏模板 | `OpenClawAI`、`ClawSkills`、`SuperPowers`、`PuaSkill`、`AgencyAgents`、`AutoResearch` 都是 7 场景变体 | 优先抽一套 `tech-short-vertical` 模板运行时，旧 composition 先改成调用模板，而不是复制 scene 代码 |
| 配音/字幕脚本 | `generate-voiceover-*` 与 `sync-subtitle-*` 高度复制 | 抽共享 pipeline 库，保留每个视频的 preset 入口文件，避免一次性改完全部脚本 |
| 封面产出 | 目前只有 `AutoResearchCover` 完成 still 化 | 把 cover 变成 package 级标准输出，每个模板都必须能生成 cover still |
| 发布素材 | 目前无统一产物层 | 新增 `publish manifest`，把标题/描述/标签和成片路径一起输出 |

### Migration Strategy

- **不要先重写所有 composition。** 先抽 registry 和 manifest，立刻降低维护成本。
- **保持 composition ID 稳定。** `OpenClawAI`、`AutoResearch` 等 ID 已是 CLI/API 契约，迁移期不能改名。
- **先迁移竖屏技术短视频族。** 它们模式最接近，模板化 ROI 最高。
- **新能力走“旁路接入”。** 新增 package render 入口，不要先破坏现有 `npm run render:*` 和 `/api/render`。
- **用 manifest 而不是人工回填。** 这是减少出错和后续自动化的最大杠杆。

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1-5 条视频/天 | 单体 Remotion + Express 足够，重点先做 registry、manifest、模板层 |
| 5-30 条视频/天 | 增加 package-level job runner，避免一个 HTTP 请求同步串行做 TTS、字幕、渲染 |
| 30+ 条视频/天 | API 与 render worker 分离，TTS/字幕/渲染进入队列，生成物上对象存储 |

### Scaling Priorities

1. **First bottleneck:** `Root.tsx` 与脚本复制导致的维护吞吐瓶颈，不是 CPU。先解 registry 和 manifest。
2. **Second bottleneck:** 同步渲染/生成都堵在 API 进程。等 package 流程稳定后再拆 job queue。

## Anti-Patterns

### Anti-Pattern 1: 把每条新视频当成新 composition 复制一份

**What people do:** 新视频直接复制整个 `src/compositions/<OldVideo>/` 目录，再手改 scene 和动画。  
**Why it's wrong:** 模板无法收敛，hook 质量和字幕/音频逻辑会继续漂移。  
**Do this instead:** 复制的不是 composition，而是 `VideoBrief` / preset；真正复用的是模板运行时和 hook pack。

### Anti-Pattern 2: 标题、封面、描述从成片或 JSX 反向猜

**What people do:** 视频做完后再人工总结标题和封面文案，甚至从 `voiceoverScripts` 或 `defaultProps` 里拼字符串。  
**Why it's wrong:** 发布素材与成片事实源分裂，后续无法自动化，也不利于统一优化前三秒。  
**Do this instead:** 让 `VideoBrief + HookPlan` 成为发布素材和成片共同依赖的上游输入。

### Anti-Pattern 3: 继续把字幕时长和文件路径手工回填进 `Root.tsx`

**What people do:** 运行同步脚本后手动把 `durationInFrames`、`sceneDurations`、`precomputedSubtitles` 改回根注册文件。  
**Why it's wrong:** 非常容易错位，而且每条视频都要碰巨大注册文件。  
**Do this instead:** 把音频/字幕/总时长落为 manifest，再通过 registry 和 metadata 读取。

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| `edge-tts` | 离线 pipeline 先生成音频，再进入 subtitle sync | 继续沿用即可，但要抽共享库，避免 1 视频 1 套脚本复制 |
| Remotion Renderer | 通过 `selectComposition` / `renderMedia` / `renderStill` 做视频与封面产出 | 现有渲染主干保留，不需要换栈 |
| Express API | 保留薄路由；新增 package render/service 层组合调用 | 先组合已有能力，再决定是否异步化 |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `registry ↔ Root.tsx` | 直接模块导入 | `Root.tsx` 只负责注册，不持有业务配置 |
| `registry ↔ render API` | 直接模块导入 + 启动校验 | 避免 composition 可用列表再次硬编码 |
| `VideoBrief ↔ publishing` | typed object | 标题/描述/封面必须从同一事实源派生 |
| `MediaManifest ↔ template runtime` | JSON + typed loader | 让 scene 时长、字幕、音频路径不再手工散落 |
| `template runtime ↔ legacy compositions` | adapter props | 迁移期间允许旧 composition 包一层新模板运行时 |

## Sources

- Remotion Composition docs: https://www.remotion.dev/docs/composition
- Remotion Still docs: https://www.remotion.dev/docs/still
- Remotion `calculateMetadata()` docs: https://www.remotion.dev/docs/calculate-metadata
- Remotion `getCompositions()` docs: https://www.remotion.dev/docs/renderer/get-compositions
- Remotion `renderMedia()` docs: https://www.remotion.dev/docs/renderer/render-media
- Remotion `renderStill()` docs: https://www.remotion.dev/docs/renderer/render-still
- Express routing guide: https://expressjs.com/en/guide/routing.html
- Repo inspection: `src/Root.tsx`, `src/server/services/renderer.ts`, `src/server/routes/render.ts`, `src/compositions/*`, `.planning/PROJECT.md`, `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/CONCERNS.md`

---
*Architecture research for: AI 技术短视频创作 / 自媒体视频生产系统*  
*Researched: 2026-03-22*
