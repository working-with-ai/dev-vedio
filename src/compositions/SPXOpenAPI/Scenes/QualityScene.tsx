import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { SPXOpenAPIProps } from "../schema";
import {
  fadeInUp,
  numberCountUp,
  progressBar,
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

/**
 * 场景：质量评分仪表盘 + 五维进度条
 */
export const QualityScene: React.FC<SPXOpenAPIProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const {
    qualityTitle,
    qualityDimensions,
    qualityTotalScore,
    qualityGrade,
    qualityGrades,
    accentColor,
    highlightColor,
    goldColor,
    textColor,
    mutedTextColor,
    panelColor,
  } = props;

  const titleAnim = fadeInUp(frame, fps, 0, 48);
  const displayedTotal = numberCountUp(
    frame,
    fps,
    qualityTotalScore,
    1.8,
    18,
  );

  const gradeDelay = 36;
  const gradeSp = spring({
    frame: frame - gradeDelay,
    fps,
    config: { damping: 14, stiffness: 220, mass: 0.45 },
  });
  const gradeScale = interpolate(gradeSp, [0, 1], [0.35, 1]);
  const gradeOpacity = interpolate(gradeSp, [0, 1], [0, 1]);

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
            minWidth: 0,
            transform: `translateY(${titleAnim.y}px)`,
            opacity: titleAnim.opacity,
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: 10,
              color: mutedTextColor,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            QUALITY GATE
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              textAlign: "center",
              ...textWrap,
              backgroundImage: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {qualityTitle}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 920,
            minWidth: 0,
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: "20px 24px 16px",
            boxSizing: "border-box",
            borderRadius: 20,
            backgroundColor: panelColor,
            border: `1px solid ${highlightColor}33`,
          }}
        >
          {/* 总分 + 评级 */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              flexWrap: "wrap",
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 999,
                border: `4px solid ${goldColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                backgroundColor: "rgba(255, 215, 0, 0.06)",
              }}
            >
              <span
                style={{
                  fontSize: 48,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontWeight: 900,
                  color: goldColor,
                }}
              >
                {displayedTotal}
              </span>
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: goldColor,
                transform: `scale(${gradeScale})`,
                opacity: gradeOpacity,
                transformOrigin: "center center",
              }}
            >
              {qualityGrade}
            </div>
          </div>

          {/* 五维进度条 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              width: "100%",
              minWidth: 0,
            }}
          >
            {qualityDimensions.map((dimension, index) => {
              const delay = 28 + staggerDelay(index, 12);
              const barPct =
                (progressBar(frame, fps, 1.4, delay) / 100) * dimension.score;

              const rowReveal = spring({
                frame: frame - (12 + staggerDelay(index, 10)),
                fps,
                config: { damping: 16, stiffness: 180, mass: 0.5 },
              });
              const rowOpacity = interpolate(rowReveal, [0, 1], [0, 1]);
              const rowY = interpolate(rowReveal, [0, 1], [14, 0]);

              return (
                <div
                  key={`${dimension.name}-${index}`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    width: "100%",
                    minWidth: 0,
                    opacity: rowOpacity,
                    transform: `translateY(${rowY}px)`,
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 140px",
                      fontSize: 22,
                      fontWeight: 600,
                      color: textColor,
                      minWidth: 0,
                      ...textWrap,
                    }}
                  >
                    {dimension.name}
                  </div>
                  <div
                    style={{
                      flex: "0 0 50px",
                      fontSize: 18,
                      color: mutedTextColor,
                      fontFamily: "ui-monospace, monospace",
                    }}
                  >
                    {dimension.weight}%
                  </div>
                  <div
                    style={{
                      flex: "1 1 0",
                      minWidth: 0,
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: "rgba(255,255,255,0.08)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${barPct}%`,
                        height: "100%",
                        borderRadius: 8,
                        backgroundColor: dimension.color,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      flex: "0 0 44px",
                      fontSize: 18,
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      fontWeight: 700,
                      color: textColor,
                      textAlign: "right",
                    }}
                  >
                    {dimension.score}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 评级对照 */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
              fontSize: 18,
              color: mutedTextColor,
              justifyContent: "center",
              ...textWrap,
            }}
          >
            {qualityGrades.map((g) => (
              <span key={g} style={{ whiteSpace: "nowrap" }}>
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
