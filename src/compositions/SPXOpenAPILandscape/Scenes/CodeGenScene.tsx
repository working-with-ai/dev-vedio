import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { SPXOpenAPILandscapeProps } from "../schema";
import { fadeInUp, staggerDelay } from "../animations";

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

const statusColor = (
  status: "pass" | "warn" | "fail",
  warningColor: string,
  dangerColor: string,
  successColor: string,
) => {
  if (status === "pass") return successColor;
  if (status === "warn") return warningColor;
  return dangerColor;
};

const statusIcon = (status: "pass" | "warn" | "fail") => {
  if (status === "pass") return "✓";
  if (status === "warn") return "⚠";
  return "✗";
};

export const CodeGenScene: React.FC<SPXOpenAPILandscapeProps> = (props) => {
  const {
    codegenTitle,
    codegenLabel,
    codegenLanguage,
    codegenMarket,
    codegenFile,
    codegenLines,
    codegenLangs,
    precheckTitle,
    precheckFile,
    precheckRows,
    accentColor,
    highlightColor,
    goldColor,
    successColor,
    warningColor,
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

  const lineCharsPerSec = 38;

  let cumulativeChars = 0;
  const lineRenderInfo = codegenLines.map((line) => {
    const startChar = cumulativeChars;
    cumulativeChars += line.length + 1;
    return { startChar, line };
  });

  const codeStartFrame = 14;
  const charsRevealed = coverPhase
    ? cumulativeChars
    : Math.max(
        0,
        Math.floor(((frame - codeStartFrame) / fps) * lineCharsPerSec),
      );

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
            {codegenLabel}
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: 64,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.1,
              backgroundImage: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              ...textWrap,
            }}
          >
            {codegenTitle}
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
          {/* 左：代码编辑器 */}
          <div
            style={{
              flex: "1 1 56%",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 0,
              borderRadius: 16,
              backgroundColor: "rgba(2, 6, 12, 0.85)",
              border: `1px solid ${accentColor}55`,
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            {/* 编辑器顶栏 */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 18px",
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                borderBottom: `1px solid ${accentColor}33`,
                gap: 12,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    backgroundColor: dangerColor,
                  }}
                />
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    backgroundColor: warningColor,
                  }}
                />
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    backgroundColor: successColor,
                  }}
                />
              </div>
              <span
                style={{
                  flex: "1 1 0",
                  textAlign: "center",
                  fontSize: 16,
                  color: mutedTextColor,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  ...textWrap,
                }}
              >
                {codegenFile}
              </span>
              <span
                style={{
                  flex: "0 0 auto",
                  fontSize: 14,
                  letterSpacing: 3,
                  color: goldColor,
                  fontWeight: 800,
                  padding: "3px 10px",
                  borderRadius: 999,
                  border: `1px solid ${goldColor}88`,
                }}
              >
                {codegenLanguage} · {codegenMarket}
              </span>
            </div>

            {/* 代码主体 */}
            <div
              style={{
                padding: "18px 22px 24px",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 22,
                color: textColor,
                lineHeight: 1.55,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minWidth: 0,
                overflowX: "hidden",
              }}
            >
              {lineRenderInfo.map(({ startChar, line }, lineIdx) => {
                const remaining = Math.max(0, charsRevealed - startChar);
                const visibleChars = Math.min(line.length, remaining);
                const text = line.slice(0, visibleChars);
                const isCommentLine = line.trim().startsWith("//");
                const lineColor = isCommentLine ? mutedTextColor : textColor;
                return (
                  <div
                    key={lineIdx}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 14,
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        flex: "0 0 32px",
                        textAlign: "right",
                        color: mutedTextColor,
                        opacity: 0.5,
                      }}
                    >
                      {lineIdx + 1}
                    </span>
                    <span
                      style={{
                        flex: "1 1 0",
                        minWidth: 0,
                        color: lineColor,
                        whiteSpace: "pre-wrap",
                        ...textWrap,
                      }}
                    >
                      {text}
                      {visibleChars < line.length ? (
                        <span style={{ color: accentColor }}>▍</span>
                      ) : null}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 6 语言标签 */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                padding: "12px 18px 16px",
                borderTop: `1px solid ${accentColor}22`,
                ...textWrap,
              }}
            >
              {codegenLangs.map((name, idx) => {
                const isActive = name === codegenLanguage;
                return (
                  <span
                    key={`${name}-${idx}`}
                    style={{
                      fontSize: 16,
                      letterSpacing: 2,
                      fontWeight: 700,
                      padding: "6px 12px",
                      borderRadius: 999,
                      color: isActive ? "#020610" : mutedTextColor,
                      backgroundColor: isActive ? goldColor : "transparent",
                      border: `1px solid ${isActive ? goldColor : `${mutedTextColor}55`}`,
                    }}
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          </div>

          {/* 右：JSON 预检表 */}
          <div
            style={{
              flex: "1 1 44%",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              padding: "20px 24px",
              borderRadius: 16,
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
                🧪 {precheckTitle}
              </span>
              <span
                style={{
                  fontSize: 16,
                  color: mutedTextColor,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  ...textWrap,
                }}
              >
                {precheckFile}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                minWidth: 0,
              }}
            >
              {precheckRows.map((row, idx) => {
                const delay = coverPhase ? 0 : staggerDelay(idx, 6) + 24;
                const anim = coverPhase
                  ? { opacity: 1, y: 0 }
                  : fadeInUp(frame, fps, delay, 22);
                const color = statusColor(
                  row.status,
                  warningColor,
                  dangerColor,
                  successColor,
                );
                return (
                  <div
                    key={`${row.field}-${idx}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "32px minmax(0, 1.4fr) minmax(0, 1.6fr)",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: 10,
                      backgroundColor: "rgba(255,255,255,0.03)",
                      borderLeft: `4px solid ${color}`,
                      opacity: anim.opacity,
                      transform: `translateY(${anim.y}px)`,
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color,
                        textAlign: "center",
                      }}
                    >
                      {statusIcon(row.status)}
                    </span>
                    <span
                      style={{
                        fontSize: 20,
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, monospace",
                        color: textColor,
                        fontWeight: 700,
                        ...textWrap,
                      }}
                    >
                      {row.field}
                    </span>
                    <span
                      style={{
                        fontSize: 18,
                        color,
                        fontWeight: 600,
                        ...textWrap,
                      }}
                    >
                      {row.note}
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
