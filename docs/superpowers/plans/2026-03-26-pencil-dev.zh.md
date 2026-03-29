# Pencil.dev 视频 — 实现计划（中文版）

> **面向代理执行者：** 必须使用子技能：`superpowers:subagent-driven-development`（推荐）或 `superpowers:executing-plans`，按任务逐项实现。步骤使用复选框（`- [ ]`）语法便于跟踪。

**目标：** 制作一支 7 场景竖屏短视频（`PencilDev`）及封面 Still，包含配音流水线、字幕、渲染脚本，以及面向新选题 Pencil.dev 的平台发布文案。

**架构：** 沿用仓库既有竖屏视频模式：一个 composition 目录内含 `schema.ts`、`index.tsx`、`animations.ts`、`Cover.tsx` 与 7 个场景组件；在 `src/compositions/index.ts` 与 `src/Root.tsx` 注册；通过独立 TTS 脚本生成音频；通过字幕同步脚本推导时长；动画优先复用 `src/shared/animations-vertical.ts`。

**技术栈：** Remotion、React、TypeScript、Zod、edge-tts、music-metadata

**设计规格：** `docs/superpowers/specs/2026-03-26-pencil-dev-design.md`

**测试说明：** 本仓库无单元测试运行器，请勿凭空新增。验证应使用 `npm run typecheck`、脚本输出、针对性 Studio 预览与渲染烟测。

**英文对照：** `docs/superpowers/plans/2026-03-26-pencil-dev.md`

---

## 文件结构

| 操作 | 路径 | 职责 |
|------|------|------|
| 新建 | `src/compositions/PencilDev/schema.ts` | 7 场景 composition 的 Zod schema 与类型化默认值 |
| 新建 | `src/compositions/PencilDev/animations.ts` | 再导出共享竖屏动画工具 |
| 新建 | `src/compositions/PencilDev/index.tsx` | 主 composition：序列、音频、字幕、进度条 |
| 新建 | `src/compositions/PencilDev/Cover.tsx` | 3:4 封面 Still |
| 新建 | `src/compositions/PencilDev/Scenes/HookScene.tsx` | 场景 1：旧工具退场 Hook |
| 新建 | `src/compositions/PencilDev/Scenes/PainScene.tsx` | 场景 2：旧工作流上下文切换 |
| 新建 | `src/compositions/PencilDev/Scenes/CoreScene.tsx` | 场景 3：IDE 内设计 + 代码 + AI |
| 新建 | `src/compositions/PencilDev/Scenes/AgentScene.tsx` | 场景 4：Agent Team 科幻感镜头 |
| 新建 | `src/compositions/PencilDev/Scenes/ProofScene.tsx` | 场景 5：MCP / Skill / Agent 佐证 |
| 新建 | `src/compositions/PencilDev/Scenes/DailyUseScene.tsx` | 场景 6：主力工具与 PDF 导出 |
| 新建 | `src/compositions/PencilDev/Scenes/CTAScene.tsx` | 场景 7：工作流换代 CTA |
| 修改 | `src/compositions/index.ts` | 导出 composition、schema、封面 |
| 修改 | `src/Root.tsx` | 注册 `Composition` 与 `Still`；接线默认 props、音频、字幕 |
| 修改 | `src/server/services/renderer.ts` | 若注册表为静态枚举，将 `PencilDev` / `PencilDevCover` 纳入 API 渲染；或改为基于 bundle 动态列举 |
| 修改 | `package.json` | 增加 `generate:voiceover:pencildev`、`sync:subtitle:pencildev`、`render:pencildev`、`render:pencildev:cover` |
| 新建 | `scripts/generate-voiceover-pencildev.ts` | 通过 edge-tts 生成 7 段场景音频 |
| 新建 | `scripts/sync-subtitle-pencildev.ts` | 按真实 mp3 时长同步并输出字幕 JSON |
| 新建 | `src/data/pencildev-subtitles.json` | 同步脚本生成的字幕数据 |
| 新建 | `public/audio/pencildev-scene*.mp3` / `.vtt` | 配音生成产物 |

