import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneBackground } from "../../components/SceneBackground";
import { SceneTransition } from "../../components/Transitions";
import {
  KaraokeSubtitle,
  SubtitleLine,
  generateSubtitleLines,
} from "../../components/KaraokeSubtitle";
import { AIHarnessEngineerProps } from "./schema";

const SCENE_COUNT = 7;
const DEFAULT_SCENE_DURATION = 450;

const getSceneDuration = (durations: number[], index: number) => {
  const value = durations[index];
  return typeof value === "number" && !Number.isNaN(value)
    ? value
    : DEFAULT_SCENE_DURATION;
};

const SceneCard: React.FC<
  AIHarnessEngineerProps & { index: number }
> = ({
  index,
  sceneCards,
  backgroundColor,
  accentColor,
  highlightColor,
  panelColor,
  textColor,
  mutedTextColor,
}) => {
  const card = sceneCards[index];

  return (
    <SceneBackground
      backgroundColor={backgroundColor}
      accentColor={accentColor}
      particles={{
        count: 34,
        speed: 0.3,
        color: highlightColor,
        opacity: 0.28,
        connectLines: false,
      }}
      glow={{
        orbs: [
          {
            x: "28%",
            y: "18%",
            color: accentColor,
            radius: 320,
            opacity: 0.14,
            pulseSpeed: 0.45,
            pulseAmount: 0.18,
          },
          {
            x: "82%",
            y: "70%",
            color: highlightColor,
            radius: 240,
            opacity: 0.12,
            pulseSpeed: 0.5,
            pulseAmount: 0.16,
          },
        ],
      }}
      hud={{ color: accentColor, animation: "pulse" }}
    >
      <AbsoluteFill
        style={{
          fontFamily: "\"PingFang SC\", \"SF Pro Display\", system-ui, sans-serif",
          color: textColor,
          padding: "96px 56px 420px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: 8,
              color: accentColor,
              fontWeight: 700,
            }}
          >
            {card.label}
          </div>

          <div
            style={{
              fontSize: 66,
              lineHeight: 1.08,
              fontWeight: 900,
              maxWidth: 860,
              textShadow: `0 0 30px ${accentColor}33`,
            }}
          >
            {card.title}
          </div>

          <div
            style={{
              maxWidth: 860,
              borderRadius: 28,
              border: `1px solid ${accentColor}33`,
              background: panelColor,
              padding: "28px 30px",
              boxShadow: "0 18px 48px rgba(0,0,0,0.28)",
            }}
          >
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.6,
                color: mutedTextColor,
                fontWeight: 600,
              }}
            >
              {card.summary}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              maxWidth: 860,
            }}
          >
            {card.chips.map((chip) => (
              <div
                key={`${card.label}-${chip}`}
                style={{
                  padding: "12px 20px",
                  borderRadius: 999,
                  border: `1px solid ${highlightColor}44`,
                  background: "rgba(255,255,255,0.03)",
                  color: highlightColor,
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                {chip}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </SceneBackground>
  );
};

export const AIHarnessEngineer: React.FC<AIHarnessEngineerProps> = (props) => {
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

  const subtitleLines = useMemo<SubtitleLine[]>(() => {
    if (!subtitle.enabled) {
      return [];
    }
    if (precomputedSubtitles && precomputedSubtitles.length > 0) {
      return precomputedSubtitles;
    }
    return voiceoverScripts.map((script, index) => {
      const sceneStart = sceneStartFrames[index] ?? 0;
      const duration = getSceneDuration(sceneDurationList, index);
      return generateSubtitleLines(
        script,
        sceneStart + Math.round(fps * 0.3),
        duration - Math.round(fps * 1),
        fps,
      );
    });
  }, [
    fps,
    precomputedSubtitles,
    sceneDurationList,
    sceneStartFrames,
    subtitle.enabled,
    voiceoverScripts,
  ]);

  const currentSceneIndex = useMemo(() => {
    for (let index = SCENE_COUNT - 1; index >= 0; index--) {
      if (frame >= sceneStartFrames[index]) {
        return index;
      }
    }
    return 0;
  }, [frame, sceneStartFrames]);

  return (
    <AbsoluteFill>
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

      {Array.from({ length: SCENE_COUNT }, (_, index) => (
        <Sequence
          key={`scene-${index + 1}`}
          from={sceneStartFrames[index] ?? 0}
          durationInFrames={getSceneDuration(sceneDurationList, index)}
          premountFor={Math.round(fps * 0.5)}
        >
          <SceneTransition type="fade" durationInFrames={12}>
            <SceneCard {...props} index={index} />
          </SceneTransition>
        </Sequence>
      ))}

      <div
        style={{
          position: "absolute",
          top: 48,
          right: 28,
          width: 4,
          height: 128,
          borderRadius: 999,
          overflow: "hidden",
          background: "rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: `${((currentSceneIndex + 1) / SCENE_COUNT) * 100}%`,
            background: `linear-gradient(180deg, ${accentColor}, ${highlightColor})`,
            boxShadow: `0 0 16px ${accentColor}`,
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

export default AIHarnessEngineer;
