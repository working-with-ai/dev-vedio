import { z } from "zod";

const SubtitleWordSchema = z.object({
  text: z.string(),
  startFrame: z.number(),
  endFrame: z.number(),
});

const SubtitleLineSchema = z.object({
  words: z.array(SubtitleWordSchema),
  startFrame: z.number(),
  endFrame: z.number(),
});

export const TradingAgentsSubtitleConfigSchema = z.object({
  enabled: z.boolean().default(true),
  fontSize: z.number().default(44),
  position: z.enum(["top", "center", "bottom"]).default("bottom"),
  highlightColor: z.string().default("#f59e0b"),
  textColor: z.string().default("#e2e8f0"),
  backgroundColor: z.string().default("rgba(6, 10, 18, 0.85)"),
});

export const TradingAgentsAudioConfigSchema = z.object({
  backgroundMusic: z.string().optional(),
  backgroundMusicVolume: z.number().min(0).max(1).default(0.16),
  voiceoverEnabled: z.boolean().default(true),
  voiceoverVolume: z.number().min(0).max(1).default(1),
  voiceId: z.string().default("zh-CN-YunyangNeural"),
  voiceRate: z.number().min(0.5).max(2).default(1.03),
  voiceoverAudioFiles: z.array(z.string()).optional(),
});

const ConflictCardSchema = z.object({
  icon: z.string(),
  label: z.string(),
  value: z.string(),
  color: z.enum(["success", "warning", "danger"]),
});

const ArchAnalystSchema = z.object({
  emoji: z.string(),
  label: z.string(),
});

const RiskLevelSchema = z.object({
  label: z.string(),
  emoji: z.string(),
  color: z.enum(["danger", "warning", "success"]),
});

const DataBullishSchema = z.object({
  ticker: z.string(),
  return: z.string(),
  benchmark: z.string(),
});

const DataBearishSchema = z.object({
  ticker: z.string(),
  communityReturn: z.string(),
});

const EcoRepoSchema = z.object({
  name: z.string(),
  stars: z.string(),
  tags: z.array(z.string()),
});

const CtaLinkSchema = z.object({
  label: z.string(),
  url: z.string(),
});

