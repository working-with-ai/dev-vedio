import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { SPXOpenAPILandscapeProps } from "../schema";
import {
  cardSlideIn,
  fadeInUp,
  staggerDelay,
  typewriterLength,
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
  gap: 28,
  minWidth: 0,
  overflow: "hidden",
};

const textWrap: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

export const ErrorAnalysisScene: React.FC<SPXOpenAPILandscapeProps> = (
  props,
) => {
  const {
    errorTitle,
    errorLabel,
    errorCode,
    errorField,
    errorRoot,
    errorFix,
    errorChips,
    playbookCards,
    accentColor,
    highlightColor,
    goldColor,
    successColor,
    dangerColor,
    textColor,
    mutedTextColor,
    panelColor,
  } = props;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const coverPhase = frame < 5;

  const titleAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 0, 48);

  const errorBoxAnim = coverPhase
    ? { opacity: 1, x: 0, scale: 1 }
    : cardSlideIn(frame, fps, 14);

  const fixDelay = 36;
  const fixLen = typewriterLength(frame, errorFix, fps, fixDelay, 30);
  const fixVisible = coverPhase ? errorFix : errorFix.slice(0, fixLen);

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={safeArea}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            width: "100%",
            opacity: titleAnim.opacity,
            transform: `translateY(${titleAnim.y}px)`,
          }}
        >
          <span
            style={{
              fontSize: 22,
              letterSpacing: 12,
              color: mutedTextColor,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {errorLabel}
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: 60,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.1,
              backgroundImage: `linear-gradient(135deg, ${dangerColor}, ${highlightColor})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              ...textWrap,
            }}
          >
            {errorTitle}
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 28,
            width: "100%",
            maxWidth: 1680,
            minWidth: 0,
            alignItems: "stretch",
          }}
        >
          {/* 左：错误卡 */}
          <div
            style={{
              flex: "1 1 50%",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              padding: "24px 28px",
              borderRadius: 18,
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              border: `1.5px solid ${dangerColor}88`,
              boxSizing: "border-box",
              opacity: errorBoxAnim.opacity,
              transform: `translateX(${errorBoxAnim.x}px) scale(${errorBoxAnim.scale})`,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                minWidth: 0,
              }}
            >
              <span style={{ fontSize: 36, flexShrink: 0 }}>🔴</span>
              <span
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: dangerColor,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  ...textWrap,
                }}
              >
                {errorCode}
              </span>
              <span
                style={{
                  fontSize: 20,
                  color: textColor,
                  fontWeight: 700,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  ...textWrap,
                }}
              >
                · {errorField}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                ...textWrap,
              }}
            >
              {errorChips.map((chip, idx) => (
                <span
                  key={`${chip.label}-${idx}`}
                  style={{
                    fontSize: 16,
                    color: mutedTextColor,
                    padding: "6px 12px",
                    borderRadius: 999,
                    border: `1px solid ${mutedTextColor}44`,
                    backgroundColor: "rgba(255,255,255,0.04)",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                  }}
                >
                  <span style={{ color: mutedTextColor }}>{chip.label}: </span>
                  <span style={{ color: textColor, fontWeight: 700 }}>
                    {chip.value}
                  </span>
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minWidth: 0,
                paddingTop: 8,
                borderTop: `1px solid ${dangerColor}33`,
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  color: mutedTextColor,
                  letterSpacing: 4,
                  fontWeight: 700,
                }}
              >
                ROOT CAUSE
              </span>
              <span
                style={{
                  fontSize: 26,
                  color: textColor,
                  fontWeight: 700,
                  ...textWrap,
                }}
              >
                {errorRoot}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minWidth: 0,
                paddingTop: 8,
                borderTop: `1px solid ${successColor}33`,
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  color: mutedTextColor,
                  letterSpacing: 4,
                  fontWeight: 700,
                }}
              >
                FIX
              </span>
              <span
                style={{
                  fontSize: 26,
                  color: successColor,
                  fontWeight: 700,
                  ...textWrap,
                }}
              >
                ✅ {fixVisible}
                {fixVisible.length < errorFix.length ? "▍" : ""}
              </span>
            </div>
          </div>

          {/* 右：6 本 Playbook */}
          <div
            style={{
              flex: "1 1 50%",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              padding: "20px 24px",
              borderRadius: 18,
              backgroundColor: panelColor,
              border: `1px solid ${highlightColor}44`,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: textColor,
                  ...textWrap,
                }}
              >
                📚 6 本专题 Playbook
              </span>
              <span
                style={{
                  fontSize: 14,
                  letterSpacing: 3,
                  color: goldColor,
                  fontWeight: 800,
                  padding: "3px 10px",
                  borderRadius: 999,
                  border: `1px solid ${goldColor}88`,
                }}
              >
                7 MARKETS
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
                gap: 12,
                minWidth: 0,
              }}
            >
              {playbookCards.map((book, idx) => {
                const delay = coverPhase ? 0 : staggerDelay(idx, 5) + 28;
                const anim = coverPhase
                  ? { opacity: 1, y: 0 }
                  : fadeInUp(frame, fps, delay, 24);
                return (
                  <div
                    key={`${book.title}-${idx}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      padding: "16px 14px",
                      borderRadius: 12,
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: `1.5px solid ${book.color}66`,
                      minWidth: 0,
                      opacity: anim.opacity,
                      transform: `translateY(${anim.y}px)`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        letterSpacing: 3,
                        color: book.color,
                        fontWeight: 800,
                        ...textWrap,
                      }}
                    >
                      {book.tag}
                    </span>
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: textColor,
                        ...textWrap,
                      }}
                    >
                      {book.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
