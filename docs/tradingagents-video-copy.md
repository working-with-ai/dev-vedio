# TradingAgents 视频制作文案 (Deep Research v2)

> 项目: TradingAgents — 多智能体 LLM 金融交易框架
> 来源: Tauric Research (UCLA & MIT 研究者: Yijia Xiao, Edward Sun, Di Luo, Wei Wang)
> GitHub: https://github.com/TauricResearch/TradingAgents
> 论文: https://arxiv.org/abs/2412.20138 (v7, 2025-06-03 修订)
> 官网: https://tauric.ai/
> 推特原文: https://x.com/BTCqzy1/status/2042123312264827150
> 调研方法: deep-research skill (standard mode, 并行 3 subagent + 8 次 WebSearch)
> 图片资源: `public/images/trading-agents/` (已从仓库下载 10 张官方图片)

## 1. 视频概要

TradingAgents 是 Tauric Research 于 2024 年 12 月发布论文（arXiv:2412.20138）、2025 年初全量开源的多智能体 LLM 金融交易框架。截至 2026 年 4 月，GitHub 星标突破 49,000，中文增强版 TradingAgents-CN 也获得 20,000+ Stars。

项目模拟真实交易公司的组织结构，将多个 LLM 智能体分配到基本面分析师、情绪分析师、新闻分析师、技术分析师、多头/空头研究员、交易员、风控经理、投资组合经理等角色，通过协作和多空辩论机制来辅助交易决策。

**一句话定位**: 不是让一个 AI 告诉你买还是卖，而是让一整个 AI 团队先吵一架、再给你结论。

## 2. 核心结论

不是"又一个量化交易工具"，而是第一个用多角色协作 + 多空辩论机制来模拟真实交易公司决策流程的开源框架。单一模型给的是一个观点，TradingAgents 给的是一场经过正反辩论、风控审核后的团队决策。

**但深度调研也揭示了真实的另一面**：论文回测仅 3 个月、社区复现结果差异极大、学术研究对"同一 LLM 扮演不同角色是否真能产生认知多样性"持质疑态度。这不是万能药，是一个有意思的思路。

## 3. 原始文案深度分析

### 原文出处
推特 @BTCqzy1 的 TradingAgents 推介帖，核心框架：痛点 → 方案 → 三特性 → 个人体验 → CTA。

### 原文优点
- **痛点切入精准**：用"技术指标看多、新闻面偏空、财报模棱两可"画出散户的真实困境
- **三特性结构清晰**：多维信息对齐 / 多空辩论 / 全流程风控，每个对应一个 emoji 标记
- **个人体验增加可信度**："我自己研究和测试了几个例子"
- **留有余地**：DYOR 不过度推荐
- **Stars 数据醒目**：48.7k（实际已到 49k+）

### 深度调研发现的可优化方向

**1. 数据不够硬核，也不够诚实**
- 原文只提 48.7k Stars，缺少论文回测的具体数字
- 论文数据其实很亮眼但有大前提：
  - AAPL 累积回报 26.62%（同期 Buy & Hold 是 -5.23%）
  - GOOGL 累积回报 24.36%
  - AMZN 累积回报 23.21%
  - 但：**只测了 3 个月（2024.01-2024.03），只测了 3 只股票**
  - Sharpe Ratio 高达 8.21（论文自己承认短周期导致 SR 偏高）
- ⚠️ **社区复现争议**：有用户在同样条件下复现 AAPL 得到约 -25% 的结果，与论文 +26.62% 天壤之别

**2. "多空辩论"的学术争议未被提及**
- arXiv:2405.03862 研究发现：同一 LLM 扮演不同 persona 会出现**从众效应**和**人设不稳定**
- arXiv:2601.10102 更直接指出：**persona 可能损害策略理性**，去掉 persona 后均衡达成率反而上升
- 这不代表辩论机制无效，但"让 AI 自己吵架就能减少偏见"这个结论需要打问号

**3. 实际落地门槛高于文案暗示**
- 每次预测约 11 次 LLM 调用 + 20+ 工具调用 → API 成本不低
- 多轮辩论链路延迟大 → 不适合日内/高频交易
- 框架定位是"研究/教育" → 不是开箱即用的交易系统
- 高度依赖模型版本、温度参数、数据源质量

