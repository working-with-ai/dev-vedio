# Pencil.dev Video — Design Spec

**Date**: 2026-03-26
**Status**: Approved
**Composition ID**: `PencilDev`
**Cover Still ID**: `PencilDevCover`

---

## 1. Overview

制作一支关于 `Pencil.dev` 的竖屏技术短视频，面向微信视频号的泛科技 / AI 工具关注人群。叙事主轴不是“这个工具很酷”，而是“我的设计工作流已经变了，`Pencil.dev` 真的把旧设计工具从工作台上挤下去了”。视频以第一人称真实体验为核心，用锋利、克制但很有判断力的口吻建立可信度，同时借 `Agent Team` 并行设计的科幻感制造记忆点。

### Key Decisions

| 决策 | 选择 |
|---|---|
| 目标受众 | 微信视频号上的 AI 工具用户 / 独立开发者 / 产品设计从业者 |
| 视频格式 | 竖屏 9:16 (1080 x 1920) |
| 叙事角度 | 效率颠覆型，强调旧工作流退场 |
| 视觉风格 | 混合版：`A. IDE 科幻中控台` 为主，`B. 旧工具退场对比` 做 Hook，`C. 协议网络感` 点缀中段 |
| 情绪方向 | 锋利、未来、克制，不浮夸 |
| 预估时长 | ~95-120 秒 |
| 场景数量 | 7 |
| CTA 目标 | 让观众先收藏，并意识到 AI 设计工作流已经换代 |

---

## 2. Color Scheme (锋利冷色工作台)

```ts
backgroundColor: "#050816"   // 深蓝黑底，偏 IDE / 未来感
accentColor:     "#22d3ee"   // 冰蓝青，主视觉强调
highlightColor:  "#bef264"   // 酸性浅绿，效率 / 成功 / 结论
secondaryColor:  "#818cf8"   // 冷紫，协议网络 / Agent 连接线
successColor:    "#34d399"   // 成功 / 生产力
dangerColor:     "#fb7185"   // 旧工作流 / 退场 / 对比
warningColor:    "#f59e0b"   // 轻警示 / 过渡强调
textColor:       "#ffffff"
mutedTextColor:  "#94a3b8"
panelColor:      "rgba(15, 23, 42, 0.82)"
```

Background layers:
- 冷色 `radial-gradient` 光晕，偏青蓝，不走暖色。
- 轻扫描线与 HUD 边角，增强“工作台”与“协议中控”感觉。
- 少量粒子背景，密度低于 `AgencyAgents`，避免太花。
- Hook 场景加入旧工具“幽灵残影”层，做退场对比。

---

## 3. Technical Config

| 属性 | 值 |
|---|---|
| Width | 1080 |
| Height | 1920 |
| FPS | 30 |
| Voice | `zh-CN-YunyangNeural` |
| Voice Rate | `+3%` |
| Audio Prefix | `pencildev` |
| Audio Path Pattern | `audio/pencildev-scene{N}.mp3` |
| Subtitle JSON | `src/data/pencildev-subtitles.json` |
| Composition Folder | `src/compositions/PencilDev/` |

---

## 4. Narrative Thesis

这支视频要让观众记住的不是“Pencil 有很多功能”，而是下面这句：

> `我现在做设计，真的已经很久没打开 Figma / PS / AI 了，因为 Pencil.dev 让我重新理解了 AI 时代的设计工作流。`

叙事节奏：
- 前 3 秒先打结论，不讲定义。
- 中段用 `Agent Team` 和 `MCP / Skill / Agent` 整合能力抬高判断力。
- 后段用“主力工具”与“近 1 个月真实使用”完成信任闭环。
- CTA 不硬推下载，主打“先收藏，这件事值得重新看一遍”。

---

## 5. Scene Design (7 Scenes)

### Scene 1: HookScene — "Figma / PS / AI 我真不开了"

**Duration**: ~10-12s

**Voiceover Direction**:
> 说出来你可能不信，我现在做设计，真的已经很久没打开 Figma、Photoshop、Illustrator 了。不是因为我不用设计了，而是因为 Pencil.dev 已经把这套工作流换掉了。

**Visual Design**:
- 顶部英文标签: `PENCIL.DEV`
- 中心大字: `Figma / PS / AI 我真不开了`
- 副标题: `我的主力设计软件，已经换了`
- 左侧: 旧工具卡片半透明退场（红粉色幽灵态）
- 右侧: Pencil 主界面高亮激活（冷青色）
- 第一帧必须是完整封面态，不能黑场进入

**Animations**:
- 旧工具 ghost fade out
- Pencil 主面板 scale in
- 标题 `fadeInUp`
- 轻微 `glitchOffset` 增加锋利感

