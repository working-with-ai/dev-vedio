/**
 * 字幕同步脚本 (AgencyAgents - 147个Markdown Agent零成本AI团队)
 * 使用 edge-tts 生成的 VTT 文件获取精确句级时间戳
 * 使用方法: npx tsx scripts/sync-subtitle-agencyagents.ts
 */

import * as fs from "fs";
import * as path from "path";
import { parseFile } from "music-metadata";

const SCENE_COUNT = 7;
const COMPOSITION_PREFIX = "agencyagents";

const defaultScripts = [
  "你还在一个人跟AI单打独斗吗？人家已经用Markdown文件，搞出了一支147人的AI专业团队！GitHub狂揽46800颗Star，还在暴涨！",
  "大多数人用AI是什么状态？写代码问GPT，写文案问GPT，做方案还是问GPT。一个AI当万能工具人，结果呢？每次都要从零调教，没有专业视角，没有标准流程，效率低得可怕！",
  "有个叫agency-agents的开源项目，做了一件狠事！它把公司组织架构直接代码化！147个专业Agent，覆盖工程、产品、设计、增长等12个部门！每个Agent就是一个高质量Markdown文件，定义了角色个性、工作流程、交付物模板和评估标准！",
  "这147个Agent有多专业？产品经理会输出完整PRD，后端架构师能生成技术方案和架构图，前端工程师直接写业务代码，增长专家制定推广策略。甚至还有针对小红书、抖音、B站的本地化营销Agent！昨天刚更新，社区极其活跃！",
  "它最炸裂的能力是多Agent协作！你可以把它看作一个轻量级的组织架构，通过链式调用，或者内置的Agents Orchestrator，让多个角色完成复杂任务！支持Claude Code、Cursor、Gemini CLI全平台无缝接入！",
  "举个实战例子，从零到MVP的完整闭环！产品经理Agent梳理需求输出PRD，架构师Agent承接PRD输出技术方案，前端工程师Agent生成完整代码，增长专家Agent制定推广策略和文案。一套流水线下来，成本几乎为零！独立开发者和小团队的终极提效神器！",
  "AI时代最大的红利，不是知道有这些工具，而是真正用起来！147个岗位的AI专业团队，等你一键组建！评论区告诉我，你准备先抓哪个Agent给你打黑工？关注不迷路，我们下期见！",
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
  console.log(`🔄 开始同步 ${COMPOSITION_PREFIX} 字幕和配音 (VTT精确模式)...\n`);

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
      console.log(`⚠️ 场景 ${i + 1}: 音频文件不存在，使用默认10秒`);
      audioInfos.push({
        file: `audio/${COMPOSITION_PREFIX}-scene${i + 1}.mp3`,
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

  console.log("\n📋 请更新 Root.tsx 中 AgencyAgents 的配置:\n");
  console.log(`  durationInFrames: ${totalDuration},`);
  console.log(`  sceneDurations: [${sceneDurations.join(", ")}],`);
  console.log(`\n  // 添加 import:`);
  console.log(`  import agencyagentsSubtitles from "./data/${COMPOSITION_PREFIX}-subtitles.json";`);
  console.log(`  // 在 defaultProps 中添加:`);
  console.log(`  precomputedSubtitles: agencyagentsSubtitles,`);
  console.log(`\n✨ AgencyAgents 字幕同步完成！总时长: ${(totalDuration / fps).toFixed(1)}秒 (${totalDuration}帧)`);
}

syncSubtitles().catch(console.error);
