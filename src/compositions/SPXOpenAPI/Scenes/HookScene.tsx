import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { SPXOpenAPIProps } from "../schema";
import {
  fadeInUp,
  numberCountUp,
  shimmer,
  staggerDelay,
} from "../animations";

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

const parseCountTarget = (value: string): number => {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : 0;
};

export const HookScene: React.FC<SPXOpenAPIProps> = (props) => {
  const {
    hookLabel,
    hookMarkets,
    hookRoles,
    hookAPIs,
    hookChecks,
    hookMarketFlags,
    accentColor,
    highlightColor,
    goldColor,
    mutedTextColor,
    panelColor,
  } = props;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const coverPhase = frame < 5;

  const marketsTarget = parseCountTarget(hookMarkets);
  const rolesTarget = parseCountTarget(hookRoles);
  const apisTarget = parseCountTarget(hookAPIs);

  const marketsShown = coverPhase
    ? marketsTarget
    : numberCountUp(frame, fps, marketsTarget, 1.2, 0);
  const rolesShown = coverPhase
    ? rolesTarget
    : numberCountUp(frame, fps, rolesTarget, 1.2, 10);
  const apisShown = coverPhase
    ? apisTarget
    : numberCountUp(frame, fps, apisTarget, 1.2, 20);

  const labelAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 0, 40);
  const rowAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 6, 50);
  const resultAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 15, 48);

  const gradientText = {
    backgroundImage: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    ...textWrap,
  } as React.CSSProperties;

  const numberColumn = (
    value: number,
    sublabel: string,
    delay: number,
  ): React.CSSProperties => {
    const anim = coverPhase
      ? { opacity: 1, y: 0 }
      : fadeInUp(frame, fps, delay, 36);
    return {
      flex: "1 1 0",
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      padding: "20px 12px",
      borderRadius: 12,
      backgroundColor: panelColor,
      opacity: anim.opacity,
      transform: `translateY(${anim.y}px)`,
      boxSizing: "border-box",
    };
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={safeArea}>
        {/* 顶部标签 */}
        <div
          style={{
            fontSize: 42,
            letterSpacing: 14,
            fontWeight: 800,
            textAlign: "center",
            opacity: labelAnim.opacity,
            transform: `translateY(${labelAnim.y}px)`,
            ...gradientText,
          }}
        >
          {hookLabel}
        </div>

        {/* 三列数字 + 乘号横排 */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "center",
            gap: 16,
            width: "100%",
            maxWidth: 1000,
            opacity: rowAnim.opacity,
            transform: `translateY(${rowAnim.y}px)`,
            minWidth: 0,
          }}
        >
          <div style={numberColumn(marketsShown, "Markets", 8)}>
            <span
              style={{
                fontSize: 80,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontWeight: 900,
                color: goldColor,
                lineHeight: 1,
              }}
            >
              {marketsShown}
            </span>
            <span style={{ fontSize: 22, color: mutedTextColor, ...textWrap }}>
              Markets
            </span>
          </div>
          <span
            style={{
              alignSelf: "center",
              fontSize: 36,
              color: mutedTextColor,
              flexShrink: 0,
              paddingTop: 8,
            }}
          >
            ×
          </span>
          <div style={numberColumn(rolesShown, "Roles", 14)}>
            <span
              style={{
                fontSize: 80,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontWeight: 900,
                color: goldColor,
                lineHeight: 1,
              }}
            >
              {rolesShown}
            </span>
            <span style={{ fontSize: 22, color: mutedTextColor, ...textWrap }}>
              Roles
            </span>
          </div>
          <span
            style={{
              alignSelf: "center",
              fontSize: 36,
              color: mutedTextColor,
              flexShrink: 0,
              paddingTop: 8,
            }}
          >
            ×
          </span>
          <div style={numberColumn(apisShown, "APIs", 20)}>
            <span
              style={{
                fontSize: 80,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontWeight: 900,
                color: goldColor,
                lineHeight: 1,
              }}
            >
              {apisShown}
            </span>
            <span style={{ fontSize: 22, color: mutedTextColor, ...textWrap }}>
              APIs
            </span>
          </div>
        </div>

        {/* 结果行 */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: accentColor,
            textAlign: "center",
            opacity: resultAnim.opacity,
            transform: `translateY(${resultAnim.y}px)`,
            ...textWrap,
          }}
        >
          = {hookChecks} 项检查清单
        </div>

        {/* 底部市场标签 */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
            ...textWrap,
          }}
        >
          {hookMarketFlags.map((flag, i) => {
            const s = shimmer(frame, fps, staggerDelay(i, 4));
            return (
              <span
                key={`${flag}-${i}`}
                style={{
                  fontSize: 20,
                  color: mutedTextColor,
                  opacity: 0.45 + 0.55 * s,
                  letterSpacing: 2,
                }}
              >
                {flag}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
