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

export const HermesAgentSubtitleConfigSchema = z.object({
  enabled: z.boolean().default(true),
  fontSize: z.number().default(44),
  position: z.enum(["top", "center", "bottom"]).default("bottom"),
  highlightColor: z.string().default("#06d6a0"),
  textColor: z.string().default("#ffffff"),
  backgroundColor: z.string().default("rgba(8, 6, 15, 0.86)"),
});

export const HermesAgentAudioConfigSchema = z.object({
  backgroundMusic: z.string().optional(),
  backgroundMusicVolume: z.number().min(0).max(1).default(0.16),
  voiceoverEnabled: z.boolean().default(true),
  voiceoverVolume: z.number().min(0).max(1).default(1),
  voiceId: z.string().default("zh-CN-YunyangNeural"),
  voiceRate: z.number().min(0.5).max(2).default(1.03),
  voiceoverAudioFiles: z.array(z.string()).optional(),
});

const ComparisonItemSchema = z.object({
  label: z.string(),
  hermes: z.string(),
  openclaw: z.string(),
});

const SecurityLayerSchema = z.object({
  icon: z.string(),
  title: z.string(),
  color: z.string(),
});

const DeployOptionSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

const VerdictCardSchema = z.object({
  icon: z.string(),
  title: z.string(),
  points: z.array(z.string()),
});

