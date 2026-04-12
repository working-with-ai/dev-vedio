import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { HermesAgentProps } from "../schema";
import { fadeInUp, numberCountUp } from "../animations";

const textWrap: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

const safeArea: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 60,
  right: 60,
  bottom: 420,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 28,
  minWidth: 0,
  overflow: "hidden",
};

const STAR_TARGET = 35000;

export const HookScene: React.FC<HermesAgentProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    hookLabel,
    hookStarCount,
    hookSubtitle,
    hookRepoName,
    hookRepoDesc,
    hookVsText,
    accentColor,
    highlightColor,
    panelColor,
    mutedTextColor,
  } = props;

  const coverPhase = frame < 5;

  const starDisplay = coverPhase
    ? hookStarCount
    : `${numberCountUp(frame, fps, STAR_TARGET, 2, 5).toLocaleString("en-US")}+`;

  const cardAnim = fadeInUp(frame, fps, 10);
  const subAnim = fadeInUp(frame, fps, 25);

  const cardOpacity = coverPhase ? 1 : cardAnim.opacity;
  const cardY = coverPhase ? 0 : cardAnim.y;
  const subOpacity = coverPhase ? 1 : subAnim.opacity;
  const subY = coverPhase ? 0 : subAnim.y;

  return (
    <AbsoluteFill>
      <div style={safeArea}>
        <div
          style={{
            fontSize: 52,
            letterSpacing: 14,
            fontWeight: 800,
            background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            ...textWrap,
          }}
        >
          {hookLabel}
        </div>

        <div
          style={{
            fontSize: 72,
            fontFamily: "monospace",
            fontWeight: 900,
            color: highlightColor,
            textAlign: "center",
            textShadow: `0 0 48px ${highlightColor}55`,
            ...textWrap,
          }}
        >
          {starDisplay}
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
            padding: 24,
            borderRadius: 12,
            backgroundColor: panelColor,
            border: `2px solid ${accentColor}`,
            boxSizing: "border-box",
            opacity: cardOpacity,
            transform: `translateY(${cardY}px)`,
            ...textWrap,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: highlightColor,
              marginBottom: 12,
              ...textWrap,
            }}
          >
            {hookRepoName}
          </div>
          <div
            style={{
              fontSize: 24,
              color: mutedTextColor,
              fontWeight: 600,
              lineHeight: 1.45,
              ...textWrap,
            }}
          >
            {hookRepoDesc}
          </div>
        </div>

        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: props.textColor,
            textAlign: "center",
            opacity: cardOpacity,
            transform: `translateY(${cardY * 0.5}px)`,
            ...textWrap,
          }}
        >
          {hookVsText}
        </div>

        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: highlightColor,
            textAlign: "center",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            ...textWrap,
          }}
        >
          {hookSubtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
