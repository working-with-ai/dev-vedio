import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { SPXOpenAPILandscapeProps } from "../schema";
import {
  fadeInUp,
  numberCountUp,
  pulseGlow,
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

export const CTAScene: React.FC<SPXOpenAPILandscapeProps> = (props) => {
  const {
    ctaSlogan,
    ctaBody,
    ctaNumbers,
    ctaInstallCommand,
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
  const coverPhase = frame < 5;

  const sloganAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 0, 56);
  const bodyAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 8, 50);
  const installAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 40, 44);
  const tagsAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 50, 36);

  const installPulse = pulseGlow(frame, fps, 1.2);

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={safeArea}>
        <h1
          style={{
            margin: 0,
            fontSize: 88,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.15,
            backgroundImage: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            opacity: sloganAnim.opacity,
            transform: `translateY(${sloganAnim.y}px)`,
            ...textWrap,
          }}
        >
          {ctaSlogan}
        </h1>

        <div
          style={{
            fontSize: 38,
            fontWeight: 600,
            color: textColor,
            textAlign: "center",
            opacity: bodyAnim.opacity,
            transform: `translateY(${bodyAnim.y}px)`,
            ...textWrap,
          }}
        >
          {ctaBody}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "center",
            gap: 24,
            width: "100%",
            maxWidth: 1500,
            minWidth: 0,
          }}
        >
          {ctaNumbers.map((num, idx) => {
            const delay = coverPhase ? 0 : staggerDelay(idx, 6) + 14;
            const anim = coverPhase
              ? { opacity: 1, y: 0 }
              : fadeInUp(frame, fps, delay, 40);
            const numericTarget = Number(num.value);
            const isNumeric = Number.isFinite(numericTarget);
            const displayed =
              isNumeric && !coverPhase
                ? numberCountUp(frame, fps, numericTarget, 1.4, delay + 4)
                : num.value;
            return (
              <div
                key={`${num.label}-${idx}`}
                style={{
                  flex: "1 1 0",
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  padding: "26px 18px",
                  borderRadius: 16,
                  backgroundColor: panelColor,
                  border: `1.5px solid ${num.color}66`,
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px)`,
                  boxSizing: "border-box",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: isNumeric ? 88 : 42,
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontWeight: 900,
                    color: num.color,
                    lineHeight: 1.1,
                    ...textWrap,
                  }}
                >
                  {displayed}
                </span>
                <span
                  style={{
                    fontSize: 20,
                    color: mutedTextColor,
                    letterSpacing: 4,
                    fontWeight: 700,
                    ...textWrap,
                  }}
                >
                  {num.label}
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            width: "100%",
            maxWidth: 1400,
            opacity: installAnim.opacity,
            transform: `translateY(${installAnim.y}px)`,
          }}
        >
          <span
            style={{
              fontSize: 18,
              letterSpacing: 8,
              color: mutedTextColor,
              fontWeight: 800,
            }}
          >
            ONE-CLICK INSTALL
          </span>
          <div
            style={{
              padding: "18px 32px",
              borderRadius: 14,
              backgroundColor: "rgba(2, 6, 12, 0.85)",
              border: `2px solid ${goldColor}`,
              boxShadow: `0 0 ${24 + installPulse * 36}px ${goldColor}aa`,
              fontSize: 24,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontWeight: 700,
              color: goldColor,
              textAlign: "center",
              ...textWrap,
            }}
          >
            $ {ctaInstallCommand}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 14,
            opacity: tagsAnim.opacity,
            transform: `translateY(${tagsAnim.y}px)`,
            ...textWrap,
          }}
        >
          {ctaTags.map((tag, idx) => (
            <span
              key={`${tag}-${idx}`}
              style={{
                fontSize: 22,
                color: mutedTextColor,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
