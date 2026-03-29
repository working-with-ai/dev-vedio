# Remotion 制作视频号短视频最佳实践调研

**Date:** 2026-03-29  
**Scope:** 面向微信视频号这类移动端信息流的技术类竖屏短视频，整理 Remotion 实现与跨平台创作经验的交集，并用来反推当前仓库的 brief / registry / 模板设计。

## 外部资料要点

### 1. YouTube：先抓住滚动中的用户，再谈内容完整性

- YouTube 官方强调：标题、描述和缩略图需要准确反映内容；如果是 Shorts，前 `1-2` 秒必须抓住正在滑动的观众。
- YouTube Shorts 已支持更长时长，说明“可以更长”不等于“应该更长”；更长叙事要靠更强的结构与节奏支撑。

**Implication for this repo**
- brief 不能只写主题和事实，还要明确首屏 promise、前三秒 proof、封面文案。
- 时长不能只看 TTS 总长，还要看信息流耐受度与镜头刷新节奏。

### 2. YouTube：字幕不是附属物，而是移动端主信息层

- YouTube 官方字幕说明明确把 captions 作为增强可达性和提升观看体验的工具。
- 字幕样式应可调：字号、字体、颜色、背景、outline、shadow 都要能控制。

**Implication for this repo**
- subtitle config 需要成为模板 contract 的一部分，而不是每条视频临时调。
- 对视频号这种高噪声、经常静音浏览的环境，字幕必须承担“无声也能看懂”的职责。

### 3. X：前几秒要有动作、文字覆盖和明确识别

- X 官方视频最佳实践里提到：前几秒要有明显运动；要加字幕或文字覆盖；前 `3` 秒应清楚表达识别信息。
- 同一主题不该只押一个 creative，应该保留多个创意变体测试。

**Implication for this repo**
- 每条技术视频至少要有“动作”而不是纯静态文字卡。
- 封面、首屏、标题应该来自同一个 brief，但保留变体位，方便后续做更强 opening。

### 4. WeChat Channels：封面与描述都是微文案资产

- Weixin/WeChat 官方账号公开说明：视频号发布后可在 `3` 个月内修改封面和描述；描述上限 `20` 个字符；每条视频只允许改一次。

**Implication for this repo**
- 封面和描述不能当附属输出，要视为可快速迭代但次数有限的关键资产。
- 视频号向的 brief / package 需要优先支持超短标题、超短描述和封面主承诺。

### 5. Remotion：时长、props、字幕、转场都应该数据驱动

- Remotion 官方 `calculateMetadata()` 文档明确支持在渲染前基于数据动态决定 `durationInFrames`、尺寸、fps 和 props。
- Remotion 官方 captions 文档把字幕能力拆为导入、转录、显示、导出。
- Remotion 官方 transitions 文档要求 `remotion` 与各 `@remotion/*` 包版本保持一致，并建议去掉版本号前的 `^`，避免版本冲突。

**Implication for this repo**
- brief / registry / media manifest 应成为 metadata 的单一真相来源，而不是靠 `Root.tsx` 手填。
- 当前渲染链路里已经出现依赖版本提示，后续 phase 需要把版本一致性纳入基础合同与 QA。

## 对当前 AI Harness Engineer 视频的诊断

### 1. 首屏 promise 有，但视觉动作不够强

- 当前视频已经有“Prompt 不够了”这个结论。
- 但实现上 7 个场景复用了同一类 SceneCard，首屏更像“漂亮静态卡片”，不是“滚动中能强行拦停”的开场。

### 2. 7 场景信息是对的，但 pattern interrupt 太弱

- 每段画面的结构过于一致，导致观看者在中段容易感知为同一种信息卡反复切换。
- 这对技术内容特别吃亏，因为本来认知门槛就高，更需要视觉 reset 来续命。

### 3. 封面整体干净，但主承诺偏抽象

- 当前封面是“Prompt 之后 / AI 新工程角色”。
- 对已经理解语境的技术用户没问题，但对信息流路人来说，第一眼还不够“有结果、有冲突”。

### 4. 标题和描述偏概念，不够像视频号 feed 文案

- `Prompt之后是Harness` 更像圈内概念表达，不够像路人能秒懂的 feed 标题。
- 视频号描述位数很短，越要把结论写成结果导向，而不是概念导向。

