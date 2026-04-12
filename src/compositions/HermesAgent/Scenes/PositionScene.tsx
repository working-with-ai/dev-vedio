import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { HermesAgentProps } from "../schema";
import { fadeInUp, staggerDelay } from "../animations";

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
  justifyContent: "center",
  gap: 28,
  minWidth: 0,
  overflow: "hidden",
};

export const PositionScene: React.FC<HermesAgentProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    positionTitle,
    positionItems,
    accentColor,
    highlightColor,
    openclawColor,
    mutedTextColor,
    textColor,
  } = props;

  return (
    <AbsoluteFill>
      <div style={safeArea}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            minWidth: 0,
            width: "100%",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 10,
              fontWeight: 800,
              color: accentColor,
              ...textWrap,
            }}
          >
            PHILOSOPHY
          </div>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.08,
              fontWeight: 900,
              background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 36px ${accentColor}44`,
              ...textWrap,
            }}
          >
            {positionTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            width: "100%",
            minWidth: 0,
          }}
        >
          {positionItems.map((item, index) => {
            const delay = staggerDelay(index, 12);
            const anim = fadeInUp(frame, fps, delay);
            return (
              <div
                key={`${item.label}-${index}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  minWidth: 0,
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: mutedTextColor,
                    ...textWrap,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 12,
                    width: "100%",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      flex: "1 1 0",
                      minWidth: 0,
                      padding: 14,
                      borderRadius: 12,
                      border: `2px solid ${highlightColor}`,
                      backgroundColor: "rgba(6, 214, 160, 0.06)",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: highlightColor,
                        marginBottom: 8,
                        ...textWrap,
                      }}
                    >
                      ⚡ Hermes
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        color: textColor,
                        lineHeight: 1.4,
                        ...textWrap,
                      }}
                    >
                      {item.hermes}
                    </div>
                  </div>
                  <div
                    style={{
                      flex: "1 1 0",
                      minWidth: 0,
                      padding: 14,
                      borderRadius: 12,
                      border: `2px solid ${openclawColor}`,
                      backgroundColor: "rgba(255, 99, 71, 0.06)",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: openclawColor,
                        marginBottom: 8,
                        ...textWrap,
                      }}
                    >
                      🦞 OpenClaw
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        color: textColor,
                        lineHeight: 1.4,
                        ...textWrap,
                      }}
                    >
                      {item.openclaw}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
