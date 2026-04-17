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

export const SPXOpenAPILandscapeSubtitleConfigSchema = z.object({
  enabled: z.boolean().default(true),
  fontSize: z.number().default(36),
  position: z.enum(["top", "center", "bottom"]).default("bottom"),
  highlightColor: z.string().default("#06b6d4"),
  textColor: z.string().default("#ffffff"),
  backgroundColor: z.string().default("rgba(7, 10, 16, 0.86)"),
});

export const SPXOpenAPILandscapeAudioConfigSchema = z.object({
  backgroundMusic: z.string().optional(),
  backgroundMusicVolume: z.number().min(0).max(1).default(0.14),
  voiceoverEnabled: z.boolean().default(true),
  voiceoverVolume: z.number().min(0).max(1).default(1),
  voiceId: z.string().default("zh-CN-YunyangNeural"),
  voiceRate: z.number().min(0.5).max(2).default(1.03),
  voiceoverAudioFiles: z.array(z.string()).optional(),
});

const SignatureErrorSchema = z.object({
  code: z.string(),
  desc: z.string(),
});

const WebhookRetryRowSchema = z.object({
  event: z.string(),
  retry: z.string(),
  color: z.string(),
});

const AwbVariantSchema = z.object({
  label: z.string(),
  key: z.string(),
  desc: z.string(),
  color: z.string(),
});

const CapabilityCardSchema = z.object({
  icon: z.string(),
  title: z.string(),
  desc: z.string(),
  isExtension: z.boolean().default(false),
});

const ScoreDimensionSchema = z.object({
  name: z.string(),
  weight: z.number(),
  score: z.number(),
  color: z.string(),
});

const QualityIssueSchema = z.object({
  label: z.string(),
  severity: z.enum(["critical", "warning", "info"]),
});

const PrecheckRowSchema = z.object({
  field: z.string(),
  status: z.enum(["pass", "warn", "fail"]),
  note: z.string(),
});

const PlaybookCardSchema = z.object({
  title: z.string(),
  tag: z.string(),
  color: z.string(),
});

const ErrorChipSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const CtaNumberSchema = z.object({
  value: z.string(),
  label: z.string(),
  color: z.string(),
});

