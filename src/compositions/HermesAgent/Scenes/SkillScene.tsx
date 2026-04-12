import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { HermesAgentProps } from "../schema";
import {
  fadeInUp,
  staggerDelay,
  pipelineNodeReveal,
  lineGrow,
  progressBar,
} from "../animations";

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
  gap: 24,
  minWidth: 0,
  overflow: "hidden",
};

export const SkillScene: React.FC<HermesAgentProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    skillTitle,
    skillFlowNodes,
    skillCompare,
    skillCount,
    accentColor,
    highlightColor,
    openclawColor,
    secondaryColor,
    textColor,
    mutedTextColor,
  } = props;

  const titleAnim = fadeInUp(frame, fps, 0);
  const compareAnim = fadeInUp(frame, fps, staggerDelay(4, 12));
  const barAnimDelay = staggerDelay(5, 10);
  const barProgress = progressBar(frame, fps, 1.2, barAnimDelay) / 100;
  const baselineWidth = barProgress * 100;
  const hermesWidth = barProgress * 60;

  return (
    <AbsoluteFill>
      <div style={safeArea}>
        <div
          style={{
            opacity: titleAnim.opacity,
            transform: `translateY(${titleAnim.y}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            minWidth: 0,
            width: "100%",
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
            SKILL SYSTEM
          </div>
          <div
            style={{
              fontSize: 56,
              lineHeight: 1.08,
              fontWeight: 900,
              background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 36px ${accentColor}44`,
              ...textWrap,
            }}
          >
            {skillTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            width: "100%",
            minWidth: 0,
          }}
        >
          <div
            style={{
              flex: "1 1 0",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            {skillFlowNodes.map((node, index) => {
              const reveal = pipelineNodeReveal(
                frame,
                fps,
                index,
                staggerDelay(index, 12),
              );
              const lineDelay = staggerDelay(index, 12) + 18 + index * 8;
              const grow = lineGrow(frame, fps, lineDelay, 0.35);
              const showLine = index < skillFlowNodes.length - 1;

              return (
                <React.Fragment key={`${node}-${index}`}>
                  <div
                    style={{
                      opacity: reveal.opacity,
                      transform: `translateY(${reveal.y}px) scale(${reveal.scale})`,
                      padding: "16px 18px",
                      borderRadius: 14,
                      border: `1px solid ${accentColor}66`,
                      backgroundColor: "rgba(124, 58, 237, 0.12)",
                      boxSizing: "border-box",
                      ...textWrap,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 26,
                        fontWeight: 700,
                        color: textColor,
                        lineHeight: 1.35,
                        ...textWrap,
                      }}
                    >
                      {node}
                    </div>
                  </div>
                  {showLine ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: 28,
                        marginTop: 4,
                        marginBottom: 4,
                      }}
                    >
                      <div
                        style={{
                          width: 3,
                          height: "100%",
                          borderRadius: 2,
                          backgroundColor: accentColor,
                          transformOrigin: "top center",
                          transform: `scaleY(${grow})`,
                          opacity: grow > 0.02 ? 1 : 0,
                        }}
                      />
                    </div>
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>

          <div
            style={{
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minWidth: 0,
              maxWidth: "42%",
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontFamily: "monospace",
                fontWeight: 900,
                color: highlightColor,
                textShadow: `0 0 40px ${highlightColor}55`,
                textAlign: "center",
                ...textWrap,
              }}
            >
              {skillCount}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: 16,
            borderRadius: 12,
            border: `2px solid ${openclawColor}`,
            backgroundColor: "rgba(255, 99, 71, 0.06)",
            boxSizing: "border-box",
            opacity: compareAnim.opacity,
            transform: `translateY(${compareAnim.y}px)`,
            ...textWrap,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: textColor,
              lineHeight: 1.45,
              ...textWrap,
            }}
          >
            {skillCompare}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            width: "100%",
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: secondaryColor,
              ...textWrap,
            }}
          >
            重复任务 · 40% 提速
          </div>
          <div style={{ ...textWrap, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                fontSize: 18,
                fontWeight: 700,
                color: mutedTextColor,
                gap: 8,
                ...textWrap,
              }}
            >
              <span style={textWrap}>OpenClaw 基线</span>
              <span style={{ color: highlightColor, ...textWrap }}>Hermes</span>
            </div>
            <div
              style={{
                height: 12,
                borderRadius: 6,
                backgroundColor: "rgba(255,255,255,0.08)",
                overflow: "hidden",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${baselineWidth}%`,
                  borderRadius: 6,
                  background: `linear-gradient(90deg, ${mutedTextColor}88, ${mutedTextColor})`,
                }}
              />
            </div>
            <div
              style={{
                height: 12,
                borderRadius: 6,
                backgroundColor: "rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${hermesWidth}%`,
                  borderRadius: 6,
                  background: `linear-gradient(90deg, ${secondaryColor}, ${highlightColor})`,
                }}
              />
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 18,
                fontWeight: 700,
                color: secondaryColor,
                ...textWrap,
              }}
            >
              ≈ 40% 更少耗时
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
