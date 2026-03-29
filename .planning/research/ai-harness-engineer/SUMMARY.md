# AI Harness Engineer 领域调研

**调研日期**: 2026-03-28  
**用途**: 为后续「AI Harness Engineer」短视频选题提供事实框架、叙事角度与风险边界  
**当前判断**: `AI Harness Engineer` 更像 2026 年开始被强化的新工作范式与角色标签，还不是成熟统一的正式岗位分类。

## 1. 结论先行

### 1.1 这到底是什么

如果说 2023 年的关键词是 `Prompt Engineering`，2024-2025 年转向 `Context Engineering`，那么 2026 年开始浮出的新重点，是把模型外面的整套运行环境做成可控系统，也就是 `Harness Engineering`。

这里的 `Harness` 不是单一框架，而是让代理稳定工作的整套“约束 + 环境 + 反馈闭环”，通常包括：

- 工具接入
- 上下文管理
- 记忆与状态
- 权限审批
- 评测与回放
- 观测与追踪
- 沙箱执行
- 多客户端接入
- 人在回路中的控制点

### 1.2 它为什么重要

当前行业信号很一致：模型能力还在涨，但生产可用性的瓶颈越来越落在模型外层的系统设计，而不是提示词本身。

更直接地说，未来更值钱的，不只是“会调模型的人”，而是“会搭代理运行系统的人”。

### 1.3 更适合视频里的定义

建议视频里把 `AI Harness Engineer` 定义为：

> 负责把 AI 代理变成可上线、可审计、可复用、可扩展产品能力的人。

这个定义比“提示词工程师升级版”更稳，也更贴近 2026 年的一手材料。

## 2. 行业信号

### 2.1 OpenAI 已经把 “Harness Engineering” 说透了

OpenAI 在 2026-02-11 发布的文章《Harness engineering: leveraging Codex in an agent-first world》中，给了这个方向非常强的一手信号：

- 他们用 Codex 在约 5 个月里做出一个真实可用的软件产品
- 团队强调“0 行人工手写代码”的实验约束
- 估算开发速度约为手写代码方式的 `1/10 时间`
- 仓库规模达到约 `100 万行代码`
- 累计约 `1,500` 个 PR
- 平均每位工程师每天约 `3.5` 个 PR

更关键的不是数字，而是角色变化。OpenAI 明确把工程工作的重心描述为：

- 设计环境
- 指定意图
- 建立反馈回路
- 补齐工具、护栏、文档和约束

这已经非常接近 “AI Harness Engineer” 的职责描述。

### 2.2 OpenAI 的产品与招聘也在强化这个方向

OpenAI 2026-02-04 的《Unlocking the Codex harness》把 `Codex harness` 定义为底层代理循环与逻辑，并展开到：

- thread 生命周期
- 配置与认证
- 工具执行
- MCP / skills 集成
- approval 流程
- 多客户端事件流

OpenAI 的 `Software Engineer, Codex Cloud` 招聘页也明确写到团队在“迭代构建 Codex agent harness”，并把 runtime / orchestration / sandbox / observability / governance 作为核心工作内容。

这说明 `harness` 已经不是抽象概念，而是实际产品层和平台层的工作对象。

### 2.3 LangChain 已经把 Harness 能力清单化

LangChain 在 Deep Agents 文档中，直接把 `agent harness` 定义为一组能力组合，核心包括：

- 规划
- 虚拟文件系统
- 子代理委派
- 上下文与 token 管理
- 代码执行
- 人在回路中
- skills
- memory

这很适合作为视频里的“能力拆解图”。

### 2.4 社区也开始把它当作新阶段的命名

Lawrence Wu 在 2026-02-16 的博文中，把路径总结为：

- Prompt Engineering
- Context Engineering
- Harness Engineering

他还把 2026 的代表性进展与 OpenClaw、Claude Code、Codex 这类代理型产品联系起来，说明社区已经开始把“模型外系统层”当成主战场。

## 3. AI Harness Engineer 到底做什么

### 3.1 工作目标

不是单纯“让模型回答得更聪明”，而是让代理：

