# Feature Research

**Domain:** AI 技术短视频创作 / 自媒体视频生产系统（brownfield Remotion 流水线）
**Researched:** 2026-03-22
**Confidence:** MEDIUM

## Feature Landscape

研究边界：这里讨论的是“现有 `Remotion + TypeScript + Express` 视频流水线的下一里程碑该补哪些功能”，不是重做一个完整的剪映/CapCut 替代品。结论优先服务三个目标：提升前三秒吸引力、提升模板复用度、补齐发布素材完整度。

### Table Stakes (Users Expect These)

缺了这些，创作者会觉得系统虽然能渲染，但离“可持续高频出片”还差一截。

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| 参数化模板层（theme tokens + scene slots + manifest 输入） | 当前创作者工具默认都有模板、样式复用、品牌一致性；如果新增一条视频还要复制 composition，系统就不可持续 | HIGH | 基于现有 7 场景 composition 做抽象，沉淀 `template schema`、主题变量、场景插槽契约；不要做拖拽式编辑器 |
| 配音 / 字幕 / 音乐的一键校准与出片前 QA | Auto captions、TTS、字幕对齐已经是基线；技术内容最怕口播、字幕、时长错位 | MEDIUM | 现有 TTS 与 subtitle sync 已有基础；下一步补 preflight 校验、缺失音频检测、字幕时长异常检测、成片前统一检查 |
| 平台安全区与封面导出预设 | 当前工具普遍支持 resize、thumbnail/cover 导出；没有这层，发布前还要手动补图和裁切 | MEDIUM | 先聚焦 `9:16` 主视频 + `3:4` 视频号/小红书封面；统一 safe-zone token，延续 Remotion `Still` 能力 |
| 统一发布素材包（成片 + 封面 + 16 字内标题 + 描述 + hashtags + 链接） | 创作者不想视频做完后再切出去整理标题、描述、封面文案；竞品已经把“内容生成”和“发布包装”放到同一工作流 | MEDIUM | 从 `voiceoverScripts`、`defaultProps`、关键数字、source link 自动生成；本轮只产出统一版，不做平台定制版 |
| 首屏钩子槽位与首 3 秒可视检查 | 短视频的成败先看 opening；当前竞品已有 hook overlay、auto highlight、auto edit 思路 | MEDIUM | 先做可控的 hook line、hero metric、首帧完整封面状态、首屏检查规则，不急着做复杂 AI 评分 |

### Differentiators (Competitive Advantage)

这些不是“没有就不能用”，但它们最能把本项目从通用 AI 视频工具里拉出来。

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| AI 技术内容专用爆点抽取器 | 自动从 Star 数、代码行数、速度提升、Agent 数、Benchmark 结果里提炼最适合做标题/封面/钩子的核心亮点，比通用文案生成更懂技术内容 | HIGH | 输入不是自由文本，而是结构化事实字段；输出 2-3 组 hook/title/cover copy 候选 |
| 技术内容视觉模块库 | GitHub 卡片、终端面板、Benchmark 对比、架构流、代码 diff、排行榜等模块能显著提升“这就是 AI 技术号”的辨识度 | HIGH | 做成参数化组件，跨多个模板复用；优先替代截图和一次性 scene 实现 |
| 7 场景技术叙事编排器 | 把现有 Hook → 痛点 → 核心亮点 → 深入 1/2/3 → CTA 的经验，沉淀成稳定骨架，减少每条视频重写结构的成本 | HIGH | 在现有 composition 之上做 manifest 驱动，不重写渲染引擎 |
| 多变体封面 / 标题 / Hook 批量预览包 | 不需要做整套平台化 A/B 实验，也能让创作者快速在 2-3 个高质量 opening 版本中选一个 | MEDIUM | 渲染 contact sheet、封面 still、首屏静帧和文案候选；保留人工最终决策 |

### Anti-Features (Commonly Requested, Often Problematic)

