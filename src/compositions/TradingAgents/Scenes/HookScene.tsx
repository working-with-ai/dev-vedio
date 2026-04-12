import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../../../components/SceneBackground";
import { KaraokeSubtitle } from "../../../components/KaraokeSubtitle";
import type { TradingAgentsConflictCard, TradingAgentsProps } from "../schema";
import { fadeInUp, numberCountUp, staggerDelay } from "../animations";
import { buildSceneSubtitleLines } from "../sceneHelpers";

const textWrap: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

const HOOK_ANCHOR = "你到底该听谁的";

const SCENE_INDEX = 0;

const parseStarTarget = (hookStarCount: string): number => {
  const digits = hookStarCount.replace(/\D/g, "");
  const n = parseInt(digits, 10);
  return Number.isFinite(n) && n > 0 ? n : 49000;
};

const formatStarCount = (value: number): string =>
  `${value.toLocaleString("en-US")}+`;

const blendHoldIntoFade = (
  frame: number,
  holdStart: number,
  holdEnd: number,
  fade: { opacity: number; y: number },
): { opacity: number; y: number } => {
  const hold = interpolate(frame, [holdStart, holdEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return {
    opacity: fade.opacity + hold * (1 - fade.opacity),
    y: fade.y * (1 - hold),
  };
};

const borderForCard = (card: TradingAgentsConflictCard, props: TradingAgentsProps): string => {
  if (card.color === "success") {
    return props.successColor;
  }
  if (card.color === "danger") {
    return props.dangerColor;
  }
  return props.highlightColor;
};

export const HookScene: React.FC<TradingAgentsProps> = (props) => {
  const {
    hookTitle,
    hookStarCount,
    hookConflictCards,
    accentColor,
    highlightColor,
    goldColor,
    textColor,
    mutedTextColor,
    panelColor,
    subtitle,
  } = props;

  const sceneFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const subtitleLines = useMemo(
    () => buildSceneSubtitleLines(props, SCENE_INDEX, fps),
    [props, fps],
  );

  const coverPhase = sceneFrame < 5;
  const targetStars = parseStarTarget(hookStarCount);
  const animatedCount = numberCountUp(sceneFrame, fps, targetStars, 2, 5);
  const starLabel = coverPhase ? hookStarCount : formatStarCount(animatedCount);

  const starSpring = spring({
    frame: coverPhase ? 24 : sceneFrame - 5,
    fps,
    config: { damping: 100, stiffness: 200, mass: 0.5 },
  });
  const starScale = coverPhase ? 1 : interpolate(starSpring, [0, 1], [0.94, 1]);

  const anchorFade = fadeInUp(sceneFrame, fps, 6);
  const anchor = coverPhase
    ? { opacity: 1, y: 0 }
    : blendHoldIntoFade(sceneFrame, 6, 22, anchorFade);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <SceneBackground
        backgroundColor="#060a12"
        accentColor={accentColor}
        glow={{
          orbs: [
            {
              x: "50%",
              y: "38%",
              color: goldColor,
              radius: 520,
              opacity: 0.2,
              pulseSpeed: 0.55,
              pulseAmount: 0.18,
            },
            {
              x: "18%",
              y: "72%",
              color: accentColor,
              radius: 360,
              opacity: 0.1,
              pulseSpeed: 0.45,
              pulseAmount: 0.12,
            },
          ],
        }}
        particles={{ count: 32, color: accentColor }}
        hud={{ color: accentColor, animation: "pulse", inset: 80 }}
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
            gap: 14,
          }}
        >
          <div
            style={{
              fontSize: 68,
              letterSpacing: 16,
              fontWeight: 900,
              textAlign: "center",
              color: textColor,
              textShadow: `0 0 48px ${accentColor}55, 0 0 80px ${goldColor}33`,
              ...textWrap,
            }}
          >
            {hookTitle}
          </div>

          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              textAlign: "center",
              background: `linear-gradient(135deg, ${highlightColor}, ${goldColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: anchor.opacity,
              transform: `translateY(${anchor.y}px)`,
              ...textWrap,
            }}
          >
            {HOOK_ANCHOR}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              width: "100%",
              minWidth: 0,
              marginTop: 4,
            }}
          >
            {hookConflictCards.map((card, index) => {
              const delay = staggerDelay(index, 9);
              const fade = fadeInUp(sceneFrame, fps, delay);
              const cardAnim = coverPhase
                ? { opacity: 1, y: 0 }
                : blendHoldIntoFade(sceneFrame, delay, delay + 18, fade);
              const borderColor = borderForCard(card, props);
              return (
                <div
                  key={`${card.label}-${index}`}
                  style={{
                    borderRadius: 12,
                    border: `1px solid ${borderColor}`,
                    background: panelColor,
                    padding: "14px 18px",
                    boxSizing: "border-box",
                    opacity: cardAnim.opacity,
                    transform: `translateY(${cardAnim.y}px)`,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      minWidth: 0,
                    }}
                  >
                    <span style={{ fontSize: 30, flexShrink: 0 }}>{card.icon}</span>
                    <div style={{ flex: "1 1 0", minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 22,
                          fontWeight: 800,
                          color: borderColor,
                          marginBottom: 4,
                          ...textWrap,
                        }}
                      >
                        {card.label}
                      </div>
                      <div
                        style={{
                          fontSize: 26,
                          fontWeight: 700,
                          color: textColor,
                          ...textWrap,
                        }}
                      >
                        {card.value}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 8,
              fontSize: 80,
              fontWeight: 900,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
              color: goldColor,
              textAlign: "center",
              textShadow: `0 0 36px ${goldColor}66`,
              ...textWrap,
              transform: `scale(${starScale})`,
              transformOrigin: "center center",
            }}
          >
            ★ {starLabel}
          </div>

          <div
            style={{
              fontSize: 20,
              color: mutedTextColor,
              textAlign: "center",
              letterSpacing: 4,
              ...textWrap,
            }}
          >
            GitHub · TradingAgents
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