- 更稳定
- 更可控
- 更可验证
- 更可追责
- 更能持续运行

### 3.2 典型职责

一个 AI Harness Engineer 的工作，通常会落在以下 6 层：

1. **运行环境层**
   - 沙箱
   - 文件权限
   - 命令执行
   - 线程与会话生命周期

2. **上下文层**
   - 系统提示词结构
   - 记忆文件
   - 技能加载
   - 长短期上下文治理

3. **工具层**
   - MCP / API / 内部系统接入
   - 工具 schema
   - 失败重试
   - 工具使用边界

4. **控制层**
   - approval
   - human-in-the-loop
   - policy
   - 可中断与回滚

MCP 在 `Roots` 概念里也强调了边界与用户同意，这说明 harness 不是“把工具接上就行”，而是要明确代理到底能碰什么、不能碰什么。

5. **评测层**
   - evals
   - custom graders
   - trace grading
   - 回放与回归测试

6. **观测层**
   - trace
   - 日志
   - 成功率
   - 失败模式
   - 代理行为可见性

### 3.3 它和这些角色的区别

**不是 Prompt Engineer：**
- Prompt Engineer 更关注单轮或少量交互的输入设计
- Harness Engineer 更关注长期运行系统

**不是纯 AI Engineer：**
- AI Engineer 范围更大，可能涵盖模型接入、应用开发、数据处理
- Harness Engineer 更聚焦代理运行外壳与控制系统

**也不等于 Context Engineer：**
- Context Engineering 主要解决“给模型什么上下文”
- Harness Engineering 还要解决“代理如何运行、如何受控、如何验证”

## 4. 为什么这个角色会在 2026 爆发

### 4.1 模型不再是唯一瓶颈

从 OpenAI、LangChain 和社区实践看，随着基础模型越来越强，真正拖慢上线的往往变成：

- 工具不稳定
- 上下文漂移
- 权限不清楚
- 失败无法复现
- 评测缺失
- 行为不可观测

所以竞争点在往“系统层”迁移。

### 4.2 代理正在跨表面、跨时间、跨任务

代理不再只是一次性问答，它开始变成：

- 跨终端
- 跨 IDE
- 跨 Web
- 跨消息渠道
- 能长期运行
- 能异步继续工作

这类系统天然更需要 harness，而不是只靠 prompt。

### 4.3 企业真正需要的是“可靠代理”

OpenAI 的 agent platform 页面把核心价值放在：

- 更快上线
- 更快评测
- 更高准确率
- 更少人工前端搭建

这背后其实都不是“模型参数”的故事，而是“工程外壳”的故事。

## 5. 视频里可以讲的核心观点

### 5.1 最稳的一条主论点

**AI Harness Engineer 不是一个已经完全标准化的职位名称，但它正在变成真实存在的关键工作。**

这句话最稳，既有前沿感，又不容易说过头。

### 5.2 三个适合短视频的判断句

- 未来被高估的可能是模型本身，被低估的是代理外壳。
- 下一个高价值工程角色，不只是写代码的人，而是能让代理稳定交付结果的人。
- Prompt 已经不够了，真正拉开差距的是 Harness。

### 5.3 最适合的讲法

不要把它讲成“一个新岗位突然火了”。

更好的讲法是：

**软件工程的重心正在上移。**

从：
- 自己写代码

变成：
- 设计环境
- 管理约束
- 组织代理
- 验证结果

这会让视频更有判断力，也更不容易被反驳。

## 6. 建议采用的视频叙事

## 推荐角度

**不是介绍一个新名词，而是解释一次工程角色迁移。**

### 推荐标题方向

- AI Harness Engineer，可能是 2026 最值得盯的角色
- Prompt Engineer 之后，正在冒出来的是 Harness Engineer
- 以后最值钱的，不只是会写代码的人

### 推荐开场 Hook

可以用下面这类结构：

1. 先抛冲突
   - 你以为 AI 时代最值钱的是提示词，其实越来越不是

2. 再给证据
   - OpenAI 已经在讲 Harness Engineering
   - LangChain 已经把 Harness 能力拆成了明确模块
   - 招聘页也在写 runtime、orchestration、sandbox、observability