**4. 竞品定位不清晰**
- 原文没有和 FinGPT（金融 LLM 组件）、FinRL（RL 量化框架）、CrewAI 等做区分
- 三者其实不是竞品：FinGPT = 模型层, FinRL = 策略优化层, TradingAgents = 组织仿真层
- 视频可以用这个层级关系来定位

### 视频文案增强策略

1. **保留痛点切入**，但用更具冲击力的三冲突画面
2. **补充论文硬数据** — AAPL/GOOGL/AMZN 的具体数字，但同时诚实交代 3 个月回测的局限
3. **突出"辩论机制"的双面性** — 既是最大卖点，也有学术质疑，这样更有深度
4. **加入"冷水"场景** — 对已有框架的诚实审视，提升视频的可信度和信息密度
5. **加入中文版 A 股支持** — 对中文受众更有吸引力
6. **CTA 更克制** — "值得研究，但别直接上实盘"

## 4. 目标受众

- 对量化交易感兴趣但被信息过载困扰的散户投资者
- 使用 AI 辅助交易决策的技术派投资者
- 关注多智能体系统（Multi-Agent Systems）的 AI 开发者
- 想了解 LLM 在金融领域落地应用的从业者
- 对开源量化框架感兴趣的量化研究者

## 5. 口径边界

- **可以明确讲**: 多角色协作架构、多空辩论机制、论文回测数据（附上下文）、开源免费、多模型支持、中文版支持 A 股
- **必须同时讲**: 回测仅 3 个月、社区复现差异大、学术界对多 persona 有效性的质疑、框架定位是研究工具
- **不能暗示**: "用了就能赚钱" — 论文明确声明仅供研究
- **要保留校正**: LLM 幻觉、回测 vs 实盘的鸿沟、API 成本、延迟问题

## 6. 关键数据点

| 指标 | 数据 | 来源 | 可信度 |
|------|------|------|--------|
| GitHub Stars | ~49,000+ | GitHub 页面 | ✅ 可核实 |
| 中文版 Stars | ~20,800+ | GitHub 页面 | ✅ 可核实 |
| 论文 | arXiv:2412.20138 v7 | arXiv | ✅ 学术来源 |
| 作者 | Yijia Xiao, Edward Sun, Di Luo, Wei Wang | arXiv | ✅ 可核实 |
| AAPL 累积回报 | 26.62% (同期 B&H: -5.23%) | 论文 Table 1 | ⚠️ 仅 3 个月 |
| GOOGL 累积回报 | 24.36% (同期 B&H: 7.78%) | 论文 Table 1 | ⚠️ 仅 3 个月 |
| AMZN 累积回报 | 23.21% (同期 B&H: 17.10%) | 论文 Table 1 | ⚠️ 仅 3 个月 |
| AAPL 年化回报 | 30.5% | 论文 Table 1 | ⚠️ 短周期外推 |
| AAPL Sharpe Ratio | 8.21 | 论文 Table 1 | ⚠️ 论文自认偏高 |
| 回测时间段 | 2024.01.01-2024.03.29 (约 3 个月) | 论文 | ✅ |
| 测试标的 | AAPL, GOOGL, AMZN (仅 3 只) | 论文 | ✅ |
| 每次预测 LLM 调用 | ~11 次 + 20+ 工具调用 | 论文 | ✅ |
| 支持模型 | GPT-5.4 / Gemini 3.1 / Claude 4.6 / Grok 4.x / Ollama | GitHub | ✅ |
| 底层框架 | LangGraph | 工程文档 | ✅ |
| 开源协议 | Apache 2.0 | GitHub | ✅ |
| 中文版市场 | A 股 / 港股 / 美股 (Tushare/AkShare) | TradingAgents-CN | ✅ |
| 社区复现 AAPL | 约 -25% (vs 论文 +26.62%) | GitHub Issue 讨论 | ⚠️ 个案 |
| 辩论轮数 | 默认 ~3 轮, 可配 1-5 | 工程文档/config | ✅ |

## 7. 七段场景结构

### 场景 1: Hook — "技术说买、财报说卖、推特说崩"

**时长预估**: ~18 秒

**配音文案**:
> 技术指标说强烈买入...财报数据说谨慎观望...推特上一片喊崩...做交易...最难的不是选股...是面对互相矛盾的信息...不知道该听谁的...GitHub 上有个项目...四万九千颗星...它的思路不是让一个 AI 给你答案...而是让一整个 AI 团队...先吵一架...再给你结论

