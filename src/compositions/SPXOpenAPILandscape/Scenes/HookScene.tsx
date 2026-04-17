import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { SPXOpenAPILandscapeProps } from "../schema";
import {
  fadeInUp,
  numberCountUp,
  shimmer,
  staggerDelay,
} from "../animations";

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

const parseCountTarget = (value: string): number => {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : 0;
};

export const HookScene: React.FC<SPXOpenAPILandscapeProps> = (props) => {
  const {
    hookLabel,
    hookTitle,
    hookSubtitle,
    hookMarkets,
    hookRoles,
    hookApis,
    hookChecks,
    hookMarketFlags,
    hookStack,
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

  const marketsTarget = parseCountTarget(hookMarkets);
  const rolesTarget = parseCountTarget(hookRoles);
  const apisTarget = parseCountTarget(hookApis);
  const checksTarget = parseCountTarget(hookChecks);

  const marketsShown = coverPhase
    ? marketsTarget
    : numberCountUp(frame, fps, marketsTarget, 1.2, 6);
  const rolesShown = coverPhase
    ? rolesTarget
    : numberCountUp(frame, fps, rolesTarget, 1.2, 14);
  const apisShown = coverPhase
    ? apisTarget
    : numberCountUp(frame, fps, apisTarget, 1.2, 22);
  const checksShown = coverPhase
    ? checksTarget
    : numberCountUp(frame, fps, checksTarget, 1.6, 34);

  const labelAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 0, 40);
  const titleAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 4, 50);
  const rowAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 10, 60);
  const resultAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 30, 48);
  const stackAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 42, 36);

  const gradientText = {
    backgroundImage: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    ...textWrap,
  } as React.CSSProperties;

  const numberColumn = (
    value: number | string,
    sublabel: string,
    delay: number,
  ) => {
    const anim = coverPhase
      ? { opacity: 1, y: 0 }
      : fadeInUp(frame, fps, delay, 40);
    return (
      <div
        style={{
          flex: "1 1 0",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          padding: "28px 20px",
          borderRadius: 16,
          backgroundColor: panelColor,
          border: `1px solid ${accentColor}33`,
          opacity: anim.opacity,
          transform: `translateY(${anim.y}px)`,
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            fontSize: 108,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontWeight: 900,
            color: goldColor,
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontSize: 24,
            color: mutedTextColor,
            letterSpacing: 4,
            ...textWrap,
          }}
        >
          {sublabel}
        </span>
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={safeArea}>
        <div
          style={{
            fontSize: 32,
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

        <h1
          style={{
            margin: 0,
            fontSize: 84,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.1,
            color: textColor,
            opacity: titleAnim.opacity,
            transform: `translateY(${titleAnim.y}px)`,
            ...textWrap,
          }}
        >
          {hookTitle}
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "center",
            gap: 20,
            width: "100%",
            maxWidth: 1500,
            opacity: rowAnim.opacity,
            transform: `translateY(${rowAnim.y}px)`,
            minWidth: 0,
          }}
        >
          {numberColumn(marketsShown, "Markets", 12)}
          <span
            style={{
              alignSelf: "center",
              fontSize: 48,
              color: mutedTextColor,
              flexShrink: 0,
            }}
          >
            ×
          </span>
          {numberColumn(rolesShown, "Roles", 18)}
          <span
            style={{
              alignSelf: "center",
              fontSize: 48,
              color: mutedTextColor,
              flexShrink: 0,
            }}
          >
            ×
          </span>
          {numberColumn(apisShown, "APIs", 24)}
          <span
            style={{
              alignSelf: "center",
              fontSize: 48,
              color: mutedTextColor,
              flexShrink: 0,
            }}
          >
            =
          </span>
          {numberColumn(checksShown, "Checks", 30)}
        </div>

        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: highlightColor,
            textAlign: "center",
            opacity: resultAnim.opacity,
            transform: `translateY(${resultAnim.y}px)`,
            ...textWrap,
          }}
        >
          {hookSubtitle}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 18,
            ...textWrap,
          }}
        >
          {hookMarketFlags.map((flag, i) => {
            const s = shimmer(frame, fps, staggerDelay(i, 4));
            return (
              <span
                key={`${flag}-${i}`}
                style={{
                  fontSize: 24,
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

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            fontSize: 22,
            color: mutedTextColor,
            opacity: stackAnim.opacity,
            transform: `translateY(${stackAnim.y}px)`,
          }}
        >
          {hookStack.map((name, i) => (
            <React.Fragment key={`${name}-${i}`}>
              {i > 0 ? <span>·</span> : null}
              <span style={{ letterSpacing: 3 }}>{name}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