这些能力“听起来很爽”，但对本轮目标的杠杆不高，且会明显拉大范围。

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| 自动抓取 / 批量解析 X、GitHub、YouTube 热点 | 看起来能把选题也自动化 | 会把范围扩展到采集、去重、质量过滤、合规；而且低质量输入会直接毁掉成片质量 | 继续采用人工筛选 + 结构化输入清单，把自动化放在内容包装而不是内容发现 |
| 全平台自动发布 / 定时排程 | 表面上更“端到端” | 接入复杂、平台差异大、失败重试和鉴权成本高；对当前“提升停留和出片效率”目标杠杆不如内容本身 | 先输出统一发布素材包和人工发布清单 |
| 完整拖拽式时间线编辑器 / WYSIWYG 搭建器 | 团队会觉得更“像视频产品” | 这会把项目从代码驱动流水线拉向 NLE，工程量远超本轮，也与 brownfield 架构冲突 | 做轻量 manifest/schema 编辑与 Studio 预览，不做时间线产品 |
| 数字人 / AI 分身能力扩张 | 容易被误认为是“更高级 AI 视频” | 对 AI 技术解说类内容的 ROI 不稳定，还会引入资产、口型、审核、风格一致性问题 | 优先把首屏钩子、技术视觉模块、封面包装做好 |

## Feature Dependencies

```text
[结构化内容清单（topic / metrics / claims / link）]
    └──requires──> [参数化模板层]
                         ├──requires──> [平台安全区与封面导出预设]
                         ├──requires──> [统一发布素材包]
                         └──enables──> [7 场景技术叙事编排器]

[AI 技术爆点抽取器]
    ├──feeds──> [多变体封面 / 标题 / Hook 预览包]
    └──feeds──> [技术内容视觉模块库]

[配音 / 字幕 / 音乐 QA]
    └──guards──> [一键出片 + 发布素材包]

[全平台自动发布] ──conflicts──> [统一版发布素材优先]
[拖拽式时间线编辑器] ──conflicts──> [brownfield 代码驱动抽象]
```

### Dependency Notes

- **统一发布素材包 requires 结构化内容清单：** 没有明确的项目名、关键数字、来源链接、结论句，标题、描述、封面文案就只能靠自由发挥，无法稳定复用。
- **7 场景技术叙事编排器 requires 参数化模板层：** 如果场景仍是硬编码复制，叙事编排器只会变成另一层重复代码。
- **多变体封面 / 标题 / Hook 预览包 requires AI 技术爆点抽取器：** 变体要围绕“哪个数据最有冲击力”展开，不能只做随机改写。
- **技术内容视觉模块库 enhances 参数化模板层：** 统一的技术视觉模块会直接提高模板复用率和整体质感。
- **配音 / 字幕 / 音乐 QA guards 一键出片：** 没有 preflight，模板越多，渲染失败和字幕错位只会越常见。
- **全平台自动发布 conflicts 统一版发布素材优先：** 一旦进入发布链路，就会被迫解决平台登录、字段映射、失败重试，直接打乱本轮节奏。
- **拖拽式时间线编辑器 conflicts brownfield 代码驱动抽象：** 本轮应该提高“结构化输入 -> 可复用出片”的效率，而不是改写交互范式。

## MVP Definition

### Launch With (v1)

Minimum viable milestone for the current brownfield system.

- [ ] 参数化模板层 —— 先解决“每加一条视频都要复制一套 composition”的根问题
- [ ] 首屏钩子槽位 + 平台安全区 + 封面导出 —— 直接对应前三秒吸引力和封面可用性
- [ ] 统一发布素材包 —— 让一次渲染同时产出视频、封面、标题、描述、hashtags
- [ ] 配音 / 字幕 / 渲染 preflight QA —— 让已有流水线在模板化后仍稳定可用

### Add After Validation (v1.x)

