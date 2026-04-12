import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../../../components/SceneBackground";
import {
  KaraokeSubtitle,
  type SubtitleLine,
  generateSubtitleLines,
} from "../../../components/KaraokeSubtitle";
import type { TradingAgentsProps } from "../schema";
import {
  fadeInUp,
  lineGrow,
  pulseGlow,
  staggerDelay,
} from "../animations";

const DEFAULT_SCENE_DURATIONS = [510, 660, 660, 600, 720, 660, 600];

const textSafe: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

const SCENE_INDEX = 3;

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

export const RiskScene: React.FC<TradingAgentsProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    riskTitle,
    riskLevels,
    riskQuote,
    accentColor,
    highlightColor,
    successColor,
    dangerColor,
    goldColor,
    textColor,
    panelColor,
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

  const borderForLevel = (color: string) => {
    if (color === "danger") return dangerColor;
    if (color === "warning") return highlightColor;
    return successColor;
  };

  const titleLabel = fadeInUp(sceneFrame, fps, 0);
  const titleMain = fadeInUp(sceneFrame, fps, 6);
  const trader = fadeInUp(sceneFrame, fps, 12);
  const line1 = lineGrow(sceneFrame, fps, 22, 0.35);
  const riskBase = 34;
  const clashDelay = riskBase + staggerDelay(2, 10) + 18;
  const clashPulse = pulseGlow(sceneFrame - clashDelay, fps, 1.2);
  const line2Delay = riskBase + staggerDelay(3, 10) + 24;
  const line2 = lineGrow(sceneFrame, fps, line2Delay, 0.35);
  const managerDelay = line2Delay + 18;
  const manager = fadeInUp(sceneFrame, fps, managerDelay);
  const quote = fadeInUp(sceneFrame, fps, managerDelay + 28);

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", overflow: "hidden" }}>
      <SceneBackground
        backgroundColor="#060a12"
        accentColor="#2563eb"
        particles={{ count: 28, color: "#2563eb" }}
        hud={{ color: "#2563eb", animation: "pulse", inset: 80 }}
      >
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
              gap: 16,
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
                RISK CONTROL
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
                {riskTitle}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
                minWidth: 0,
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: 520,
                  borderRadius: 14,
                  border: `2px solid ${accentColor}`,
                  background: panelColor,
                  padding: "14px 18px",
                  boxSizing: "border-box",
                  textAlign: "center",
                  opacity: trader.opacity,
                  transform: `translateY(${trader.y}px)`,
                  ...textSafe,
                }}
              >
                <span style={{ fontSize: 26, marginRight: 8 }}>📋</span>
                <span style={{ fontSize: 26, fontWeight: 800, color: textColor }}>交易员方案</span>
              </div>

              <div
                style={{
                  width: 4,
                  height: 44,
                  margin: "4px 0",
                  borderRadius: 2,
                  background: `linear-gradient(180deg, ${accentColor}, ${accentColor}88)`,
                  transformOrigin: "top center",
                  transform: `scaleY(${line1})`,
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "stretch",
                  justifyContent: "center",
                  gap: 6,
                  width: "100%",
                  minWidth: 0,
                }}
              >
                {riskLevels.map((level, index) => {
                  const d = riskBase + staggerDelay(index, 10);
                  const anim = fadeInUp(sceneFrame, fps, d);
                  const border = borderForLevel(level.color);
                  return (
                    <React.Fragment key={`${level.label}-${String(index)}`}>
                      {index > 0 ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: "0 0 28px",
                            fontSize: 22,
                            opacity:
                              sceneFrame >= clashDelay
                                ? 0.45 + clashPulse * 0.55
                                : 0,
                            transform:
                              sceneFrame >= clashDelay
                                ? `scale(${0.92 + clashPulse * 0.12})`
                                : "scale(0.5)",
                          }}
                        >
                          ⚔️
                        </div>
                      ) : null}
                      <div
                        style={{
                          flex: "1 1 0",
                          minWidth: 0,
                          borderRadius: 12,
                          border: `2px solid ${border}`,
                          background: panelColor,
                          padding: "12px 8px",
                          boxSizing: "border-box",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 6,
                          opacity: anim.opacity,
                          transform: `translateY(${anim.y}px)`,
                        }}
                      >
                        <span style={{ fontSize: 24 }}>{level.emoji}</span>
                        <span
                          style={{
                            fontSize: 20,
                            fontWeight: 800,
                            color: textColor,
                            ...textSafe,
                            textAlign: "center",
                          }}
                        >
                          {level.label}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              <div
                style={{
                  width: 4,
                  height: 44,
                  margin: "4px 0",
                  borderRadius: 2,
                  background: `linear-gradient(180deg, ${accentColor}, ${goldColor}99)`,
                  transformOrigin: "top center",
                  transform: `scaleY(${line2})`,
                }}
              />

              <div
                style={{
                  width: "100%",
                  maxWidth: 520,
                  borderRadius: 14,
                  border: `2px solid ${goldColor}`,
                  background: "rgba(255, 215, 0, 0.06)",
                  padding: "14px 18px",
                  boxSizing: "border-box",
                  textAlign: "center",
                  opacity: manager.opacity,
                  transform: `translateY(${manager.y}px)`,
                  ...textSafe,
                }}
              >
                <span style={{ fontSize: 26, marginRight: 8 }}>✅</span>
                <span style={{ fontSize: 26, fontWeight: 800, color: textColor }}>组合经理审批</span>
              </div>
            </div>

            <div
              style={{
                marginTop: 8,
                fontSize: 32,
                fontWeight: 900,
                color: goldColor,
                textAlign: "center",
                textShadow: `0 0 24px ${goldColor}55`,
                opacity: quote.opacity,
                transform: `translateY(${quote.y}px)`,
                ...textSafe,
              }}
            >
              {riskQuote}
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
