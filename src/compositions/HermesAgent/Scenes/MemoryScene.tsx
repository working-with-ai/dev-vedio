import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { HermesAgentProps } from "../schema";
import { fadeInUp, staggerDelay } from "../animations";

const textSafe: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

export const MemoryScene: React.FC<HermesAgentProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    memoryTitle,
    hermesMemoryLayers,
    openclawMemory,
    memoryConclusion,
    backgroundColor,
    textColor,
    accentColor,
    highlightColor,
    openclawColor,
    panelColor,
  } = props;

  const headerLabel = fadeInUp(frame, fps, 0);
  const headerTitle = fadeInUp(frame, fps, 6);

  return (
    <AbsoluteFill style={{ backgroundColor, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 60,
          right: 60,
          bottom: 420,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            minWidth: 0,
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 10,
              color: accentColor,
              fontWeight: 800,
              opacity: headerLabel.opacity,
              transform: `translateY(${headerLabel.y}px)`,
              ...textSafe,
            }}
          >
            MEMORY
          </div>
          <div
            style={{
              fontSize: 56,
              lineHeight: 1.08,
              fontWeight: 900,
              background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 36px ${accentColor}33`,
              opacity: headerTitle.opacity,
              transform: `translateY(${headerTitle.y}px)`,
              ...textSafe,
            }}
          >
            {memoryTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            minWidth: 0,
            width: "100%",
          }}
        >
          {hermesMemoryLayers.map((line, index) => {
            const d = staggerDelay(index, 10);
            const anim = fadeInUp(frame, fps, d);
            return (
              <div
                key={index}
                style={{
                  padding: "18px 20px",
                  borderRadius: 16,
                  borderLeft: `4px solid ${accentColor}`,
                  backgroundColor: panelColor,
                  fontSize: 24,
                  fontWeight: 600,
                  color: textColor,
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px)`,
                  boxSizing: "border-box",
                  ...textSafe,
                }}
              >
                {line}
              </div>
            );
          })}
        </div>

        {(() => {
          const d = staggerDelay(hermesMemoryLayers.length, 10);
          const anim = fadeInUp(frame, fps, d);
          return (
            <div
              style={{
                padding: "16px 18px",
                borderRadius: 16,
                border: `2px solid ${openclawColor}`,
                backgroundColor: panelColor,
                fontSize: 22,
                fontWeight: 700,
                color: textColor,
                opacity: anim.opacity,
                transform: `translateY(${anim.y}px)`,
                boxSizing: "border-box",
                ...textSafe,
              }}
            >
              OpenClaw · {openclawMemory}
            </div>
          );
        })()}

        {(() => {
          const d = staggerDelay(hermesMemoryLayers.length + 1, 10);
          const anim = fadeInUp(frame, fps, d);
          return (
            <div
              style={{
                fontSize: 34,
                fontWeight: 800,
                lineHeight: 1.35,
                background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginTop: 8,
                opacity: anim.opacity,
                transform: `translateY(${anim.y}px)`,
                ...textSafe,
              }}
            >
              {memoryConclusion}
            </div>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};
