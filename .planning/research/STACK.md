# Stack Research

**Domain:** AI 技术短视频创作 / 自媒体视频生产系统（brownfield，聚焦模板化、前三秒吸引力、统一发布素材）
**Researched:** 2026-03-22
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| Node.js | 24 LTS | 运行时、脚本执行、渲染 worker 基座 | 2026 年处于 Active LTS，适合生产；对现有 `tsx + Express + Remotion` 足够稳定，不需要切 Bun/Deno。 | HIGH |
| Remotion + `@remotion/*` | 4.0.438 | 视频渲染、封面 Still、字幕、转场、服务端渲染 | 这是现有系统的正确核心，不该替换；Remotion 官方文档明确要求所有 `@remotion/*` 与 `remotion` 保持同一精确版本，适合继续增量演进。 | HIGH |
| React | 19.2.4 | Composition/Scene 组件层 | 保持 React 组件化表达能力，最适合现有 scene 体系、封面 Still 和共享 UI 片段复用。 | MEDIUM |
| TypeScript | 5.9.3 | 模板契约、脚本与 API 类型统一 | 当前仓库已严格 TS 化；继续把“文案输入 -> 结构化场景数据 -> 发布素材输出”做成类型闭环，能明显降低模板化重构风险。 | HIGH |
| Express | 5.2.1 | 薄 API 编排层 | 保留现有 API 层即可，足够承接“生成标题/描述/封面文案 + 触发渲染 + 查询任务状态”；不值得为此重写到 Nest/Fastify。 | HIGH |
| Zod | 4.3.6 | 单一数据契约：输入文案、模板参数、标题/描述/封面输出 | 这是 brownfield 里最该升级的一层。把脚本、API、composition props、发布素材都收敛到同一套 schema，模板化才不会继续复制粘贴。 | HIGH |
| OpenAI Node SDK | 6.32.0 | 结构化生成标题、描述、封面文案、首屏 hook 元素 | 2026 官方主路径已经是 Responses API + Structured Outputs。对“社媒文案 -> 稳定 JSON 输出”非常合适，比手写 prompt + 正则/parsing 更稳。 | HIGH |

### Supporting Libraries

| Library | Version | Purpose | When to Use | Confidence |
|---------|---------|---------|-------------|------------|
| `@remotion/fonts` | 4.0.438 | 生产级字体加载与管理 | 所有正式渲染都应使用本地托管字体，尤其是封面大字、Hook 首屏和数字型标题。不要再把字体加载散落在各 composition 中。 | HIGH |
| `@remotion/shapes` | 4.0.438 | 可复用 SVG 形状、箭头、标签、图形装饰 | 用于统一 HUD 边框、箭头、评分条、对比卡、数据徽章等视觉模块，减少手搓 `div + border`。 | HIGH |
| `@remotion/motion-blur` | 4.0.438 | 运动模糊、残影感 | 只用于前三秒 kinetic text、冲击转场、数字飞入等高速片段；正文场景不要滥用。 | HIGH |
| `@remotion/transitions` | 4.0.438 | 统一场景转场基础设施 | 仓库已在用，但应该收敛成共享 preset，而不是每个 composition 自己写一套。 | HIGH |
| `BullMQ` | 5.71.0 | 持久化任务队列 | 当 API 开始承担“生成文案 -> TTS -> 字幕同步 -> 封面 -> 成片”异步链路时引入；如果仍是单人本地 CLI 主流程，先不要加。 | MEDIUM |
| `ioredis` | 5.10.1 | BullMQ 的 Redis 连接层 | 仅在引入 BullMQ 后使用；不要提前把 Redis 引入单机脚本链路。 | MEDIUM |
| `pino` | 10.3.1 | 结构化日志 | 当渲染和文案生成通过 API 暴露后，用于按 `jobId` 串联日志，比 `console.log` 更适合查失败点。 | MEDIUM |
| `pino-http` | 11.0.0 | HTTP 请求日志 | API 开始提供异步渲染和任务查询后再加，和 `pino` 一起用。 | MEDIUM |
| `vitest` | 4.1.0 | 单元测试 | 用来测 schema、文案归一化、模板编译器、标题长度约束、封面文案选择器。不要把这些逻辑留给人工眼测。 | MEDIUM |
| `@vitest/coverage-v8` | 4.1.0 | 覆盖率 | 给模板编译和发布素材逻辑补覆盖率，不需要引入更重的 Jest。 | MEDIUM |
| `sharp` | 0.34.5 | 图片处理、缩略图检查 | 用于封面导出后做尺寸校验、裁切、平台适配派生。 | MEDIUM |
| `pixelmatch` | 7.1.0 | 关键帧视觉回归对比 | 对 `frame 0`、封面图、字幕安全区等关键输出做像素级回归，适合模板化改造后的防回退。 | MEDIUM |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| `tsx` | 继续执行现有脚本体系 | 保留现有 `scripts/*.ts` 模式，不迁移到 Python-first 或复杂构建器。 |
| `npm` + 精确版本锁定 | 依赖管理 | 对 Remotion 相关包必须去掉 `^`，统一锁到同一 patch 版本。 |
| `.nvmrc` | 锁 Node 运行时 | 建议固定到 `v24`，避免本机和 CI 之间的渲染差异。 |
| `Vitest + pixelmatch` | 自动化回归 | 单元测试测“数据契约”，视觉回归测“模板观感”，两者都要。 |

