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

export const SPXOpenAPISubtitleConfigSchema = z.object({
  enabled: z.boolean().default(true),
  fontSize: z.number().default(44),
  position: z.enum(["top", "center", "bottom"]).default("bottom"),
  highlightColor: z.string().default("#06b6d4"),
  textColor: z.string().default("#ffffff"),
  backgroundColor: z.string().default("rgba(7, 10, 16, 0.86)"),
});

export const SPXOpenAPIAudioConfigSchema = z.object({
  backgroundMusic: z.string().optional(),
  backgroundMusicVolume: z.number().min(0).max(1).default(0.16),
  voiceoverEnabled: z.boolean().default(true),
  voiceoverVolume: z.number().min(0).max(1).default(1),
  voiceId: z.string().default("zh-CN-YunyangNeural"),
  voiceRate: z.number().min(0.5).max(2).default(1.03),
  voiceoverAudioFiles: z.array(z.string()).optional(),
});

const ErrorCardSchema = z.object({
  code: z.string(),
  desc: z.string(),
});

const CapabilitySchema = z.object({
  icon: z.string(),
  title: z.string(),
  desc: z.string(),
});

const OnboardingStepSchema = z.object({
  label: z.string(),
  color: z.string(),
});

const ScoreDimensionSchema = z.object({
  name: z.string(),
  weight: z.number(),
  score: z.number(),
  color: z.string(),
});

const DecisionBranchSchema = z.object({
  label: z.string(),
  target: z.string(),
});

