import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../../../components/SceneBackground";
import { KaraokeSubtitle } from "../../../components/KaraokeSubtitle";
import type { TradingAgentsProps } from "../schema";
import {
  fadeInUp,
  glitchOffset,
  progressBar,
  pulseGlow,
  slideFromLeft,
  slideFromRight,
} from "../animations";
import { buildSceneSubtitleLines, resolveSceneDurations } from "../sceneHelpers";
import { TitleBlock } from "../TitleBlock";

const textWrap: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

const SCENE_INDEX = 2;

const BULL_POINTS = ["寻找利好证据", "反驳风险论点", "建立买入逻辑"];
const BEAR_POINTS = ["死磕每个风险", "质疑估值逻辑", "揭露潜在泡沫"];

export const DebateScene: React.FC<TradingAgentsProps> = (props) => {
  const {
    debateTitle,
    debateRounds,
    debateBullLabel,
    debateBearLabel,
    debateQuote,
    accentColor,
    highlightColor,
    successColor,
    dangerColor,
    goldColor,
    textColor,
    mutedTextColor,
    panelColor,
    subtitle,
  } = props;

  const sceneFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durations = resolveSceneDurations(props);
  const sceneDuration = durations[SCENE_INDEX] ?? 660;

  const subtitleLines = useMemo(
    () => buildSceneSubtitleLines(props, SCENE_INDEX, fps),
    [props, fps],
  );

  const leftX = slideFromLeft(sceneFrame, fps, 12);
  const rightX = slideFromRight(sceneFrame, fps, 12);
  const pulse = pulseGlow(sceneFrame, fps, 1.5);
  const glitch = glitchOffset(sceneFrame, 3);
  const vsGlow = 0.55 + 0.45 * pulse;

  const quoteFade = fadeInUp(sceneFrame, fps, 95);
  const barSeconds = Math.min(6, Math.max(3, sceneDuration / fps * 0.35));
  const barPct = progressBar(sceneFrame, fps, barSeconds, 24);

  const rounds = Math.max(1, Math.min(5, debateRounds));
  const roundLabels = Array.from({ length: rounds }, (_, i) => `Round ${i + 1}`);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <SceneBackground
        backgroundColor="#060a12"
        accentColor={accentColor}
        particles={{ count: 26, color: accentColor }}
        hud={{ color: dangerColor, animation: "pulse", inset: 80 }}
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
            boxSizing: "border-box",
            fontFamily: '"PingFang SC", "SF Pro Display", system-ui, sans-serif',
            gap: 18,
          }}
        >
          <TitleBlock
            label="BULL VS BEAR"
            title={debateTitle}
            sceneFrame={sceneFrame}
            accentColor={accentColor}
            highlightColor={highlightColor}
            textColor={textColor}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "stretch",
              gap: 14,
              minHeight: 0,
              minWidth: 0,
              width: "100%",
              flex: "0 1 auto",
            }}
          >
            <div
              style={{
                flex: "1 1 0",
                minWidth: 0,
                borderRadius: 12,
                border: `1px solid ${successColor}`,
                background: panelColor,
                padding: 18,
                boxSizing: "border-box",
                transform: `translateX(${leftX}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: successColor,
                  marginBottom: 14,
                  ...textWrap,
                }}
              >
                📈 {debateBullLabel}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
                {BULL_POINTS.map((line, i) => (
                  <div
                    key={`bull-${i}`}
                    style={{
                      fontSize: 22,
                      fontWeight: 600,
                      color: textColor,
                      ...textWrap,
                    }}
                  >
                    <span style={{ color: successColor, fontWeight: 900, marginRight: 8 }}>●</span>
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                padding: "0 2px",
              }}
            >
              <div
                style={{
                  color: goldColor,
                  fontSize: 36,
                  fontWeight: 900,
                  textAlign: "center",
                  opacity: vsGlow,
                  textShadow: `0 0 ${12 + 22 * pulse}px ${goldColor}77`,
                  transform: `translate(${glitch.x}px, ${glitch.y}px) skewX(${glitch.skew}deg)`,
                  ...textWrap,
                }}
              >
                ⚔️ VS
              </div>
            </div>

            <div
              style={{
                flex: "1 1 0",
                minWidth: 0,
                borderRadius: 12,
                border: `1px solid ${dangerColor}`,
                background: panelColor,
                padding: 18,
                boxSizing: "border-box",
                transform: `translateX(${rightX}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: dangerColor,
                  marginBottom: 14,
                  ...textWrap,
                }}
              >
                📉 {debateBearLabel}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
                {BEAR_POINTS.map((line, i) => (
                  <div
                    key={`bear-${i}`}
                    style={{
                      fontSize: 22,
                      fontWeight: 600,
                      color: textColor,
                      ...textWrap,
                    }}
                  >
                    <span style={{ color: dangerColor, fontWeight: 900, marginRight: 8 }}>●</span>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ minWidth: 0, width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                padding: "0 4px",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {roundLabels.map((label, i) => {
                const threshold = (i / rounds) * 100;
                const active = barPct >= threshold;
                return (
                  <React.Fragment key={label}>
                    {i > 0 ? (
                      <span style={{ fontSize: 20, fontWeight: 800, color: mutedTextColor }}>→</span>
                    ) : null}
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: active ? highlightColor : mutedTextColor,
                        textAlign: "center",
                        ...textWrap,
                      }}
                    >
                      {label}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            <div
              style={{
                position: "relative",
                height: 8,
                borderRadius: 999,
                overflow: "hidden",
                background: "rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${barPct}%`,
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${successColor}, ${highlightColor}, ${dangerColor})`,
                  boxShadow: `0 0 14px ${accentColor}88`,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
                fontSize: 18,
                fontWeight: 700,
                color: props.mutedTextColor,
                letterSpacing: 2,
              }}
            >
              <span style={{ flex: 1, textAlign: "left" }}>辩论推进</span>
              <span style={{ flex: 1, textAlign: "right" }}>
                {debateRounds} 轮对抗
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: 4,
              padding: "16px 20px",
              borderRadius: 12,
              border: `1px solid ${goldColor}55`,
              background: panelColor,
              textAlign: "center",
              opacity: quoteFade.opacity,
              transform: `translateY(${quoteFade.y}px)`,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: goldColor,
                textShadow: `0 0 24px ${goldColor}44`,
                ...textWrap,
              }}
            >
              {debateQuote}
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
