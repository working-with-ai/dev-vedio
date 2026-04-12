import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { HermesAgentProps } from "../schema";
import { fadeInUp, staggerDelay } from "../animations";

const textSafe: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

export const SecurityScene: React.FC<HermesAgentProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    securityTitle,
    securityLayers,
    openclawSecurityIssue1,
    openclawSecurityIssue2,
    backgroundColor,
    textColor,
    accentColor,
    highlightColor,
    dangerColor,
    panelColor,
  } = props;

  const headerLabel = fadeInUp(frame, fps, 0);
  const headerTitle = fadeInUp(frame, fps, 6);

  const towerBaseDelay = 14;

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
          gap: 20,
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
            SECURITY
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
            {securityTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "center",
            gap: 10,
            minWidth: 0,
            width: "100%",
          }}
        >
          {securityLayers.map((layer, index) => {
            const widthPct = 100 - index * 8;
            const d = towerBaseDelay + staggerDelay(index, 10);
            const anim = fadeInUp(frame, fps, d);
            return (
              <div
                key={index}
                style={{
                  width: `${widthPct}%`,
                  maxWidth: "100%",
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 18px",
                  borderRadius: 14,
                  borderLeft: `4px solid ${layer.color}`,
                  backgroundColor: panelColor,
                  boxSizing: "border-box",
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px)`,
                }}
              >
                <span style={{ fontSize: 28, flexShrink: 0 }}>{layer.icon}</span>
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: textColor,
                    minWidth: 0,
                    ...textSafe,
                  }}
                >
                  {layer.title}
                </span>
              </div>
            );
          })}
        </div>

        {(() => {
          const d = towerBaseDelay + staggerDelay(securityLayers.length, 10);
          const anim = fadeInUp(frame, fps, d);
          return (
            <div
              style={{
                padding: "16px 18px",
                borderRadius: 16,
                border: `2px solid ${dangerColor}`,
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                opacity: anim.opacity,
                transform: `translateY(${anim.y}px)`,
                boxSizing: "border-box",
                minWidth: 0,
                ...textSafe,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: dangerColor,
                  ...textSafe,
                }}
              >
                OpenClaw 安全事件
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, color: textColor, ...textSafe }}>
                {openclawSecurityIssue1}
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, color: textColor, ...textSafe }}>
                {openclawSecurityIssue2}
              </div>
            </div>
          );
        })()}

        {(() => {
          const d = towerBaseDelay + staggerDelay(securityLayers.length + 1, 10);
          const anim = fadeInUp(frame, fps, d);
          return (
            <div
              style={{
                fontSize: 30,
                fontWeight: 800,
                textAlign: "center",
                color: highlightColor,
                opacity: anim.opacity,
                transform: `translateY(${anim.y}px)`,
                ...textSafe,
              }}
            >
              防御在前 vs 审计在后
            </div>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};