**画面方向**:
- 顶部: `TauricResearch.png` Logo (缩小, 左上角) + 英文标签 `TRADINGAGENTS` (letterSpacing: 16, fontSize: 68, fontWeight: 900)
- 中间: 三块信息冲突卡片 (stagger 入场, cardSlideIn):
  - 📈 `技术指标: 强烈买入` (绿色边框, successColor)
  - 📊 `财报数据: 谨慎观望` (黄色边框, highlightColor)
  - 🔻 `社交媒体: 市场要崩` (红色边框, dangerColor)
- 底部: GitHub Stars 计数器 `★ 49,000+` (numberCountUp, goldColor, monospace)
- 金句: "不是一个 AI 的答案，是一个 AI 团队的决策" (fadeInUp)
- 背景: 深蓝黑 + 金色 radial-gradient 光晕 + 扫描线
- **图片**: `images/trading-agents/TauricResearch.png` 作为品牌水印

---

### 场景 2: 定位 — "模拟一个投行交易部门"

**时长预估**: ~24 秒

**配音文案**:
> TradingAgents 来自一篇 UCLA 和 MIT 研究者的论文...核心思路很直接...现实中的投行交易部门...不是一个人拍板的...而是分析师出报告...研究员正反辩论...交易员拟方案...风控审核...组合经理最终拍板...它把这套流程完整搬到了 AI 上...四个分析师看基本面、情绪面、新闻面、技术面...两个研究员一个看多一个看空...再加交易员、风控和组合经理...九个角色组成完整的决策链

**画面方向**:
- TitleBlock: label="ARCHITECTURE", title="完整决策链条", highlightColor=金色
- **主图**: `images/trading-agents/schema.png` — 官方架构全景图
  - 展示方式: 先以 0.15 opacity 作为背景铺满，配音说到"完整搬到 AI 上"时，图片 opacity 升至 0.9，scale 从 0.8 → 1.0 (spring 动画)
  - 图片自带完整流程：数据源 → Bullish/Bearish → Trader → Risk Team → Manager → Execution
- 图片上方叠加关键标注 (中文, fadeInUp):
  - 指向左侧: "4 类数据源"
  - 指向中间: "多空辩论"
  - 指向右侧: "风控 → 审批 → 执行"
- **辅图**: 配音说"九个角色"时，切入 `images/trading-agents/cli_news.png` (CLI 工作进度界面)
  - 展示方式: 带圆角 12px 边框，缩放聚焦到 Progress 区域 (Team/Agent/Status 表格)
- 底部标签: `arXiv:2412.20138 · Apache 2.0 · LangGraph`

---

### 场景 3: 核心亮点 — "多空辩论：让 AI 先吵起来"

**时长预估**: ~24 秒

**配音文案**:
> 这是整个框架最有意思的设计...拿到四份分析报告后...不是直接给结论...而是让两个研究员分别站多头和空头的立场...进行多轮辩论...看多的会找一切利好证据...看空的会死磕每一个风险...就像投行内部的投研会...观点越对立...盲点暴露得越彻底...论文数据显示...苹果三个月回测...多智能体协作的累积回报是百分之二十六...同期买入持有是负百分之五...最大回撤只有百分之零点九

**画面方向**:
- TitleBlock: label="BULL VS BEAR", title="多空辩论机制"
- **主图**: `images/trading-agents/researcher.png` — 官方多空辩论对比图
  - 展示方式: 配音说到"两个研究员分别站多头和空头"时，图片从底部 slideUp 入场
  - 图片内容: 左 Bullish "Apple Investment Outlook" ↔ 右 Bearish "Apple Investment Risks"，中间 Debate 箭头
  - 图片放在场景中上部，带 2px 蓝色发光边框
- **辅图**: 配音说"四份分析报告"时，先展示 `images/trading-agents/analyst.png`
  - 展示方式: 4 个分析师卡片 (Market/Social/News/Fundamentals) 横排展示，含真实 AAPL 分析输出
  - 持续约 3 秒后 fadeOut → 切入 researcher.png
- 图片下方叠加数据条 (progressBar 动画):
  - `AAPL 累积回报: +26.62%` (金色大字, monospace)
  - `vs Buy & Hold: -5.23%` (红色)
  - `最大回撤: 0.91%` (绿色)