---

## 任务 1：Schema 与动画导出

**涉及文件：**
- 新建：`src/compositions/PencilDev/schema.ts`
- 新建：`src/compositions/PencilDev/animations.ts`

- [ ] **步骤 1：编写 `schema.ts`**

对齐 `src/compositions/AutoResearch/schema.ts` 与 `src/compositions/WeChatClawBot/schema.ts` 的结构。

需包含：
- 共享 `SubtitleConfigSchema`
- 共享 `AudioConfigSchema`
- 全部 7 场景的内容型 props
- 规格中的色板 props
- `voiceoverScripts`
- `precomputedSubtitles`
- `sceneDurations`

按场景划分的 props 组：
- Hook：旧工具标签、主副 Hook 文案
- Pain：工作流步骤 / 切换痛点
- Core：设计 + 代码 + AI 各栏标签
- Agent：Agent 卡片与中心画布标签
- Proof：佐证节点、日志预览、整合判断句
- DailyUse：使用证据卡、PDF 导出角标
- CTA：金句、副标题、话题标签

- [ ] **步骤 2：编写 `animations.ts`**

仅从共享竖屏库再导出（勿在本地重复实现）：

```ts
export {
  fadeInUp,
  fadeIn,
  fadeOut,
  scaleIn,
  slideFromLeft,
  slideFromRight,
  glitchOffset,
  scanLineOpacity,
  typewriterLength,
  numberCountUp,
  pulseGlow,
  progressBar,
  staggerDelay,
  cardSlideIn,
  shimmer,
  pipelineNodeReveal,
  lineGrow,
  chatBubbleIn,
} from "../../shared/animations-vertical";
```

- [ ] **步骤 3：验证**

执行：`npm run typecheck`

预期：
- `PencilDev/schema.ts` 无类型错误
- 共享动画再导出无缺失
- **此阶段尚未**在 `Root.tsx` 注册 `PencilDev`

- [ ] **步骤 4：可选检查点提交**

仅当用户明确要求提交时：

```bash
git add src/compositions/PencilDev/schema.ts src/compositions/PencilDev/animations.ts
git commit -m "feat(pencildev): add schema and animation setup"
```

---

## 任务 2：场景批次 1 — Hook、Pain、Core

**涉及文件：**
- 新建：`src/compositions/PencilDev/Scenes/HookScene.tsx`
- 新建：`src/compositions/PencilDev/Scenes/PainScene.tsx`
- 新建：`src/compositions/PencilDev/Scenes/CoreScene.tsx`

- [ ] **步骤 1：实现 `HookScene.tsx`**

参考：
- `src/compositions/AutoResearch/Scenes/HookScene.tsx`
- `src/compositions/OpenClawAI/Scenes/HookScene.tsx`

必须包含：
- 第一帧即完整封面感
- 左侧旧工具幽灵卡 vs 右侧 Pencil 主界面高亮
- 主副标题来自 schema
- `SceneBackground` 冷蓝 / 青色主题
- 对比强、文字密度低

- [ ] **步骤 2：实现 `PainScene.tsx`**

必须包含：
- 顶标 `CONTEXT SWITCH`
- 3～4 个应用/窗口块轮换进出
- 明确的「切换成本 / 搬运成本」指示
- 底部金句：旧工作流显得笨拙

- [ ] **步骤 3：实现 `CoreScene.tsx`**

必须包含：
- 三栏 IDE 式布局
- 设计 / 代码 / AI 标签
- 中间一块设计画布预览
- 文案精简；本场景用画面说明产品差异

- [ ] **步骤 4：验证**

执行：`npm run typecheck`

预期：
- 场景 props 与 schema 一致
- 共享组件与 Remotion 导入完整

- [ ] **步骤 5：可选检查点提交**

```bash
git add src/compositions/PencilDev/Scenes/HookScene.tsx src/compositions/PencilDev/Scenes/PainScene.tsx src/compositions/PencilDev/Scenes/CoreScene.tsx
git commit -m "feat(pencildev): add hook pain core scenes"
```

---