export const SPXOpenAPILandscapeSchema = z.object({
  // ============ 场景 1：Hook ============
  hookLabel: z.string().default("SPX OPEN API · AGENT SKILL"),
  hookTitle: z.string().default("物流 API 接入"),
  hookSubtitle: z.string().default("这一次，AI 真的能帮你少踩坑"),
  hookMarkets: z.string().default("7"),
  hookRoles: z.string().default("3"),
  hookApis: z.string().default("25"),
  hookChecks: z.string().default("40"),
  hookMarketFlags: z.array(z.string()).default([
    "🇸🇬 SG", "🇲🇾 MY", "🇹🇭 TH", "🇻🇳 VN", "🇮🇩 ID", "🇵🇭 PH", "🇹🇼 TW",
  ]),
  hookStack: z.array(z.string()).default([
    "Cursor", "Claude Code", "Codex", "Gemini CLI",
  ]),

  // ============ 场景 2：三列核心痛点 ============
  painTitle: z.string().default("三类典型踩坑"),
  painSubtitle: z.string().default("文档第一页不会告诉你的事"),
  painSignatureTitle: z.string().default("签名与凭证"),
  painSignatureFormula: z.string().default(
    "{app_id}_{timestamp}_{random}_{body}",
  ),
  painSignatureErrors: z.array(SignatureErrorSchema).default([
    { code: "ret_code: 10002", desc: "四字段拼接顺序错" },
    { code: "ret_code: 10004", desc: "secret_key vs user_secret 混淆" },
    { code: "ret_code: 20005", desc: "越南地址字段缺失" },
  ]),
  painWebhookTitle: z.string().default("Webhook 回调"),
  painWebhookNote: z.string().default("HMAC-SHA256 同签名 · 按事件类型分流重试"),
  painWebhookRows: z.array(WebhookRetryRowSchema).default([
    { event: "OrderCreate", retry: "1 / 5 / 15 / 60 / 180 min", color: "#f59e0b" },
    { event: "WeightFee", retry: "1 / 5 / 15 / 60 / 180 min", color: "#f59e0b" },
    { event: "Tracking", retry: "不自动重试", color: "#ef4444" },
  ]),
  painAwbTitle: z.string().default("面单 AWB"),
  painAwbNote: z.string().default("batch_get_shipping_label · V1 或 V2?"),
  painAwbVariants: z.array(AwbVariantSchema).default([
    {
      label: "V1",
      key: "tracking_no",
      desc: "按运单号单条拉 · 小批量",
      color: "#06b6d4",
    },
    {
      label: "V2",
      key: "batch_no",
      desc: "按批次号聚合拉 · 大批量",
      color: "#8b5cf6",
    },
  ]),

  // ============ 场景 3：能力概览（6 主 + Webhook/AWB 扩展） ============
  capabilityTitle: z.string().default("AI Agent Skill · 全链路能力"),
  capabilitySubtitle: z.string().default(
    "侧边栏里的物流接入专家 · 代码不落地",
  ),
  capabilityCards: z.array(CapabilityCardSchema).default([
    { icon: "🎯", title: "产品选型", desc: "按角色+市场推荐接口组合", isExtension: false },
    { icon: "💻", title: "示例代码", desc: "6 语言模板 · 全部可跑", isExtension: false },
    { icon: "📚", title: "业务知识", desc: "签名/字段/市场差异速查", isExtension: false },
    { icon: "📊", title: "质量评估", desc: "5 维度量化评分", isExtension: false },
    { icon: "🔧", title: "排障决策树", desc: "6 本 Playbook 一对一兜底", isExtension: false },
    { icon: "🚀", title: "Onboarding", desc: "8 步从 0 到上线", isExtension: false },
    { icon: "📡", title: "Webhook 回调", desc: "HMAC-SHA256 验签 · 重试规则", isExtension: true },
    { icon: "🖨️", title: "面单 AWB", desc: "batch_get_shipping_label V1/V2", isExtension: true },
  ]),
  capabilityPlatforms: z.array(z.string()).default([
    "Cursor", "Claude Code", "Codex", "Gemini CLI",
  ]),

  // ============ 场景 4：代码质量评估 ============
  qualityTitle: z.string().default("代码质量 · 5 维度量化"),
  qualityLabel: z.string().default("CODE QUALITY GATE"),
  qualityTotalScore: z.number().default(78),
  qualityGrade: z.string().default("B"),
  qualityVerdict: z.string().default("建议修复后上线"),
  qualityFileName: z.string().default("partner-onboard.php"),
  qualityIssueCount: z.number().default(15),
  qualityDimensions: z.array(ScoreDimensionSchema).default([
    { name: "D1 签名与认证", weight: 25, score: 88, color: "#10b981" },
    { name: "D2 订单流程", weight: 25, score: 80, color: "#10b981" },
    { name: "D3 Webhook 处理", weight: 20, score: 65, color: "#f59e0b" },
    { name: "D4 错误处理", weight: 15, score: 82, color: "#10b981" },
    { name: "D5 市场适配", weight: 15, score: 70, color: "#f59e0b" },
  ]),
  qualityIssues: z.array(QualityIssueSchema).default([
    { label: "硬编码 secret_key", severity: "critical" },
    { label: "下单缺 try/catch", severity: "critical" },
    { label: "Webhook 未校验签名", severity: "critical" },
    { label: "VN 地址字段缺省", severity: "warning" },
    { label: "未处理 ret_code", severity: "warning" },
  ]),

  // ============ 场景 5：代码生成 + 参数预检 ============
  codegenTitle: z.string().default("代码生成 · 参数预检"),
  codegenLabel: z.string().default("SAME SIGNATURE · REQUEST + WEBHOOK + AWB"),
  codegenLanguage: z.string().default("PHP"),
  codegenMarket: z.string().default("VN · Vietnam"),
  codegenFile: z.string().default("spx_signature.php"),
  codegenLines: z.array(z.string()).default([
    "function spx_sign($appId, $secret, $body) {",
    "  $ts = time();",
    "  $rand = bin2hex(random_bytes(8));",
    "  $raw = \"{$appId}_{$ts}_{$rand}_{$body}\";",
    "  // 同一套签名可复用于 Webhook 验签 / AWB 面单签名",
    "  return hash_hmac('sha256', $raw, $secret);",
    "}",
  ]),
  codegenLangs: z.array(z.string()).default([
    "Python", "Java", "Go", "Node.js", "PHP", "cURL",
  ]),
  precheckTitle: z.string().default("JSON 参数预检"),
  precheckFile: z.string().default("order_create.json"),
  precheckRows: z.array(PrecheckRowSchema).default([
    { field: "pickup.country", status: "pass", note: "VN 已校验" },
    { field: "parcel.weight", status: "pass", note: "kg 单位正确" },
    { field: "insurance.value", status: "warn", note: "VN 需整数 · 现为小数" },
    { field: "recipient.ward", status: "fail", note: "VN 市场必填 · 缺失" },
    { field: "goods.category", status: "warn", note: "建议按 category_code" },
  ]),

  // ============ 场景 6：错误分析 + Playbook ============
  errorTitle: z.string().default("线上报错 → 根因 + Playbook"),
  errorLabel: z.string().default("TROUBLESHOOTING · SIX PLAYBOOKS"),
  errorCode: z.string().default("INVALID_PARAM"),
  errorField: z.string().default("recipient.ward"),
  errorRoot: z.string().default("越南市场必填字段缺失"),
  errorFix: z.string().default("从地址簿取 ward_code 自动填充后重试"),
  errorChips: z.array(ErrorChipSchema).default([
    { label: "Market", value: "VN" },
    { label: "API", value: "order.create" },
    { label: "Ret Code", value: "40023" },
    { label: "HTTP", value: "400" },
  ]),
  playbookCards: z.array(PlaybookCardSchema).default([
    { title: "签名认证", tag: "SIGNATURE", color: "#06b6d4" },
    { title: "订单流程", tag: "ORDER", color: "#10b981" },
    { title: "Webhook", tag: "CALLBACK", color: "#8b5cf6" },
    { title: "面单 AWB", tag: "SHIPPING LABEL", color: "#3b82f6" },
    { title: "运费计算", tag: "WEIGHT FEE", color: "#f59e0b" },
    { title: "市场适配", tag: "7 MARKETS", color: "#ef4444" },
  ]),

  // ============ 场景 7：CTA ============
  ctaSlogan: z.string().default("以前靠经验 · 现在靠评分"),
  ctaBody: z.string().default("AI 不是帮你写代码 · 是帮你少踩坑"),
  ctaNumbers: z.array(CtaNumberSchema).default([
    { value: "7", label: "Markets", color: "#06b6d4" },
    { value: "40", label: "Checks", color: "#8b5cf6" },
    { value: "6", label: "Playbooks", color: "#10b981" },
    { value: "Webhook + AWB", label: "全链路覆盖", color: "#ffd700" },
  ]),
  ctaInstallCommand: z.string().default(
    "install spx-openapi-integration → Cursor / Claude Code / Codex / Gemini CLI",
  ),
  ctaTags: z.array(z.string()).default([
    "#SPX", "#物流API", "#AgentSkill",
    "#Webhook", "#AWB", "#东南亚物流",
  ]),

  // ============ 封面 ============
  coverLabel: z.string().default("SPX OPEN API · AGENT SKILL"),
  coverTitle: z.string().default("物流 API 接入"),
  coverSubtitle: z.string().default("AI 帮你少踩坑"),
  coverMetrics: z.array(z.string()).length(4).default([
    "7 Markets",
    "40 Checks",
    "6 Playbooks",
    "Webhook + AWB",
  ]),

  // ============ 颜色主题 ============
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

  subtitle: SPXOpenAPILandscapeSubtitleConfigSchema.default(
    SPXOpenAPILandscapeSubtitleConfigSchema.parse({}),
  ),
  audio: SPXOpenAPILandscapeAudioConfigSchema.default(
    SPXOpenAPILandscapeAudioConfigSchema.parse({}),
  ),

  voiceoverScripts: z.array(z.string()).default([
    "要接一个支持七个市场的物流 API...你真的知道自己会踩几种坑吗...这一次...AI 真的能帮你...从选型、到代码、到 Webhook、到面单、到排障...一步不差。",
    "同一个下单接口...七个东南亚市场字段规则完全不一样...HMAC-SHA256 签名四个字段拼错一次...就是 10002 签名失败...还要区分 secret_key 和 user_secret...Webhook 回调更刁钻...OrderCreate 和 WeightFee 失败后会按 1、5、15、60、180 分钟重试...但 Tracking 不会重试...面单到底该调 V1 按运单号拉...还是 V2 按批次号聚合拉...这些问题...没有一个是 API 文档第一页告诉你的。",
    "我们把它做成了一个 AI Agent Skill 插件...装进 Cursor、Claude Code、Codex、Gemini CLI...所有能力都在侧边栏里...产品选型、示例代码、业务知识、质量评估、排障决策树、Onboarding 上线...再加上 Webhook 回调验签和面单 AWB 拉取...全链路都有专家级回答...而且所有代码只是参考范本...不会直接写进你的项目。",
    "把一段真实的 PHP 接入代码丢进去...AI 扫出十五项具体问题...硬编码密钥、下单缺少异常处理、Webhook 回调没做签名校验...每一条都给出修复建议和对应 Playbook...五维度加权评分七十八分...刚好卡在 B 级建议修复...签名认证、订单流程、Webhook 处理、错误处理、市场适配...五个维度各自打分...你一眼就能看到...哪里该先补。",
    "需要越南市场的示例代码吗...它给你完整可跑的模板...Python Java Go Node PHP cURL 六种语言全覆盖...关键是...Request 请求签名、Webhook 回调验签、AWB 面单签名...全部复用同一套 HMAC-SHA256 逻辑...再把真实 JSON 参数贴进来做预检...自动识别必填项缺失、字段格式错误、市场差异规则...一次性列清所有问题...不用上线再踩雷。",
    "线上报错 INVALID_PARAM 怎么办...AI 直接追到具体字段...给出根因分析...联动对应 Playbook 一对一兜底...签名、订单、Webhook、面单、运费、市场适配...六本专题手册覆盖东南亚七个市场的全部高频场景...再也不用在群里反复问同一个问题。",
    "以前对接 SPX 靠经验...现在可以靠评分...七个市场、四十项检查、六本 Playbook...Webhook 加 AWB 全链路覆盖...在 Cursor、Claude Code、Codex、Gemini CLI 里一键安装...你只告诉它你是谁、去哪个市场...剩下的...它替你走完。",
  ]),

  precomputedSubtitles: z.array(SubtitleLineSchema).optional(),
  sceneDurations: z.array(z.number()).length(7).optional(),
});

export type SPXOpenAPILandscapeProps = z.infer<
  typeof SPXOpenAPILandscapeSchema
>;
export type SignatureError = z.infer<typeof SignatureErrorSchema>;
export type WebhookRetryRow = z.infer<typeof WebhookRetryRowSchema>;
export type AwbVariant = z.infer<typeof AwbVariantSchema>;
export type CapabilityCard = z.infer<typeof CapabilityCardSchema>;
export type ScoreDimension = z.infer<typeof ScoreDimensionSchema>;
export type QualityIssue = z.infer<typeof QualityIssueSchema>;
export type PrecheckRow = z.infer<typeof PrecheckRowSchema>;
export type PlaybookCard = z.infer<typeof PlaybookCardSchema>;
export type ErrorChip = z.infer<typeof ErrorChipSchema>;
export type CtaNumber = z.infer<typeof CtaNumberSchema>;