---

### 场景 4: 深入 1 — "全流程风控，不是摆设"

**时长预估**: ~20 秒

**配音文案**:
> 辩论完不是直接下单...交易员先综合所有信息拟定方案...然后交给风控经理审核...市场波动率、流动性、持仓集中度...逐项过清单...不达标就打回...最后由投资组合经理做最终审批...批准了才能执行...这套流程...和真实投行的交易台几乎一样...你可以同时配置激进型、中性型和保守型三种风控策略...让它们也辩论...再综合给出审批意见

**画面方向**:
- TitleBlock: label="RISK CONTROL", title="全流程风控"
- **上半部 — 交易员决策**: `images/trading-agents/trader.png`
  - 展示方式: 配音说"交易员先综合所有信息"时 fadeIn
  - 图片内容: "Apple Inc. Trading Decision" → "BUY Apple Shares ✅" + Reasoning
  - 持续约 4 秒后过渡到下半部
- **下半部 — 三层风控**: `images/trading-agents/risk.png`
  - 展示方式: 配音说"风控经理审核"时，从右侧 slideFromRight 入场
  - 图片内容: Risky/Neutral/Safe 三种策略 → Report → Manager → "Buy Recommendation"
  - 图片自带三种风控角色的完美可视化
- 图片之间: 连线动画 (trader → risk，lineGrow)
- 底部: 标注 "激进 · 中性 · 保守 三种风控策略并行审核"

---

### 场景 5: 深入 2 — "论文数据亮眼，但得看清前提"

**时长预估**: ~24 秒

**配音文案**:
> 说数据...论文在苹果、谷歌和亚马逊三只股票上做了回测...三个月内...苹果累积回报百分之二十六...谷歌百分之二十四...亚马逊百分之二十三...都远超买入持有和传统技术策略...但有几个前提你必须知道...第一...只测了三个月...第二...只测了三只股票...第三...Sharpe 高达八...论文自己都承认短周期导致偏高...而且社区有人复现...同样条件下苹果跑出了负百分之二十五...所以...数据参考可以...但别当圣经

**画面方向**:
- TitleBlock: label="HONEST DATA", title="数据的两面"
- 上半部: 回测数据面板 (金色/绿色为主):
  - 三列卡片 (cardSlideIn, stagger):
    - AAPL: `+26.62%` (金色大字) vs B&H `-5.23%`
    - GOOGL: `+24.36%` vs B&H `+7.78%`
    - AMZN: `+23.21%` vs B&H `+17.10%`
  - 副标签: "2024.01 - 2024.03 · Sharpe 5.60~8.21"
- 下半部: ⚠️ "前提条件" 警告面板 (红色/黄色边框, fadeInUp):
  - ⚠️ 仅 3 个月回测，不足以证明长期有效性
  - ⚠️ 仅测试 3 只美股大盘股
  - ⚠️ 社区复现差异大（有人跑出 -25%）
  - ⚠️ 论文承认：SR 在短周期下会偏高
- 视觉对比: 上半部绿色/金色 vs 下半部红色/黄色警告

---

### 场景 6: 深入 3 — "开源生态 + 中文版支持 A 股"

**时长预估**: ~22 秒

**配音文案**:
> 好消息是...框架完全开源...Apache 二点零协议...支持 GPT Claude Gemini Grok...也能用 Ollama 跑本地模型...Docker 一键部署...还有一个中文增强版 TradingAgents CN...两万颗星...直接支持 A 股和港股...接了 Tushare 和 AkShare 的数据源...已经生成了一百五十多份 A 股分析报告...Web 界面可以直接看结果...不需要写代码...另外 Tauric 团队还出了 Trading R1...用强化学习训练的金融推理模型...算是这套框架的下一步进化方向

**画面方向**:
- TitleBlock: label="ECOSYSTEM", title="开源生态"
- **上部**: `images/trading-agents/cli_init.png` — CLI 欢迎界面截图
  - 展示方式: 配音说"Docker 一键部署"时展示，带绿色终端边框，scaleIn 动画
  - 图片内容: TradingAgents ASCII 艺术字 + "Workflow Steps: I. Analyst Team → II. Research Team → III. Trader → IV. Risk Management → V. Portfolio Management"
  - 持续约 5 秒
