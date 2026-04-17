import React from "react";
import { AbsoluteFill } from "remotion";
import type { SPXOpenAPILandscapeProps } from "./schema";

export const SPXOpenAPILandscapeCover: React.FC<SPXOpenAPILandscapeProps> = (
  props,
) => {
  const {
    coverLabel,
    coverTitle,
    coverSubtitle,
    coverMetrics,
    accentColor,
    highlightColor,
    goldColor,
    backgroundColor,
    textColor,
    mutedTextColor,
    panelColor,
  } = props;

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        overflow: "hidden",
      }}
    >
      {/* 背景光晕（横屏椭圆放大） */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 50% 60% at 30% 50%, ${accentColor}30 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 45% 55% at 75% 60%, ${highlightColor}20 0%, transparent 65%)`,
        }}
      />
      {/* 扫描线 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
        }}
      />

      {/* HUD 四角边框 */}
      {[
        { top: 50, left: 60 },
        { top: 50, right: 60 },
        { bottom: 50, left: 60 },
        { bottom: 50, right: 60 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 48,
            height: 48,
            borderColor: accentColor,
            borderStyle: "solid",
            borderWidth: 0,
            ...(pos.top !== undefined && pos.left !== undefined
              ? { borderTopWidth: 3, borderLeftWidth: 3 }
              : {}),
            ...(pos.top !== undefined && pos.right !== undefined
              ? { borderTopWidth: 3, borderRightWidth: 3 }
              : {}),
            ...(pos.bottom !== undefined && pos.left !== undefined
              ? { borderBottomWidth: 3, borderLeftWidth: 3 }
              : {}),
            ...(pos.bottom !== undefined && pos.right !== undefined
              ? { borderBottomWidth: 3, borderRightWidth: 3 }
              : {}),
            opacity: 0.6,
          }}
        />
      ))}

      {/* 主内容横向布局：左文案 + 右指标 */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 100,
          right: 100,
          bottom: 80,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
          gap: 60,
          alignItems: "center",
        }}
      >
        {/* 左：英文标签 + emoji + 标题 + 副标题 + 平台条 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 28,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: 36,
              letterSpacing: 12,
              fontWeight: 900,
              background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 60px ${accentColor}55`,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            {coverLabel}
          </div>

          <div style={{ fontSize: 80, lineHeight: 1 }}>📦</div>

          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 40px ${accentColor}44`,
              lineHeight: 1.1,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            {coverTitle}
          </div>

          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: highlightColor,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            {coverSubtitle}
          </div>

          <div
            style={{
              display: "inline-flex",
              gap: 14,
              alignItems: "center",
              padding: "10px 24px",
              borderRadius: 999,
              border: `1px solid rgba(255,255,255,0.18)`,
              alignSelf: "flex-start",
            }}
          >
            {["Cursor", "Claude Code", "Codex", "Gemini CLI"].map((p, i) => (
              <React.Fragment key={p}>
                {i > 0 && (
                  <span style={{ color: mutedTextColor, fontSize: 18 }}>|</span>
                )}
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: textColor,
                  }}
                >
                  {p}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 右：4 张指标卡（2×2） */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: 24,
            minWidth: 0,
          }}
        >
          {coverMetrics.map((metric, i) => {
            const parts = metric.split(" ");
            const num = parts[0];
            const label = parts.slice(1).join(" ");
            const isNumeric = /^\d+$/.test(num);
            return (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "32px 20px",
                  backgroundColor: panelColor,
                  border: `1px solid ${accentColor}`,
                  borderRadius: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 28px ${accentColor}22`,
                }}
              >
                <div
                  style={{
                    fontSize: isNumeric ? 96 : 36,
                    fontFamily: "monospace",
                    fontWeight: 900,
                    color: goldColor,
                    lineHeight: 1.05,
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {isNumeric ? num : metric}
                </div>
                {isNumeric ? (
                  <div
                    style={{
                      fontSize: 22,
                      color: mutedTextColor,
                      fontWeight: 700,
                      letterSpacing: 4,
                    }}
                  >
                    {label}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default SPXOpenAPILandscapeCover;
