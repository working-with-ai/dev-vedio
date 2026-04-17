import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { SPXOpenAPIProps } from "../schema";
import {
  cardSlideIn,
  fadeInUp,
  staggerDelay,
  typewriterLength,
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

export const PainPointsScene: React.FC<SPXOpenAPIProps> = (props) => {
  const {
    painTitle,
    painErrors,
    painSignature,
    dangerColor,
    warningColor,
    accentColor,
    panelColor,
    textColor,
    mutedTextColor,
  } = props;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const coverPhase = frame < 5;

  const titleGradient = {
    backgroundImage: `linear-gradient(135deg, ${dangerColor}, ${warningColor})`,
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    ...textWrap,
  } as React.CSSProperties;

  const labelBlockAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 0, 44);

  const signatureDelay = 55;
  const revealedLen = typewriterLength(
    frame,
    painSignature,
    fps,
    coverPhase ? 0 : signatureDelay,
    22,
  );
  const signatureVisible = coverPhase ? painSignature : painSignature.slice(0, revealedLen);

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={safeArea}>
        {/* TitleBlock 区域 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            width: "100%",
            opacity: labelBlockAnim.opacity,
            transform: `translateY(${labelBlockAnim.y}px)`,
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
            PAIN POINTS
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
            {painTitle}
          </h2>
        </div>

        {/* 错误卡片三连 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: "100%",
            maxWidth: 920,
            minWidth: 0,
          }}
        >
          {painErrors.map((err, index) => {
            const delay = coverPhase ? 0 : staggerDelay(index, 12) + 8;
            const card = coverPhase
              ? { opacity: 1, x: 0, scale: 1 }
              : cardSlideIn(frame, fps, delay);
            return (
              <div
                key={`${err.code}-${index}`}
                style={{
                  backgroundColor: panelColor,
                  border: `2px solid ${dangerColor}`,
                  borderRadius: 12,
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  minWidth: 0,
                  opacity: card.opacity,
                  transform: `translateX(${card.x}px) scale(${card.scale})`,
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontWeight: 800,
                    color: dangerColor,
                    ...textWrap,
                  }}
                >
                  ❌ {err.code}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    color: textColor,
                    fontWeight: 500,
                    ...textWrap,
                  }}
                >
                  {err.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* 签名公式 */}
        <div
          style={{
            fontSize: 20,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            color: accentColor,
            textAlign: "center",
            width: "100%",
            ...textWrap,
          }}
        >
          {signatureVisible}
        </div>
      </div>
    </AbsoluteFill>
  );
};
