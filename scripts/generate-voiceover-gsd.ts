/**
 * 配音生成脚本 (GSD - Get Shit Done)
 * 使用方法: npx tsx scripts/generate-voiceover-gsd.ts
 */

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const defaultScripts = [
  "你有没有发现...用AI写代码，前面写得特别好...但越到后面...越离谱？...变量名乱取...需求忘一半...代码开始自己跟自己打架...这不是你的问题...这是AI的通病...叫Context Rot...上下文腐烂...今天介绍一个38000 Star的开源神器...专治这个病。",
  "AI有个致命弱点...它的上下文窗口是有限的...当对话历史...调试记录...文件内容...把窗口塞满之后...信噪比急剧下降...0到30%...巅峰状态...30到50%...开始赶进度...50到70%...偷工减料...70%以上...直接开始胡说八道...这就是为什么你的AI...写到一半就变了。",
  "解决这个问题的人...不是什么大厂工程师...是一个住在哥斯达黎加的...House音乐制作人...他叫Lex Christopherson...GitHub名字叫glittercowboy...他说...我不写代码，Claude Code帮我写...但我需要一个系统...让AI从头到尾都靠谱...于是GSD诞生了...Get Shit Done。",
  "GSD的核心思路很简单...把Context当稀缺资源来管理...三个关键设计...第一，规范驱动...先写Spec再写代码...所有需求拆成原子级任务...第二，波次并行...没有依赖的任务同时执行...有依赖的排队等待...像流水线一样...第三，隔离上下文...每个任务...都在全新的200K上下文窗口里执行...做完就丢掉...主会话...永远保持30到40%。",
  "用起来更简单...一条命令安装...然后6步循环...new-project，AI面试你...搞清楚你要什么...discuss-phase...锁定产品决策...plan-phase...自动研究加规划...execute-phase...波次并行执行...每个任务自动git commit...verify-work...自动化验收...complete-milestone...归档发布...全程你可以...去喝杯咖啡。",
  "效果怎么样？...38000个GitHub Star...每周增长4500...Amazon...Google...Shopify...Webflow的工程师...都在用...有人实测...2到3天的活...压缩到1天...有人把6个月的研究项目...几天做完...支持6种运行时...Claude Code...Gemini CLI...OpenCode...Codex...Copilot...Antigravity...MIT开源...完全免费。",
  "如果你也在用AI写代码...一定要试试这个...一条命令搞定...npx get-shit-done-cc@latest...GitHub搜GSD或者Get Shit Done...让你的AI...从头到尾都靠谱...关注我...下期继续分享...最前沿的AI工具。",
];

const config = {
  voice: "zh-CN-YunyangNeural",
  rate: "+3%",
  pitch: "+0Hz",
  outputDir: path.join(process.cwd(), "public", "audio"),
};

async function generateVoiceover() {
  console.log("🎙️ 开始生成 GSD 配音...\n");

  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  const generatedFiles: string[] = [];

  for (let i = 0; i < defaultScripts.length; i++) {
    const script = defaultScripts[i];
    const outputFile = path.join(config.outputDir, `gsd-scene${i + 1}.mp3`);
    const relativePath = `audio/gsd-scene${i + 1}.mp3`;

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

  console.log("\n✨ GSD 配音生成完成！\n");
  console.log("生成的文件:");
  generatedFiles.forEach((f) => console.log(`  - ${f}`));
  console.log("\n下一步: npx tsx scripts/sync-subtitle-gsd.ts");
}

generateVoiceover().catch(console.error);