- **中部**: 双项目卡片 (左右布局):
  - 左: `TradingAgents ★ 49,000+` (蓝色边框)
    - Apache 2.0 · LangGraph · Docker
    - GPT / Claude / Gemini / Grok / Ollama
  - 右: `TradingAgents-CN ★ 20,800+` (红色/金色边框)
    - A 股 · 港股 · 美股
    - Tushare · AkShare · DeepSeek · Qwen
    - 158+ 分析报告
- **辅图**: 配音说到"不需要写代码"时，可切入 `images/trading-agents/cli_technical.png`
  - 展示方式: 缩放聚焦到技术分析报告区域 (MACD/RSI/Bollinger Bands)
- 下部: Trading-R1 进化路线卡片:
  - `TradingAgents (规则框架)` → `Trading-R1 (RL 推理模型)`
  - "100k 样本 · 18 个月 · 14 只股票 · SFT + RL"

---

### 场景 7: CTA — "AI 不能替你赚钱，但能替你想清楚"

**时长预估**: ~22 秒

**配音文案**:
> 最后说句实话...这个框架不能保证赚钱...论文也明确写了仅供研究...回测三个月的数据也不够拿来当信仰...但它解决的问题是真实的...就是面对一堆互相矛盾的信息...如何做出更有逻辑的判断...如果你也觉得一个人盯盘加一个 AI 模型...越来越不够用了...这套多角色协作加对抗辩论的思路...值得花时间研究一下...A 股用户可以直接看中文版...链接放评论区...DYOR

**画面方向**:
- TitleBlock: label="VERDICT", title="值得研究吗？"
- 上部: 两列对比 (绿色 vs 红色):
  - ✅ 值得研究:
    - 多维信息对齐，不再被矛盾数据搞晕
    - 多空辩论暴露单一模型的盲点
    - 完整风控流程，不是拍脑袋下单
    - 论文背书 + 全代码开源 + 中文版支持 A 股
  - ⚠️ 保持清醒:
    - 回测仅 3 个月，3 只股票
    - 社区复现结果差异极大
    - API 成本和延迟不适合高频
    - 同一 LLM 多角色 ≠ 真正的认知多样性
- **辅图**: 配音说"决策过程更完整"时，展示 `images/trading-agents/cli_transaction.png`
  - 展示方式: 缩放聚焦到 "Portfolio Management Decision" 区域
  - 图片内容: 完整决策流程的最终输出 — Risky/Safe/Neutral 三方论证 + "Sell SPY exposure by ~25-30%"
  - 这张图完美展示了多角色协作的最终产物
- 底部: CTA 金句 (大字, 渐变色):
  - "AI 不能替你赚钱，但能替你想清楚"
- 警告条: ⚠️ 仅供研究，不构成投资建议 · DYOR
- 传送门: GitHub 链接
- Hashtag: #TradingAgents #AI交易 #多智能体 #量化 #美股

## 7.5 图片资源清单与场景映射

### 已下载图片 (`public/images/trading-agents/`)

