import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../../../components/SceneBackground";
import {
  KaraokeSubtitle,
  type SubtitleLine,
  generateSubtitleLines,
} from "../../../components/KaraokeSubtitle";
import type { TradingAgentsProps } from "../schema";
import {
  fadeInUp,
  numberCountUp,
  staggerDelay,
} from "../animations";

const DEFAULT_SCENE_DURATIONS = [510, 660, 660, 600, 720, 660, 600];

const textSafe: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

const SCENE_INDEX = 4;

function parsePercentToCent(value: string): number {
  const n = parseFloat(value.replace(/[^0-9.-]/g, ""));
  if (!Number.isFinite(n)) {
    return 2662;
  }
  return Math.round(Math.abs(n) * 100);
}

function buildSceneSubtitleLines(
  props: TradingAgentsProps,
  sceneIndex: number,
  sceneStartFrame: number,
  sceneDuration: number,
  fps: number,
): SubtitleLine[] {
  const { subtitle, precomputedSubtitles, voiceoverScripts } = props;
  if (!subtitle.enabled) {
    return [];
  }

  const shiftLine = (line: SubtitleLine): SubtitleLine => ({
    ...line,
    startFrame: line.startFrame - sceneStartFrame,
    endFrame: line.endFrame - sceneStartFrame,
    words: line.words.map((w) => ({
      ...w,
      startFrame: w.startFrame - sceneStartFrame,
      endFrame: w.endFrame - sceneStartFrame,
    })),
  });

  if (precomputedSubtitles?.[sceneIndex]) {
    return [shiftLine(precomputedSubtitles[sceneIndex])];
  }

  const script = voiceoverScripts[sceneIndex] ?? "";
  return [
    generateSubtitleLines(
      script,
      Math.round(fps * 0.3),
      Math.max(1, sceneDuration - Math.round(fps * 1)),
      fps,
    ),
  ];
}

