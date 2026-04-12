import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../../../components/SceneBackground";
import {
  KaraokeSubtitle,
  type SubtitleLine,
  generateSubtitleLines,
} from "../../../components/KaraokeSubtitle";
import type { TradingAgentsProps } from "../schema";
import { fadeInUp, lineGrow } from "../animations";

const DEFAULT_SCENE_DURATIONS = [510, 660, 660, 600, 720, 660, 600];
const SCENE_INDEX = 5;

const textWrap: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

const safeArea: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 420,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "0 60px",
  minWidth: 0,
  overflow: "hidden",
  boxSizing: "border-box",
};

function remapSubtitleLinesToSequence(
  lines: SubtitleLine[],
  sceneGlobalStart: number,
  sceneGlobalEnd: number,
): SubtitleLine[] {
  return lines
    .filter(
      (line) =>
        line.endFrame > sceneGlobalStart && line.startFrame < sceneGlobalEnd,
    )
    .map((line) => ({
      ...line,
      startFrame: line.startFrame - sceneGlobalStart,
      endFrame: line.endFrame - sceneGlobalStart,
      words: line.words.map((w) => ({
        ...w,
        startFrame: w.startFrame - sceneGlobalStart,
        endFrame: w.endFrame - sceneGlobalStart,
      })),
    }));
}

/** Bottom CN card: slide up + slight scale when “中文增强版” lands (~mid scene). */
const cnCardEntrance = (sceneFrame: number, fps: number, delay: number) => {
  const sp = spring({
    frame: sceneFrame - delay,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.55 },
  });
  return {
    opacity: interpolate(sp, [0, 1], [0, 1]),
    y: interpolate(sp, [0, 1], [56, 0]),
    scale: interpolate(sp, [0, 1], [0.9, 1.04]),
  };
};

