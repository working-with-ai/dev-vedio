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
  gap: 36,
  minWidth: 0,
  overflow: "hidden",
};

const textWrap: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

export const PainPointsScene: React.FC<SPXOpenAPILandscapeProps> = (props) => {
  const {
    painTitle,
    painSubtitle,
    painSignatureTitle,
    painSignatureFormula,
    painSignatureErrors,
    painWebhookTitle,
    painWebhookNote,
    painWebhookRows,
    painAwbTitle,
    painAwbNote,
    painAwbVariants,
    accentColor,
    highlightColor,
    dangerColor,
    warningColor,
    goldColor,
    textColor,
    mutedTextColor,
    panelColor,
  } = props;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const coverPhase = frame < 5;

  const titleGradient: React.CSSProperties = {
    backgroundImage: `linear-gradient(135deg, ${dangerColor}, ${warningColor})`,
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    ...textWrap,
  };

  const titleAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 0, 44);

  const formulaDelay = 40;
  const formulaLen = typewriterLength(
    frame,
    painSignatureFormula,
    fps,
    coverPhase ? 0 : formulaDelay,
    22,
  );
  const formulaVisible = coverPhase
    ? painSignatureFormula
    : painSignatureFormula.slice(0, formulaLen);

  const columnHeaderStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  };

  const columnStyle: React.CSSProperties = {
    flex: "1 1 0",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: "24px 24px",
    borderRadius: 18,
    backgroundColor: panelColor,
    border: `1px solid ${accentColor}33`,
    boxSizing: "border-box",
  };

  const signatureColAnim = coverPhase
    ? { opacity: 1, x: 0, scale: 1 }
    : cardSlideIn(frame, fps, 14);
  const webhookColAnim = coverPhase
    ? { opacity: 1, x: 0, scale: 1 }
    : cardSlideIn(frame, fps, 22);
  const awbColAnim = coverPhase
    ? { opacity: 1, x: 0, scale: 1 }
    : cardSlideIn(frame, fps, 30);

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={safeArea}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            width: "100%",
            opacity: titleAnim.opacity,
            transform: `translateY(${titleAnim.y}px)`,
          }}
        >
          <span
            style={{
              fontSize: 22,
              letterSpacing: 14,
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
              fontSize: 72,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.1,
              ...titleGradient,
            }}
          >
            {painTitle}
          </h2>
          <div
            style={{
              fontSize: 28,
              color: mutedTextColor,
              fontWeight: 500,
              textAlign: "center",
              ...textWrap,
            }}
          >
            {painSubtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 24,
            width: "100%",
            maxWidth: 1680,
            minWidth: 0,
            alignItems: "stretch",
          }}
        >
          {/* 左栏：签名错误 */}
          <div
            style={{
              ...columnStyle,
              borderColor: `${dangerColor}55`,
              opacity: signatureColAnim.opacity,
              transform: `translateX(${signatureColAnim.x}px) scale(${signatureColAnim.scale})`,
            }}
          >
            <div style={columnHeaderStyle}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: dangerColor,
                  ...textWrap,
                }}
              >
                🔐 {painSignatureTitle}
              </span>
              <span
                style={{
                  fontSize: 16,
                  letterSpacing: 3,
                  color: mutedTextColor,
                  fontWeight: 700,
                }}
              >
                SIGNATURE
              </span>
            </div>
            <div
              style={{
                fontSize: 18,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                color: accentColor,
                padding: "10px 12px",
                borderRadius: 8,
                backgroundColor: "rgba(6, 182, 212, 0.08)",
                border: `1px solid ${accentColor}44`,
                ...textWrap,
              }}
            >
              {formulaVisible}
              {formulaVisible.length < painSignatureFormula.length ? "▍" : ""}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                minWidth: 0,
              }}
            >
              {painSignatureErrors.map((err, idx) => {
                const delay = coverPhase ? 0 : staggerDelay(idx, 8) + 16;
                const anim = coverPhase
                  ? { opacity: 1, y: 0 }
                  : fadeInUp(frame, fps, delay, 24);
                return (
                  <div
                    key={`${err.code}-${idx}`}
                    style={{
                      border: `1.5px solid ${dangerColor}`,
                      borderRadius: 10,
                      padding: "12px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      minWidth: 0,
                      backgroundColor: "rgba(239, 68, 68, 0.08)",
                      opacity: anim.opacity,
                      transform: `translateY(${anim.y}px)`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 22,
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, monospace",
                        fontWeight: 800,
                        color: dangerColor,
                        ...textWrap,
                      }}
                    >
                      ❌ {err.code}
                    </span>
                    <span
                      style={{
                        fontSize: 20,
                        color: textColor,
                        fontWeight: 500,
                        ...textWrap,
                      }}
                    >
                      {err.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 中栏：Webhook */}
          <div
            style={{
              ...columnStyle,
              borderColor: `${warningColor}55`,
              opacity: webhookColAnim.opacity,
              transform: `translateX(${webhookColAnim.x}px) scale(${webhookColAnim.scale})`,
            }}
          >
            <div style={columnHeaderStyle}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: warningColor,
                  ...textWrap,
                }}
              >
                📡 {painWebhookTitle}
              </span>
              <span
                style={{
                  fontSize: 16,
                  letterSpacing: 3,
                  color: mutedTextColor,
                  fontWeight: 700,
                }}
              >
                CALLBACK
              </span>
            </div>
            <div
              style={{
                fontSize: 18,
                color: mutedTextColor,
                fontWeight: 600,
                ...textWrap,
              }}
            >
              {painWebhookNote}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                minWidth: 0,
              }}
            >
              {painWebhookRows.map((row, idx) => {
                const delay = coverPhase ? 0 : staggerDelay(idx, 8) + 24;
                const anim = coverPhase
                  ? { opacity: 1, y: 0 }
                  : fadeInUp(frame, fps, delay, 24);
                return (
                  <div
                    key={`${row.event}-${idx}`}
                    style={{
                      borderRadius: 10,
                      padding: "14px 16px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      minWidth: 0,
                      backgroundColor: "rgba(245, 158, 11, 0.06)",
                      border: `1.5px solid ${row.color}66`,
                      opacity: anim.opacity,
                      transform: `translateY(${anim.y}px)`,
                    }}
                  >
                    <span
                      style={{
                        flex: "0 0 auto",
                        fontSize: 22,
                        fontWeight: 800,
                        color: textColor,
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, monospace",
                        ...textWrap,
                      }}
                    >
                      {row.event}
                    </span>
                    <span
                      style={{
                        flex: "1 1 0",
                        minWidth: 0,
                        fontSize: 18,
                        color: row.color,
                        fontWeight: 700,
                        textAlign: "right",
                        ...textWrap,
                      }}
                    >
                      {row.retry}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 右栏：AWB */}
          <div
            style={{
              ...columnStyle,
              borderColor: `${highlightColor}55`,
              opacity: awbColAnim.opacity,
              transform: `translateX(${awbColAnim.x}px) scale(${awbColAnim.scale})`,
            }}
          >
            <div style={columnHeaderStyle}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: highlightColor,
                  ...textWrap,
                }}
              >
                🖨️ {painAwbTitle}
              </span>
              <span
                style={{
                  fontSize: 16,
                  letterSpacing: 3,
                  color: mutedTextColor,
                  fontWeight: 700,
                }}
              >
                SHIPPING LABEL
              </span>
            </div>
            <div
              style={{
                fontSize: 18,
                color: mutedTextColor,
                fontWeight: 600,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                ...textWrap,
              }}
            >
              {painAwbNote}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                gap: 12,
                minWidth: 0,
              }}
            >
              {painAwbVariants.map((variant, idx) => {
                const delay = coverPhase ? 0 : staggerDelay(idx, 8) + 32;
                const anim = coverPhase
                  ? { opacity: 1, y: 0 }
                  : fadeInUp(frame, fps, delay, 24);
                return (
                  <div
                    key={`${variant.label}-${idx}`}
                    style={{
                      borderRadius: 10,
                      padding: "14px 16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      minWidth: 0,
                      backgroundColor: "rgba(139, 92, 246, 0.06)",
                      border: `1.5px solid ${variant.color}66`,
                      opacity: anim.opacity,
                      transform: `translateY(${anim.y}px)`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 34,
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, monospace",
                        fontWeight: 900,
                        color: variant.color,
                        lineHeight: 1,
                      }}
                    >
                      {variant.label}
                    </span>
                    <span
                      style={{
                        fontSize: 16,
                        color: goldColor,
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, monospace",
                        fontWeight: 700,
                        ...textWrap,
                      }}
                    >
                      by {variant.key}
                    </span>
                    <span
                      style={{
                        fontSize: 18,
                        color: textColor,
                        fontWeight: 500,
                        lineHeight: 1.3,
                        ...textWrap,
                      }}
                    >
                      {variant.desc}
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
