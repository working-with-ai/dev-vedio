# Pitfalls Research

**Domain:** AI 技术短视频创作 / 自媒体视频生产系统（基于现有 Remotion + TypeScript brownfield）
**Researched:** 2026-03-22
**Confidence:** MEDIUM

## Critical Pitfalls

### Pitfall 1: 让 LLM 直接从长文案生成标题/封面/描述，缺少“事实层”

**What goes wrong:**
封面、16 字内标题、描述、首屏 Hook 都直接从长文案或一段链接摘要里生成，结果是数字、项目名、能力边界、发布时间、链接来源彼此不一致。视频本体讲 A，标题和封面却承诺 B，最终既伤信任，也伤完播。

**Why it happens:**
团队把“自动生成包装素材”理解成“让模型一次性写完全部文案”，没有先把项目名、作者名、关键数字、证据链接、不可夸大的结论抽成结构化字段。

**How to avoid:**
- 不重做系统，只在现有 composition 配置旁新增一个 `content manifest` 层，字段至少包含：`projectName`、`coreClaim`、`supportingFacts[]`、`sourceLinks[]`、`forbiddenClaims[]`、`cta`。
- 标题、封面文案、描述、首屏 Hook 一律只允许消费 manifest，不直接消费原始长文案。
- 对“Star 数、代码行数、发布时间、融资额、性能提升”等高风险字段加校验，缺字段就降级为保守表达，不允许模型补全。

**Warning signs:**
- 标题、封面、旁白里的数字不一致。
- 描述区出现视频里没提到的结论或链接。
- 同一个项目在视频内外用了不同英文名、缩写或作者名。
- 评审时需要人工反复“对数字”“对链接”。

**Phase to address:**
Phase A: 内容输入契约与事实抽取

---

### Pitfall 2: 为了点击率把标题和首屏做成“标题党”，但视频前几秒无法兑现承诺

**What goes wrong:**
封面和标题做得很猛，前三秒却没有立即解释核心价值，或者第一场景还在铺背景、放 Logo、做炫技动画。结果是点进来的人多，但前 3 到 8 秒快速流失，评论区出现“标题党”“讲半天没重点”。

**Why it happens:**
团队把包装素材优化和视频主体优化割裂开，只看“更炸的标题/封面”，不看“首屏有没有马上兑现承诺”。

**How to avoid:**
- 在现有 7 场景结构上增加“promise payoff”约束：封面/标题里的最大承诺，必须在 Scene 1 的 3 到 5 秒内被明确说出来或展示出来。
- 首屏只保留一个核心利益点，不允许同时塞“项目介绍 + 背景 + 对比 + CTA”。
- 评估时优先看前 5 秒保留率代理指标，而不是只看 CTR。

**Warning signs:**
- 首屏出现 2 个以上主标题、3 组以上核心数字。
- Scene 1 结束时仍没回答“为什么要继续看”。
- 评论高频出现“所以重点是什么”“说半天没说到点上”。
- 点击不错，但完播或前几秒留存明显差。

**Phase to address:**
Phase B: 首屏 Hook 与包装一致性

---

### Pitfall 3: 模板化后所有视频越来越像，频道快速出现“量产感”

**What goes wrong:**
虽然生产速度提升了，但每条视频都复用同一套颜色、同一类 HUD、同一节奏的数字轰炸、同一 CTA 句式，最终观众一眼看出是“同一机器批量生产”。技术内容还没讲清，审美疲劳先到了。

**Why it happens:**
brownfield 重构时最容易把“共享能力”做成“共享成品”。为了减少复制成本，把 hook、scene 排布、强调动词、封面版式都硬编码成唯一答案。

**How to avoid:**
- 保持现有 Remotion 结构，只把共享部分抽成“模板骨架 + 可变插槽 + 视觉 token”，不要抽成唯一的成片样式。
- 至少准备 3 套 Hook archetype、2 套信息展示节奏、2 到 3 套封面版式，让新增视频是在“变体池”里选，而不是复制旧视频。
- 在配置层记录“本条视频使用了哪套开场/封面/CTA 变体”，为后续复盘留数据。