## Installation

```bash
# Core
npm install react@19.2.4 react-dom@19.2.4 express@5.2.1 zod@4.3.6 openai@6.32.0 remotion@4.0.438 @remotion/bundler@4.0.438 @remotion/captions@4.0.438 @remotion/cli@4.0.438 @remotion/renderer@4.0.438 @remotion/transitions@4.0.438 @remotion/fonts@4.0.438 @remotion/shapes@4.0.438 @remotion/motion-blur@4.0.438

# Supporting
npm install bullmq@5.71.0 ioredis@5.10.1 pino@10.3.1 pino-http@11.0.0 sharp@0.34.5 pixelmatch@7.1.0

# Dev dependencies
npm install -D vitest@4.1.0 @vitest/coverage-v8@4.1.0
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Express 5.2.1 | Fastify | 只有在你准备把当前 API 扩展成高并发、插件化服务端，并愿意承担迁移成本时才考虑；当前仓库不值得。 |
| OpenAI SDK + Structured Outputs | Vercel AI SDK | 只有在你明确需要多模型切换、provider 统一抽象、流式 UI 能力时再引入；当前“生成结构化发布素材”用官方 SDK 更直接。 |
| BullMQ + Redis | `p-queue` / 进程内队列 | 只在单机、无人并发、失败可手工重跑的情况下用；一旦 API 对外暴露任务状态，就该上 BullMQ。 |
| `@remotion/fonts` + 本地字体 | `@remotion/google-fonts` | 只有在快速试字型、做临时原型时才用；正式渲染应避免把字体稳定性绑到远程字体源。 |
| 文件系统 + Zod 模板清单 | Postgres / Prisma | 当前阶段不要先上数据库。只有当“模板库、素材库、多人协作、历史任务检索”成为真实需求时再引入。 |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| 混用不同 patch 版本的 `@remotion/*`，或保留 `^` | Remotion 官方明确提示这会带来版本冲突和渲染问题；这是最容易踩的坑。 | 所有 `remotion` / `@remotion/*` 精确锁到 `4.0.438` |
| 为了新增能力重写成 Next.js / NestJS / 新框架 | 这是 brownfield，不是新项目。重写不会提升前三秒吸引力，只会拖慢模板化和素材产出。 | 保留 `Express + scripts + Remotion` |
| LangChain / 大型 agent 编排框架 | 标题、描述、封面文案输出是“小而强约束”的结构化生成，不值得引入重抽象。 | `openai` SDK + Structured Outputs + Zod |
| Python-first 视频渲染栈（MoviePy/Manim） | 会把当前稳定的 TS/Remotion 流水线拆成双语言系统，维护成本陡增。 | 继续以 Remotion 为唯一渲染核心 |
| 先上 Postgres/Prisma 再做模板化 | 你当前痛点不是数据关系，而是模板复用和发布素材一致性。数据库会先带来 schema/migration 负担。 | 先做文件级模板 manifest + schema 验证 |
| 生产渲染时依赖远程字体或临时 CDN 字体 | 封面和大字视频对字体一致性极敏感，远程依赖会让本机/CI/渲染机结果漂移。 | vendored fonts + `@remotion/fonts` |

## Stack Patterns by Variant

**如果目标是“单人高频出片，30 分钟内成片”这一轮：**
- 用 `Node 24 + Remotion 4 + Express 5 + Zod 4 + OpenAI Responses API`
- 模板元数据保存在仓库内的 TypeScript/Zod manifest
- 不引入 Redis、不引入数据库
- 因为当前最高杠杆点是模板复用和素材完整产出，不是分布式调度

**如果目标升级为“小团队并发出片 / API 接多任务”：**
- 在现有 API 外围加 `BullMQ + ioredis + pino`
- 渲染逻辑不重写，只把“生成封面/标题/描述/视频”包装成 job
- 因为真正需要补的是任务持久化、重试、状态查询，而不是更换渲染引擎

**如果后续要做“多模型 A/B 生成标题与描述”：**
- 先保留 `openai` 官方 SDK 作为默认实现
- 只有在明确需要多 provider 时，再抽一层 provider adapter
- 因为现在先把 schema 和输出质量做稳，比抽象 provider 更重要

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `remotion@4.0.438` | 所有 `@remotion/*@4.0.438` | 必须同 patch；官方文档明确建议移除 `^`。 |
| `react@19.2.4` | `react-dom@19.2.4` | 建议显式安装，避免 peer 依赖漂移。 |
| `bullmq@5.71.0` | `ioredis@5.10.1` | 仅在引入异步任务队列时一起上。 |
| `vitest@4.1.0` | `@vitest/coverage-v8@4.1.0` | 同主版本，避免 coverage 插件不兼容。 |
| `openai@6.32.0` | `zod@4.3.6` | 应以 Structured Outputs / JSON Schema 为主，不要依赖脆弱的字符串 JSON 修补。 |

## Prescriptive Recommendation

这轮最标准、也最符合你当前仓库现实的 2026 演进栈，不是“再造一个视频平台”，而是：

1. 继续把 **Remotion 作为唯一渲染核心**，并把所有 `@remotion/*` 版本锁死。
2. 用 **Zod 4** 把“原始文案、场景结构、标题/描述、封面文案、composition props”全部统一成 schema。
3. 用 **OpenAI Responses API + Structured Outputs** 做结构化发布素材生成，不再写 prompt 后靠字符串解析。
4. 用 **`@remotion/fonts` / `@remotion/shapes` / `@remotion/motion-blur`** 专门解决你这轮最在意的吸引力和模板复用问题。
5. 只有当 API 真开始并发跑任务时，再加 **BullMQ + Redis + Pino**，不要提前上复杂基础设施。

结论很明确：**先做“类型化模板 + 结构化素材输出 + 视觉基础设施收敛”，不要做框架重写、数据库先行或多语言渲染栈。**

## Sources

- Remotion docs: https://www.remotion.dev/docs — 验证 Remotion 仍支持 Studio / server-side rendering / tooling；HIGH
- Remotion Fonts: https://www.remotion.dev/docs/fonts — 验证 `@remotion/google-fonts` 与字体加载方式；HIGH
- Remotion Shapes: https://www.remotion.dev/docs/shapes — 验证 `@remotion/shapes` 可用于生成 SVG 形状；HIGH
- Remotion Motion Blur: https://www.remotion.dev/docs/motion-blur — 官方明确要求所有 `@remotion/*` 与 `remotion` 同版本并去掉 `^`；HIGH
- OpenAI Structured Outputs: https://developers.openai.com/api/docs/guides/structured-outputs — 验证 Structured Outputs 与 JSON Schema/`zod` 集成；HIGH
- OpenAI Responses API: https://developers.openai.com/api/reference/resources/responses/methods/compact — 验证 Responses API 为当前主接口之一；HIGH
- Node.js Releases: https://nodejs.org/en/about/previous-releases — 验证 2026-03-22 时 Node 24 为 Active LTS；HIGH
- BullMQ docs: https://docs.bullmq.io/guide/introduction — 验证 Queue / Worker / Events / FlowProducer 基础模型；HIGH
- Pino GitHub: https://github.com/pinojs/pino — 验证项目活跃度与定位；MEDIUM
- npm registry queried on 2026-03-22 for package versions: `remotion`, `@remotion/fonts`, `@remotion/shapes`, `@remotion/motion-blur`, `@remotion/transitions`, `react`, `express`, `zod`, `openai`, `bullmq`, `ioredis`, `pino`, `pino-http`, `vitest`, `@vitest/coverage-v8`, `sharp`, `pixelmatch`；MEDIUM

---
*Stack research for: AI 技术短视频创作 / 自媒体视频生产系统*
*Researched: 2026-03-22*
