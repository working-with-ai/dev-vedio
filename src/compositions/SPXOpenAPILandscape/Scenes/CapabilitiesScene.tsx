import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { SPXOpenAPILandscapeProps } from "../schema";
import { fadeInUp, staggerDelay } from "../animations";

const safeArea: React.CSSProperties = {
  position: "absolute",
  top: 80,
  left: 120,
  right: 120,
  bottom: 160,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 36,
  minWidth: 0,
  overflow: "hidden",
};

const textWrap: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

export const CapabilitiesScene: React.FC<SPXOpenAPILandscapeProps> = (
  props,
) => {
  const {
    capabilityTitle,
    capabilitySubtitle,
    capabilityCards,
    capabilityPlatforms,
    accentColor,
    highlightColor,
    goldColor,
    textColor,
    mutedTextColor,
    panelColor,
  } = props;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const coverPhase = frame < 5;

  const titleGradient: React.CSSProperties = {
    backgroundImage: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    ...textWrap,
  };

  const titleAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 0, 48);

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={safeArea}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            width: "100%",
            opacity: titleAnim.opacity,
            transform: `translateY(${titleAnim.y}px)`,
          }}
        >
          <span
            style={{
              fontSize: 22,
              letterSpacing: 14,
              color: mutedTextColor,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            AGENT SKILL · CAPABILITIES
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: 72,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.1,
              ...titleGradient,
            }}
          >
            {capabilityTitle}
          </h2>
          <div
            style={{
              fontSize: 26,
              color: mutedTextColor,
              fontWeight: 500,
              textAlign: "center",
              ...textWrap,
            }}
          >
            {capabilitySubtitle}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
            gap: 20,
            width: "100%",
            maxWidth: 1680,
            minWidth: 0,
          }}
        >
          {capabilityCards.map((cap, index) => {
            const delay = coverPhase ? 0 : staggerDelay(index, 6) + 8;
            const anim = coverPhase
              ? { opacity: 1, y: 0 }
              : fadeInUp(frame, fps, delay, 36);
            const borderColor = cap.isExtension ? goldColor : accentColor;
            return (
              <div
                key={`${cap.title}-${index}`}
                style={{
                  position: "relative",
                  backgroundColor: panelColor,
                  border: `1.5px solid ${borderColor}`,
                  borderRadius: 16,
                  padding: "22px 22px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  minWidth: 0,
                  boxSizing: "border-box",
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px)`,
                  minHeight: 190,
                }}
              >
                {cap.isExtension ? (
                  <span
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 14,
                      fontSize: 12,
                      letterSpacing: 3,
                      fontWeight: 800,
                      color: goldColor,
                      padding: "3px 8px",
                      borderRadius: 999,
                      border: `1px solid ${goldColor}`,
                      backgroundColor: "rgba(255, 215, 0, 0.1)",
                    }}
                  >
                    NEW
                  </span>
                ) : null}
                <span style={{ fontSize: 48, lineHeight: 1 }}>{cap.icon}</span>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: textColor,
                    ...textWrap,
                  }}
                >
                  {cap.title}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: mutedTextColor,
                    fontWeight: 500,
                    lineHeight: 1.35,
                    ...textWrap,
                  }}
                >
                  {cap.desc}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            width: "100%",
            fontSize: 24,
            color: mutedTextColor,
            ...textWrap,
          }}
        >
          <span style={{ fontSize: 18, letterSpacing: 6, fontWeight: 700 }}>
            AVAILABLE ON
          </span>
          {capabilityPlatforms.map((name, i) => (
            <React.Fragment key={`${name}-${i}`}>
              {i > 0 ? (
                <span style={{ fontSize: 18 }}>·</span>
              ) : null}
              <span
                style={{
                  fontSize: 24,
                  letterSpacing: 4,
                  color: textColor,
                  fontWeight: 700,
                }}
              >
                {name}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