export const EcoScene: React.FC<TradingAgentsProps> = (props) => {
  const sceneFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    ecoTitle,
    ecoMainRepo,
    ecoCnRepo,
    subtitle,
    voiceoverScripts,
    precomputedSubtitles,
    accentColor,
    highlightColor,
    goldColor,
    dangerColor,
    textColor,
    mutedTextColor,
    panelColor,
    sceneDurations,
  } = props;

  const durations =
    sceneDurations?.length === 7 ? sceneDurations : DEFAULT_SCENE_DURATIONS;
  const sceneDuration = durations[SCENE_INDEX] ?? 660;
  const sceneGlobalStart = useMemo(
    () => durations.slice(0, SCENE_INDEX).reduce((a, b) => a + b, 0),
    [durations],
  );
  const sceneGlobalEnd = sceneGlobalStart + sceneDuration;

  const subtitleLines = useMemo<SubtitleLine[]>(() => {
    if (!subtitle.enabled) {
      return [];
    }
    if (precomputedSubtitles && precomputedSubtitles.length > 0) {
      return remapSubtitleLinesToSequence(
        precomputedSubtitles,
        sceneGlobalStart,
        sceneGlobalEnd,
      );
    }
    const script = voiceoverScripts[SCENE_INDEX] ?? "";
    return [
      generateSubtitleLines(
        script,
        Math.round(fps * 0.3),
        sceneDuration - Math.round(fps * 1),
        fps,
      ),
    ];
  }, [
    fps,
    precomputedSubtitles,
    sceneDuration,
    sceneGlobalEnd,
    sceneGlobalStart,
    subtitle.enabled,
    voiceoverScripts,
  ]);

  const titleAnim = fadeInUp(sceneFrame, fps, 0);
  const topCardAnim = fadeInUp(sceneFrame, fps, 8);
  const lineT = lineGrow(sceneFrame, fps, Math.round(fps * 0.45), 0.35);
  const cnDelay = Math.round(fps * 7.5);
  const cnAnim = cnCardEntrance(sceneFrame, fps, cnDelay);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <SceneBackground
        backgroundColor="#060a12"
        accentColor="#2563eb"
        particles={{ count: 22, color: "#2563eb" }}
        hud={{ color: "#2563eb", animation: "pulse", inset: 80 }}
        glow={{
          orbs: [
            {
              x: "50%",
              y: "38%",
              color: "#2563eb",
              radius: 480,
              opacity: 0.1,
              pulseSpeed: 0.55,
              pulseAmount: 0.18,
            },
          ],
        }}
      >
        <div
          style={{
            ...safeArea,
            fontFamily: '"PingFang SC", "SF Pro Display", system-ui, sans-serif',
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              minWidth: 0,
              width: "100%",
              opacity: titleAnim.opacity,
              transform: `translateY(${titleAnim.y}px)`,
            }}
          >
            <div
              style={{
                fontSize: 18,
                letterSpacing: 10,
                color: accentColor,
                fontWeight: 800,
                ...textWrap,
              }}
            >
              ECOSYSTEM
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                lineHeight: 1.08,
                background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: `0 0 28px ${highlightColor}33`,
                ...textWrap,
              }}
            >
              {ecoTitle}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              width: "100%",
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                borderRadius: 14,
                border: `2px solid ${accentColor}`,
                background: panelColor,
                padding: "18px 16px",
                boxSizing: "border-box",
                opacity: topCardAnim.opacity,
                transform: `translateY(${topCardAnim.y}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: textColor,
                  marginBottom: 8,
                  ...textWrap,
                }}
              >
                {ecoMainRepo.name}
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  color: goldColor,
                  marginBottom: 12,
                }}
              >
                ★ {ecoMainRepo.stars}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                {ecoMainRepo.tags.map((tag, i) => (
                  <React.Fragment key={tag}>
                    {i > 0 ? (
                      <span style={{ color: mutedTextColor, fontSize: 18 }}>
                        ·
                      </span>
                    ) : null}
                    <span
                      style={{
                        fontSize: 19,
                        fontWeight: 600,
                        color: mutedTextColor,
                        ...textWrap,
                      }}
                    >
                      {tag}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div
              style={{
                height: 28,
                width: 4,
                margin: "4px 0",
                borderRadius: 2,
                background: `linear-gradient(180deg, ${accentColor}, ${highlightColor})`,
                transformOrigin: "center top",
                transform: `scaleY(${lineT})`,
              }}
            />

            <div
              style={{
                padding: 2,
                borderRadius: 16,
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                boxSizing: "border-box",
                background: `linear-gradient(135deg, ${dangerColor}, ${goldColor})`,
                opacity: cnAnim.opacity,
                transform: `translateY(${cnAnim.y}px) scale(${cnAnim.scale})`,
                transformOrigin: "center center",
              }}
            >
              <div
                style={{
                  borderRadius: 14,
                  background: "rgba(6, 10, 18, 0.92)",
                  padding: "18px 16px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                    minWidth: 0,
                  }}
                >
                  <span style={{ fontSize: 32, lineHeight: 1 }} aria-hidden>
                    🇨🇳
                  </span>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      color: textColor,
                      flex: "1 1 0",
                      minWidth: 0,
                      ...textWrap,
                    }}
                  >
                    {ecoCnRepo.name}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    color: goldColor,
                    marginBottom: 12,
                  }}
                >
                  ★ {ecoCnRepo.stars}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 8,
                    alignItems: "center",
                    minWidth: 0,
                  }}
                >
                  {ecoCnRepo.tags.map((tag, i) => (
                    <React.Fragment key={tag}>
                      {i > 0 ? (
                        <span style={{ color: mutedTextColor, fontSize: 18 }}>
                          ·
                        </span>
                      ) : null}
                      <span
                        style={{
                          fontSize: 19,
                          fontWeight: 600,
                          color: mutedTextColor,
                          ...textWrap,
                        }}
                      >
                        {tag}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
      </SceneBackground>
    </AbsoluteFill>
  );
};