export const DataScene: React.FC<TradingAgentsProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    dataTitle,
    dataBullish,
    dataBearish,
    dataWarnings,
    dataQuote,
    accentColor,
    highlightColor,
    successColor,
    dangerColor,
    goldColor,
    textColor,
    subtitle,
  } = props;

  const sceneDurations = props.sceneDurations ?? DEFAULT_SCENE_DURATIONS;
  const sceneStartFrame = sceneDurations
    .slice(0, SCENE_INDEX)
    .reduce((a, b) => a + b, 0);
  const sceneDuration = sceneDurations[SCENE_INDEX];
  const sceneFrame = frame;

  const subtitleLines = useMemo(
    () =>
      buildSceneSubtitleLines(
        props,
        SCENE_INDEX,
        sceneStartFrame,
        sceneDuration,
        fps,
      ),
    [fps, props, sceneDuration, sceneStartFrame],
  );

  const flipPoint = sceneDuration * 0.5;
  const greenOpacity = interpolate(
    sceneFrame,
    [flipPoint - 15, flipPoint + 15],
    [0.3, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const redOpacity = interpolate(
    sceneFrame,
    [flipPoint - 15, flipPoint + 15],
    [0, 0.25],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const titleLabel = fadeInUp(sceneFrame, fps, 0);
  const titleMain = fadeInUp(sceneFrame, fps, 6);

  const bullishCentTarget = parsePercentToCent(dataBullish.return);
  const countedCent = numberCountUp(sceneFrame, fps, bullishCentTarget, 1.4, 14);
  const bullishDisplay = `${(countedCent / 100).toFixed(2)}%`;

  const phase1Opacity = interpolate(
    sceneFrame,
    [flipPoint - 24, flipPoint + 12],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const panelLiftStart = flipPoint - 6;
  const panelY = interpolate(
    sceneFrame,
    [panelLiftStart, panelLiftStart + 36],
    [220, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (t) => 1 - (1 - t) ** 2 },
  );
  const panelOpacity = interpolate(
    sceneFrame,
    [panelLiftStart, panelLiftStart + 14],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const tagsBase = panelLiftStart + 28;
  const quoteAnim = fadeInUp(sceneFrame, fps, tagsBase + staggerDelay(3, 12));

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", overflow: "hidden" }}>
      <SceneBackground
        backgroundColor="#060a12"
        accentColor="#2563eb"
        particles={{ count: 28, color: "#2563eb" }}
        hud={{ color: "#2563eb", animation: "pulse", inset: 80 }}
      >
        <AbsoluteFill style={{ pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 50% 42%, ${successColor}${Math.round(
                greenOpacity * 255,
              )
                .toString(16)
                .padStart(2, "0")}, transparent 55%)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 50% 58%, ${dangerColor}${Math.round(
                redOpacity * 255,
              )
                .toString(16)
                .padStart(2, "0")}, transparent 50%),
              radial-gradient(circle at 30% 70%, ${highlightColor}${Math.round(
                redOpacity * 0.6 * 255,
              )
                .toString(16)
                .padStart(2, "0")}, transparent 45%)`,
            }}
          />
        </AbsoluteFill>

        <div
          style={{
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
            boxSizing: "border-box",
            fontFamily: '"PingFang SC", "SF Pro Display", system-ui, sans-serif',
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              minWidth: 0,
              width: "100%",
              alignItems: "stretch",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 18,
                  letterSpacing: 8,
                  color: accentColor,
                  fontWeight: 800,
                  opacity: titleLabel.opacity,
                  transform: `translateY(${titleLabel.y}px)`,
                  ...textSafe,
                }}
              >
                HONEST DATA
              </div>
              <div
                style={{
                  fontSize: 56,
                  lineHeight: 1.08,
                  fontWeight: 900,
                  background: `linear-gradient(135deg, ${accentColor}, ${goldColor})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: `0 0 28px ${accentColor}44`,
                  opacity: titleMain.opacity,
                  transform: `translateY(${titleMain.y}px)`,
                  ...textSafe,
                }}
              >
                {dataTitle}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                flex: "0 0 auto",
                minHeight: 420,
                minWidth: 0,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 18,
                  opacity: phase1Opacity,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    maxWidth: 900,
                    borderRadius: 20,
                    border: `2px solid ${successColor}88`,
                    background: `linear-gradient(160deg, rgba(16, 185, 129, 0.22), rgba(255, 215, 0, 0.12))`,
                    padding: "36px 24px",
                    boxSizing: "border-box",
                    textAlign: "center",
                    boxShadow: `0 0 40px ${successColor}33`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 90,
                      fontWeight: 900,
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      color: goldColor,
                      textShadow: `0 0 32px ${goldColor}66`,
                      ...textSafe,
                    }}
                  >
                    {dataBullish.ticker} +{bullishDisplay}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontSize: 36,
                      fontWeight: 700,
                      color: dangerColor,
                      ...textSafe,
                    }}
                  >
                    {"Buy & Hold:"} {dataBullish.benchmark}
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  maxWidth: 900,
                  opacity: panelOpacity,
                  transform: `translateY(${panelY}px)`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    borderRadius: 18,
                    border: `2px solid ${dangerColor}`,
                    background: "rgba(239, 68, 68, 0.12)",
                    padding: "28px 22px",
                    boxSizing: "border-box",
                    textAlign: "center",
                    boxShadow: `0 0 36px ${dangerColor}44`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 900,
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      color: dangerColor,
                      ...textSafe,
                    }}
                  >
                    社区复现: {dataBearish.ticker} {dataBearish.communityReturn}
                  </div>
                  <div
                    style={{
                      marginTop: 16,
                      height: 2,
                      width: "100%",
                      background: `linear-gradient(90deg, transparent, ${highlightColor}, transparent)`,
                    }}
                  />
                  <div
                    style={{
                      marginTop: 12,
                      fontSize: 40,
                      fontWeight: 800,
                      color: highlightColor,
                    }}
                  >
                    ⚠️
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    width: "100%",
                    minWidth: 0,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {dataWarnings.slice(0, 3).map((w, index) => {
                    const d = staggerDelay(index, 10);
                    const tag = fadeInUp(sceneFrame, fps, tagsBase + d);
                    return (
                      <div
                        key={`${w}-${index}`}
                        style={{
                          flex: "0 1 auto",
                          maxWidth: "100%",
                          padding: "10px 14px",
                          borderRadius: 999,
                          border: `1px solid ${highlightColor}`,
                          background: "rgba(245, 158, 11, 0.12)",
                          color: highlightColor,
                          fontSize: 20,
                          fontWeight: 800,
                          letterSpacing: 1,
                          opacity: tag.opacity,
                          transform: `translateY(${tag.y}px)`,
                          boxSizing: "border-box",
                          ...textSafe,
                        }}
                      >
                        {w}
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: highlightColor,
                    textAlign: "center",
                    textShadow: `0 0 20px ${highlightColor}44`,
                    opacity: quoteAnim.opacity,
                    transform: `translateY(${quoteAnim.y}px)`,
                    ...textSafe,
                  }}
                >
                  {dataQuote}
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