### 5. 时长已可接受，但更适合拆出 feed-first 精简版

- 当前成片约 `111.9s`。
- 对完整技术解释是可用的，但对视频号首页分发，建议再有一版 `60-75s` 的 feed-first cut，把最强结论和证明更前置。

## 反推到 Phase 1 的设计要求

Phase 1 不负责真正改视觉模板，但必须先把后续要用到的内容 contract 固化下来，否则后面每条视频都会继续靠人工经验硬调。

### Brief 层必须支持的字段

- `hookLine`: 首屏一句话承诺
- `hookProof`: 前 `3-5` 秒兑现这个承诺的具体证据
- `coreContrast`: 类似“Demo 能跑 / 生产跑不动”的冲突对
- `coverTitle` / `coverSubtitle`: 封面主承诺与补充语
- `shortTitle`: 视频号用的超短标题
- `shortDescription`: 视频号描述位文案
- `visualModules`: 这条视频需要的视觉模块清单，例如对比卡、架构图、报错面板、数字 scoreboard
- `targetDurationSec`: 目标时长区间，而不是只依赖最终 TTS 结果
- `sourceLinks`: 驱动标题、描述、封面和旁白的同源链接

### Registry 层必须支持的字段

- composition id / still id / output path
- 模板类型、比例、safe area、subtitle mode
- 是否支持 hook slot / proof slot / cover still
- 标题和描述的字符预算
- 平台 profile，例如“视频号统一版”

### 以后规划时应默认遵守的内容 heuristics

- `1-2` 秒内必须看到核心 promise
- `3-5` 秒内必须看到 promise 的第一层 proof
- 技术类信息流视频需要更强的视觉 reset，建议每 `3-5` 秒出现一次明显结构变化
- 字幕以“帮助扫读”为优先，不应机械复述全部旁白
- 封面优先写“结果/冲突/红利”，少写抽象概念

## 建议优先优化当前视频的 5 个点

1. **把首屏改成冲突证明，不只是标题卡。**  
   例如直接做成 `Prompt Engineer → Harness Engineer` 的角色切换，或者 `Demo ✓ / Production ✗` 的对撞。

2. **至少引入 3 种场景骨架，而不是 7 次重复同一张卡。**  
   建议组合：对比面板、系统结构图、风险 checklist、收益 scoreboard。

3. **封面从“概念型标题”改成“结果型标题”。**  
   比如：`AI最贵能力变了`、`会搭系统的人更贵`、`Prompt之后干什么`。

4. **做一个 feed-first 精简版。**  
   把当前版本保留为完整版，同时导出一个 `60-75s` 的分发版。

5. **让标题/封面/首屏共享同一个主承诺。**  
   不要标题讲“Prompt 之后”，封面讲“新工程角色”，正文再讲“可靠代理”；三者应是一句话的不同压缩版本。

## Sources

- Remotion `calculateMetadata()` docs: [https://www.remotion.dev/docs/calculate-metadata](https://www.remotion.dev/docs/calculate-metadata)
- Remotion captions docs: [https://www.remotion.dev/docs/captions](https://www.remotion.dev/docs/captions)
- Remotion transitions docs: [https://www.remotion.dev/docs/transitions](https://www.remotion.dev/docs/transitions)
- YouTube Blog, creator basics: [https://blog.youtube/creator-and-artist-stories/youtube-creator-how-to-start/](https://blog.youtube/creator-and-artist-stories/youtube-creator-how-to-start/)
- YouTube Help, captions: [https://support.google.com/youtube/answer/13818789?hl=en](https://support.google.com/youtube/answer/13818789?hl=en)
- YouTube Blog, Shorts up to 3 minutes: [https://blog.youtube/news-and-events/tall-updates-coming-to-shorts/](https://blog.youtube/news-and-events/tall-updates-coming-to-shorts/)
- X Business video best practices: [https://business.x.com/de/advertising/ads-best-practices](https://business.x.com/de/advertising/ads-best-practices)
- Weixin/WeChat Channels update on LinkedIn: [https://www.linkedin.com/posts/teamwechat_weixin-wechat-channels-activity-7338460332169850881-AHJM](https://www.linkedin.com/posts/teamwechat_weixin-wechat-channels-activity-7338460332169850881-AHJM)