## 任务 3：场景批次 2 — Agent、Proof、DailyUse、CTA

**涉及文件：**
- 新建：`src/compositions/PencilDev/Scenes/AgentScene.tsx`
- 新建：`src/compositions/PencilDev/Scenes/ProofScene.tsx`
- 新建：`src/compositions/PencilDev/Scenes/DailyUseScene.tsx`
- 新建：`src/compositions/PencilDev/Scenes/CTAScene.tsx`

- [ ] **步骤 1：实现 `AgentScene.tsx`**

必须包含：
- 中心设计画布
- 四周 4 个 Agent 节点/卡片
- 连线使用 `lineGrow`
- 科幻感足，但手机端仍可读

- [ ] **步骤 2：实现 `ProofScene.tsx`**

必须包含：
- `MCP / Skill / Agent / Logs` 类节点网络
- 一至两块日志/trace 面板，体现「翻过对话日志」
- 强调系统整合，而非单次自动化炫技

- [ ] **步骤 3：实现 `DailyUseScene.tsx`**

必须包含：
- 使用证据卡
- 「主力软件」结论
- PDF 导出角标
- 时间线或叠放项目卡，暗示长期使用

- [ ] **步骤 4：实现 `CTAScene.tsx`**

必须包含：
- 以「收藏」为导向的 CTA（非安装按钮导向）
- 主标题：工作流已换代
- 话题/标签行
- 结尾停留约 1～2 秒便于读完

- [ ] **步骤 5：验证**

执行：`npm run typecheck`

预期：
- **本批 4 个**场景文件与 `schema.ts` 类型一致（此时尚无 `index.tsx`，勿验收「7 场景均已 import」）
- 批内无重复符号或 props 冲突

- [ ] **步骤 6：可选检查点提交**

```bash
git add src/compositions/PencilDev/Scenes/AgentScene.tsx src/compositions/PencilDev/Scenes/ProofScene.tsx src/compositions/PencilDev/Scenes/DailyUseScene.tsx src/compositions/PencilDev/Scenes/CTAScene.tsx
git commit -m "feat(pencildev): add remaining scene components"
```

---

## 任务 4：主 Composition 集成

**涉及文件：**
- 新建：`src/compositions/PencilDev/index.tsx`

- [ ] **步骤 1：编写 `index.tsx`**

对齐 `src/compositions/AutoResearch/index.tsx`。

必须包含：
- `SCENE_COUNT = 7`（或由 `SCENES.length` 派生，避免双处手写）
- 导入任务 2～3 中实现的全部 7 个场景
- 由 `sceneDurations` 推导 `sceneStartFrames`
- 每场景一个 `Sequence`
- 口播 `Sequence` 起点偏移 `Math.round(fps * 0.3)`
- 字幕优先 `precomputedSubtitles`，否则回退 `voiceoverScripts`
- `KaraokeSubtitle` 固定 `bottom: 380`
- 右侧竖条场景进度
- 背景音乐首尾淡入淡出

- [ ] **步骤 2：验证**

执行：`npm run typecheck`

预期：
- `index.tsx` 能解析全部 7 个场景
- 无缺失 import / props 不匹配

- [ ] **步骤 3：可选检查点提交**

```bash
git add src/compositions/PencilDev/index.tsx
git commit -m "feat(pencildev): add main composition orchestration"
```

---

## 任务 5：封面 Still

**涉及文件：**
- 新建：`src/compositions/PencilDev/Cover.tsx`

- [ ] **步骤 1：实现 `Cover.tsx`**

必须包含：
- 画布由 Remotion `Still` 注册为 1080×1440（组件内用 `AbsoluteFill` 适配）
- 顶标 `PENCIL.DEV`
- 主标题 `Figma 我真不开了`
- 副标题 `主力设计软件，已经换了`
- IDE 工作台 + Agent 面板视觉
- 信息条 `IDE 内设计 | Agent 共创 | PDF 导出`

参考：
- `src/compositions/GSDIntro/Cover.tsx`
- `src/compositions/WeChatClawBot/Cover.tsx`

