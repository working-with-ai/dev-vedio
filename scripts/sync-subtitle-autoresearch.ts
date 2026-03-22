/**
 * 字幕同步脚本 (AutoResearch - Karpathy让AI自己搞科研)
 * 使用方法: npx tsx scripts/sync-subtitle-autoresearch.ts
 */

import * as fs from "fs";
import * as path from "path";
import { parseFile } from "music-metadata";

const SCENE_COUNT = 7;

const defaultScripts = [
  "卡帕西又开源了！这次他想让AI，卷死所有AI研究员！autoresearch，不到一周GitHub狂揽4万4千星！全网都在疯传这个只有630行的Python脚本！",
  "当大家还在手动调参，熬夜盯Loss曲线，改一行代码跑一次实验时，卡帕西已经写了个分身去干活了。你只需要告诉它，帮我把模型跑得更稳一点，然后你就可以去睡觉，去健身，去蒸桑拿。等你回来，AI已经帮你跑了几百轮实验！",
  "这个项目最狠的地方在于，它把AI关进了一个闭环里。AI自己写PyTorch，自己跑实验，自己看结果，自己再改代码。这就是传说中的无人值守科研。一句话总结，这不是一个简单的工具，这是AI的自我进化实验室！",
  "为什么这个项目能让全网高潮？第一，极简即暴力！630行代码，单张GPU就能跑。真正的核弹不需要成千上万行的垃圾代码。整个项目只有三个文件，prepare.py负责数据准备，train.py是AI修改的核心文件，program.md就是给AI的指令！",
  "第二，智商碾压！AI不是在瞎撞，而是像个老练的工程师在做逻辑推演。AI修改代码，训练5分钟，检查结果，保留最好的，丢弃差的，然后循环。有人用它一夜之间跑出的0.8B小模型，效果直接反超人类精心微调的1.6B！",
  "第三，科研范式地震！以前是人类研究AI，现在是AI研究AI。卡帕西说，我写完代码去蒸了个桑拿，回来AI已经把实验跑完了。你只需要写好program.md这个指令文件，然后让AI自动运行一整夜！",
  "今天的程序员在写代码，明天的程序员在指挥AI写代码。如果你还在手动调参，那你可能真的要被卡帕西的这个小脚本给卷没了！评论区告诉我，你觉得AI自主科研的时代还有多远？关注不迷路，我们下期见！",
];

interface AudioInfo {
  file: string;
  duration: number;
  durationFrames: number;
}

interface SubtitleWord {
  text: string;
  startFrame: number;
  endFrame: number;
}

interface SubtitleLine {
  words: SubtitleWord[];
  startFrame: number;
  endFrame: number;
}

async function getAudioDuration(filePath: string): Promise<number> {
  try {
    const metadata = await parseFile(filePath);
    return metadata.format.duration || 0;
  } catch (error) {
    console.error(`无法读取音频文件: ${filePath}`, error);
    return 5;
  }
}

function generateSubtitleLine(
  text: string,
  startFrame: number,
  durationFrames: number,
): SubtitleWord[] {
  const chars = text.split("");
  const totalChars = chars.length;

  let currentFrame = startFrame;
  const words: SubtitleWord[] = [];

  let currentWord = "";
  let wordStartFrame = currentFrame;

  const flushWord = () => {
    if (currentWord.length > 0) {
      const wordDuration = Math.max(
        2,
        Math.round((currentWord.length / totalChars) * durationFrames)
      );
      words.push({
        text: currentWord,
        startFrame: wordStartFrame,
        endFrame: wordStartFrame + wordDuration,
      });
      currentFrame = wordStartFrame + wordDuration;
      wordStartFrame = currentFrame;
      currentWord = "";
    }
  };

  for (const char of chars) {
    if (/[\s，。！？、：；""''（）]/.test(char)) {
      flushWord();
      if (!/\s/.test(char)) {
        words.push({
          text: char,
          startFrame: currentFrame,
          endFrame: currentFrame + 2,
        });
        currentFrame += 2;
        wordStartFrame = currentFrame;
      }
    } else {
      currentWord += char;
      if (currentWord.length >= 4) {
        flushWord();
      }
    }
  }

  flushWord();
  return words;
}

async function syncSubtitles() {
  console.log("🔄 开始同步 AutoResearch 字幕和配音...\n");

  const audioDir = path.join(process.cwd(), "public", "audio");
  const fps = 30;
  const sceneDelay = 9;

  const audioInfos: AudioInfo[] = [];

  for (let i = 0; i < SCENE_COUNT; i++) {
    const audioFile = path.join(audioDir, `autoresearch-scene${i + 1}.mp3`);
    if (fs.existsSync(audioFile)) {
      const duration = await getAudioDuration(audioFile);
      console.log(`📊 场景 ${i + 1}: ${duration.toFixed(2)}秒 (${Math.round(duration * fps)}帧)`);
      audioInfos.push({
        file: `audio/autoresearch-scene${i + 1}.mp3`,
        duration,
        durationFrames: Math.round(duration * fps),
      });
    } else {
      console.log(`⚠️ 场景 ${i + 1}: 音频文件不存在，使用默认10秒`);
      audioInfos.push({
        file: `audio/autoresearch-scene${i + 1}.mp3`,
        duration: 10,
        durationFrames: 300,
      });
    }
  }

  const minSceneDuration = 90;
  const buffer = 30;

  let currentFrame = 0;
  const subtitleLines: SubtitleLine[] = [];
  const sceneDurations: number[] = [];

  for (let i = 0; i < audioInfos.length; i++) {
    const info = audioInfos[i];
    const sceneDuration = Math.max(minSceneDuration, info.durationFrames + buffer);

    const subtitleStart = currentFrame + sceneDelay;
    const subtitleDuration = info.durationFrames;
    const words = generateSubtitleLine(
      defaultScripts[i],
      subtitleStart,
      subtitleDuration
    );

    subtitleLines.push({
      words,
      startFrame: subtitleStart,
      endFrame: subtitleStart + subtitleDuration,
    });

    sceneDurations.push(sceneDuration);
    currentFrame += sceneDuration;
  }

  const totalDuration = sceneDurations.reduce((a, b) => a + b, 0);

  const outputPath = path.join(process.cwd(), "src", "data", "autoresearch-subtitles.json");
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(subtitleLines, null, 2));
  console.log(`\n✅ 字幕数据已写入: ${outputPath}`);

  console.log("\n📋 请更新 Root.tsx 中 AutoResearch 的配置:\n");
  console.log(`  durationInFrames: ${totalDuration},`);
  console.log(`  sceneDurations: [${sceneDurations.join(", ")}],`);
  console.log(`\n  // 添加 import:`);
  console.log(`  import autoresearchSubtitles from "./data/autoresearch-subtitles.json";`);
  console.log(`  // 在 defaultProps 中添加:`);
  console.log(`  precomputedSubtitles: autoresearchSubtitles,`);
  console.log(`\n✨ AutoResearch 字幕同步完成！总时长: ${(totalDuration / fps).toFixed(1)}秒 (${totalDuration}帧)`);
}

syncSubtitles().catch(console.error);
