import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { SPXOpenAPIProps } from "../schema";
import { fadeInUp, staggerDelay } from "../animations";

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

const textWrap: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

export const CoreScene: React.FC<SPXOpenAPIProps> = (props) => {
  const {
    coreTitle,
    coreCapabilities,
    corePlatforms,
    accentColor,
    highlightColor,
    panelColor,
    textColor,
    mutedTextColor,
  } = props;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const coverPhase = frame < 5;

  const titleGradient = {
    backgroundImage: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    ...textWrap,
  } as React.CSSProperties;

  const headerAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 0, 40);

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={safeArea}>
        {/* TitleBlock */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            width: "100%",
            opacity: headerAnim.opacity,
            transform: `translateY(${headerAnim.y}px)`,
          }}
        >
          <span
            style={{
              fontSize: 20,
              letterSpacing: 10,
              color: mutedTextColor,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            AGENT SKILL
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: 56,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.15,
              ...titleGradient,
            }}
          >
            {coreTitle}
          </h2>
        </div>

        {/* 六边形能力矩阵：2×3 网格 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: 16,
            width: "100%",
            maxWidth: 960,
            minWidth: 0,
          }}
        >
          {coreCapabilities.map((cap, index) => {
            const delay = coverPhase ? 0 : staggerDelay(index, 10) + 6;
            const anim = coverPhase
              ? { opacity: 1, y: 0 }
              : fadeInUp(frame, fps, delay, 36);
            return (
              <div
                key={`${cap.title}-${index}`}
                style={{
                  backgroundColor: panelColor,
                  border: `1px solid ${accentColor}`,
                  borderRadius: 12,
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  minWidth: 0,
                  boxSizing: "border-box",
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px)`,
                }}
              >
                <span style={{ fontSize: 36, lineHeight: 1 }}>{cap.icon}</span>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
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
                    ...textWrap,
                  }}
                >
                  {cap.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部平台标签（· 分隔 + 横排 gap） */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            width: "100%",
            ...textWrap,
          }}
        >
          {corePlatforms.map((name, i) => (
            <React.Fragment key={`${name}-${i}`}>
              {i > 0 ? (
                <span style={{ fontSize: 18, color: mutedTextColor }}>·</span>
              ) : null}
              <span
                style={{
                  fontSize: 18,
                  letterSpacing: 4,
                  color: mutedTextColor,
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