- [ ] 技术内容视觉模块库 —— 当模板层稳定后，再把技术感和辨识度拉高
- [ ] 多变体封面 / 标题 / Hook 预览包 —— 当基础发布包稳定后，再引入更高密度的选择空间
- [ ] AI 技术爆点抽取器 —— 当结构化输入字段固定后，再做自动亮点提炼

### Future Consideration (v2+)

- [ ] 平台定制化版本（视频号 / 抖音 / 小红书分别生成标题与封面）—— 本轮先统一，后续再细分
- [ ] 自动发布 / 定时排程 —— 只有当内容质量和包装链路稳定后才有意义
- [ ] 自动热点抓取 / 批量内容发现 —— 需要单独一轮研究与质量控制
- [ ] 数字人 / AI 分身能力增强 —— 不是当前 AI 技术解说内容的最高杠杆项

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| 参数化模板层 | HIGH | HIGH | P1 |
| 统一发布素材包 | HIGH | MEDIUM | P1 |
| 首屏钩子槽位 + 安全区 + 封面导出 | HIGH | MEDIUM | P1 |
| 配音 / 字幕 / 渲染 preflight QA | HIGH | MEDIUM | P1 |
| 技术内容视觉模块库 | HIGH | HIGH | P2 |
| AI 技术爆点抽取器 | HIGH | HIGH | P2 |
| 多变体封面 / 标题 / Hook 预览包 | MEDIUM | MEDIUM | P2 |
| 全平台自动发布 | LOW | HIGH | P3 |
| 自动热点抓取 | LOW | HIGH | P3 |
| 拖拽式时间线编辑器 | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for the next milestone
- P2: Should have after the foundation is stable
- P3: Deliberately defer

## Competitor Feature Analysis

| Feature | Competitor A | Competitor B | Our Approach |
|---------|--------------|--------------|--------------|
| 模板 / 品牌复用 | Canva、VEED 强调 brand kit / reusable templates | CapCut、Descript 强调模板化出片 | 继续走代码驱动，但抽出 theme token、scene slot、manifest，不做重型编辑器 |
| 发布素材打包 | Descript 已把 titles / descriptions / posts 变成工作流一部分 | CapCut、Canva 提供 thumbnail / cover 生成 | 从同一内容源一次性生成成片、封面、标题、描述，减少“出片后再补文案” |
| 首 3 秒优化 | OpusClip 强调 virality / hook / social clip packaging | Captions 强调 auto edit、zoom、B-roll、节奏感 | 不做泛娱乐特效堆砌，专注 AI 技术内容的数字亮点、结论句、视觉冲击 |
| 尺寸与封面适配 | VEED、Canva 提供 resize / repurpose | CapCut 提供 cover / thumbnail 场景 | 用 `Still` + safe-zone preset 做平台安全导出，而不是重做多端编辑界面 |

## Sources

- 项目上下文：`/Users/qilin.guo/AiProjects/dev-vedio/.planning/PROJECT.md`
- 当前仓库能力基线：`/Users/qilin.guo/AiProjects/dev-vedio/package.json`
- 当前仓库能力基线：`/Users/qilin.guo/AiProjects/dev-vedio/src/Root.tsx`
- CapCut AI Caption Generator: https://www.capcut.com/tools/ai-caption-generator
- CapCut Thumbnail Maker: https://www.capcut.com/create/youtube-thumbnail/
- Descript Overdub / AI voice: https://www.descript.com/overdub
- Descript YouTube Clip Maker / titles-descriptions-post packaging: https://www.descript.com/tools/youtube-clip-maker
- VEED Brand Kit: https://www.veed.io/tools/brand-kit
- VEED Subtitle Generator: https://www.veed.io/tools/auto-subtitle-generator
- Opus ClipAnything / viral clip packaging: https://www.opus.pro/clipanything
- Canva Brand Kit: https://www.canva.com/brand/brand-kit/
- Captions AI Avatars: https://www.captions.ai/features/generate-ai-avatars

---
*Feature research for: AI 技术短视频创作 / 自媒体视频生产系统*
*Researched: 2026-03-22*