- [ ] **步骤 2：验证**

执行：`npm run typecheck`

预期：
- `Cover.tsx` 可独立通过编译
- schema props 无缺失

- [ ] **步骤 3：可选检查点提交**

```bash
git add src/compositions/PencilDev/Cover.tsx
git commit -m "feat(pencildev): add cover still"
```

---

## 任务 6：导出、Root 注册与渲染 API

**涉及文件：**
- 修改：`src/compositions/index.ts`
- 修改：`src/Root.tsx`
- 修改：`src/server/services/renderer.ts`
- 修改：`package.json`

- [ ] **步骤 1：更新 `src/compositions/index.ts`**

增加导出：

```ts
export { PencilDev } from "./PencilDev";
export { PencilDevCover } from "./PencilDev/Cover";
export { PencilDevSchema, type PencilDevProps } from "./PencilDev/schema";
```

- [ ] **步骤 2：更新 `src/Root.tsx`**

增加：
- `PencilDev` 的 `Composition` 注册
- `PencilDevCover` 的 `Still` 注册（1080×1440）
- 默认 props 含占位 `sceneDurations`
- `pencildev` 音频文件名
- 与冷色主题一致的字幕配置

默认 props 风格对齐 `GSDIntro`、`WeChatClawBot`、`AutoResearch`。  
此时 `index.tsx` 与 `Cover.tsx` 均已存在，注册后应能通过 typecheck。

- [ ] **步骤 3：更新 `src/server/services/renderer.ts`**

确认 composition ID 是静态枚举还是动态获取。

若为静态：追加 `PencilDev`，必要时追加 `PencilDevCover`。  
若已改为基于 bundle 的 `getCompositions`，则保证新 ID 自然出现，勿再维护第二份易漂移列表。

- [ ] **步骤 4：更新 `package.json` 脚本**

增加：

```json
"generate:voiceover:pencildev": "npx tsx scripts/generate-voiceover-pencildev.ts",
"sync:subtitle:pencildev": "npx tsx scripts/sync-subtitle-pencildev.ts",
"render:pencildev": "remotion render src/index.ts PencilDev --output=out/PencilDev.mp4",
"render:pencildev:cover": "remotion still src/index.ts PencilDevCover --output=out/PencilDev-cover.png"
```

- [ ] **步骤 5：验证**

执行：`npm run typecheck`

预期：
- `PencilDev` 在 import 链中合法
- `Root.tsx` / `renderer.ts` 无类型错误

- [ ] **步骤 6：可选检查点提交**

```bash
git add src/compositions/index.ts src/Root.tsx src/server/services/renderer.ts package.json
git commit -m "feat(pencildev): register composition and render scripts"
```

---

## 任务 7：配音脚本与音频生成

**涉及文件：**
- 新建：`scripts/generate-voiceover-pencildev.ts`
- 生成：`public/audio/pencildev-scene1.mp3` … `public/audio/pencildev-scene7.mp3`
- 生成：`public/audio/pencildev-scene1.vtt` … `public/audio/pencildev-scene7.vtt`

- [ ] **步骤 1：编写 `generate-voiceover-pencildev.ts`**

对齐：
- `scripts/generate-voiceover-autoresearch.ts`
- `scripts/generate-voiceover-wechatclawbot.ts`

要求：
- 语音 `zh-CN-YunyangNeural`
- 语速 `+3%`
- 7 段口播与已批准规格一致
- 用 `...` 控制停顿，TTS 调用前将 `...` 规范为中文逗号等（与仓库惯例一致）

- [ ] **步骤 2：执行生成**

执行：`npm run generate:voiceover:pencildev`

预期：
- `public/audio/` 下 7 个 mp3、7 个 vtt
- 无 `edge-tts` 或路径错误

- [ ] **步骤 3：产物自检**

确认：
- 7 个文件齐全
- 文件名与 `Root.tsx` 中路径完全一致

- [ ] **步骤 4：可选检查点提交**

```bash
git add scripts/generate-voiceover-pencildev.ts public/audio/pencildev-scene*.mp3 public/audio/pencildev-scene*.vtt
git commit -m "feat(pencildev): generate voiceover audio"
```