**Warning signs:**
- 连续 3 条视频的首 15 秒构图和动画节奏几乎一致。
- 标题高频复用相同动词和句式。
- 封面除了数字不同，其余视觉层次几乎没变。
- 新增视频仍然靠复制旧 composition 再改字。

**Phase to address:**
Phase C: 模板基座与视觉变体

---

### Pitfall 4: 只追求“更炫”，忽视手机安全区、信息层级和可读性

**What goes wrong:**
为了增强科技感，屏幕上堆了太多动画、描边、扫描线、数字卡片、背景光效，结果首屏关键字不够大，字幕被平台 UI 挡住，用户根本来不及读。视频看起来“做了很多”，但并不更抓人。

**Why it happens:**
设计评审常在桌面 Studio 里做，而不是按真实手机视图、平台 UI 遮挡和字幕安全区来验收。

**How to avoid:**
- 继续沿用现有 9:16 系统，但把安全区检查变成硬门禁：核心内容不得落入底部危险区，字幕和 CTA 不能互抢位置。
- 每个场景限制“一个主结论 + 一个支持视觉”，超出的信息移到下一场景。
- 封面和第一帧分开设计：封面允许信息密度高，首帧必须保证 0 帧即可读。

**Warning signs:**
- 首屏同时出现多个高权重元素：超大数字、两行标题、多个角标、滚动字幕。
- 用户需要暂停才能读完主信息。
- 字幕、CTA、底部标签进入平台 UI 占位区。
- 截成手机预览图时，主标题不够醒目或被遮挡。

**Phase to address:**
Phase D: 视觉升级与平台适配

---

### Pitfall 5: 配音、字幕、Scene 时长仍靠人工回填，自动化越多反而越容易错位

**What goes wrong:**
脚本生成了音频和字幕，但 `durationInFrames`、`sceneDurations`、`precomputedSubtitles`、音频文件路径仍需人工同步回填。只要漏改一项，就会出现字幕早到/晚到、尾帧黑场、旁白被截断、Scene 切换点错位。

**Why it happens:**
现有仓库已经形成了可出片流程，但“时序真相”分散在多个脚本、JSON 和 `Root.tsx` 手工配置里，新增模板和素材生成后，这个问题只会更频繁。

**How to avoid:**
- 不推翻现有流水线，只新增一个统一 manifest，把音频文件、字幕 JSON、sceneDurations、total duration 作为同一份产物输出。
- 加一个预渲染校验脚本，校验音频文件数、Scene 数、字幕时长覆盖、总帧数一致性，不通过就拒绝渲染。
- 把“同步脚本输出 -> 注册配置更新”变成一个串联命令，减少人工复制。

**Warning signs:**
- 修改旁白后，渲染结果尾部出现空白或音频被截。
- 字幕切换点比旁白快/慢半拍。
- 新增 composition 能渲染，但字幕或音乐丢失。
- `Root.tsx` 里存在大量需要手工回填的时长常量。

**Phase to address:**
Phase E: 时序同步与渲染质量门禁

---

### Pitfall 6: 在 brownfield 上做模板化时，注册表和 API 合同先漂移

**What goes wrong:**
Studio 能预览，CLI 能渲染，但 API 不认新的 composition；或者封面 Still 注册了，渲染脚本没补；或者模板目录抽了，`Root.tsx` 和服务端可用列表没同步。结果不是“模板化失败”，而是“能力看起来有了，系统实际更脆”。

**Why it happens:**
当前仓库已经存在 composition 注册与服务端暴露不一致的问题。继续做模板、封面、标题生成，如果不先收敛注册表，增量功能会放大漂移。

**How to avoid:**
- 先做共享注册表，再做模板扩展；保持 composition ID 稳定，不在这一轮引入大规模目录重写。
- 每新增一种产物类型（视频、封面、描述 JSON），都要求它走同一份 composition registry。
- 采用“先迁一个现有爆款模板，再复制推广”的迁移顺序，不一次性全量改造。