| 文件名 | 内容描述 | 建议用于场景 | 使用方式 |
|--------|---------|-------------|---------|
| `TauricResearch.png` | Tauric Research 绿色 Logo（点阵风格 + 大写字母） | 场景 1 (Hook) / 封面 | 作为品牌标识，放在角落或标题旁 |
| `schema.png` | **核心架构全景图**：左侧 4 数据源 (Yahoo/X/Reddit/Bloomberg/Reuters) → 中间 Bullish↔Bearish 辩论 → Trader → Risk Team (Aggressive/Neutral/Conservative) → Manager → Execution | 场景 2 (定位) | **关键图片**，展示完整决策链条。可作为背景图叠加半透明暗色层，上方覆盖文字说明 |
| `analyst.png` | 4 个分析师卡片：Market(技术指标) / Social Media(情绪) / News(宏观) / Fundamentals(财报)，含真实 AAPL 分析输出 | 场景 3 (辩论) 或独立展示 | 展示四维分析的真实输出效果 |
| `researcher.png` | **多空辩论对比图**：Bullish "Apple Investment Outlook" ↔ Bearish "Apple Investment Risks"，中间 Debate 箭头 | 场景 3 (辩论) | **关键图片**，完美匹配"多空辩论"场景，展示真实的看多/看空报告 |
| `trader.png` | 交易员决策卡片：Goal + Key Points Summary → Decision "BUY Apple Shares" ✅ + Reasoning + Recommendation | 场景 4 (风控) | 展示交易员综合判断后的输出格式 |
| `risk.png` | 三层风控审批：Risky(激进) / Neutral(中性) / Safe(保守) → Report → Manager → "Buy Recommendation" | 场景 4 (风控) | **关键图片**，展示三种风控策略并行审核的真实界面 |
| `cli_init.png` | CLI 欢迎界面：TradingAgents ASCII 艺术字 + Workflow Steps + Ticker 输入 (绿色终端风格) | 场景 6 (生态) | 展示开箱即用的 CLI 体验 |
| `cli_news.png` | **新闻分析进度界面**：Agent 团队进度表 (Analyst/Research/Trading/Risk/Portfolio) + 实时新闻分析报告输出 | 场景 2 (定位) 或场景 3 | 展示多智能体并行工作的真实界面 |
| `cli_technical.png` | **技术分析报告**：MACD/RSI/Bollinger Bands/ATR/VWMA 详细分析，含具体数值和买卖建议 | 场景 3 (辩论) | 展示技术面分析师的详细输出 |
| `cli_transaction.png` | **最终交易决策界面**：所有团队 completed + Portfolio Management Decision + "Sell SPY exposure by ~25-30%" + 多视角论证 | 场景 4 (风控) 或场景 7 (CTA) | **关键图片**，展示完整决策流程的最终输出——包含 Bull/Bear/Neutral 三方观点 |

### 图片在视频中的技术实现建议

**方式 A: 作为 `<Img>` 组件直接展示**
```tsx
import { Img } from "remotion";
<Img src={staticFile("images/trading-agents/schema.png")} style={{ width: "80%", borderRadius: 12, opacity: schemaOpacity }} />
```

**方式 B: 作为背景叠加**
```tsx
<div style={{
  backgroundImage: `url(${staticFile("images/trading-agents/schema.png")})`,
  backgroundSize: "cover",
  opacity: 0.15,
  filter: "blur(2px)",
  position: "absolute", inset: 0
}} />
```

**方式 C: 缩放聚焦动画 (推荐用于 CLI 截图)**
```tsx
const scale = interpolate(frame, [startFrame, startFrame + 30], [1.5, 1], { extrapolateRight: "clamp" });
const translateY = interpolate(frame, [startFrame, startFrame + 30], [-100, 0], { extrapolateRight: "clamp" });
<Img src={staticFile("images/trading-agents/cli_transaction.png")}
  style={{ transform: `scale(${scale}) translateY(${translateY}px)`, borderRadius: 12 }} />
```

### 每个场景的推荐图片组合

| 场景 | 主图 | 辅图 | 图片展示时机 |
|------|------|------|------------|
| 1 Hook | `TauricResearch.png` (Logo) | - | frame 0 品牌露出，numberCountUp 时显示 |
| 2 定位 | `schema.png` (架构全景) | `cli_news.png` (工作中) | 配音说"完整决策链条"时展示 schema，说"九个角色"时切 cli_news |
| 3 辩论 | `researcher.png` (多空对比) | `analyst.png` (四维分析) | 配音说"正反辩论"时展示 researcher，说"四份分析报告"时展示 analyst |
| 4 风控 | `risk.png` (三层风控) | `trader.png` (交易决策) | 配音说"风控经理审核"时展示 risk，说"交易员综合"时展示 trader |
| 5 数据 | - (纯数据面板) | - | 场景以纯数据可视化为主，不用仓库图片 |
| 6 生态 | `cli_init.png` (CLI 入口) | `cli_technical.png` (技术报告) | 配音说"Docker 一键部署"时展示 cli_init |
| 7 CTA | `cli_transaction.png` (最终决策) | `schema.png` (架构回顾) | 配音说"决策过程更完整"时展示 cli_transaction |

## 8. 视觉风格建议

### 色彩方案 — 深色金融科技风

