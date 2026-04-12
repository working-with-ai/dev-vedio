import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneTransition } from "../../components/Transitions";
import type { TradingAgentsProps } from "./schema";
import { HookScene } from "./Scenes/HookScene";
import { ArchScene } from "./Scenes/ArchScene";
import { DebateScene } from "./Scenes/DebateScene";
import { RiskScene } from "./Scenes/RiskScene";
import { DataScene } from "./Scenes/DataScene";
import { EcoScene } from "./Scenes/EcoScene";
import { CTAScene } from "./Scenes/CTAScene";

const SCENE_COUNT = 7;
const DEFAULT_SCENE_DURATION = 450;

const getSceneDuration = (durations: number[], index: number) => {
  const value = durations[index];
  return typeof value === "number" && !Number.isNaN(value)
    ? value
    : DEFAULT_SCENE_DURATION;
};

const SCENES: React.FC<TradingAgentsProps>[] = [
  HookScene,
  ArchScene,
  DebateScene,
  RiskScene,
  DataScene,
  EcoScene,
  CTAScene,
];

export const TradingAgents: React.FC<TradingAgentsProps> = (props) => {
  const { sceneDurations, audio, accentColor, highlightColor, backgroundColor } = props;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneDurationList = useMemo(() => {
    if (sceneDurations?.length === SCENE_COUNT) {
      return sceneDurations;
    }
    return Array.from({ length: SCENE_COUNT }, () => DEFAULT_SCENE_DURATION);
  }, [sceneDurations]);

  const sceneStartFrames = useMemo(() => {
    const starts: number[] = [0];
    for (let index = 0; index < SCENE_COUNT - 1; index++) {
      starts.push(starts[index] + getSceneDuration(sceneDurationList, index));
    }
    return starts;
  }, [sceneDurationList]);

  const totalDurationInFrames = useMemo(
    () => sceneDurationList.reduce((sum, d) => sum + d, 0),
    [sceneDurationList],
  );

  const progressWidthPct = interpolate(
    frame,
    [0, Math.max(1, totalDurationInFrames - 1)],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor, overflow: "hidden" }}>
      {audio.backgroundMusic ? (
        <Audio
          src={staticFile(audio.backgroundMusic)}
          volume={audio.backgroundMusicVolume}
          loop
        />
      ) : null}

      {audio.voiceoverEnabled
        ? (audio.voiceoverAudioFiles ?? []).slice(0, SCENE_COUNT).map((audioFile, index) => (
            <Sequence
              key={`voice-${audioFile}`}
              from={(sceneStartFrames[index] ?? 0) + Math.round(fps * 0.3)}
              durationInFrames={getSceneDuration(sceneDurationList, index)}
              premountFor={Math.round(fps * 0.5)}
            >
              <Audio src={staticFile(audioFile)} volume={audio.voiceoverVolume} />
            </Sequence>
          ))
        : null}

      {SCENES.map((SceneComponent, index) => (
        <Sequence
          key={`scene-${index + 1}`}
          from={sceneStartFrames[index] ?? 0}
          durationInFrames={getSceneDuration(sceneDurationList, index)}
          premountFor={Math.round(fps * 0.5)}
        >
          <SceneTransition type="fade" durationInFrames={12}>
            <SceneComponent {...props} />
          </SceneTransition>
        </Sequence>
      ))}

      <div
        style={{
          position: "absolute",
          bottom: 450,
          left: 80,
          right: 80,
          height: 3,
          borderRadius: 999,
          overflow: "hidden",
          background: "rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressWidthPct}%`,
            background: `linear-gradient(90deg, ${accentColor}, ${highlightColor})`,
            boxShadow: `0 0 12px ${accentColor}`,
            borderRadius: 999,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export default TradingAgents;