**Warning signs:**
- Studio 可见但 `/api/render/compositions` 不可见。
- 新视频有主片脚本，没有对应封面脚本或素材导出配置。
- 新增模板需要同时修改多个清单文件，且容易漏改。
- `Root.tsx` 持续膨胀，review diff 越来越难看。

**Phase to address:**
Phase C: 模板基座与视觉变体

---

### Pitfall 7: 把“统一版标题/描述/封面”做成永久假设，后续很难适配平台差异

**What goes wrong:**
v1 为了快，所有平台共用一套标题、描述、封面。这本身没错；错在实现时把它写死成唯一模型，导致后面要适配视频号、抖音、B 站、小红书时，既没有 override 位，也没有实验位，只能回到手工复制。

**Why it happens:**
团队把“当前不做平台细分”误解成“架构上不需要为平台差异留缝”。而官方平台实践本身就表明，标题、封面、CTA、字幕安全区和测试能力并不完全一致。

**How to avoid:**
- v1 仍然输出统一版，但数据结构上拆成 `base package` 和 `platform overrides` 两层，先允许 override 为空。
- 为标题、封面、描述留出“人工修订记录”和“表现备注”字段，后面做平台化时可复用。
- 不在生成 prompt 里写死平台文案长度、emoji 策略和标签数量，改为配置项。

**Warning signs:**
- 不同平台只能复用同一套文案，无法做轻微变体。
- 后续想加平台适配时，需要复制一整套生成脚本。
- 标题长度、封面裁切、描述结构经常靠手工临时改。
- 没有记录哪种封面/标题变体表现更好。

**Phase to address:**
Phase F: 发布素材生成与平台扩展预留

---

### Pitfall 8: 只做“会生成”，不做事实标注与合规约束，技术视频很容易越线

**What goes wrong:**
AI 技术短视频为了更抓人，最容易在封面、标题、配音里夸大 benchmark、暗示“已发布/已开源/已可用”、或者把模拟界面说成真实产品表现。短期看更刺激，长期看会直接损伤可信度，甚至踩平台关于误导性内容、自动化低质量内容和 AI 合成内容披露的红线。

**Why it happens:**
技术内容天然带数字、结论和强判断；一旦包装层完全由模型自由生成，而没有“哪些能说、哪些只能保守说、哪些必须附链接”的规则，就很容易失真。

**How to avoid:**
- 在 manifest 中加入 `claimLevel`、`needsSourceLink`、`isRecreatedDemo`、`requiresAIDisclosure` 等字段。
- 对“推测性结论”“复现 UI”“概念演示”“第三方 benchmark”添加统一标记策略，至少在描述区或画面角标中披露。
- 对没有来源链接的强结论自动降级措辞，例如从“碾压”降级为“值得关注/可能改变”。

**Warning signs:**
- 描述区没有来源链接，却出现确定性强结论。
- 画面展示的是模拟终端/模拟数据，却没有任何说明。
- 标题或封面使用了真实人物/产品截图，但视频正文没有交代来源。
- 评审时经常讨论“这个能不能这么说”。

**Phase to address:**
Phase A: 内容输入契约与事实抽取

---

### Pitfall 9: 自动化链路继续堆在单进程脚本和同步接口里，产能一上来就卡死

**What goes wrong:**
渲染、TTS、字幕同步、数字人素材、封面导出、标题/描述生成全部挂在本地脚本和单个 API 进程里。单次 demo 看起来通了，但一旦并行出片、重复修改旁白、批量导出封面，系统就会阻塞、脏目录膨胀、失败难恢复。

**Why it happens:**
早期系统以“先出一条片”为目标，天然偏同步、偏人工、偏本地目录。到了模板化和包装自动化阶段，如果仍不补作业化和资产治理，自动化越多越不稳定。

**How to avoid:**
- 不改核心渲染技术栈，只给现有 Express 层补最小作业模型：job ID、状态、输出 manifest、失败重试、清理策略。
- 对 `out/`、`public/audio/`、封面输出目录建立 TTL 或清理命令，并把“权威产物”记录到 manifest。
- 对 TTS 和外部服务调用去掉 shell 拼接和阻塞式执行，优先改为参数化子进程或异步 worker。