3. 最后给判断
   - 新的核心能力，是把代理变成可靠系统

### 推荐 7 段式内容骨架

1. Hook  
   Prompt 之后，真正值钱的是 Harness

2. 痛点  
   现在大多数人只会调 prompt，但代理一上线就会崩在工具、权限、上下文和回放

3. 定义  
   什么是 AI Harness Engineer

4. 证据 1  
   OpenAI 的 Harness Engineering 与 Codex App Server

5. 证据 2  
   LangChain 的 Harness 能力清单

6. 机会  
   这类人为什么会变贵，企业到底在买什么

7. CTA  
   如果你已经在做 agents、evals、guardrails、MCP、workflow orchestration，你其实已经在往这个角色走

## 7. 视觉与素材建议

### 7.1 适合画面的关键词

- agent loop
- sandbox
- evals
- guardrails
- approvals
- traces
- orchestration
- memory
- multi-surface runtime

### 7.2 适合做成图的对比

**对比 1：角色迁移**

- Prompt Engineer
- Context Engineer
- Harness Engineer

**对比 2：能力边界**

- 模型层
- 上下文层
- Harness 层
- 产品层

**对比 3：为什么 demo 能跑、生产跑不动**

- demo: prompt + tool
- production: prompt + tools + memory + evals + approvals + observability + runtime

## 8. 需要避免的表述风险

### 8.1 不要说得太满

下面这些说法风险高，不建议直接讲：

- “AI Harness Engineer 已经是成熟岗位”
- “所有公司都在招这个岗位”
- “Prompt Engineer 已经彻底没价值了”

更稳妥的说法是：

- “它还是新兴标签，但对应的工作已经真实存在”
- “岗位名称可能不同，但职责正在成型”

### 8.2 不要把它窄化成“会配工具”

如果只讲 MCP 或工作流编排，会把这个概念讲小。

Harness 的重点是“让代理可靠”，所以必须一起讲：

- 控制
- 评测
- 观测
- 记忆
- 执行环境

### 8.3 不要只讲技术，不讲职业迁移

这个选题真正容易传播的点，不是技术清单，而是：

**工程师的价值重心正在迁移。**

## 9. 建议下一步

如果继续往视频推进，建议下一步不是直接写完整脚本，而是先锁下面三件事：

1. **视频主张**
   - 你要讲“新岗位”
   - 还是讲“工程范式迁移”
   - 还是讲“谁会先吃到红利”

2. **受众**
   - AI 工程师
   - 普通开发者
   - 技术内容观众

3. **情绪基调**
   - 机会感
   - 危机感
   - 判断感

我当前的建议是：

> 主张选“工程范式迁移”，受众选“会写代码、对 agent 感兴趣的开发者”，情绪选“强判断 + 轻危机”。

## 10. 来源

### 一手来源

- OpenAI, *Harness engineering: leveraging Codex in an agent-first world*, 2026-02-11  
  https://openai.com/index/harness-engineering/

- OpenAI, *Unlocking the Codex harness: how we built the App Server*, 2026-02-04  
  https://openai.com/index/unlocking-the-codex-harness/

- OpenAI, *Software Engineer, Codex Cloud*, accessed 2026-03-28  
  https://openai.com/careers/software-engineer-codex-cloud-san-francisco/

- OpenAI, *Build every step of agents on one platform*, accessed 2026-03-28  
  https://openai.com/agent-platform/

- LangChain Docs, *Harness capabilities*, accessed 2026-03-28  
  https://docs.langchain.com/oss/javascript/deepagents/harness

- Model Context Protocol, *Roots*, protocol revision 2025-06-18  
  https://modelcontextprotocol.io/docs/concepts/roots

### 社区与二级来源

- Lawrence Wu, *Reflections on AI from 2022 to 2026 - Prompt Engineering (LangChain) to Context Engineering (LangGraph) to Harness Engineering (Claude Code)*, 2026-02-16  
  https://lawwu.github.io/posts/2026-02-16-reflections-on-ai-2022-2026/index.html
