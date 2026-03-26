import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PencilDevProps } from "./schema";
import {
  KaraokeSubtitle,
  SubtitleLine,
  generateSubtitleLines,
} from "../../components/KaraokeSubtitle";
import { SceneTransition } from "../../components/Transitions";

import { HookScene } from "./Scenes/HookScene";
import { PainScene } from "./Scenes/PainScene";
import { CoreScene } from "./Scenes/CoreScene";
import { AgentScene } from "./Scenes/AgentScene";
import { ProofScene } from "./Scenes/ProofScene";
import { DailyUseScene } from "./Scenes/DailyUseScene";
import { CTAScene } from "./Scenes/CTAScene";

const SCENES: React.FC<PencilDevProps>[] = [
  HookScene,
  PainScene,
  CoreScene,
  AgentScene,
  ProofScene,
  DailyUseScene,
  CTAScene,
];
const SCENE_COUNT = SCENES.length;
const DEFAULT_SCENE_DURATION = 300;

const sceneDurationAt = (list: number[], index: number): number => {
  const d = list[index];
  return typeof d === "number" && !Number.isNaN(d) ? d : DEFAULT_SCENE_DURATION;
};

export const PencilDev: React.FC<PencilDevProps> = (props) => {
  const {
    sceneDurations,
    subtitle,
    voiceoverScripts,
    precomputedSubtitles,
    audio,
    accentColor,
    highlightColor,
  } = props;

  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const sceneStartFrames = useMemo(() => {
    if (sceneDurations?.length === SCENE_COUNT) {
      const starts: number[] = [0];
      for (let i = 0; i < SCENE_COUNT - 1; i++) {
        starts.push(starts[i] + sceneDurations[i]);
      }
      return starts;
    }
    return Array.from({ length: SCENE_COUNT }, (_, i) => i * DEFAULT_SCENE_DURATION);
  }, [sceneDurations]);

  const sceneDurationList = useMemo(() => {
    if (sceneDurations?.length === SCENE_COUNT) {
      return sceneDurations;
    }
    return Array.from({ length: SCENE_COUNT }, () => DEFAULT_SCENE_DURATION);
  }, [sceneDurations]);

  const getSceneDuration = (index: number) => sceneDurationAt(sceneDurationList, index);

  const subtitleLines = useMemo<SubtitleLine[]>(() => {
    if (!subtitle.enabled) {
      return [];
    }

    if (precomputedSubtitles && precomputedSubtitles.length > 0) {
      return precomputedSubtitles;
    }

    if (!voiceoverScripts) {
      return [];
    }

    return voiceoverScripts.map((script, index) => {
      const sceneStart = sceneStartFrames[index] ?? 0;
      const duration = sceneDurationAt(sceneDurationList, index);
      const subtitleStart = sceneStart + Math.round(fps * 0.3);
      const subtitleDuration = duration - Math.round(fps * 1);
      return generateSubtitleLines(script, subtitleStart, subtitleDuration, fps);
    });
  }, [
    voiceoverScripts,
    subtitle.enabled,
    precomputedSubtitles,
    sceneStartFrames,
    sceneDurationList,
    fps,
  ]);

  const voiceoverFiles = useMemo(
    () => (audio.voiceoverAudioFiles ?? []).slice(0, SCENE_COUNT),
    [audio.voiceoverAudioFiles],
  );

  const currentSceneIndex = useMemo(() => {
    for (let i = SCENE_COUNT - 1; i >= 0; i--) {
      if (frame >= sceneStartFrames[i]) {
        return i;
      }
    }
    return 0;
  }, [frame, sceneStartFrames]);

  const transitionDuration = 12;

  return (
    <AbsoluteFill>
      {audio.backgroundMusic ? (
        <Audio
          src={staticFile(audio.backgroundMusic)}
          volume={(f) => {
            const fadeInVol = interpolate(f, [0, fps * 2], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const fadeOutVol = interpolate(
              f,
              [durationInFrames - fps * 2, durationInFrames],
              [1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );
            return Math.min(fadeInVol, fadeOutVol) * audio.backgroundMusicVolume;
          }}
          loop
        />
      ) : null}

      {audio.voiceoverEnabled
        ? voiceoverFiles.map((audioFile, index) => (
            <Sequence
              key={`vo-${index}`}
              from={(sceneStartFrames[index] ?? 0) + Math.round(fps * 0.3)}
              durationInFrames={getSceneDuration(index)}
              premountFor={Math.round(fps * 0.5)}
            >
              <Audio src={staticFile(audioFile)} volume={audio.voiceoverVolume} />
            </Sequence>
          ))
        : null}

      {SCENES.map((SceneComponent, index) => (
        <Sequence
          key={`scene-${index}`}
          from={sceneStartFrames[index] ?? 0}
          durationInFrames={getSceneDuration(index)}
          premountFor={Math.round(fps * 0.5)}
        >
          <SceneTransition type="fade" durationInFrames={transitionDuration}>
            <SceneComponent {...props} />
          </SceneTransition>
        </Sequence>
      ))}

      <div
        style={{
          position: "absolute",
          top: 40,
          right: 20,
          width: 4,
          height: 110,
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: `${((currentSceneIndex + 1) / SCENE_COUNT) * 100}%`,
            background: `linear-gradient(180deg, ${accentColor}, ${highlightColor})`,
            borderRadius: 999,
            boxShadow: `0 0 12px ${accentColor}`,
          }}
        />
      </div>

      {subtitle.enabled && subtitleLines.length > 0 ? (
        <KaraokeSubtitle
          lines={subtitleLines}
          fontSize={subtitle.fontSize}
          textColor={subtitle.textColor}
          highlightColor={subtitle.highlightColor}
          backgroundColor={subtitle.backgroundColor}
          position={subtitle.position}
          style={{ bottom: 380 }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

export default PencilDev;
