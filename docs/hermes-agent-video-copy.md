# Hermes Agent 视频制作文案

> 项目: Hermes Agent — 会自我进化的 AI 智能体
> 来源: Nous Research 开源项目
> GitHub: https://github.com/NousResearch/hermes-agent
> 官网: https://hermes-agent.nousresearch.com
> 推特: https://x.com/NousResearch/status/2026758996107898954

## 1. 视频概要

Hermes Agent 是 Nous Research 于 2026 年 2 月底开源的 AI 智能体框架，上线不到两个月 GitHub 星标突破 35000。社区认为它是 OpenClaw（龙虾）上线以来第一个真正意义上的竞争对手。两者都是自托管开源智能体，都支持多渠道聊天平台，都走 MIT 协议——但设计哲学完全不同。

**一句话定位**: 龙虾是网关，Hermes 是引擎。OpenClaw 解决"怎么把消息送到 agent"，Hermes 解决"agent 怎么变得越来越强"。

## 2. 核心结论

不是"又一个 Agent 框架"，而是第一个把"自我进化"做成核心架构的开源智能体。当所有人都在争论用哪个模型的时候，Hermes 在解决一个更底层的问题：agent 用得越久，应该越聪明。

## 3. 目标受众

- 已经在用 OpenClaw/Claude Code 等 Agent 工具的开发者
- 对 AI 智能体自我进化能力感兴趣的技术爱好者
- 想搭建个人 AI 助理系统的极客
- 关注开源 AI 生态竞争格局的从业者

## 4. 口径边界

- **可以明确讲**: Hermes Agent 的闭环学习、自动写技能、五层安全防御、$5 VPS 可跑
- **不能绝对化讲**: "Hermes 比 OpenClaw 好"——两者定位不同，各有适用场景
- **要保留校正**: 35k Stars 增长快但生态成熟度不及 OpenClaw 的 34.6 万；自动生成技能的质量仍取决于底层模型能力

## 5. 关键数据点

| 指标 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| GitHub Stars | ~35,000 (不到 2 个月) | ~346,000 |
| 开源协议 | MIT | MIT |
| 发布时间 | 2026 年 2 月 | 2025 年初 |
| 内置工具 | 47 个 | ~30+ |
| 技能生态 | 643+ (含自动生成) | ClawHub 社区市场 |
| 支持平台 | 14+ (Telegram/Discord/Slack/WhatsApp/Signal/Matrix/飞书/钉钉等) | 10+ |
| 终端后端 | 6 种 (Local/Docker/SSH/Daytona/Singularity/Modal) | 2 种 (Local/Docker) |
| 记忆方案 | SQLite + FTS5 全文检索 + MEMORY.md | 文件即记忆 + 语义检索 |
| 安全模型 | 五层纵深防御 | 信任模型 + 配置审计 |
| 最低运行成本 | $5/月 VPS | 类似 |

## 6. 推特发布信息

> 推特链接: https://x.com/NousResearch/status/2026758996107898954
> 发布方: @NousResearch (Nous Research 官方账号)

**推特核心内容要点** (基于公开信息整合):
- Hermes Agent 官宣为 "The agent that grows with you"
- 强调闭环学习循环 (closed learning loop) 是核心差异化
- 演示了 agent 自动创建技能文档的过程
- 展示了跨平台 (CLI + Telegram) 的统一体验

**推特配图参考** (建议用于视频素材):
- Hermes Agent CLI 终端界面截图
- 技能自动生成的 Markdown 文件示例
- 多平台网关架构示意图
- Nous Research 品牌 Logo (紫色/深色调)

> ⚠️ 注意: 推特原始图片需手动从浏览器提取保存到 `public/images/hermes-agent/` 目录

## 7. 七段场景结构

### 场景 1: Hook — "两个月，35000 Stars，龙虾遇到对手了"

**时长预估**: ~18 秒

**配音文案**:
> 龙虾终于遇到真正的对手了...Nous Research 两个月前开源了一个 AI 智能体框架...叫 Hermes Agent...上线不到两个月...GitHub 星标已经逼近三万五...社区管它叫龙虾上线以来...第一个真正意义上的竞争对手