---

### Scene 2: PainScene — 旧工作流为什么开始显得笨

**Duration**: ~12-15s

**Voiceover Direction**:
> 以前做设计很自然，就是打开设计软件，开聊天窗口，开素材窗口，来回导出，来回复制，再回头改。问题是到了今天，这种不断切换上下文、不断搬运内容的工作流，已经开始显得笨了。

**Visual Design**:
- 顶部标签: `CONTEXT SWITCH`
- 三到四个窗口轮流切换：设计工具、AI 对话框、导出面板、代码预览
- 中间一条“切换成本”计数条不断走高
- 底部金句: `问题不是设计变难，而是切换太多`

**Animations**:
- 窗口 `slideFromLeft / slideFromRight`
- 切换计数条持续增长
- 警示色脉冲突出“来回搬运”

---

### Scene 3: CoreScene — Pencil.dev 到底改了什么

**Duration**: ~14-16s

**Voiceover Direction**:
> Pencil.dev 最厉害的地方，不是它又做了一个画图软件，而是它把设计、代码和 AI 重新放回了同一个工作台里。你不用再一直跨应用跳来跳去，设计这件事开始真正长进 IDE 里。

**Visual Design**:
- 顶部标签: `DESIGN INSIDE IDE`
- 中心是一个 IDE 风格的多栏工作台：
  - 左栏: 设计图层 / Agent 列表
  - 中栏: 矢量画布 / 组件预览
  - 右栏: AI 协作 / 代码同步 / 属性面板
- 中间强调语: `Design + Code + AI`

**Animations**:
- 三栏卡片依次入场
- 中栏画布用 `cardSlideIn`
- 关键字用 `shimmer` 做光扫

---

### Scene 4: AgentScene — Agent Team 并行设计像科幻片

**Duration**: ~14-17s

**Voiceover Direction**:
> 第一次看到它的 Agent Team 并行设计，我是真的有点被震住了。那种感觉很像科幻片，不是一个 AI 在慢慢帮你补图，而是一组不同角色同时在围着同一份设计工作。

**Visual Design**:
- 顶部标签: `AGENT TEAM`
- 中心画布居中，四周围绕多个 Agent 卡片：
  - `Layout Agent`
  - `Brand Agent`
  - `Detail Agent`
  - `Export Agent`
- 连线从四周汇聚到中心设计稿
- 底部金句: `像科幻片，但不是摆拍`

**Animations**:
- `pipelineNodeReveal` 呈现 Agent 节点
- `lineGrow` 连接中心画布
- 中心设计稿略微呼吸发光

---

### Scene 5: ProofScene — 为什么我说它是顶级模板

**Duration**: ~15-18s

**Voiceover Direction**:
> 但我真正服气，不是因为画面酷，而是因为我认真跑了几个测试项目，又深入看了很多大模型对话日志之后，发现它在 MCP、Skill、Agent 这几个概念上的整合，真的已经是顶级模板了。

**Visual Design**:
- 顶部标签: `MCP · SKILL · AGENT`
- 中心是协议网络图：
  - 中心节点 `Pencil`
  - 四周节点 `MCP`, `Skill`, `Agent`, `Logs`
- 旁边一块对话日志 / Agent trace 面板，体现“不是拍脑袋夸”
- 右下角一句判断: `不是一个功能点强，是整套系统感很强`

**Animations**:
- 协议节点逐个点亮
- 对话日志采用 typewriter / 滚动入场
- `secondaryColor` 连线闪烁，形成系统感

---

### Scene 6: DailyUseScene — 真正让我留下来的，是主力感

**Duration**: ~16-18s

**Voiceover Direction**:
> 真正让我留下来的原因很简单，它已经变成我近一个月最常用的设计软件了。我拿它写了几个项目，平时的小设计也在用，还能直接和 agent 一起改图，速度非常快。最近它又更新了 PDF 导出，这种持续进化，说明它不是玩具。

**Visual Design**:
- 顶部标签: `MAIN TOOL`
- 三块证据卡：
  - `近 1 个月深度使用`
  - `几个项目 + 日常小设计`
  - `和 Agent 共改设计 · 速度极快`
- `PDF EXPORT` 作为新功能角标 / badge
- 一条时间线表示“真实使用，而不是一时上头”

**Animations**:
- 证据卡 `staggerDelay` 依次滑入
- PDF badge 单独高亮弹出
- 时间线缓慢推进，营造“长期使用感”

---

### Scene 7: CTAScene — AI 设计工作流已经换代

**Duration**: ~12-14s