**Warning signs:**
- 一次渲染时 API 进程被长时间占住。
- 目录里堆了多版音频、封面、字幕，却不知道哪版是有效产物。
- 批量出片时经常因为一个外部服务失败就整条流水线中断。
- 同一个视频重复生成后，产物命名和引用关系混乱。

**Phase to address:**
Phase G: 渲染链路稳态化与资产治理

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| 继续把 `defaultProps`、时长、字幕、音频路径硬编码在 `Root.tsx` | 改得快 | 注册漂移、review 爆炸、漏改率高 | 仅允许作为迁移过渡，不应成为新模板常态 |
| 每个视频各自复制一份 `generate-voiceover-*` 和 `sync-subtitle-*` | 新增视频成本低 | 16+ 脚本逐步漂移，统一修 bug 成本高 | 仅短期容忍，Phase E 前应抽公共模块 |
| 用一个大 prompt 直接生成标题/封面/描述 | 实现最快 | 数字幻觉、风格飘、平台不适配、难审计 | 不建议 |
| 所有平台共用一张封面和一段描述且无 override 结构 | v1 上线快 | 后续平台化只能复制脚本重做 | v1 可接受，但数据结构必须预留 override |
| 把生成产物长期留在 `public/` 和 `src/data/` 里 | 调试方便 | 工作区常脏、基线不清、复现困难 | 仅在 manifest 能标记权威产物时可暂存 |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Remotion composition registry | `Root.tsx`、CLI 脚本、API 可用列表各维护一份 | 收敛到单一 registry，再派生视频/封面/API 暴露 |
| TTS (`edge-tts`) | 文本、voice、输出路径直接拼 shell | 用参数化子进程；限制 voice 白名单；统一输出 manifest |
| LLM 包装素材生成 | 直接喂原始长文案，让模型自由发挥 | 先抽结构化 facts，再生成文案；无证据字段则降级表达 |
| 第三方数字人 / 外部视频接口 | 把失败当异常终止，不保存中间状态 | 记录 job 状态、输入参数、输出路径、失败原因，支持重试 |
| 平台发布素材 | 先生成统一版，后续再“手工适配” | v1 先统一输出，但 schema 预留平台 override 与人工备注 |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| 渲染、TTS、封面导出都跑在单个 API 进程里 | 请求长时间挂起、并发时互相拖死 | 加最小作业队列和异步状态查询 | 一旦开始并行出片或批量补封面就会出问题 |
| 每新增视频就复制一套脚本和配置 | 初期很快，后期修改成本爆炸 | 抽共享模块，保留每视频只配置内容差异 | 大约 5 到 8 个模板后维护成本明显失控 |
| 生成产物无清理和版本归属 | 磁盘涨、引用错、难复现 | 引入 manifest、TTL、清理命令 | 高频试片 1 到 2 周后就会变脏 |
| 首屏视觉元素不断叠加 | 画面复杂但留存不升反降 | 设信息密度预算和安全区检查 | 一旦进入模板化复用，问题会批量复制 |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| TTS shell 拼接执行 | 命令注入、非法文件写入 | 改用参数化子进程，限制 voice/文件名输入 |
| 路径直接由请求体控制 | 路径穿越、覆盖任意文件 | 标准化路径并限制到允许目录 |
| 请求级传第三方 API Key | 密钥泄露到日志、历史、代理 | 统一走服务端环境变量或受控鉴权层 |
| 描述区自动带外链但不校验 | 引错链接、品牌风险、误导用户 | 链接只允许来自 manifest 的 `sourceLinks[]` |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| 首屏先讲背景，不先给结论 | 观众几秒内流失 | 先给最强结论，再给背景与展开 |
| 每屏信息过多 | 看不清、记不住、觉得吵 | 每场景只保留一个主信息和一个支持视觉 |
| 字幕、CTA、平台 UI 互相遮挡 | 关键内容读不到 | 固化安全区并做截图验收 |
| 每条视频开场太像 | 观众形成“批量内容”印象 | 做有限但明确的开场变体池 |
| 封面承诺和正文不一致 | 点击后失望，信任下滑 | 封面/标题 promise 必须在首屏兑现 |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **包装素材生成：** 已有标题/封面/描述，但未校验与旁白中的数字、项目名、链接一致
- [ ] **首屏优化：** 画面更炫了，但 0 到 5 秒内没有兑现封面或标题里的承诺
- [ ] **模板化：** 新模板能在 Studio 里看，但 API/CLI/封面导出没有走同一 registry
- [ ] **字幕同步：** 已生成字幕 JSON，但未校验总帧数、sceneDurations、音频数量一致
- [ ] **平台发布：** 有统一版标题和描述，但没有人工修订位、平台 override 位和表现备注
- [ ] **资产输出：** 有成片和封面，但没有 manifest 指明哪份是最终权威产物

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| 包装素材与视频事实不一致 | MEDIUM | 回滚到最近一次可信 manifest；重新生成标题/封面/描述；补来源链接 |
| 首屏无法兑现标题承诺 | MEDIUM | 不重做全片，只重剪 Scene 1 和封面文案，让 promise 在 3 到 5 秒内落地 |
| 模板化后 registry 漂移 | HIGH | 先冻结新增模板；收敛到单一 registry；逐个恢复视频/封面/API 暴露 |
| 字幕和音频错位 | LOW | 重跑同步脚本；重新生成 manifest；执行预渲染校验后再导出 |
| 自动化链路阻塞或产物混乱 | HIGH | 引入 job manifest；清理目录；给当前产物重建唯一命名与状态记录 |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| 缺少事实层导致标题/封面/描述失真 | Phase A: 内容输入契约与事实抽取 | 同一条视频的标题、封面、旁白、描述字段可由同一 manifest 回溯 |
| 标题党但首屏不兑现 | Phase B: 首屏 Hook 与包装一致性 | 抽查视频时，Scene 1 前 5 秒能明确回应标题承诺 |
| 模板化导致频道同质化 | Phase C: 模板基座与视觉变体 | 新增视频必须从变体池选择，而不是复制旧 composition 改字 |
| 视觉升级破坏可读性和安全区 | Phase D: 视觉升级与平台适配 | 手机预览截图中，主标题/字幕/CTA 均不进入危险区 |
| 音频/字幕/时长错位 | Phase E: 时序同步与渲染质量门禁 | 渲染前自动校验音频、字幕、总帧数与 sceneDurations 一致 |
| 统一版包装无法向平台化演进 | Phase F: 发布素材生成与平台扩展预留 | 输出 schema 已支持 base package + platform override + revision notes |
| 作业阻塞、产物脏、失败难恢复 | Phase G: 渲染链路稳态化与资产治理 | 每次生成都有 job 状态、输出 manifest 和可执行清理策略 |

## Sources

- [HIGH] Repo context: `/Users/qilin.guo/AiProjects/dev-vedio/.planning/PROJECT.md`
- [HIGH] Repo risks: `/Users/qilin.guo/AiProjects/dev-vedio/.planning/codebase/CONCERNS.md`
- [HIGH] Remotion docs, “Animating properties”: https://www.remotion.dev/docs/animating-properties
- [MEDIUM] TikTok For Business, “Creative Codes: 6 principles for creating on TikTok”: https://ads.tiktok.com/business/en/blog/creative-best-practices-top-performing-ads
- [HIGH] TikTok Ads Policy, “Misleading and false content”: https://ads.us.tiktok.com/help/article/tiktok-ads-policy-misleading-and-false-content
- [HIGH] YouTube Help, “YouTube channel monetization policies” (reused / repetitious content): https://support.google.com/youtube/answer/1311392
- [HIGH] YouTube Help, “Test & compare thumbnails”: https://support.google.com/youtube/answer/13861714
- [HIGH] YouTube Help, “Spam, deceptive practices, & scams policies”: https://support.google.com/youtube/answer/2801973

---
*Pitfalls research for: AI 技术短视频创作 / 自媒体视频生产系统*
*Researched: 2026-03-22*