export const SPXOpenAPISchema = z.object({
  // Hook 场景
  hookLabel: z.string().default("SPX OPEN API INTEGRATION"),
  hookMarkets: z.string().default("7"),
  hookRoles: z.string().default("3"),
  hookAPIs: z.string().default("25"),
  hookChecks: z.string().default("40"),
  hookMarketFlags: z.array(z.string()).default([
    "🇸🇬 SG", "🇲🇾 MY", "🇹🇭 TH", "🇻🇳 VN", "🇮🇩 ID", "🇵🇭 PH", "🇹🇼 TW",
  ]),

  // 场景2: 痛点
  painTitle: z.string().default("接入踩坑实录"),
  painErrors: z.array(ErrorCardSchema).default([
    { code: "ret_code: 10002", desc: "签名字段拼接顺序错误" },
    { code: "ret_code: 10004", desc: "secret_key 与 user_secret 混淆" },
    { code: "ret_code: 20005", desc: "VN 市场地址字段缺失" },
  ]),
  painSignature: z.string().default("{app_id}_{timestamp}_{random_num}_{body}"),

  // 场景3: 核心能力
  coreTitle: z.string().default("六大核心能力"),
  coreCapabilities: z.array(CapabilitySchema).default([
    { icon: "🎯", title: "产品选型", desc: "角色+场景推荐" },
    { icon: "💻", title: "示例代码", desc: "6语言模板索引" },
    { icon: "📚", title: "知识速查", desc: "签名/字段/差异" },
    { icon: "📊", title: "质量评估", desc: "5维度评分" },
    { icon: "🔧", title: "排障决策树", desc: "6本Playbook" },
    { icon: "🚀", title: "Onboarding", desc: "8步上线" },
  ]),
  corePlatforms: z.array(z.string()).default([
    "Cursor", "Claude Code", "Codex", "Gemini CLI",
  ]),

  // 场景4: 8步上线
  onboardingTitle: z.string().default("8步从零到上线"),
  onboardingSteps: z.array(OnboardingStepSchema).default([
    { label: "确认角色", color: "#10b981" },
    { label: "确认市场", color: "#10b981" },
    { label: "获取凭证", color: "#3b82f6" },
    { label: "配置环境", color: "#3b82f6" },
    { label: "验证签名 ✓", color: "#06b6d4" },
    { label: "首次调用", color: "#06b6d4" },
    { label: "完整下单流程", color: "#8b5cf6" },
    { label: "质量评估 ≥75分", color: "#ffd700" },
  ]),
  onboardingPassScore: z.string().default("75"),

  // 场景5: 质量评分
  qualityTitle: z.string().default("5维度量化评分"),
  qualityDimensions: z.array(ScoreDimensionSchema).default([
    { name: "D1 签名与认证", weight: 25, score: 92, color: "#10b981" },
    { name: "D2 订单流程", weight: 25, score: 85, color: "#10b981" },
    { name: "D3 Webhook", weight: 20, score: 70, color: "#f59e0b" },
    { name: "D4 错误处理", weight: 15, score: 88, color: "#10b981" },
    { name: "D5 市场适配", weight: 15, score: 65, color: "#f59e0b" },
  ]),
  qualityTotalScore: z.number().default(82),
  qualityGrade: z.string().default("B"),
  qualityGrades: z.array(z.string()).default([
    "A ≥90 可上线", "B ≥75 建议修复", "C ≥60 有风险", "D <60 需整改",
  ]),

  // 场景6: 排障决策树
  troubleshootTitle: z.string().default("排障决策树"),
  troubleshootBranches: z.array(DecisionBranchSchema).default([
    { label: "A. ret_code 错误码?", target: "按码分流" },
    { label: "B. HTTP 错误?", target: "401/429/500" },
    { label: "C. Webhook 问题?", target: "Playbook" },
    { label: "D. 面单问题?", target: "Playbook" },
    { label: "E. 运费问题?", target: "Playbook" },
    { label: "F. 业务逻辑?", target: "场景分流" },
  ]),
  troubleshootPlaybooks: z.array(z.string()).default([
    "签名认证", "订单流程", "Webhook", "面单打印", "运费计算", "市场适配",
  ]),
  troubleshootHighlightCode: z.string().default("21001"),
  troubleshootHighlightPath: z.string().default("TW 门店 ID → 市场 Playbook"),

  // 场景7: CTA
  ctaSlogan: z.string().default("以前靠经验，现在靠评分"),
  ctaBody: z.string().default("AI 不是帮你写代码，是帮你少踩坑"),
  ctaStats: z.array(z.string()).default([
    "7 Markets", "40 Checks", "6 Playbooks", "8 Steps",
  ]),
  ctaTags: z.array(z.string()).default([
    "#SPX", "#物流API", "#AgentSkill", "#AI开发工具",
    "#Cursor", "#ClaudeCode", "#东南亚物流",
  ]),

  // 封面
  coverLabel: z.string().default("SPX OPEN API"),
  coverTitle: z.string().default("物流 API 接入"),
  coverSubtitle: z.string().default("AI 帮你全搞定"),
  coverMetrics: z.array(z.string()).length(3).default([
    "7 Markets", "40 Checks", "6 Playbooks",
  ]),

  // 颜色
  backgroundColor: z.string().default("#070a10"),
  textColor: z.string().default("#e2e8f0"),
  mutedTextColor: z.string().default("#64748b"),
  accentColor: z.string().default("#06b6d4"),
  highlightColor: z.string().default("#8b5cf6"),
  successColor: z.string().default("#10b981"),
  dangerColor: z.string().default("#ef4444"),
  warningColor: z.string().default("#f59e0b"),
  goldColor: z.string().default("#ffd700"),
  secondaryColor: z.string().default("#3b82f6"),
  panelColor: z.string().default("rgba(6, 182, 212, 0.08)"),

  subtitle: SPXOpenAPISubtitleConfigSchema.default(
    SPXOpenAPISubtitleConfigSchema.parse({}),
  ),
  audio: SPXOpenAPIAudioConfigSchema.default(
    SPXOpenAPIAudioConfigSchema.parse({}),
  ),

  voiceoverScripts: z.array(z.string()).default([
    "接物流 API...听起来就是下单、查轨迹、打面单...三个接口的事对吧...但当你要同时支持七个东南亚市场...三种接入角色...你面对的是二十五个接口端点...四十项检查清单...和每个市场不一样的字段规则...泰国保价要两位小数...越南保价必须整数...同一个字段同一个接口...七个市场七种填法...有没有一种可能...让 AI 帮你把这些坑全部提前踩完",
    "签名认证是第一道坎...HMAC-SHA256...四个字段按固定顺序拼接...app_id 下划线时间戳下划线随机数下划线请求体...任何一个写反了...10002 签名失败...然后你要区分 secret_key 和 user_secret...一个用于签名一个用于请求体...搞混了就是 10004 权限不足...好不容易签名过了...下单接口报 20005 地址解析失败...一查...原来越南的地址字段和新加坡不一样...这还只是一个市场一个接口的故事",
    "所以我们做了一个 Agent Skill...装进 Cursor 或者 Claude Code...它不是通用的 AI 对话...而是一个被严格约束的物流接入专家...你告诉它你是三方聚合商...目标市场是越南...它会自动推荐异步下单加 Webhook 加子账户管理的接口组合...代码示例不是从零生成的...而是从我们维护的模板库里检索出来的...Python Java Go Node PHP cURL 六种语言全覆盖...而且它绝对不会把代码直接写进你的项目...只展示...你自己复制适配...这样做的目的只有一个...让 AI 不敢瞎编",
    "整个接入流程被拆成了八步...第一步确认角色...第二步确认市场...第三步拿凭证...第四步配环境...第五步跑签名验证脚本...通过了进入第六步...首次 API 调用...调 get_product_info 确认凭证有效...第七步完成完整下单流程...预校验、下单、打面单、查轨迹逐个验证...第八步...跑质量评估...五个维度打分...七十五分以上才建议上线...每一步失败了...AI 会自动把你导入排障决策树...不用你去群里问",
    "这是我最喜欢的设计...质量评估...五个维度...签名与认证占二十五分...订单流程完整性占二十五分...Webhook 处理占二十分...错误处理与容错占十五分...市场适配占十五分...总分一百分...九十分以上 A 级可以安全上线...七十五到八十九分 B 级...建议修复后上线...六十到七十四分 C 级有明显风险...六十分以下 D 级存在严重缺陷...而且针对不同角色权重会自动调整...卖家不需要 Webhook...那二十分的权重会等比分配到其他四个维度...不是一刀切...是真正按你的场景来评",
    "遇到问题怎么办...传统做法是去群里问...等半天...这里有一棵完整的排障决策树...加六本专题 Playbook...签名问题走签名 Playbook...下单报错走订单 Playbook...Webhook 收不到走 Webhook Playbook...面单打不开、运费不一致、市场特有字段问题...各有专属 Playbook...比如你报了个 ret_code 21001...决策树自动识别这是台湾市场门店 ID 问题...直接把你路由到市场 Playbook 的台湾专区...不用你翻文档...不用你猜...AI 按决策树一步步帮你排查",
    "以前对接物流 API 靠经验...现在可以靠评分...AI 不是帮你写代码...是帮你少踩坑...七个市场的字段差异它帮你记...四十项检查清单它帮你查...遇到问题它带你走决策树...上线前它给你打分...如果你正在对接 SPX...或者即将对接...装个 Cursor 插件...告诉 AI 你是谁、去哪个市场...剩下的...它会一步步带你走完",
  ]),

  precomputedSubtitles: z.array(SubtitleLineSchema).optional(),
  sceneDurations: z.array(z.number()).length(7).optional(),
});

export type SPXOpenAPIProps = z.infer<typeof SPXOpenAPISchema>;
export type ErrorCard = z.infer<typeof ErrorCardSchema>;
export type Capability = z.infer<typeof CapabilitySchema>;
export type OnboardingStep = z.infer<typeof OnboardingStepSchema>;
export type ScoreDimension = z.infer<typeof ScoreDimensionSchema>;
export type DecisionBranch = z.infer<typeof DecisionBranchSchema>;