**画面方向**:
- 顶部: 英文标签 `HERMES AGENT` (letterSpacing: 16)
- 中间: GitHub 仓库卡片 (模拟)
  - 仓库名: `NousResearch/hermes-agent`
  - Tagline: "The agent that grows with you"
  - Stars: 35,000+ (numberCountUp 动画)
  - Language: Python | License: MIT
- 底部: VS 对比条 "Hermes Agent ⚡ vs 🦞 OpenClaw"
- 背景: 深紫色 radial-gradient + 扫描线

---

### 场景 2: 定位 — "龙虾是网关，Hermes 是引擎"

**时长预估**: ~20 秒

**配音文案**:
> 两者都是自托管的开源智能体...都能接入 Telegram Discord Slack...都走 MIT 协议...但设计哲学完全不同...OpenClaw 的核心是一个 Gateway...像一个调度中心...把各种聊天应用连接到 AI agent...Hermes 的核心则是 agent 自身的执行循环...它不围绕怎么送消息...而围绕怎么让 agent 越来越强

**画面方向**:
- TitleBlock: label="PHILOSOPHY", title="设计哲学对决"
- 双栏对比布局:
  - 左栏 `🦞 OpenClaw`:
    - 核心: Gateway (网关守护进程)
    - 解决: 怎么把消息送到 agent
    - 定位: 多渠道个人助理操作系统
  - 右栏 `⚡ Hermes Agent`:
    - 核心: Closed Learning Loop (闭环学习)
    - 解决: agent 怎么变得越来越强
    - 定位: 自我进化的智能体引擎
- 中间: VS 分隔线 (动画发光)

---

### 场景 3: 核心亮点 — "会自己写技能的 Agent"

**时长预估**: ~22 秒

**配音文案**:
> 这是 Hermes 最有意思的地方...当它完成一个复杂任务后...会把整个过程沉淀成一份结构化的技能文档...存成 Markdown 文件...下次遇到类似任务...直接加载这份技能...不用从头解决...更关键的是...这些技能在使用过程中会自我迭代...有用户反馈...agent 两小时内自动生成了三份技能后...重复任务速度提升了百分之四十

**画面方向**:
- TitleBlock: label="SKILL SYSTEM", title="自动写技能"
- 动画流程图 (从上到下):
  1. `📋 复杂任务` (5+ 工具调用) → 执行完成
  2. `📝 自动沉淀` → SKILL.md 文件生成动画 (typewriter)
  3. `🔄 自我迭代` → 技能文档更新标记
  4. `⚡ 40% 提速` → 进度条对比 (高亮金色)
- 右侧: 模拟 SKILL.md 文件内容 (代码窗口风格)
- OpenClaw 对比小卡片: "依赖人工编写 + ClawHub 社区贡献"

---

### 场景 4: 深入 1 — "记忆体系的差异"

**时长预估**: ~20 秒

**配音文案**:
> 两者都有跨会话记忆...但实现方式不同...Hermes 用 SQLite 配合全文检索...把所有历史对话存下来...记忆分两层...一层是常驻关键信息...写在 MEMORY.md 里...每次对话都带上...另一层是全量历史检索...容量无限...按需调用...OpenClaw 走的是文件即记忆的路线...简单说...Hermes 是搜索引擎式的大脑...OpenClaw 是笔记本

**画面方向**:
- TitleBlock: label="MEMORY", title="记忆体系对比"
- 双层记忆架构图 (Hermes):
  - 上层: `MEMORY.md` — 常驻关键信息 (每次对话携带)
  - 下层: `SQLite + FTS5` — 全量历史 (按需检索)
  - 连线: Honcho 用户建模
- OpenClaw 对比:
  - 单层: Markdown 文件 + 语义检索
  - 标注: "压缩前静默写入防丢失"
- 底部金句: `🧠 搜索引擎 vs 📓 笔记本`

---

### 场景 5: 深入 2 — "五层纵深安全防御"

**时长预估**: ~20 秒

**配音文案**:
> 安全思路也完全不一样...Hermes 搞了一套五层纵深防御...用户授权...危险命令审批...容器隔离...凭据过滤...上下文注入扫描...默认对高风险操作要人工审批...超时未批准就自动拒绝...OpenClaw 更强调信任模型和配置审计...但今年二月被曝出多个高危漏洞...十三万五千个实例暴露在公网上...技能市场也发现了三百多个恶意技能

