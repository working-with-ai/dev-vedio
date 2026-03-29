/**
 * 字幕同步脚本 (OpenClaw AI)
 * 使用 edge-tts 生成的 VTT 文件获取精确句级时间戳
 * 使用方法: npx tsx scripts/sync-subtitle-openclaw.ts
 */

import * as fs from "fs";
import * as path from "path";
import { parseFile } from "music-metadata";

const SCENE_COUNT = 7;
const COMPOSITION_PREFIX = "openclaw";

const defaultScripts = [
  "你还在把ChatGPT当成高级搜索工具吗？醒醒吧，2026年最火的AI已经拿到了电脑的最高权限！",
  "过去我们总担心AI会不会取代人类，但现在更残酷的现实是：如果你还在岸边观望，你可能正在变成AI的肉体外包。当别人让AI接管枯燥工作时，你的竞争力正在被降维打击。",
  "别慌，只要看懂3个真相，你也能轻松破局。第一，让AI从陪聊变实干。现在的AI能在后台24小时接管你的浏览器、终端和邮箱。",
  "第二，打破人机雇佣边界。AI遇到障碍时会在平台上发布悬赏，自动面试人类，任务完成后用加密货币结算。利用好这个机制，AI就是你最强大的外包团队。",
  "第三，尽早入局积累复利。早期的每一次试错和调试，都会变成驾驭AI的经验值。把AI整合进工作流，才是拉开断层差距的关键。",
  "你可能觉得部署这种AI很难？有公司搞了一个30分钟快闪群，从产品、技术到运营，不同岗位的同事纷纷成功部署，每个人都发掘出了极具启发性的提效场景。",
  "AI时代最残酷的分水岭，不是知道和不知道，而是做到和没做到。评论区告诉我，你打算今天下班后让AI帮你解决哪一项最繁琐的工作？",
];

interface AudioInfo {
  file: string;
  duration: number;
  durationFrames: number;
}

interface VttCue {
  startMs: number;
  endMs: number;
  text: string;
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

function parseVtt(content: string): VttCue[] {
  const cues: VttCue[] = [];
  const blocks = content.split(/\n\n+/);

  for (const block of blocks) {
    const lines = block.trim().split("\n");
    for (let j = 0; j < lines.length; j++) {
      const match = lines[j].match(
        /(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/
      );
      if (match) {
        const startMs =
          +match[1] * 3600000 + +match[2] * 60000 + +match[3] * 1000 + +match[4];
        const endMs =
          +match[5] * 3600000 + +match[6] * 60000 + +match[7] * 1000 + +match[8];
        const text = lines
          .slice(j + 1)
          .join(" ")
          .trim();
        if (text) cues.push({ startMs, endMs, text });
        break;
      }
    }
  }
  return cues;
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

function generateWordsFromCue(
  text: string,
  startFrame: number,
  endFrame: number,
): SubtitleWord[] {
  const durationFrames = endFrame - startFrame;
  const chars = text.split("");
  const totalChars = chars.length;
  if (totalChars === 0) return [];

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
        endFrame: Math.min(wordStartFrame + wordDuration, endFrame),
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
          endFrame: Math.min(currentFrame + 2, endFrame),
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
  console.log(`🔄 开始同步 OpenClaw AI 字幕和配音 (VTT精确模式)...\n`);

  const audioDir = path.join(process.cwd(), "public", "audio");
  const fps = 30;
  const sceneDelay = 9;

  const audioInfos: AudioInfo[] = [];

  for (let i = 0; i < SCENE_COUNT; i++) {
    const audioFile = path.join(audioDir, `${COMPOSITION_PREFIX}-scene${i + 1}.mp3`);
    if (fs.existsSync(audioFile)) {
      const duration = await getAudioDuration(audioFile);
      console.log(`📊 场景 ${i + 1}: ${duration.toFixed(2)}秒 (${Math.round(duration * fps)}帧)`);
      audioInfos.push({
        file: `audio/${COMPOSITION_PREFIX}-scene${i + 1}.mp3`,
        duration,
        durationFrames: Math.round(duration * fps),
      });
    } else {
      console.log(`⚠️ 场景 ${i + 1}: 音频文件不存在，使用默认5秒`);
      audioInfos.push({
        file: `audio/${COMPOSITION_PREFIX}-scene${i + 1}.mp3`,
        duration: 5,
        durationFrames: 150,
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
    const sceneStartFrame = currentFrame;
    const audioStartFrame = sceneStartFrame + sceneDelay;

    const vttFile = path.join(audioDir, `${COMPOSITION_PREFIX}-scene${i + 1}.vtt`);
    let allWords: SubtitleWord[] = [];

    if (fs.existsSync(vttFile)) {
      const vttContent = fs.readFileSync(vttFile, "utf-8");
      const cues = parseVtt(vttContent);
      console.log(`   🎯 VTT: ${cues.length} 个精确时间段`);

      for (const cue of cues) {
        const cueStartFrame = audioStartFrame + Math.round((cue.startMs / 1000) * fps);
        const cueEndFrame = audioStartFrame + Math.round((cue.endMs / 1000) * fps);
        const words = generateWordsFromCue(cue.text, cueStartFrame, cueEndFrame);
        allWords.push(...words);
      }
    } else {
      console.log(`   ⚠️ VTT 不存在，使用字符等比分配`);
      allWords = generateWordsFromCue(
        defaultScripts[i]!,
        audioStartFrame,
        audioStartFrame + info.durationFrames
      );
    }

    if (allWords.length > 0) {
      subtitleLines.push({
        words: allWords,
        startFrame: allWords[0].startFrame,
        endFrame: allWords[allWords.length - 1].endFrame,
      });
    }

    sceneDurations.push(sceneDuration);
    currentFrame += sceneDuration;
  }

  const totalDuration = sceneDurations.reduce((a, b) => a + b, 0);

  const outputPath = path.join(process.cwd(), "src", "data", `${COMPOSITION_PREFIX}-subtitles.json`);
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(subtitleLines, null, 2));
  console.log(`\n✅ 字幕数据已写入: ${outputPath}`);

  console.log("\n📋 请更新 Root.tsx 中 OpenClawAI 的配置:\n");
  console.log(`  durationInFrames: ${totalDuration},`);
  console.log(`  sceneDurations: [${sceneDurations.join(", ")}],`);
  console.log(`\n  // 添加 import:`);
  console.log(`  import openclawSubtitles from "./data/${COMPOSITION_PREFIX}-subtitles.json";`);
  console.log(`  // 在 defaultProps 中添加:`);
  console.log(`  precomputedSubtitles: openclawSubtitles,`);
  console.log(`\n✨ OpenClaw AI 字幕同步完成！总时长: ${(totalDuration / fps).toFixed(1)}秒 (${totalDuration}帧)`);
}

syncSubtitles().catch(console.error);