export const HermesAgentSchema = z.object({
  // Hook 场景
  hookLabel: z.string().default("HERMES AGENT"),
  hookStarCount: z.string().default("35,000+"),
  hookSubtitle: z.string().default("龙虾遇到真正对手了"),
  hookRepoName: z.string().default("NousResearch/hermes-agent"),
  hookRepoDesc: z.string().default("The agent that grows with you"),
  hookVsText: z.string().default("⚡ Hermes Agent  vs  🦞 OpenClaw"),

  // 场景2: 定位对比
  positionTitle: z.string().default("设计哲学对决"),
  positionItems: z.array(ComparisonItemSchema).default([
    { label: "核心", hermes: "Closed Learning Loop", openclaw: "Gateway 网关守护进程" },
    { label: "解决", hermes: "agent 怎么越来越强", openclaw: "怎么把消息送到 agent" },
    { label: "定位", hermes: "自我进化的智能体引擎", openclaw: "多渠道助理操作系统" },
  ]),

  // 场景3: 自动写技能
  skillTitle: z.string().default("自动写技能"),
  skillFlowNodes: z.array(z.string()).default([
    "📋 完成复杂任务",
    "📝 自动沉淀 SKILL.md",
    "🔄 使用中自我迭代",
    "⚡ 重复任务提速 40%",
  ]),
  skillCompare: z.string().default("OpenClaw: 依赖人工编写 + ClawHub 社区"),
  skillCount: z.string().default("643+"),

  // 场景4: 记忆体系
  memoryTitle: z.string().default("记忆体系对比"),
  hermesMemoryLayers: z.array(z.string()).default([
    "MEMORY.md — 常驻关键信息",
    "SQLite + FTS5 — 全量历史检索",
    "Honcho — 用户建模",
  ]),
  openclawMemory: z.string().default("Markdown 文件 + 语义检索"),
  memoryConclusion: z.string().default("搜索引擎式大脑  vs  笔记本"),

  // 场景5: 安全体系
  securityTitle: z.string().default("安全体系对决"),
  securityLayers: z.array(SecurityLayerSchema).length(5).default([
    { icon: "🔐", title: "用户授权", color: "#10b981" },
    { icon: "⚠️", title: "危险命令审批", color: "#f59e0b" },
    { icon: "📦", title: "容器隔离", color: "#06d6a0" },
    { icon: "🔑", title: "凭据过滤", color: "#7c3aed" },
    { icon: "🛡️", title: "上下文注入扫描", color: "#f59e0b" },
  ]),
  openclawSecurityIssue1: z.string().default("135,000 实例暴露公网"),
  openclawSecurityIssue2: z.string().default("300+ 恶意技能被发现"),

  // 场景6: 部署
  deployTitle: z.string().default("轻量部署"),
  deployCommand: z.string().default("curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash"),
  deployOptions: z.array(DeployOptionSchema).length(3).default([
    { icon: "💰", title: "$5/月 VPS", description: "最低门槛" },
    { icon: "🐳", title: "Docker", description: "容器隔离" },
    { icon: "☁️", title: "Modal", description: "Serverless" },
  ]),
  deployStats: z.array(z.string()).default(["200+ 模型", "OpenAI API 兼容", "Open WebUI"]),

  // 场景7: CTA
  ctaTitle: z.string().default("怎么选？"),
  ctaCards: z.array(VerdictCardSchema).length(2).default([
    {
      icon: "🦞",
      title: "选 OpenClaw",
      points: ["多渠道平台", "成熟生态", "社区技能市场", "346k Stars"],
    },
    {
      icon: "⚡",
      title: "选 Hermes",
      points: ["长期进化", "自动写技能", "研究友好", "RL 训练轨迹"],
    },
  ]),
  ctaSlogan: z.string().default("真正的竞争不是谁星标多"),
  ctaBody: z.string().default("而是谁让 Agent 真正变聪明"),
  ctaTags: z.array(z.string()).default([
    "#HermesAgent",
    "#NousResearch",
    "#OpenClaw",
    "#AIAgent",
    "#开源",
    "#自我进化",
  ]),

  // 封面
  coverLabel: z.string().default("HERMES AGENT"),
  coverTitle: z.string().default("会自我进化的 Agent"),
  coverSubtitle: z.string().default("龙虾遇到真正对手了"),
  coverMetrics: z.array(z.string()).length(3).default([
    "35,000+ Stars",
    "643+ Skills",
    "$5/月可跑",
  ]),

  // 颜色
  backgroundColor: z.string().default("#08060f"),
  textColor: z.string().default("#e8e8f0"),
  mutedTextColor: z.string().default("#8b8b9e"),
  accentColor: z.string().default("#7c3aed"),
  highlightColor: z.string().default("#06d6a0"),
  dangerColor: z.string().default("#ef4444"),
  secondaryColor: z.string().default("#f59e0b"),
  panelColor: z.string().default("rgba(124, 58, 237, 0.08)"),
  openclawColor: z.string().default("#ff6347"),

  subtitle: HermesAgentSubtitleConfigSchema.default(
    HermesAgentSubtitleConfigSchema.parse({}),
  ),
  audio: HermesAgentAudioConfigSchema.default(
    HermesAgentAudioConfigSchema.parse({}),
  ),

  voiceoverScripts: z.array(z.string()).default([
    "龙虾终于遇到真正的对手了...Nous Research 两个月前开源了一个 AI 智能体框架...叫 Hermes Agent...上线不到两个月...GitHub 星标已经逼近三万五...社区管它叫龙虾上线以来...第一个真正意义上的竞争对手",
    "两者都是自托管的开源智能体...都能接入 Telegram Discord Slack...都走 MIT 协议...但设计哲学完全不同...OpenClaw 的核心是一个 Gateway...像一个调度中心...把各种聊天应用连接到 AI agent...Hermes 的核心则是 agent 自身的执行循环...它不围绕怎么送消息...而围绕怎么让 agent 越来越强",
    "这是 Hermes 最有意思的地方...当它完成一个复杂任务后...会把整个过程沉淀成一份结构化的技能文档...存成 Markdown 文件...下次遇到类似任务...直接加载这份技能...不用从头解决...更关键的是...这些技能在使用过程中会自我迭代...有用户反馈...agent 两小时内自动生成了三份技能后...重复任务速度提升了百分之四十",
    "两者都有跨会话记忆...但实现方式不同...Hermes 用 SQLite 配合全文检索...把所有历史对话存下来...记忆分两层...一层是常驻关键信息...写在 MEMORY.md 里...每次对话都带上...另一层是全量历史检索...容量无限...按需调用...OpenClaw 走的是文件即记忆的路线...简单说...Hermes 是搜索引擎式的大脑...OpenClaw 是笔记本",
    "安全思路也完全不一样...Hermes 搞了一套五层纵深防御...用户授权...危险命令审批...容器隔离...凭据过滤...上下文注入扫描...默认对高风险操作要人工审批...超时未批准就自动拒绝...OpenClaw 更强调信任模型和配置审计...但今年二月被曝出多个高危漏洞...十三万五千个实例暴露在公网上...技能市场也发现了三百多个恶意技能",
    "Hermes 跑在五美元一个月的 VPS 上就够用...也支持 Docker SSH 远程 Modal 等 serverless 方案...安装只需要一行 curl 命令...它还内建了一个兼容 OpenAI API 的服务端...可以直接作为后端接入 Open WebUI 等第三方界面...支持超过两百个模型...随时用 hermes model 一键切换...不需要改一行代码",
    "如果你想要一个多渠道助理平台...接入各种聊天工具...用社区现成的技能市场...OpenClaw 的生态更成熟...三十四万星标不是白来的...但如果你更关心 agent 的长期进化能力...想让它用得越久越聪明...或者你在做 AI 研究...需要生成训练轨迹跑强化学习...Hermes 的架构更对口...链接放在评论区...感兴趣的可以去试试",
  ]),

  precomputedSubtitles: z.array(SubtitleLineSchema).optional(),
  sceneDurations: z.array(z.number()).length(7).optional(),
});

export type HermesAgentProps = z.infer<typeof HermesAgentSchema>;
export type ComparisonItem = z.infer<typeof ComparisonItemSchema>;
export type SecurityLayer = z.infer<typeof SecurityLayerSchema>;
export type DeployOption = z.infer<typeof DeployOptionSchema>;
export type VerdictCard = z.infer<typeof VerdictCardSchema>;
