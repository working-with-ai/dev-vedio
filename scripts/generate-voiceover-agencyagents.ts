/**
 * 配音生成脚本 (AgencyAgents - 147个Markdown Agent零成本AI团队)
 * 使用方法: npx tsx scripts/generate-voiceover-agencyagents.ts
 */

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const defaultScripts = [
  "你还在一个人跟AI单打独斗吗？... 人家已经用Markdown文件... 搞出了一支147人的AI专业团队！... GitHub狂揽46800颗Star... 还在暴涨！",
  "大多数人用AI是什么状态？... 写代码问GPT... 写文案问GPT... 做方案还是问GPT... 一个AI当万能工具人... 结果呢？... 每次都要从零调教... 没有专业视角... 没有标准流程... 效率低得可怕！",
  "有个叫agency-agents的开源项目... 做了一件狠事！... 它把公司组织架构直接代码化！... 147个专业Agent... 覆盖工程... 产品... 设计... 增长等12个部门！... 每个Agent就是一个高质量Markdown文件... 定义了角色个性... 工作流程... 交付物模板和评估标准！",
  "这147个Agent有多专业？... 产品经理会输出完整PRD... 后端架构师能生成技术方案和架构图... 前端工程师直接写业务代码... 增长专家制定推广策略... 甚至还有针对小红书... 抖音... B站的本地化营销Agent！... 昨天刚更新... 社区极其活跃！",
  "它最炸裂的能力是多Agent协作！... 你可以把它看作一个轻量级的组织架构... 通过链式调用... 或者内置的Agents Orchestrator... 让多个角色完成复杂任务！... 支持Claude Code... Cursor... Gemini CLI全平台无缝接入！",
  "举个实战例子... 从零到MVP的完整闭环！... 产品经理Agent梳理需求输出PRD... 架构师Agent承接PRD输出技术方案... 前端工程师Agent生成完整代码... 增长专家Agent制定推广策略和文案... 一套流水线下来... 成本几乎为零！... 独立开发者和小团队的终极提效神器！",
  "AI时代最大的红利... 不是知道有这些工具... 而是真正用起来！... 147个岗位的AI专业团队... 等你一键组建！... 评论区告诉我... 你准备先抓哪个Agent给你打黑工？... 关注不迷路... 我们下期见！",
];

const config = {
  voice: "zh-CN-YunyangNeural",
  rate: "+3%",
  pitch: "+0Hz",
  outputDir: path.join(process.cwd(), "public", "audio"),
};

async function generateVoiceover() {
  console.log("🎙️ 开始生成 AgencyAgents 配音...\n");

  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  const generatedFiles: string[] = [];

  for (let i = 0; i < defaultScripts.length; i++) {
    const script = defaultScripts[i];
    const outputFile = path.join(config.outputDir, `agencyagents-scene${i + 1}.mp3`);
    const relativePath = `audio/agencyagents-scene${i + 1}.mp3`;

    console.log(`📝 场景 ${i + 1}: "${script.substring(0, 40)}..."`);

    try {
      execSync("which edge-tts", { stdio: "pipe" });
    } catch {
      console.error("\n❌ edge-tts 未安装！请先运行: pip install edge-tts\n");
      process.exit(1);
    }

    try {
      const processedText = script
        .replace(/\.\.\./g, "，")
        .replace(/"/g, '\\"');

      const vttFile = outputFile.replace(".mp3", ".vtt");
      const command = `edge-tts --voice "${config.voice}" --rate="${config.rate}" --pitch="${config.pitch}" --text "${processedText}" --write-media "${outputFile}" --write-subtitles "${vttFile}"`;

      execSync(command, { stdio: "pipe" });

      console.log(`   ✅ 已生成: ${relativePath}`);
      generatedFiles.push(relativePath);
    } catch (error) {
      console.error(`   ❌ 生成失败: ${error}`);
    }
  }

  console.log("\n✨ AgencyAgents 配音生成完成！\n");
  console.log("生成的文件:");
  generatedFiles.forEach((f) => console.log(`  - ${f}`));
  console.log("\n下一步: npx tsx scripts/sync-subtitle-agencyagents.ts");
}

generateVoiceover().catch(console.error);