**画面方向**:
- TitleBlock: label="SECURITY", title="安全体系对决"
- Hermes 五层防御塔 (从底到顶, stagger 入场):
  1. 🔐 用户授权 (绿色)
  2. ⚠️ 危险命令审批 (黄色)
  3. 📦 容器隔离 (青色)
  4. 🔑 凭据过滤 (紫色)
  5. 🛡️ 上下文注入扫描 (金色)
- OpenClaw 安全事件红色警告卡片:
  - `135,000 实例暴露公网`
  - `300+ 恶意技能`
- 对比: Hermes "防御在前" vs OpenClaw "审计在后"

---

### 场景 6: 深入 3 — "$5 VPS 就能跑"

**时长预估**: ~18 秒

**配音文案**:
> Hermes 跑在五美元一个月的 VPS 上就够用...也支持 Docker SSH 远程 Modal 等 serverless 方案...安装只需要一行 curl 命令...它还内建了一个兼容 OpenAI API 的服务端...可以直接作为后端接入 Open WebUI 等第三方界面...支持超过两百个模型...随时用 hermes model 一键切换...不需要改一行代码

**画面方向**:
- TitleBlock: label="DEPLOYMENT", title="轻量部署"
- 安装命令终端窗口 (代码高亮):
  ```
  curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
  ```
- 部署方式卡片 (横向 3 列):
  - `💰 $5/月 VPS` — 最低门槛
  - `🐳 Docker` — 容器隔离
  - `☁️ Modal` — Serverless
- 兼容性标签:
  - `200+ 模型` | `OpenAI API 兼容` | `Open WebUI`
- 底部: 一键切换动画 `hermes model` → 模型列表展开

---

### 场景 7: CTA — "选哪个？看你要什么"

**时长预估**: ~22 秒

**配音文案**:
> 如果你日常用的 Agent 已经顺手...没必要换...如果你想要一个多渠道助理平台...接入各种聊天工具...用社区现成的技能市场...OpenClaw 的生态更成熟...三十四万星标不是白来的...但如果你更关心 agent 的长期进化能力...想让它用得越久越聪明...或者你在做 AI 研究...需要生成训练轨迹跑强化学习...Hermes 的架构更对口...链接放在评论区...感兴趣的可以去试试

**画面方向**:
- TitleBlock: label="VERDICT", title="怎么选？"
- 两个选择卡片 (左右布局):
  - 左: `🦞 选 OpenClaw` — 多渠道平台 · 成熟生态 · 社区技能市场 · 346k Stars
  - 右: `⚡ 选 Hermes` — 长期进化 · 自动写技能 · 研究友好 · RL 训练轨迹
- 底部 CTA 金句: "真正的竞争不是谁星标多，而是谁让 Agent 真正变聪明"
- 传送门: GitHub + 官网链接
- Hashtag 展示

## 8. 视觉风格建议

### 色彩方案 — 深紫科技风

```
backgroundColor: "#08060f"     // 深紫黑背景
accentColor:     "#7c3aed"     // Nous 紫色 (主色)
highlightColor:  "#06d6a0"     // 青绿 (高亮/Hermes)
dangerColor:     "#ef4444"     // 红色 (OpenClaw 问题/警告)
secondaryColor:  "#f59e0b"     // 琥珀金 (数据/数字)
mutedTextColor:  "#8b8b9e"     // 灰紫 (次要文字)
textColor:       "#e8e8f0"     // 亮灰 (正文)
cardBg:          "rgba(124, 58, 237, 0.08)" // 紫色面板背景
openclawColor:   "#ff6347"     // 龙虾红 (OpenClaw 标识)
```

### 设计语言

- **面板**: 暗色半透明 + 1px 紫色边框，圆角 12px
- **数字**: monospace + 金色，fontWeight: 900
- **标题**: 紫色→青色渐变 (`linear-gradient(135deg, #7c3aed, #06d6a0)`)
- **HUD 边框**: 四角紫色 HUD 装饰
- **对比色**: Hermes 用青绿，OpenClaw 用龙虾红
- **背景层**: radial-gradient 紫色光晕 + 扫描线