**Voiceover Direction**:
> 如果你现在还把 AI 设计理解成开 Figma、开聊天窗口、再来回搬运，那这套工作流你最好重新看一遍。不是说旧工具没用，而是新的主力工作台已经出现了。先收藏。

**Visual Design**:
- 顶部标签: `SAVE THIS`
- 核心大字: `设计工作流，已经换代了`
- 副标题: `Pencil.dev 不是外挂，它像新的主工作台`
- 底部标签: `#PencilDev  #AIDesign  #AgentWorkflow`
- 收藏导向，而不是安装按钮导向

**Animations**:
- 核心文案 `fadeInUp + pulseGlow`
- 标签行逐个点亮
- 结尾停留 1-2 秒给观众“读完并收藏”的空间

---

## 6. Cover Design (Cover.tsx)

| 属性 | 值 |
|---|---|
| Still ID | `PencilDevCover` |
| 尺寸 | 1080 x 1440 (3:4) |

**Primary Cover Direction**:
- 顶部英文标签: `PENCIL.DEV`
- 核心大字: `Figma 我真不开了`
- 第二行副标题: `主力设计软件，已经换了`
- 视觉主体: 冷色 IDE 工作台 + Agent 面板 + 一块高亮设计稿
- 辅助信息条: `IDE 内设计 | Agent 共创 | PDF 导出`
- 背景: 青蓝光晕 + HUD 四角 + 微扫描线

**Backup Cover Titles**:
- `我的主力设计软件变了`
- `设计工作流，已经换代了`

---

## 7. File Structure

```text
src/compositions/PencilDev/
├── schema.ts
├── index.tsx
├── animations.ts
├── Cover.tsx
└── Scenes/
    ├── HookScene.tsx
    ├── PainScene.tsx
    ├── CoreScene.tsx
    ├── AgentScene.tsx
    ├── ProofScene.tsx
    ├── DailyUseScene.tsx
    └── CTAScene.tsx

scripts/
├── generate-voiceover-pencildev.ts
└── sync-subtitle-pencildev.ts

src/data/
└── pencildev-subtitles.json

public/audio/
├── pencildev-scene1.mp3 ~ pencildev-scene7.mp3
└── pencildev-scene1.vtt ~ pencildev-scene7.vtt
```

Registration notes:
- 在 `src/compositions/index.ts` 导出 `PencilDev`、`PencilDevSchema`、`PencilDevCover`
- 在 `src/Root.tsx` 注册 `Composition` 与 `Still`
- 如果要走服务端 HTTP 渲染 API，同步更新 `src/server/services/renderer.ts` 中的可用 composition 列表 / 注册逻辑

---

## 8. Delivery Pipeline

```bash
npm run generate:voiceover:pencildev    # 1. TTS 生成
npm run sync:subtitle:pencildev         # 2. 字幕同步
# 3. 更新 Root.tsx 中 durationInFrames / sceneDurations / precomputedSubtitles
npm run studio                          # 4. 预览
npm run render:pencildev                # 5. 渲染视频
npm run render:pencildev:cover          # 6. 渲染封面
# 7. 生成平台发布文案
```

Expected outputs:
- 视频: `out/PencilDev.mp4`
- 封面: `out/PencilDev-cover.png`

---

## 9. Source Material

### Official Product Signals
- `docs.pencil.dev/` 首页: Pencil 是“直接集成在开发环境里的矢量设计工具”，强调 design + code 在同一环境中完成。
- `AI Integration` 文档: Pencil 通过 MCP 与 AI 助手协作，可读写 `.pen` 文件。
- `Import & Export` 文档: 支持导出 PDF / PNG / JPEG / WEBP。
- `Pencil CLI` 文档 / 搜索结果: 存在面向 agent / server-side 的 CLI 与 `agent-config.json` 工作流。

### User Positioning Inputs
- “Agent Team 并行设计给人的感觉很科幻”
- “认真跑了几个测试项目，深入看了看大模型对话日志”
- “在整合 MCP / Skill / Agent 这几个概念的能力上，Pencil.dev 绝对是顶级模板”
- “已经深度用了快 1 个月，写了几个项目了，日常小设计也在用”
- “现在已经是我用来做设计的主力软件了”
- “我和 agent 可以一起改设计，速度极快”
- “Figma 和 PS / AI 很久都没打开过了”
- “最近更新可以导出 PDF”

### Core Claims To Preserve
1. `Pencil.dev` 已成为主力设计软件，而不只是新鲜玩具。
2. 它体现的是设计工作流换代，而不是单点功能升级。
3. `Agent Team` 的未来感要服务于“真实提效”，不能喧宾夺主。
4. `MCP / Skill / Agent` 的整合深度，是建立判断力和可信度的关键证据。