---

## 任务 8：字幕同步与最终时长回写

**涉及文件：**
- 新建：`scripts/sync-subtitle-pencildev.ts`
- 新建：`src/data/pencildev-subtitles.json`
- 修改：`src/Root.tsx`

- [ ] **步骤 1：编写 `sync-subtitle-pencildev.ts`**

对齐：
- `scripts/sync-subtitle-autoresearch.ts`
- `scripts/sync-subtitle-wechatclawbot.ts`

要求：
- 从生成的 mp3 读取真实时长
- 将口播文本切分为帧级字幕数据
- 输出 `src/data/pencildev-subtitles.json`
- 控制台打印 `durationInFrames` 与 `sceneDurations`
- 若使用 VTT，注意 cue 重叠时做单调修正，避免出现 `endFrame < startFrame`

- [ ] **步骤 2：执行同步**

执行：`npm run sync:subtitle:pencildev`

预期：
- 生成 JSON
- 控制台输出真实 `durationInFrames`
- 控制台输出长度为 7 的 `sceneDurations`

- [ ] **步骤 3：用真实时长更新 `src/Root.tsx`**

将占位值替换为：
- `import` 的 `pencildevSubtitles`（或项目内命名）
- 实际 `sceneDurations`
- 实际 `durationInFrames`

- [ ] **步骤 4：验证**

执行：`npm run typecheck`

预期：
- JSON import 与 schema 无冲突
- `PencilDev` 可按真实时长渲染

- [ ] **步骤 5：可选检查点提交**

```bash
git add scripts/sync-subtitle-pencildev.ts src/data/pencildev-subtitles.json src/Root.tsx
git commit -m "feat(pencildev): sync subtitles and update timing"
```

---

## 任务 9：预览、打磨与渲染烟测

**涉及文件：**
- 按预览结果按需修改

- [ ] **步骤 1：在 Studio 中预览**

执行：`npm run studio`

检查：
- 侧栏可见该 composition
- 第一帧为强 Hook / 封面感
- 各场景在手机安全区内可读
- 字幕不压底部系统 UI

- [ ] **步骤 2：修复布局或节奏问题**

常见关注点：
- Hook / CTA 文字溢出
- Agent 节点挤满中心画布
- Proof 过于抽象或字太多
- DailyUse 证据卡与字幕打架

- [ ] **步骤 3：修复后再次 typecheck**

执行：`npm run typecheck`

- [ ] **步骤 4：渲染烟测**

```bash
npm run render:pencildev
npm run render:pencildev:cover
```

预期产物：
- `out/PencilDev.mp4`
- `out/PencilDev-cover.png`

- [ ] **步骤 5：可选检查点提交**

```bash
git add -A
git commit -m "fix(pencildev): polish scenes and render outputs"
```

---

## 任务 10：平台文案与仓库说明

**涉及文件：**
- 修改：`AGENTS.md`
- 平台文案：在最终回复中交付（除非用户要求写入单独文件）

- [ ] **步骤 1：生成微信视频号文案**

交付：
- 短标题 1 条（≤16 字）
- 备选标题 2～3 条
- 多行正文描述
- 话题标签 6～8 个

方向：
- 突出「主力设计软件变了」
- 避免纯功能罗列
- 适合「先收藏」的语气

- [ ] **步骤 2：生成抖音/小红书适配版**

交付：
- 更口语的标题
- 正文 3～5 行、更短
- 话题 4～6 个

- [ ] **步骤 3：更新 `AGENTS.md`**

在相应章节补充：
- Composition 目录表中 `PencilDev` 条目
- 渲染命令（如 `render:pencildev`、`render:pencildev:cover`）
- 本次新增脚本名

- [ ] **步骤 4：最终验证摘要**

汇总：
- 变更文件列表
- 已渲染产物路径
- 残余风险（若有）

- [ ] **步骤 5：可选最终提交**

```bash
git add -A
git commit -m "feat(pencildev): complete video assets and launch copy"
```
