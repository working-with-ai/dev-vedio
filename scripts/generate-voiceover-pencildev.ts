/**
 * 配音生成脚本 (PencilDev — Pencil.dev 竖屏短视频)
 * 使用方法: npm run generate:voiceover:pencildev
 */

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { PencilDevSchema } from "../src/compositions/PencilDev/schema";

/** 在句号处分段并插入 ...，与仓库其它脚本 TTS 停顿习惯一致 */
function addPauseMarkers(text: string): string {
  const parts = text
    .split("。")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (parts.length === 0) {
    return text;
  }
  return `${parts.join("。...")}。`;
}

const baseScripts = PencilDevSchema.parse({}).voiceoverScripts;
const defaultScripts = baseScripts.map(addPauseMarkers);

const config = {
  voice: "zh-CN-YunyangNeural",
  rate: "+3%",
  pitch: "+0Hz",
  outputDir: path.join(process.cwd(), "public", "audio"),
  prefix: "pencildev",
};

async function generateVoiceover() {
  console.log("🎙️ 开始生成 PencilDev 配音...\n");

  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  try {
    execSync("which edge-tts", { stdio: "pipe" });
  } catch {
    console.error("\n❌ edge-tts 未安装，请先运行: pip install edge-tts\n");
    process.exit(1);
  }

  const generatedFiles: string[] = [];

  for (let index = 0; index < defaultScripts.length; index++) {
    const script = defaultScripts[index];
    const outputFile = path.join(
      config.outputDir,
      `${config.prefix}-scene${index + 1}.mp3`,
    );
    const subtitleFile = outputFile.replace(".mp3", ".vtt");

    console.log(`📝 场景 ${index + 1}: "${script.slice(0, 36)}..."`);

    const processedText = script.replace(/\.\.\./g, "，").replace(/"/g, '\\"');
    const command =
      `edge-tts --voice "${config.voice}" --rate="${config.rate}" ` +
      `--pitch="${config.pitch}" --text "${processedText}" ` +
      `--write-media "${outputFile}" --write-subtitles "${subtitleFile}"`;

    try {
      execSync(command, { stdio: "pipe" });
      generatedFiles.push(`audio/${config.prefix}-scene${index + 1}.mp3`);
      console.log(`   ✅ 已生成: audio/${config.prefix}-scene${index + 1}.mp3`);
    } catch (error) {
      console.error(`   ❌ 生成失败: ${error}`);
      process.exit(1);
    }
  }

  console.log("\n✨ PencilDev 配音生成完成！");
  generatedFiles.forEach((file) => console.log(`  - ${file}`));
  console.log("\n下一步: npm run sync:subtitle:pencildev");
}

generateVoiceover().catch(console.error);