```
backgroundColor: "#060a12"     // 深蓝黑背景 (类 Bloomberg Terminal)
accentColor:     "#2563eb"     // 科技蓝 (主色)
highlightColor:  "#f59e0b"     // 琥珀金 (高亮/数字/Stars)
successColor:    "#10b981"     // 看多绿 (利好/上涨)
dangerColor:     "#ef4444"     // 看空红 (利空/警告/下跌)
secondaryColor:  "#8b5cf6"     // 紫色 (次要强调)
goldColor:       "#ffd700"     // 金色 (核心数据)
mutedTextColor:  "#64748b"     // 灰蓝 (次要文字)
textColor:       "#e2e8f0"     // 亮灰 (正文)
cardBg:          "rgba(37, 99, 235, 0.08)" // 蓝色面板背景
```

### 设计语言

- **面板**: 暗色半透明 + 1px 蓝色边框，圆角 12px，类 Bloomberg 终端风格
- **数字**: monospace + 金色，fontWeight: 900
- **标题**: 蓝色→金色渐变 (`linear-gradient(135deg, #2563eb, #f59e0b)`)
- **HUD 边框**: 四角蓝色 HUD 装饰, inset: 80
- **多空对比色**: 看多绿 (#10b981) vs 看空红 (#ef4444)
- **警告面板**: 红色/黄色边框 + ⚠️ 图标, 与正面数据形成视觉对比
- **背景层**: radial-gradient 蓝色光晕 + 金融数据流扫描线
- **数据面板**: 模拟交易终端风格, 深色底 + 亮色数据

### 场景视觉风格分配

| 场景 | 主视觉 | 情绪 |
|------|--------|------|
| Hook | 三色冲突卡片 + Stars 计数器 | 冲突感、好奇心 |
| 定位 | 组织架构流程图 | 专业感、结构化 |
| 辩论 | 左右对抗 + VS 火花 | 对抗感、戏剧性 |
| 风控 | 垂直管线 + Checklist | 严谨感、安全感 |
| 数据 | 绿色数据 + 红色警告 | 诚实感、深度 |
| 生态 | 双卡片 + 标签云 | 丰富感、生态 |
| CTA | 双列对比 + 金句 | 克制感、理性 |

## 9. 发布文案

### 微信视频号

**短标题** (16 字以内):
49k Stars AI交易团队来了

**备选标题**:
- 让AI先吵架再给你炒股建议
- UCLA+MIT做了个AI投行团队
- 多空辩论式AI帮你做决策

**视频描述**:

做交易，最难的不是选股
是面对互相矛盾的信息不知道听谁的

GitHub 49,000+ Stars 的 TradingAgents
→ 不是一个 AI 的答案，是一个 AI 团队的决策

· 4 个分析师：基本面 · 情绪面 · 新闻面 · 技术面
· 2 个研究员：看多 vs 看空，多轮辩论减少偏见
· 交易员 + 风控经理 + 组合经理，全链路审批

论文数据（3 个月回测，3 只美股）：
→ AAPL 累积回报 +26.62%（同期 B&H -5.23%）
→ GOOGL +24.36% · AMZN +23.21%
→ 最大回撤 0.91%~2.11%

⚠️ 但也要看清：
→ 仅 3 个月回测，社区复现差异大
→ Sharpe 8.21，论文自己承认偏高
→ 同一 LLM 多角色 ≠ 真正认知多样性

支持 GPT / Claude / Gemini / Grok / 本地 Ollama
中文增强版支持 A 股 / 港股，20,800+ Stars

AI 不能替你赚钱，但能替你想清楚
⚠️ 仅供研究，不构成投资建议 · DYOR

传送门：
GitHub → https://github.com/TauricResearch/TradingAgents
中文版 → https://github.com/hsliuping/TradingAgents-CN
论文 → https://arxiv.org/abs/2412.20138

#TradingAgents #AI交易 #多智能体 #量化交易 #AIAgent #开源 #美股 #A股 #GitHub

### 抖音 / 小红书适配

**标题**:
让 AI 先吵架再告诉你买不买？49k Stars 的 AI 投行团队

**描述**:

做交易最怕信息打架
技术面说买、财报说卖、推特说崩

TradingAgents 的思路：
让一整个 AI 团队先吵一架再给结论

4个分析师看不同维度
2个研究员正反辩论
风控经理最后审核

论文数据很亮眼
但只测了3个月、3只股票
社区复现差异还很大

不是万能药，是一个有意思的思路
AI 不能替你赚钱，但能替你想清楚

中文版支持A股，链接放评论区

⚠️ 仅供研究 不构成投资建议

#TradingAgents #AI交易 #量化投资 #多智能体 #美股 #A股 #AIAgent

## 10. 核心信息提炼

- **定位**: 不是"又一个量化工具"，而是第一个用多角色协作 + 多空辩论模拟真实投行决策流程的开源框架
- **最强钩子**: 49,000 Stars + "技术说买、财报说卖、推特说崩" 的真实痛点
- **最强差异**: 多空辩论机制 — 不是一个 AI 的答案，是一个 AI 团队先吵架再给的结论
- **最强数据**: AAPL 回测 +26.62% vs B&H -5.23%（但仅 3 个月）
- **最强金句**: AI 不能替你赚钱，但能替你想清楚
- **最强可信度点**: 诚实呈现局限性（3 个月、复现差异、persona 争议）
- **避坑**: 绝对不能暗示"用了就能赚钱"

## 11. 深度调研方法论（附录）

### 调研过程

| 阶段 | 方法 | 工具 |
|------|------|------|
| Phase 1: SCOPE | 分解研究问题为 6 个子维度 | - |
| Phase 3: RETRIEVE | 并行 3 个 subagent + 8 次 WebSearch | Task (explore) + WebSearch + WebFetch |
| Phase 4: TRIANGULATE | 交叉验证 6 个关键声明 | 多源比对 |
| Phase 5: SYNTHESIZE | 综合 3 个 subagent 结果，识别新洞察 | - |
| Phase 8: PACKAGE | 迭代视频文案 v2 | Write |

### 信息来源清单

| # | 来源 | 类型 | 用途 |
|---|------|------|------|
| 1 | GitHub README | 一手 | 框架架构、安装方式 |
| 2 | arXiv:2412.20138 v4 Table 1 | 一手/学术 | 回测数据（AAPL/GOOGL/AMZN） |
| 3 | arXiv:2412.20138 摘要 | 一手/学术 | 项目定位、论文声明 |
| 4 | arXiv:2509.11420 | 一手/学术 | Trading-R1 RL 模型信息 |
| 5 | arXiv:2405.03862 | 学术 | 多 Agent persona 从众效应 |
| 6 | arXiv:2601.10102 | 学术 | persona 损害策略理性 |
| 7 | arXiv:2511.03628 | 学术 | LiveTradeBench: 基准≠实盘 |
| 8 | GitHub Issue 讨论 | 社区 | 社区复现差异 |
| 9 | GitHub Issue #462 | 社区 | 高波动事件下框架失效 |
| 10 | TradingAgents-CN | 二手 | 中文版功能、A 股支持 |
| 11 | tauric.ai | 一手 | 品牌信息、免责声明 |
| 12 | 推特原文 | 社区 | 文案出处 |

### 与 v1 文案的关键差异

| 维度 | v1 | v2 (Deep Research) |
|------|----|----|
| 回测数据 | 笼统说"年化 30%" | 具体到 AAPL 26.62% / GOOGL 24.36% / AMZN 23.21%，附 3 个月限制 |
| 局限性 | 简单提"仅供研究" | 新增整场"数据的两面"（场景 5），含社区复现差异、SR 偏高承认 |
| 辩论机制 | 只讲好处 | 补充学术质疑（persona 从众、损害理性） |
| 中文版 | 简单提"20k Stars" | 补充 A 股/港股支持、Tushare/AkShare、158+ 报告 |
| CTA | 较积极 | 更克制，强调"值得研究但别当实盘系统" |
| 场景设计 | 场景 5 是纯技术（模型/部署） | 场景 5 改为"数据的两面"（绿色数据 vs 红色警告），更有深度 |

## 12. 实现状态

- [ ] Composition ID: `TradingAgents` (9:16 竖屏 1080×1920)
- [ ] 7 场景组件创建 (Hook → Architecture → Debate → RiskControl → HonestData → Ecosystem → CTA)
- [ ] 封面组件 `TradingAgentsCover` (1080×1440)
- [ ] 配音脚本: `npm run generate:voiceover:tradingagents`
- [ ] 字幕同步: `npm run sync:subtitle:tradingagents`
- [ ] 渲染命令: `npm run render:tradingagents`
- [ ] 封面渲染: `npm run render:tradingagents:cover`
- [ ] TypeScript 类型检查通过
