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

/** 解析 "7 Markets" → 数字 + 标签 */
const splitStat = (raw: string): { value: string; label: string } => {
  const trimmed = raw.trim();
  const space = trimmed.indexOf(" ");
  if (space === -1) {
    return { value: trimmed, label: "" };
  }
  return {
    value: trimmed.slice(0, space),
    label: trimmed.slice(space + 1).trim(),
  };
};

/** CTA：金句 + 数字回顾 + 平台与标签 */
export const CTAScene: React.FC<SPXOpenAPIProps> = (props) => {
  const {
    ctaSlogan,
    ctaBody,
    ctaStats,
    ctaTags,
    accentColor,
    highlightColor,
    goldColor,
    textColor,
    mutedTextColor,
    panelColor,
  } = props;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleGradient: React.CSSProperties = {
    backgroundImage: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    ...textWrap,
  };

  const titleBlockAnim = fadeInUp(frame, fps, 0, 48);
  const sloganAnim = fadeInUp(frame, fps, 8, 52);
  const sloganGlow = `0 0 40px ${accentColor}44`;

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
            minWidth: 0,
            opacity: titleBlockAnim.opacity,
            transform: `translateY(${titleBlockAnim.y}px)`,
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
            GET STARTED
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: 52,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.15,
              ...titleGradient,
            }}
          >
            开始使用
          </h2>
        </div>

        {/* 金句 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            minWidth: 0,
            opacity: sloganAnim.opacity,
            transform: `translateY(${sloganAnim.y}px)`,
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              lineHeight: 1.2,
              backgroundImage: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              textShadow: sloganGlow,
              ...textWrap,
            }}
          >
            {ctaSlogan}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: textColor,
              marginTop: 12,
              ...textWrap,
            }}
          >
            {ctaBody}
          </div>
        </div>

        {/* 2×2 数字回顾 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: 16,
            width: "100%",
            maxWidth: 720,
            minWidth: 0,
          }}
        >
          {ctaStats.map((stat, index) => {
            const delay = staggerDelay(index, 10) + 20;
            const anim = fadeInUp(frame, fps, delay, 40);
            const { value, label } = splitStat(stat);
            return (
              <div
                key={`${stat}-${index}`}
                style={{
                  backgroundColor: panelColor,
                  border: `1px solid ${accentColor}`,
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center",
                  minWidth: 0,
                  boxSizing: "border-box",
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 36,
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontWeight: 900,
                    color: goldColor,
                    ...textWrap,
                  }}
                >
                  {value}
                </div>
                {label ? (
                  <div
                    style={{
                      fontSize: 18,
                      color: mutedTextColor,
                      marginTop: 6,
                      fontWeight: 600,
                      ...textWrap,
                    }}
                  >
                    {label}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* 平台标签 */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 20,
            color: mutedTextColor,
            fontWeight: 600,
            ...textWrap,
          }}
        >
          <span>Cursor</span>
          <span>·</span>
          <span>Claude Code</span>
          <span>·</span>
          <span>Codex</span>
          <span>·</span>
          <span>Gemini CLI</span>
        </div>

        {/* Hashtag */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 18,
            color: mutedTextColor,
            width: "100%",
            minWidth: 0,
          }}
        >
          {ctaTags.map((tag, i) => (
            <span key={`${tag}-${i}`} style={textWrap}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