export const TradingAgentsSchema = z.object({
  coverLabel: z.string().default("TRADINGAGENTS"),
  coverTitle: z.string().default("49,000+ Stars"),
  coverSubtitle: z.string().default("让 AI 团队先吵一架再给结论"),
  coverMetrics: z.array(z.string()).length(3).default([
    "49,000+ Stars",
    "9 AI Agents",
    "A 股支持",
  ]),

  hookTitle: z.string().default("TRADINGAGENTS"),
  hookStarCount: z.string().default("49,000+"),
  hookConflictCards: z.array(ConflictCardSchema).length(3).default([
    { icon: "📈", label: "技术指标", value: "强烈买入", color: "success" },
    { icon: "📊", label: "财报数据", value: "谨慎观望", color: "warning" },
    { icon: "🔻", label: "社交媒体", value: "市场要崩", color: "danger" },
  ]),

  archTitle: z.string().default("完整决策链条"),
  archAnalysts: z.array(ArchAnalystSchema).length(4).default([
    { emoji: "📊", label: "基本面" },
    { emoji: "💬", label: "情绪面" },
    { emoji: "📰", label: "新闻面" },
    { emoji: "📈", label: "技术面" },
  ]),
  archRoleCount: z.string().default("9"),
  archPaperRef: z.string().default("arXiv:2412.20138 · UCLA × MIT"),

  debateTitle: z.string().default("多空辩论机制"),
  debateRounds: z.number().default(3),
  debateBullLabel: z.string().default("看多研究员"),
  debateBearLabel: z.string().default("看空研究员"),
  debateQuote: z.string().default("观点越对立，盲点暴露得越彻底"),

  riskTitle: z.string().default("全流程风控"),
  riskLevels: z.array(RiskLevelSchema).length(3).default([
    { label: "激进", emoji: "🔴", color: "danger" },
    { label: "中性", emoji: "🟡", color: "warning" },
    { label: "保守", emoji: "🟢", color: "success" },
  ]),
  riskQuote: z.string().default("连风控审批都有对抗机制"),

  dataTitle: z.string().default("数据的两面"),
  dataBullish: DataBullishSchema.default({
    ticker: "AAPL",
    return: "+26.62%",
    benchmark: "-5.23%",
  }),
  dataBearish: DataBearishSchema.default({
    ticker: "AAPL",
    communityReturn: "-25%",
  }),
  dataWarnings: z.array(z.string()).default([
    "仅 3 个月回测",
    "仅 3 只股票",
    "Sharpe 偏高",
  ]),
  dataQuote: z.string().default("能参考，但远不到信仰"),

  ecoTitle: z.string().default("开源生态"),
  ecoMainRepo: EcoRepoSchema.default({
    name: "TradingAgents",
    stars: "49,000+",
    tags: ["Apache 2.0", "Docker", "GPT/Claude/Gemini/Grok/Ollama"],
  }),
  ecoCnRepo: EcoRepoSchema.default({
    name: "TradingAgents-CN",
    stars: "20,800+",
    tags: ["A 股", "港股", "158+ 报告", "Web 界面"],
  }),

  ctaTitle: z.string().default("值得研究吗？"),
  ctaVerdict: z.string().default("值得研究，但不值得盲信"),
  ctaSlogan: z.string().default("AI 不能替你赚钱，但能替你想清楚"),
  ctaLinks: z.array(CtaLinkSchema).default([
    { label: "GitHub", url: "github.com/TauricResearch/TradingAgents" },
    { label: "中文版", url: "github.com/hsliuping/TradingAgents-CN" },
    { label: "论文", url: "arxiv.org/abs/2412.20138" },
  ]),
  ctaTags: z.array(z.string()).default([
    "#TradingAgents",
    "#AI交易",
    "#多智能体",
    "#量化",
    "#美股",
  ]),

  backgroundColor: z.string().default("#060a12"),
  accentColor: z.string().default("#2563eb"),
  highlightColor: z.string().default("#f59e0b"),
  successColor: z.string().default("#10b981"),
  dangerColor: z.string().default("#ef4444"),
  secondaryColor: z.string().default("#8b5cf6"),
  goldColor: z.string().default("#ffd700"),
  mutedTextColor: z.string().default("#64748b"),
  textColor: z.string().default("#e2e8f0"),
  panelColor: z.string().default("rgba(37, 99, 235, 0.08)"),

  subtitle: TradingAgentsSubtitleConfigSchema.default(
    TradingAgentsSubtitleConfigSchema.parse({}),
  ),
  audio: TradingAgentsAudioConfigSchema.default(
    TradingAgentsAudioConfigSchema.parse({}),
  ),

  voiceoverScripts: z.array(z.string()).default([
    "技术指标说强烈买入...财报数据说谨慎观望...推特上全在喊崩...你到底该听谁的...GitHub 上有个项目...四万九千颗星...它的解法不是让一个 AI 给你答案...而是让一整个 AI 团队...先吵一架...再给你结论",
    "TradingAgents 来自 UCLA 和 MIT 研究者的论文...核心思路就一句话...你去看任何一个投行的交易部门...不可能是一个人拍脑袋做决策...而是一群人各管一摊...分析师负责看数据...研究员负责吵架...风控负责踩刹车...最后由老板拍板...TradingAgents 就是把这套组织架构...原封不动搬到了 AI 上...九个角色...一条完整的决策链",
    "这是整个框架最有意思的设计...四份分析报告交上来之后...不是直接汇总给结论...而是先让两个研究员...一个站多头...一个站空头...进行三轮辩论...看多的会找一切利好证据反驳...看空的会死磕每一个风险不放...观点越对立...盲点暴露得越彻底...你想想...一个 AI 给你的是一个观点...一群 AI 吵完架给你的...是一个经过正反压力测试的判断",
    "辩论出结论后...交易员先拿出一套完整方案...但还不能下单...要过风控这一关...波动率、流动性、持仓集中度...逐项过清单...不达标直接打回...而且风控不是一个人...是三个...一个激进、一个中性、一个保守...三种风格的风控经理也要先吵一架...最后由投资组合经理综合拍板...这意味着...在这个系统里...连风控审批都有对抗机制",
    "该聊数据了...论文回测了苹果、谷歌和亚马逊...三只股票三个月...结果相当亮眼...苹果累积回报百分之二十六...同期买入持有是负百分之五...看到这个数字...你可能已经心动了...但先别急...同样的代码同样的参数...社区有人复现苹果...跑出来是负百分之二十五...正负五十个百分点的差距...出在同一个框架上...论文自己也承认...三个月回测太短...Sharpe 高达八明显偏高...所以这个数据...能参考...但远不到信仰",
    "好消息是...全部开源...Apache 二点零...GPT Claude Gemini Grok 随便选...也能用 Ollama 跑本地不花钱...Docker 一键起来就能用...而且...有人做了一个中文增强版...两万颗星...直接支持 A 股和港股...已经生成了一百五十多份 A 股研报...你不需要写一行代码...Web 界面打开就能看到完整分析...对中国投资者来说...这个中文版可能比原版更实用",
    "所以...这个框架值不值得看...我的判断是...值得研究...但不值得盲信...它不能帮你赚钱...但它能帮你在一堆互相矛盾的信息里...做出更有逻辑的判断...如果你也觉得一个人盯盘加一个 AI...越来越不够用了...这套让 AI 先吵架再给结论的思路...值得花时间了解一下...A 股用户直接看中文版...链接放评论区...投资有风险...DYOR",
  ]),

  precomputedSubtitles: z.array(SubtitleLineSchema).optional(),
  sceneDurations: z.array(z.number()).length(7).optional(),
});

export type TradingAgentsProps = z.infer<typeof TradingAgentsSchema>;
export type TradingAgentsConflictCard = z.infer<typeof ConflictCardSchema>;
export type TradingAgentsArchAnalyst = z.infer<typeof ArchAnalystSchema>;
export type TradingAgentsRiskLevel = z.infer<typeof RiskLevelSchema>;
export type TradingAgentsDataBullish = z.infer<typeof DataBullishSchema>;
export type TradingAgentsDataBearish = z.infer<typeof DataBearishSchema>;
export type TradingAgentsEcoRepo = z.infer<typeof EcoRepoSchema>;
export type TradingAgentsCtaLink = z.infer<typeof CtaLinkSchema>;
