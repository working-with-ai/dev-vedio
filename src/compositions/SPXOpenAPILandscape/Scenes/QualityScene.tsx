import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { SPXOpenAPILandscapeProps } from "../schema";
import {
  fadeInUp,
  numberCountUp,
  progressBar,
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
  gap: 32,
  minWidth: 0,
  overflow: "hidden",
};

const textWrap: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

export const QualityScene: React.FC<SPXOpenAPILandscapeProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const {
    qualityTitle,
    qualityLabel,
    qualityTotalScore,
    qualityGrade,
    qualityVerdict,
    qualityFileName,
    qualityIssueCount,
    qualityDimensions,
    qualityIssues,
    accentColor,
    highlightColor,
    goldColor,
    dangerColor,
    warningColor,
    textColor,
    mutedTextColor,
    panelColor,
  } = props;

  const coverPhase = frame < 5;

  const titleAnim = coverPhase
    ? { opacity: 1, y: 0 }
    : fadeInUp(frame, fps, 0, 48);

  const displayedTotal = coverPhase
    ? qualityTotalScore
    : numberCountUp(frame, fps, qualityTotalScore, 1.8, 18);

  const gradeDelay = 32;
  const gradeSp = spring({
    frame: coverPhase ? 30 : frame - gradeDelay,
    fps,
    config: { damping: 14, stiffness: 220, mass: 0.45 },
  });
  const gradeScale = interpolate(gradeSp, [0, 1], [0.35, 1]);
  const gradeOpacity = interpolate(gradeSp, [0, 1], [0, 1]);

  const severityColor = (severity: "critical" | "warning" | "info") => {
    if (severity === "critical") return dangerColor;
    if (severity === "warning") return warningColor;
    return accentColor;
  };

  const severityIcon = (severity: "critical" | "warning" | "info") => {
    if (severity === "critical") return "🔴";
    if (severity === "warning") return "🟡";
    return "🔵";
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={safeArea}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
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
            {qualityLabel}
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: 68,
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
            {qualityTitle}
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 32,
            width: "100%",
            maxWidth: 1680,
            minWidth: 0,
            alignItems: "stretch",
          }}
        >
          {/* 左：大圆环 + B 级 + 文件元数据 */}
          <div
            style={{
              flex: "0 0 420px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              padding: "28px 24px",
              borderRadius: 20,
              backgroundColor: panelColor,
              border: `1px solid ${goldColor}55`,
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontSize: 20,
                color: mutedTextColor,
                fontWeight: 700,
                letterSpacing: 6,
              }}
            >
              TOTAL SCORE
            </span>
            <div
              style={{
                width: 260,
                height: 260,
                borderRadius: 999,
                border: `10px solid ${goldColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                backgroundColor: "rgba(255, 215, 0, 0.08)",
                boxShadow: `0 0 60px ${goldColor}44`,
              }}
            >
              <span
                style={{
                  fontSize: 124,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontWeight: 900,
                  color: goldColor,
                  lineHeight: 1,
                }}
              >
                {displayedTotal}
              </span>
            </div>
            <div
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: goldColor,
                lineHeight: 1,
                transform: `scale(${gradeScale})`,
                opacity: gradeOpacity,
              }}
            >
              {qualityGrade}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: warningColor,
                textAlign: "center",
                ...textWrap,
              }}
            >
              {qualityVerdict}
            </div>
            <div
              style={{
                fontSize: 18,
                color: mutedTextColor,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                ...textWrap,
              }}
            >
              {qualityFileName} · {qualityIssueCount} issues
            </div>
          </div>

          {/* 中：5 维度进度条 */}
          <div
            style={{
              flex: "1 1 0",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              padding: "28px 32px",
              borderRadius: 20,
              backgroundColor: panelColor,
              border: `1px solid ${highlightColor}33`,
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontSize: 24,
                color: mutedTextColor,
                fontWeight: 700,
                letterSpacing: 4,
              }}
            >
              5 DIMENSIONS · WEIGHTED
            </span>
            {qualityDimensions.map((dim, idx) => {
              const delay = 18 + staggerDelay(idx, 10);
              const barPct =
                coverPhase
                  ? dim.score
                  : (progressBar(frame, fps, 1.4, delay) / 100) * dim.score;

              const rowReveal = spring({
                frame: coverPhase ? 20 : frame - (10 + staggerDelay(idx, 10)),
                fps,
                config: { damping: 16, stiffness: 180, mass: 0.5 },
              });
              const rowOpacity = interpolate(rowReveal, [0, 1], [0, 1]);
              const rowY = interpolate(rowReveal, [0, 1], [14, 0]);
              return (
                <div
                  key={`${dim.name}-${idx}`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 18,
                    width: "100%",
                    minWidth: 0,
                    opacity: rowOpacity,
                    transform: `translateY(${rowY}px)`,
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 260px",
                      fontSize: 26,
                      fontWeight: 700,
                      color: textColor,
                      minWidth: 0,
                      ...textWrap,
                    }}
                  >
                    {dim.name}
                  </div>
                  <div
                    style={{
                      flex: "0 0 70px",
                      fontSize: 20,
                      color: mutedTextColor,
                      fontFamily: "ui-monospace, monospace",
                      fontWeight: 700,
                    }}
                  >
                    {dim.weight}%
                  </div>
                  <div
                    style={{
                      flex: "1 1 0",
                      minWidth: 0,
                      height: 22,
                      borderRadius: 11,
                      backgroundColor: "rgba(255,255,255,0.08)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${barPct}%`,
                        height: "100%",
                        borderRadius: 11,
                        backgroundColor: dim.color,
                        boxShadow: `0 0 18px ${dim.color}88`,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      flex: "0 0 60px",
                      fontSize: 24,
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, monospace",
                      fontWeight: 900,
                      color: dim.color,
                      textAlign: "right",
                    }}
                  >
                    {dim.score}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 右：问题清单 */}
          <div
            style={{
              flex: "0 0 400px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: "28px 24px",
              borderRadius: 20,
              backgroundColor: panelColor,
              border: `1px solid ${dangerColor}33`,
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontSize: 20,
                color: mutedTextColor,
                fontWeight: 700,
                letterSpacing: 4,
              }}
            >
              TOP ISSUES
            </span>
            {qualityIssues.map((issue, idx) => {
              const delay = coverPhase ? 0 : staggerDelay(idx, 6) + 38;
              const anim = coverPhase
                ? { opacity: 1, y: 0 }
                : fadeInUp(frame, fps, delay, 20);
              return (
                <div
                  key={`${issue.label}-${idx}`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    borderLeft: `4px solid ${severityColor(issue.severity)}`,
                    minWidth: 0,
                    opacity: anim.opacity,
                    transform: `translateY(${anim.y}px)`,
                  }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>
                    {severityIcon(issue.severity)}
                  </span>
                  <span
                    style={{
                      fontSize: 20,
                      color: textColor,
                      fontWeight: 600,
                      ...textWrap,
                    }}
                  >
                    {issue.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
