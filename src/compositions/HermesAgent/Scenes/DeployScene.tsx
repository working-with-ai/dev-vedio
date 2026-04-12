import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { HermesAgentProps } from "../schema";
import { fadeInUp, staggerDelay } from "../animations";

const textSafe: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

const truncateCommand = (cmd: string, maxLen: number): string => {
  if (cmd.length <= maxLen) {
    return cmd;
  }
  return `${cmd.slice(0, maxLen)}...`;
};

export const DeployScene: React.FC<HermesAgentProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    deployTitle,
    deployCommand,
    deployOptions,
    deployStats,
    backgroundColor,
    textColor,
    mutedTextColor,
    accentColor,
    highlightColor,
    panelColor,
  } = props;

  const headerLabel = fadeInUp(frame, fps, 0);
  const headerTitle = fadeInUp(frame, fps, 6);
  const terminalAnim = fadeInUp(frame, fps, 14);

  const displayCmd = truncateCommand(deployCommand, 60);

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
          gap: 22,
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
            DEPLOYMENT
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
            {deployTitle}
          </div>
        </div>

        <div
          style={{
            borderRadius: 14,
            padding: "16px 18px",
            backgroundColor: "rgba(0,0,0,0.45)",
            border: `1px solid ${accentColor}44`,
            opacity: terminalAnim.opacity,
            transform: `translateY(${terminalAnim.y}px)`,
            boxSizing: "border-box",
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: mutedTextColor,
              marginBottom: 8,
              letterSpacing: 4,
            }}
          >
            TERMINAL
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
              fontSize: 16,
              lineHeight: 1.45,
              color: accentColor,
              ...textSafe,
            }}
          >
            {displayCmd}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            minWidth: 0,
            width: "100%",
          }}
        >
          {deployOptions.map((opt, index) => {
            const d = 22 + staggerDelay(index, 10);
            const anim = fadeInUp(frame, fps, d);
            return (
              <div
                key={index}
                style={{
                  flex: "1 1 0",
                  minWidth: 0,
                  padding: "14px 12px",
                  borderRadius: 16,
                  border: `2px solid ${accentColor}`,
                  backgroundColor: panelColor,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 8,
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px)`,
                  boxSizing: "border-box",
                }}
              >
                <span style={{ fontSize: 36, lineHeight: 1 }}>{opt.icon}</span>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: textColor,
                    ...textSafe,
                  }}
                >
                  {opt.title}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: mutedTextColor,
                    ...textSafe,
                  }}
                >
                  {opt.description}
                </div>
              </div>
            );
          })}
        </div>

        {(() => {
          const d = 22 + staggerDelay(deployOptions.length, 10);
          const anim = fadeInUp(frame, fps, d);
          return (
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: highlightColor,
                letterSpacing: 2,
                opacity: anim.opacity,
                transform: `translateY(${anim.y}px)`,
                ...textSafe,
              }}
            >
              {deployStats.join("  |  ")}
            </div>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};
