# SPX Open API 接入助手 · 横屏 Demo 视频文案（电脑播放版）

> 项目: spx-openapi-integration（AI Agent Skill 插件）
> 来源: Shopee SPX Express 物流团队
> 仓库: [https://git.garena.com/shuai.chang/spxopen-partner-collaboration-assistant](https://git.garena.com/shuai.chang/spxopen-partner-collaboration-assistant)
> 官方文档: [https://spx.sg/en/integration/en/guide](https://spx.sg/en/integration/en/guide)

---

## 更新说明（与仓库状态同步）

**最近一次对齐**：跟随仓库 `main` 分支 `d250ee9 Merge branch 'dev/webhook-awb-skills'` 之后的状态同步更新。

关键变化：

1. **项目对外定位改为"纯 Skill 插件"**
   - 仓库 README 已**移除 Web 演示平台的对外宣传章节**，`web/src/` 源码未纳入 git 跟踪
   - 主交付形态：Cursor / Claude Code / Codex / Gemini CLI 插件；Web 仅作为演示入口
   - 本文案中凡涉及 Web 的表述，均从"产品形态"降级为"演示画面"
2. **能力范围扩充（新增 2 个核心能力）**
   - **Webhook 回调** — 8 种 EventType（Tracking / OrderCreate / WeightFee 等），HMAC-SHA256 签名验证，Tracking & WeightFee 自带自动重试（详见 `skills/spx-openapi-integration/references/webhook-callback.md`）
   - **面单 AWB 获取** — `batch_get_shipping_label` V1（按运单号精确获取，单次 ≤500 单）/ V2（异步批次，按 `batch_no` 拉取）（详见 `references/shipping-label.md`）
3. **信息安全红线**
   - SKILL.md 新增全局规则 6："严禁暴露内部代码路径、函数名、类名、文件结构、数据库表名等实现细节"
   - 视频里出现的 Web UI 不得被解读为"产品内部代码"，配音与字幕要把焦点放在"能力"而非"实现"

> 视频画面本身（源 mp4）**没有重录**。这次更新主要是**调整口播文案的定位、CTA 的平台标签、封面底标**和**发布文案**，让其与仓库当前对外口径保持一致；同时借机补充 Webhook 与面单两个已经进入 Skill 主文档的能力。

---

## 0. 视频规格（严格对齐源视频）

| 项 | 值 | 说明 |
| --- | --- | --- |
| 源文件 | `/Users/qilin.guo/Downloads/export-1776409450894.mp4` | 演示母带 |
| **分辨率** | **1920 × 1080** | Full HD 横屏，16:9，适合电脑全屏播放 |
| **帧率** | **60 fps** | 高刷体验，字幕与转场都按 60fps 栅格对齐 |
| **总时长** | **89.65 s**（约 1 分 30 秒） | 上线时按 90 秒目标规划 |
| 编码 | H.264 | 码率 ~3.2 Mbps |
| 配音时长预算 | ~280–320 字（中文 3.3–3.6 字/秒） | 留白 2–3 秒用于转场和按钮点击音效 |
| 输出比例 | 16:9 横屏 | 与源视频完全一致，封面使用同比例 1920×1080 或 1920×1440（带标题安全区） |

---

## 1. 视频概要

这是一支**产品 Demo 短片**，核心目的是让"要对接 SPX Express 物流 OpenAPI 的开发者"在 90 秒内看懂：

1. 我是谁 —— **SPX OpenAPI 接入助手**，一个可以装进 Cursor / Claude Code / Codex / Gemini CLI 的 AI Agent Skill，视频里看到的是它的**演示界面**
2. 我能做什么 —— 六大能力（产品选型 / 示例代码 / 业务知识速查 / 接入质量评估 / 问题排查 / Onboarding 引导），并已把 **Webhook 回调 + 面单 AWB 获取**纳入产品选型与知识速查
3. 四个真实场景是怎么跑的 —— **代码质量检查 → 请求参数预检查 → 对接代码生成 → 调用报错分析**

与之前的 9:16 竖屏宣传片（`docs/spx-openapi-video-copy.md`）不同，这一版是**横屏实操 Demo**：主画面就是真实的产品 UI，配音只负责"讲清楚"而不是"喊口号"。

**一句话定位**：不是让 AI 帮你编造 API 参数，而是让 AI 像一个资深物流接入顾问一样，直接帮你打分、查错、生成代码、定位根因，Webhook 和面单一起到位。

---

## 2. 核心痛点（口播埋点用，不一定念完）

- **签名认证复杂**：HMAC-SHA256 + `{app_id}_{timestamp}_{random_num}_{body}` 拼串顺序，任何一位错 → `ret_code: 10002`（请求侧和 Webhook 回调侧**用的是同一套签名规则**）
- **七市场字段差异**：VN 的 `recipient_name / recipient_phone / recipient_address` 必填，同一套代码跑 SG/MY/TH/VN/ID/PH/TW 100% 翻车
- **接入无评分**："接好了吗？""差不多了。" —— 没有量化标准
- **报错靠猜**：`INVALID_PARAM` 到底是哪个字段、哪个层级出错？群里问半天
- **Webhook 靠猜**：8 种 EventType 只有 Tracking 和 WeightFee 有自动重试，其他失败不会再来 —— 错过就是错过
- **面单取号两套接口**：`batch_get_shipping_label` V1（按运单号）和 V2（按 batch_no）场景不同，用错就 500 条限制踩坑

---

## 3. 目标受众

- 正在对接或即将对接 SPX Express Open API 的开发者
- 管理多市场物流接入的技术负责人
- 3PL / ERP 厂商的技术团队
- 对 AI Agent 在企业开发者工具中的落地形态感兴趣的技术从业者

---

## 4. 视频时间轴总览（严格对齐源视频帧）

| 段 | 时间 | 画面 | 关键词 | 口播字数 |
| --- | --- | --- | --- | --- |
| S1 | 0 – 5 s | 打开演示界面，侧边栏 11 个能力一览 | Hook · 产品亮相 | ~18 字 |
| S2 | 5 – 10 s | 鼠标滑到"代码质量检查"，hover 高亮 | 能力分组讲解 | ~18 字 |
| S3 | 10 – 28 s | 代码质量检查：粘贴 PHP 接入代码 → AI 分析 → 诊断报告 45/100 / C 级 | 5 维度量化评分 | ~55 字 |
| S4 | 28 – 55 s | 请求参数预检查：粘贴 VN 市场 batch_create_order JSON → 3 个必填字段缺失 | 市场差异 · 必填校验 | ~80 字 |
| S5 | 55 – 75 s | 对接代码生成：输入"生成 Python 调用 batch_create_order" → HMAC-SHA256 签名 + 完整示例 | 代码索引式检索 · Webhook/面单同签名 | ~62 字 |
| S6 | 75 – 86 s | 调用报错分析：粘贴 `INVALID_PARAM` → AI 定位 `orders[0].recipient_name` 为空 | 根因分析 · 修复建议 | ~42 字 |
| S7 | 86 – 89.65 s | 收尾字幕 + 安装入口 | CTA · Skill 四端安装 | ~15 字 |
| **合计** | **≈ 89.65 s** | | | **≈ 290 字** |

---

## 5. 逐段配音文案 + 画面编排

### 场景 1 · Hook（0 – 5 s，~18 字）

**画面**：浏览器打开 SPX OpenAPI 接入助手的深色演示界面全景（源视频中为本地 `localhost:5180` 的演示入口，上线发布时隐去地址栏即可）。

**配音文案**：

> 对接物流 API，签名、参数、报错、七个市场、Webhook、面单……每一关都容易翻车。

**画面编排**：

- 首帧（0.0s）：全界面淡入（`fade-in 400ms`）
- 0.5s：左侧栏 `SPX OpenAPI` Logo + 11 个按钮 **stagger** 由上到下划入（每项 60ms 间隔）
- 右上角叠加英文副标 `SPX OPEN API · INTEGRATION ASSISTANT`（字号 40px，青色 `#06b6d4`，`letterSpacing: 12`）
- 底部浮层右下角打出小字 `AI Agent Skill · Cursor / Claude Code / Codex / Gemini CLI`（次要色 `#64748b`，fontSize 18）—— 明确这是 Skill 插件的演示界面，而不是一个独立产品

**字幕/叠加**：

- 画面左上角轻量角标 `DEMO · LIVE`（红点 + 脉冲动画）
- 无额外数字冲击，保持"真实产品界面"的观感
- 剪辑侧注意：**源视频中浏览器地址栏带有 `localhost:5180`，发布前请用黑色蒙版或模糊条遮住地址栏**（避免观众误以为这是对外 SaaS 入口）

---

### 场景 2 · 能力全景（5 – 10 s，~18 字）

**画面**：鼠标从顶部滑过左侧 11 个按钮，依次高亮"代码工具 / 校验工具 / 调试工具 / 咨询服务"四个分组（参考 `f1s_004`）。

**配音文案**：

> 整套接入流程被拆成四组能力：代码、校验、调试、咨询，全都在侧边栏里。

**画面编排**：

- 5.0s：鼠标从 `工作台` 滑到 `代码质量检查`，途经的每个按钮**依次亮起 200ms**（青色左边框）
- 右侧主内容区保持模糊/暗化（`opacity: 0.4 + blur(2px)`），让观众视线集中在侧边栏
- 浮层字幕（右侧中间位置）依次 stagger 打出四组小卡片（`fade-in-up 300ms` + `delay 0.8s/组`）：

| 分组 | 中文 label | icon | 代表能力 |
| --- | --- | --- | --- |
| 代码工具 | `代码` | `</>` | 对接代码生成（Order / Webhook / AWB 全覆盖） |
| 校验工具 | `校验` | `✓` | 质量检查 · 参数预检 · 签名 · 质量评估 |
| 调试工具 | `调试` | `⚡` | 报错分析 · 错误码速查 · 沙箱辅助 |
| 咨询服务 | `咨询` | `?` | 对接方案咨询（产品选型 / Onboarding 引导） |

**字幕**：右上角同步打出小字 `11 capabilities · 4 groups · 1 Skill`

---

### 场景 3 · Demo 1 · 代码质量检查（10 – 28 s，~55 字）

**画面**：点击"代码质量检查"，页面切换到代码质量检查详情页，示例输入栏已有 PHP 代码（`$appId = '100461'; $appSecret = 'ba37cc...'`），点击"AI 分析"按钮，下方 `AI 分析结果` 面板出现"正在分析..."，随后流式输出诊断报告。

**配音文案**（分三段，跟着画面节奏）：

> 【10-16s · 粘代码】先看第一个场景 —— 代码质量检查。把对接代码粘进来，一键分析。
>
> 【16-22s · 评分出来】AI 从五个维度打分，这段代码只有 45 分、C 级，不建议上线。
>
> 【22-28s · 滚问题】密钥硬编码、没有监控日志、`var_dump;die()` 会中断业务……问题逐条列出，修复建议直接给。

**画面编排**：

- 10.0s：侧边栏 `代码质量检查` 选中高亮 → 主内容区滑入（`slide-in-from-right 350ms`）
- 11.0s：顶部标题 `代码质量检查` + 蓝色 `validate` 标签淡入，下方简介一行："检查 SPX OpenAPI 对接代码的质量，包含签名实现、错误处理、重试机制、幂等性等维度评估"
- 12.0s：光标点击紫色 `AI 分析` 按钮 → 按钮变为 `AI 分析中…` + 青色 spinner
- 13.5s：底部 toast 气泡 `spx_code_quality_check done`（绿色背景 + ✓）
- 14.0s：`AI 分析结果` 面板开始**流式打字**输出标题 **"SPX OpenAPI 接入代码质量诊断报告"**（typewriter 40ms/字）
- 16.0s：打出核心数字：
  - `总分 45 / 100` → **右侧红色大字** `45` 用 `numberCountUp` 从 0 数到 45（1.2s）
  - `评级 C` → 大写字母 C 以**红色圆章**盖下，轻微旋转 `rotate(-8deg)` + `scale 1.2 → 1.0`
  - 右侧叠加文字 `不适合直接上线`（红色，fontSize 28）
- 18 – 22s：下方展开五个扣分项（stagger 淡入，每项 200ms）：
  - `❌ 密钥硬编码，存在安全泄露风险`
  - `❌ 缺少完整错误处理`
  - `❌ 没有监控日志与告警`
  - `❌ 未设置超时与重试，稳定性不足`
  - `❌ 调试代码 var_dump(...);die() 会直接中断流程`
- 22 – 28s：右侧小面板滚动显示**修复建议**（代码高亮样式）：

```text
建议
  先判断 cURL 是否执行成功
  再检查 HTTP 状态码
  再解析业务字段，如 ret_code / message
  对可重试错误增加指数退避重试
```

- 整段背景：左侧栏稍暗，右侧内容区的 `AI 分析结果` 面板有微弱青色光晕（`box-shadow 0 0 60px rgba(6,182,212,0.12)`）

**字幕叠加**：

- 16s：右上角浮出一枚成绩单式徽章 `D1 签名 · D2 流程 · D3 Webhook · D4 错误 · D5 市场` 5 维度（小字，fontSize 16，青色）
- 20s：右上角小字 `45 / 100 · Grade C` 持续显示到本场景结束

---

### 场景 4 · Demo 2 · 请求参数预检查（28 – 55 s，~80 字）

**画面**：切到"请求参数预检查"，先粘贴一段 **越南（VN）市场完整 batch_create_order 请求体**（f1s_038），随后精简为更小的 JSON（f1s_048），点击 AI 分析，最终输出校验结论：缺 3 个必填字段。

**配音文案**（分四段）：

> 【28-34s · 切页+粘 VN 请求体】第二个场景 —— 请求参数预检查。把要发给 batch_create_order 的 JSON 粘进来。
>
> 【34-42s · 强调市场差异】我们这里选的市场是越南 VN，VN 的收件人姓名、电话、地址是必填，跟新加坡、马来西亚都不一样。
>
> 【42-50s · AI 分析中】工具会自动识别接口是 batch_create_order、市场是 VN，对着字段规则一条条检。
>
> 【50-55s · 结果】结论直接告诉你：orders 第 0 条里的 `recipient_name`、`recipient_phone`、`recipient_address` 三个必填字段为空 —— 上线前必须补齐。

**画面编排**：

- 28.0s：侧边栏 `请求参数预检查` 选中，主内容区切换（`slide 350ms`）
- 29.0s：标题 `请求参数预检查` + 紫色 `validate` 标签
- 30.0s：输入框区域：示例 chip `{"orders":[{"order_type": 1, "recipient_name": ...}]}` 点击 → 文本框自动填入**完整 VN 市场请求体**（JSON 预高亮，青色关键字）
- 30 – 34s：文本框逐行打字机动画显示 JSON：

```json
{"list":[{"base_info":
  {"order_type":1,"product_id":53001,"three_pl_name":"SPX","product_name":"Standard Service","create_method":1},
  "deliver_info":{"deliver_name":"Trinh Trinh",
    "deliver_phone":"84934072267",
    "deliver_address_id":"2045026040667682304",
    "deliver_country":"VN",
    "deliver_state":"TP. Hồ Chí Minh",
    ...
}}]}
```

- 34s：JSON 里的关键字 `VN`、`deliver_state`、`deliver_city`、`deliver_district` 依次高亮成黄色 `#f59e0b`（spotlight 动画）
- 35 – 40s：右侧浮层对比卡（小字，在 JSON 右侧 300×240）：

```text
市场差异速查
  MY  保价字段    parcel_value 必填
  TH  保价精度    最多 2 位小数
  VN  保价金额    必须整数
  VN  收件人三件套 recipient_name/phone/address 必填
```

该卡片在 42s 消失（`fade-out 300ms`）

- 42.0s：点击 `AI 分析` 按钮（紫色） → 变为 `AI 分析中…`
- 43.0s：toast 气泡 `spx_request_validate done`（绿色）
- 44.0s：`AI 分析结果` 面板开始流式输出：

```text
一、校验结论

API:   batch_create_order
市场:  VN
结果:  ❌ 存在必填字段缺失

工具检出以下 3 个必填字段缺失：
  1. orders[0].recipient_name
  2. orders[0].recipient_phone
  3. orders[0].recipient_address
```

- 50 – 55s：**3 条缺失字段** 以**红色警示卡**依次 `slide-in-right` 浮出（stagger 250ms，每条 120×40 带 ❌ 图标）
- 最后一条浮现后，整段卡片组整体**脉冲一次** `pulse-glow 400ms`（红色）

**字幕叠加**：

- 30s：右上角打出市场徽章 `🇻🇳 VN · Vietnam`（fontSize 20，圆角标签，深红底青字）
- 44s：右上角叠加小字 `Market-aware validation · 7 markets supported`
- 55s（场景尾）：右下角角标 `Missing required fields: 3`（红色小卡）

---

### 场景 5 · Demo 3 · 对接代码生成（55 – 75 s，~62 字）

**画面**：切换到"对接代码生成"（f1s_060、f1s_065、f1s_070、f1s_073），示例 chip 可选 `生成 Python 调用 batch_create_order 的完整示例...` / `用 Java 写一个 SPX 签名工具类` / `生成 Go 语言的 SPX OpenAPI 客户端`，点击第一个 chip 后文本框填入，点击 AI 分析，输出签名格式 `HMAC-SHA256({app_id}_{timestamp}_{random_num}_{body})` 和完整 Python 代码。

**配音文案**（分三段）：

> 【55-62s · 切页+选模板】第三个场景 —— 对接代码生成。不用敲题干，点一下"生成 Python 调用 batch_create_order"就行。
>
> 【62-70s · 签名格式】注意这里 —— 签名是 HMAC-SHA256，四段下划线拼接，顺序错一位就 10002。Webhook 回调的验签、面单接口的调用，用的是同一套规则。
>
> 【70-75s · 完整代码】然后给完整的 Python 代码：签名生成、SPX API Client、batch_create_order 调用、基础错误处理和日志，都在里面。

**画面编排**：

- 55.0s：侧边栏 `对接代码生成` 选中 → 主内容区切换
- 56.0s：顶部简介："根据指定的 API 和编程语言，生成完整的 SPX OpenAPI 对接代码，含签名算法、HTTP 客户端、错误处理"
- 57.0s：三个示例 chip 横排（紫色圆角标签）：
  - `生成 Python 调用 batch_create_order 的完整示例...`（左）
  - `用 Java 写一个 SPX 签名工具类`（中）
  - `生成 Go 语言的 SPX OpenAPI 客户端`（右）
- 57.5s：光标 hover 左侧 chip → chip 轻微上浮 `translateY(-2px)` + 青色描边
- 58.0s：点击左侧 chip，文本框自动填入 `生成 Python 调用 batch_create_order 的完整示例代码`（单行，青色字）
- 60.0s：点击紫色 `执行 对接代码生成` 按钮 → 变 `AI 分析中…`
- 61.5s：toast `spx_code_generate done`（绿色）
- 62.0s：`AI 分析结果` 面板开始输出，首行大字用**等宽金色字体**显示：

```
Signature format:

HMAC-SHA256({app_id}_{timestamp}_{random_num}_{body})
```

（`font-family: "JetBrains Mono"`、`fontSize: 30`、`color: #ffd700`、`letterSpacing: 1`，下方分割线 40 个 `─` 逐字绘制）

- 65 – 70s：签名公式下方**高亮四段字段**（类似标签气泡）：
  - `app_id` 青色
  - `timestamp` 紫色
  - `random_num` 金色
  - `body` 红色
  逐段 `fade-in-up` stagger 150ms
- 70.0s：代码面板继续输出 Python 代码（monospace 青色主题）：

```python
def generate_signature(app_id: str, secret_key: str, body: str) -> Dict[str, str]:
    """generate SPX OpenAPI signature."""
    timestamp = str(int(time.time()))
    random_num = str(random.randint(10000, 99999))
    # 保持签名用的 body 字符串与实际请求体一致
    sign_string = f"{app_id}_{timestamp}_{random_num}_{body}"
    ...
```

（**注**：代码注释使用中文，保持与项目规约一致）

- 70 – 75s：右侧浮出**语言切换器** mini 卡片（fontSize 16，等宽）：

```
Python ▮   Java   Go   Node.js   PHP   cURL
```

（6 种语言一字排开，Python 高亮青色边框 + 钩号）

**字幕叠加**：

- 60s：右上角小字 `Retrieval-only · 从代码模板库检索 · 不从零生成`
- 67s：追加一行 `Same signature for Request & Webhook & AWB`（青色小字，fontSize 16）—— 让观众知道"学会一次，打通三个链路"
- 70s：右上角追加 `6 languages · 25 APIs · Webhook + AWB`

---

### 场景 6 · Demo 4 · 调用报错分析（75 – 86 s，~42 字）

**画面**：切到"调用报错分析"（f1s_075），示例 chip 有三个：`调用 batch_create_order 返回 {"ret_code": -1, "ret..."`、`请求签名校验失败，时间戳的毫秒级、签名算法用...`、`批量下单接口返回 INVALID_PARAM，请求体是 {"or...`。用户选第三个 chip 粘贴错误（f1s_085、f1s_089），AI 输出根因结论。

**配音文案**（分两段）：

> 【75-81s · 切页+粘报错】第四个场景 —— 调用报错分析。把报错信息和请求体一起粘进来。
>
> 【81-86s · 结论】AI 直接告诉你：不是签名、不是网络，是 orders 里第 0 条的 `recipient_name` 是空字符串 —— 这一条就是根因。

**画面编排**：

- 75.0s：侧边栏 `调用报错分析` 选中（图标是 🚨 或闪电），主内容区切换
- 76.0s：顶部标题 `调用报错分析` + 蓝色 `debug` 标签
- 77.0s：三个示例 chip 依次 `fade-in-up` 显示：`ret_code: -1` / `签名校验失败` / `INVALID_PARAM`
- 78.0s：点击第三个 chip → 文本框填入：`批量下单接口返回 INVALID_PARAM，请求体是 {"orders":[{"recipient_name":""}]}`
- 79.0s：点击 `执行 调用报错分析` 按钮
- 80.5s：toast `spx_error_analysis done`（绿色）
- 81.0s：`AI 分析结果` 面板首段结论**高亮金色框**输出（单行大字）：

```
已分析，这个错误的根因非常明确：
recipient_name 为空字符串，触发了批量下单接口的参数校验失败，
返回 INVALID_PARAM。
```

- 82.5s：下方输出 **一、错误结论** 分块卡片：

```
一、错误结论

你的请求体：
  {"orders":[{"recipient_name":""}]}

问题点：
  orders[0].recipient_name 为空
  该字段通常是收件人姓名必填项
  即使字段存在，只要值为空字符串，也会被视为无效参数
```

- 83 – 86s：问题点中的 `recipient_name`、`为空`、`无效参数` 依次**红色下划线扫过**（类似荧光笔）；请求体 JSON 里的 `""` 空字符串被画一个**红色圆圈**高亮

**字幕叠加**：

- 81s：右上角打出 `Decision tree · auto-route to Playbook`（小字，青色）
- 85s：右上角追加 `6 Playbooks · signature / order / webhook / label / fee / market`（次要色）——**注意**：这 6 本 Playbook 与最新仓库中的 `references/webhook-callback.md`、`references/shipping-label.md` 一一呼应，是真实可索引的知识

---

### 场景 7 · 收尾 CTA（86 – 89.65 s，~15 字）

**画面**：全屏轻微暗化（维持演示界面底图），中间浮出大字金句，底部打出 Skill 安装入口。

**配音文案**：

> 以前靠经验，现在靠评分。装进 Cursor、Claude Code，让 AI 当你的物流接入副驾驶。

**画面编排**：

- 86.0s：主界面整体 `opacity 1 → 0.35` + `blur 0 → 4px`，700ms 缓出
- 86.3s：屏幕中央浮出金句（两行，上下行不同色）：
  - 第一行：**`以前靠经验，现在靠评分`**（青→紫 linear-gradient，fontSize 72，fontWeight 900，letterSpacing 2）
  - 第二行：**`让 AI 当你的物流接入副驾驶`**（白色，fontSize 40，fontWeight 600）
  - 入场：`fade-in-up 500ms` + `slight blur-out 0 → 0`
- 87.5s：金句下方一行小字（青色，等宽）：

```
SPX OpenAPI · 6 能力 · 7 市场 · 25 API · 40 项检查 · Webhook + AWB
```

（`numberCountUp` 效果，数字从 0 弹到目标值，spring 回弹）

- 88.5s：底部安装入口（圆角黑色面板 + 青色边框，**两行等宽命令**，强调四端统一入口）：

```bash
$ claude plugin install spx-openapi-integration
# 或在 Cursor / Codex / Gemini CLI 中同名安装
```

（等宽 monospace，`typewriter 40ms/字` 敲出来）

- 89.0s：左下角打出平台图标小字 `Cursor · Claude Code · Codex · Gemini CLI`（去掉之前的 "· Web"，对齐最新 README 的对外口径）
- 89.65s：整体 fade-to-black 200ms 收尾

**字幕叠加**：

- 右上角常驻（全片最后 3 秒出现）：仓库链接 `git.garena.com/shuai.chang/spxopen-partner-collaboration-assistant`（fontSize 14，次要色）

---

## 6. 视觉风格建议（横屏版）

### 6.1 色彩方案

沿用演示界面的实际配色，减少额外装饰，以免与产品 UI 打架：

```
backgroundColor    #070a10   深蓝黑（与演示界面一致）
accentColor        #06b6d4   青色（主色，按钮 / 高亮）
secondaryColor     #3b82f6   蓝色（次要操作）
highlightColor     #8b5cf6   紫色（执行按钮 / 品牌 hover）
successColor       #10b981   绿色（toast done / 通过）
dangerColor        #ef4444   红色（错误 / 缺失字段 / 评分不合格）
warningColor       #f59e0b   琥珀（市场差异高亮）
goldColor          #ffd700   金色（签名公式 / 核心数字）
mutedTextColor     #64748b   次要文字
textColor          #e2e8f0   正文
cardBg             rgba(6, 182, 212, 0.08)    面板背景
cardBorder         rgba(6, 182, 212, 0.24)    面板边框
```

### 6.2 安全区（1920×1080）

- 上下各留 **60 px** 字幕安全区
- 左右各留 **120 px** 文字安全区（避免 16:9 → 16:10 / 21:9 裁切时损失字幕）
- 右上角 HUD 区域固定为 `right: 80px; top: 80px; width: 420px`

### 6.3 字幕与叠加规则

| 层 | 字号 | 颜色 | 用途 |
| --- | --- | --- | --- |
| 主字幕（口播同步） | 36 px | `#e2e8f0` + 2px 黑色描边 + 下阴影 | 字幕底部，每行 ≤ 22 字 |
| 数据徽章（右上角） | 18 px | `#06b6d4` 等宽 | 持续 3–5 s，停留不碰字幕 |
| 大金句（CTA） | 72 / 40 px | 青→紫渐变 + 白色 | 仅场景 7 使用 |
| 代码/JSON 高亮 | 22 px | 等宽，主题跟演示 UI 一致 | AI 面板内部 |

### 6.4 过渡与动效

- **场景之间**：`slide-left 350ms ease-in-out`（与侧边栏点击切换保持一致，不用花哨特效）
- **AI 输出**：流式打字 `typewriter 35–45ms/字`，遇到核心数字用 `numberCountUp`
- **数据冲击**：只在三处使用 `pulse-glow`：
  1. 场景 3 的 `45 / 100 · C` 评分
  2. 场景 4 的 3 条缺失字段卡片
  3. 场景 6 的根因结论金色框
- **背景**：不加动态粒子/扫描线，让真实产品 UI 说话

---

## 7. 封面设计要素（1920×1080）

封面与视频同比例，配主标题 + 核心数字 + 产品截图：

### 7.1 布局（左图右文）

- 左 60%：演示界面主截图（场景 1 首帧，带轻微柔边阴影；发布前把浏览器地址栏遮掉）
- 右 40%：文案区

### 7.2 文案

- **顶部英文标签**（fontSize 36，青色，letterSpacing 14）：
  `SPX OPEN API · INTEGRATION ASSISTANT`
- **主标题**（fontSize 120，fontWeight 900，青→紫渐变）：
  **物流 API 接入，让 AI 当副驾驶**
- **副标题**（fontSize 44，白色）：
  质量检查 · 参数预检 · 代码生成 · 报错分析
- **核心数字条**（4 格，等距，fontSize 56 金色 + 14 灰色 label）：
  `7 Markets · 40 Checks · 6 Playbooks · 8 Steps`
  - 可选备用版（新能力强调）：`7 Markets · 25 APIs · Webhook × 8 · AWB V1/V2`
- **底部平台标签**（fontSize 22，次要色）：
  `Cursor · Claude Code · Codex · Gemini CLI`（按最新 README 口径，不再单独列 Web）

---

## 8. 发布文案（横屏 Demo 版）

### 8.1 B 站 / YouTube · 横屏视频标题

**主标题**（≤30 字）：
90 秒看懂 SPX 物流 API 接入助手 · AI 从评分到报错全搞定

**备选**：

- SPX OpenAPI Agent Skill · 90 秒四场景实录
- AI 帮你打分、查错、写代码：SPX 物流接入实录
- 装进 Cursor 的物流接入副驾驶 · SPX OpenAPI Skill 演示

### 8.2 视频描述

```text
SPX Open API 接入助手 · 90 秒 Demo

一个装进 Cursor / Claude Code / Codex / Gemini CLI 的 AI Agent Skill，
覆盖 SG / MY / TH / VN / ID / PH / TW 七个市场、三种接入角色、
25 个 API 端点，包括 Webhook 回调和面单 AWB 获取。

视频里演示的四个真实场景：
1) 代码质量检查 —— 粘 PHP 代码，AI 五维评分，告诉你为什么只有 45 分 C 级
2) 请求参数预检查 —— VN 市场 batch_create_order 参数体，AI 检出 3 个必填字段缺失
3) 对接代码生成 —— 一键生成 Python HMAC-SHA256 签名 + 完整客户端
                    （同一套签名也用于 Webhook 验签和面单接口）
4) 调用报错分析 —— INVALID_PARAM 报错，AI 直接定位 orders[0].recipient_name 为空

核心设计原则：
→ 代码只从模板库检索，不从零生成
→ 先确认市场和角色，不做默认假设
→ 5 维度评分 · A/B/C/D 评级 · 75 分以上才建议上线
→ 严禁暴露实现细节，只谈对外字段与能力

安装：
  claude plugin install spx-openapi-integration
  （Cursor / Codex / Gemini CLI 可同名安装，详见仓库 README）

仓库: https://git.garena.com/shuai.chang/spxopen-partner-collaboration-assistant
官方文档: https://spx.sg/en/integration/en/guide

#SPX #物流API #AgentSkill #AI开发工具 #Cursor #ClaudeCode #Webhook #面单 #东南亚物流 #API接入
```

### 8.3 微信视频号 / 抖音 · 横屏切竖版适配

若需要从横屏裁剪出 9:16 二创，保留中央 1080×1920 区域即可，**左侧栏会被裁掉**，建议单独套用 `docs/spx-openapi-video-copy.md`（原竖屏版）。

---

## 9. 实现建议

### 9.1 如用 Remotion 实现

- Composition ID: `SPXOpenAPILandscape`
- 分辨率: **1920 × 1080**，帧率 **60 fps**，时长 **89.65 s → 5 379 frames**（按 60fps 舍入为 5 380 frames）
- 场景组件拆成 7 个（`S1Hero` / `S2Grid` / `S3QualityCheck` / `S4ParamValidate` / `S5CodeGen` / `S6ErrorAnalysis` / `S7CTA`）
- Demo 画面建议采用**真实 Web 截屏 + 前景字幕层**两种混合方式：
  - 方案 A（简单）：把源视频作为 `<OffthreadVideo>` 放在底层，Remotion 只在上面叠字幕和数字徽章 —— 成本最低，1 天可交付
  - 方案 B（精修）：用 `<Img>` 堆叠多张截屏，配合 `interpolate` 做切换，可以完全重制每一帧 —— 适合需要本地化到英文/其他语言
- 字体建议：`Inter` 或 `PingFang SC`（标题），`JetBrains Mono` / `SF Mono`（代码 / 签名公式）
- 封面组件 `SPXOpenAPILandscapeCover`：1920 × 1080，纯 PNG 导出

### 9.2 直接交付给 capcut / Premiere

如果不走 Remotion，而是基于源视频剪辑字幕：

1. 把 `docs/spx-openapi-video-copy-landscape.md` 的"逐段配音文案"导出成 SRT
2. 时间戳按 S1–S7 的分段标注，每段内部按标点换行
3. 字幕样式：底居中，白色 + 2px 黑描边，字号 36 px，行距 1.3
4. 右上角数据徽章单独做 Motion Graphics，约 12 条微型文本动效

---

## 10. 与竖屏版（9:16）的差异对照

| 维度 | 横屏版（本文件） | 竖屏版（`docs/spx-openapi-video-copy.md`） |
| --- | --- | --- |
| 分辨率 | 1920 × 1080 | 1080 × 1920 |
| 时长 | 89.65 s | ~150 s |
| 形态 | 产品 Demo，直接展示演示 UI | 概念宣传，用图形化面板讲故事 |
| 主画面 | 真实的产品操作录屏 | Remotion 自绘的卡片 / 评分仪表 / 决策树 |
| 口播密度 | ~290 字，更克制，留呼吸 | ~380 字，强节奏推进 |
| 目标渠道 | 电脑端观看：B 站 / YouTube / 企业官网 / 开发者分享 | 手机端信息流：视频号 / 抖音 / 小红书 |
| 使用时机 | 客户 Demo、技术分享、产品官网 Hero 视频 | Marketing 投放、短视频引流 |

两份文案互为补充：本文件让已经对"SPX OpenAPI 接入助手"有初步兴趣的人**看懂它怎么用**；竖屏版让路过的人**对它产生兴趣**。

> ⚠️ 注意：竖屏版 `docs/spx-openapi-video-copy.md` 是在仓库旧版本基础上撰写的，其中 `6 Playbooks` / `8 Steps` / `5 维度评分` 等关键数据已经与当前仓库 `main` 分支一致，可以直接沿用；但竖屏版里对"插件安装"段落使用了 `git clone ... ~/.cursor/plugins/local/` 这种手动克隆方式，与新 README 推荐的 `claude plugin install spx-openapi-integration` 略有差异，若要配合本横屏版发布，建议同步更新。

---

## 11. 更新日志

| 日期 | 对应仓库状态 | 主要变化 |
| --- | --- | --- |
| 2026-04-17（首次生成） | 仓库初版 Web Demo（含 `web/src/`） | 按源视频逐帧生成 7 场景横屏文案 |
| **2026-04-17（本次更新）** | `main` @ `d250ee9`（`dev/webhook-awb-skills` 合并后） | 1) 将定位从"Web 演示平台"改为"Skill 插件（含演示界面）"；2) 在视频痛点/场景5/字幕/发布文案中增加 Webhook 回调与面单 AWB 的新能力提及；3) 清理 `pi-mono runtime` / `v2.0.0` / 底部平台标签 `· Web` 等历史引用；4) CTA 入口改为 `claude plugin install`；5) 补充剪辑注意事项（遮挡 `localhost:5180` 地址栏） |