## 9. 发布文案

### 微信视频号

**短标题** (16 字以内):
龙虾遇对手了 Hermes 35k

**备选标题**:
- 会自己写技能的Agent来了
- 两个月35000星Hermes火了
- Agent自我进化时代开始了

**视频描述**:

龙虾终于遇到真正的对手了
不到两个月，35000 Stars

→ 龙虾是网关，Hermes 是引擎
→ 完成复杂任务后自动写技能文档
→ 技能在使用中自我迭代，速度提升 40%
→ SQLite + 全文检索，搜索引擎式记忆
→ 五层纵深安全防御 vs 龙虾今年被曝漏洞

最关键的差异：
OpenClaw 解决"怎么送消息"
Hermes 解决"agent 怎么越来越强"

$5 VPS 就能跑 · 一行命令安装
200+ 模型随时切换 · 不改一行代码

真正的竞争不是谁星标多
而是谁让 Agent 真正变聪明

传送门：
GitHub → https://github.com/NousResearch/hermes-agent
官网 → https://hermes-agent.nousresearch.com
快速开始 → https://hermes-agent.nousresearch.com/docs/getting-started/quickstart

#HermesAgent #NousResearch #OpenClaw #AIAgent #开源 #自我进化 #AI编程 #智能体

### 抖音 / 小红书适配

**标题**:
龙虾被干了？两个月 35000 Stars 的 Agent 到底强在哪

**描述**:

Hermes Agent 上线不到两个月就 35k Stars
不是又一个聊天机器人
而是第一个会自己写技能、自己进化的 Agent

完成任务后自动写文档
下次直接用，速度快 40%

$5 一个月就能跑
一行命令安装

#HermesAgent #AIAgent #开源 #NousResearch #自我进化 #智能体

## 10. 核心信息提炼

- **定位**: 不是 "又一个 Agent"，而是第一个把自我进化做成核心架构的开源智能体
- **最强钩子**: 两个月 35000 Stars + 龙虾的第一个真正竞争对手
- **最强差异**: 会自己写技能 → 自我迭代 → 用户反馈 40% 提速
- **最强比喻**: 龙虾是网关 (调度中心)，Hermes 是引擎 (进化循环)
- **最强金句**: 真正的竞争不是谁星标多，而是谁让 Agent 真正变聪明
- **避坑**: 不要直接说 "Hermes 比 OpenClaw 好"，两者定位不同

## 11. 参考资料

| 来源 | 链接 | 用途 |
|------|------|------|
| GitHub 仓库 | https://github.com/NousResearch/hermes-agent | 星标数据、项目信息 |
| 官方文档 | https://hermes-agent.nousresearch.com/docs/ | 功能细节、架构信息 |
| 官网主页 | https://nousresearch.com/hermes-agent/ | 品牌信息、核心卖点 |
| 推特发布 | https://x.com/NousResearch/status/2026758996107898954 | 官宣内容、配图素材 |
| Quickstart | https://hermes-agent.nousresearch.com/docs/getting-started/quickstart | 安装部署信息 |
| Skills 文档 | https://hermes-agent.nousresearch.com/docs/user-guide/features/skills | 技能系统细节 |
| TheNewStack 对比 | https://thenewstack.io/persistent-ai-agents-compared/ | 第三方对比分析 |
| TuringPost 对比 | https://www.turingpost.com/p/hermes | 差异化分析 |

## 12. 实现状态

- [x] Composition ID: `HermesAgent` (9:16 竖屏 1080×1920)
- [x] 7 场景组件已创建 (Hook → Position → Skill → Memory → Security → Deploy → CTA)
- [x] 封面组件 `HermesAgentCover` (1080×1440)
- [x] 配音脚本: `npm run generate:voiceover:hermesagent`
- [x] 字幕同步: `npm run sync:subtitle:hermesagent`
- [x] 渲染命令: `npm run render:hermesagent`
- [x] 封面渲染: `npm run render:hermesagent:cover`
- [x] TypeScript 类型检查通过
- [ ] 从推特手动提取配图到 `public/images/hermes-agent/`
- [ ] 生成配音后运行字幕同步，回填 `sceneDurations` 和 `precomputedSubtitles` 到 Root.tsx
