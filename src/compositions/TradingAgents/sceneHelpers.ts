import { generateSubtitleLines, type SubtitleLine } from "../../components/KaraokeSubtitle";
import type { TradingAgentsProps } from "./schema";

export const DEFAULT_SCENE_DURATIONS = [510, 660, 660, 600, 720, 660, 600];

export function resolveSceneDurations(props: TradingAgentsProps): number[] {
  if (props.sceneDurations?.length === 7) {
    return props.sceneDurations;
  }
  return [...DEFAULT_SCENE_DURATIONS];
}

export function getSceneStartFrame(durations: readonly number[], sceneIndex: number): number {
  let sum = 0;
  for (let i = 0; i < sceneIndex; i++) {
    sum += durations[i] ?? DEFAULT_SCENE_DURATIONS[i];
  }
  return sum;
}

function shiftSubtitleLine(line: SubtitleLine, sceneStart: number): SubtitleLine {
  return {
    ...line,
    startFrame: line.startFrame - sceneStart,
    endFrame: line.endFrame - sceneStart,
    words: line.words.map((w) => ({
      ...w,
      startFrame: w.startFrame - sceneStart,
      endFrame: w.endFrame - sceneStart,
    })),
  };
}

export function buildSceneSubtitleLines(
  props: TradingAgentsProps,
  sceneIndex: number,
  fps: number,
): SubtitleLine[] {
  if (!props.subtitle.enabled) {
    return [];
  }
  const durations = resolveSceneDurations(props);
  const sceneStart = getSceneStartFrame(durations, sceneIndex);
  const sceneDuration =
    durations[sceneIndex] ?? DEFAULT_SCENE_DURATIONS[sceneIndex] ?? 600;
  const sceneEnd = sceneStart + sceneDuration;

  const shift = (line: SubtitleLine) => shiftSubtitleLine(line, sceneStart);

  if (props.precomputedSubtitles && props.precomputedSubtitles.length > 0) {
    return props.precomputedSubtitles
      .filter((line) => line.endFrame >= sceneStart && line.startFrame < sceneEnd)
      .map(shift);
  }

  const script = props.voiceoverScripts[sceneIndex] ?? "";
  const globalStart = sceneStart + Math.round(fps * 0.3);
  const subtitleDuration = Math.max(1, sceneDuration - Math.round(fps * 1));
  const line = generateSubtitleLines(script, globalStart, subtitleDuration, fps);
  return [shift(line)];
}
