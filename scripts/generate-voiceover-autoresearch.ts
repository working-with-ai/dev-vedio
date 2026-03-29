/**
 * 配音生成脚本 (AutoResearch - Karpathy让AI自己搞科研)
 * 使用方法: npx tsx scripts/generate-voiceover-autoresearch.ts
 */

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const defaultScripts = [
  "卡帕西又开源了！... 这次他想让AI... 卷死所有AI研究员！... autoresearch... 不到一周GitHub狂揽4万4千星！... 全网都在疯传这个只有630行的Python脚本！",
  "当大家还在手动调参... 熬夜盯Loss曲线... 改一行代码跑一次实验时... 卡帕西已经写了个分身去干活了... 你只需要告诉它... 帮我把模型跑得更稳一点... 然后你就可以去睡觉... 去健身... 去蒸桑拿... 等你回来... AI已经帮你跑了几百轮实验！",
  "这个项目最狠的地方在于... 它把AI关进了一个闭环里... AI自己写PyTorch... 自己跑实验... 自己看结果... 自己再改代码... 这就是传说中的无人值守科研... 一句话总结... 这不是一个简单的工具... 这是AI的自我进化实验室！",
  "为什么这个项目能让全网高潮？... 第一... 极简即暴力！... 630行代码... 单张GPU就能跑... 真正的核弹不需要成千上万行的垃圾代码... 整个项目只有三个文件... prepare.py负责数据准备... train.py是AI修改的核心文件... program.md就是给AI的指令！",
  "第二... 智商碾压！... AI不是在瞎撞... 而是像个老练的工程师在做逻辑推演... AI修改代码... 训练5分钟... 检查结果... 保留最好的... 丢弃差的... 然后循环... 有人用它一夜之间跑出的0.8B小模型... 效果直接反超人类精心微调的1.6B！",
  "第三... 科研范式地震！... 以前是人类研究AI... 现在是AI研究AI... 卡帕西说... 我写完代码去蒸了个桑拿... 回来AI已经把实验跑完了... 你只需要写好program.md这个指令文件... 然后让AI自动运行一整夜！",
  "今天的程序员在写代码... 明天的程序员在指挥AI写代码... 如果你还在手动调参... 那你可能真的要被卡帕西的这个小脚本给卷没了！... 评论区告诉我... 你觉得AI自主科研的时代还有多远？... 关注不迷路... 我们下期见！",
];

const config = {
  voice: "zh-CN-YunyangNeural",
  rate: "+3%",
  pitch: "+0Hz",
  outputDir: path.join(process.cwd(), "public", "audio"),
};

async function generateVoiceover() {
  console.log("🎙️ 开始生成 AutoResearch 配音...\n");

  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  const generatedFiles: string[] = [];

  for (let i = 0; i < defaultScripts.length; i++) {
    const script = defaultScripts[i];
    const outputFile = path.join(config.outputDir, `autoresearch-scene${i + 1}.mp3`);
    const relativePath = `audio/autoresearch-scene${i + 1}.mp3`;

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

  console.log("\n✨ AutoResearch 配音生成完成！\n");
  console.log("生成的文件:");
  generatedFiles.forEach((f) => console.log(`  - ${f}`));
  console.log("\n下一步: npx tsx scripts/sync-subtitle-autoresearch.ts");
}

generateVoiceover().catch(console.error);
