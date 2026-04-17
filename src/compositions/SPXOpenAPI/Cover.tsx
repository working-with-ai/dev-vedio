import React from "react";
import { AbsoluteFill } from "remotion";
import type { SPXOpenAPIProps } from "./schema";

export const SPXOpenAPICover: React.FC<SPXOpenAPIProps> = (props) => {
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
      {/* 背景光晕 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 40% at 50% 35%, ${accentColor}30 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 50% 30% at 50% 65%, ${highlightColor}15 0%, transparent 60%)`,
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
        { top: 60, left: 60 },
        { top: 60, right: 60 },
        { bottom: 60, left: 60 },
        { bottom: 60, right: 60 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 40,
            height: 40,
            borderColor: accentColor,
            borderStyle: "solid",
            borderWidth: 0,
            ...(pos.top !== undefined && pos.left !== undefined
              ? { borderTopWidth: 2, borderLeftWidth: 2 }
              : {}),
            ...(pos.top !== undefined && pos.right !== undefined
              ? { borderTopWidth: 2, borderRightWidth: 2 }
              : {}),
            ...(pos.bottom !== undefined && pos.left !== undefined
              ? { borderBottomWidth: 2, borderLeftWidth: 2 }
              : {}),
            ...(pos.bottom !== undefined && pos.right !== undefined
              ? { borderBottomWidth: 2, borderRightWidth: 2 }
              : {}),
            opacity: 0.6,
          }}
        />
      ))}

      {/* 主内容 */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 80,
          right: 80,
          bottom: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
        }}
      >
        {/* 英文标签 */}
        <div
          style={{
            fontSize: 64,
            letterSpacing: 12,
            fontWeight: 900,
            background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            textShadow: `0 0 60px ${accentColor}55`,
          }}
        >
          {coverLabel}
        </div>

        {/* 核心 emoji */}
        <div style={{ fontSize: 100 }}>📦</div>

        {/* 3 组指标 */}
        <div
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {coverMetrics.map((metric, i) => {
            const parts = metric.split(" ");
            const num = parts[0];
            const label = parts.slice(1).join(" ");
            return (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "16px 28px",
                  backgroundColor: panelColor,
                  border: `1px solid ${accentColor}`,
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 56,
                    fontFamily: "monospace",
                    fontWeight: 900,
                    color: goldColor,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    color: mutedTextColor,
                    fontWeight: 600,
                    marginTop: 4,
                  }}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>

        {/* 大标题 */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            textShadow: `0 0 40px ${accentColor}44`,
          }}
        >
          {coverTitle}
        </div>

        {/* 副标题 */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: highlightColor,
            textAlign: "center",
          }}
        >
          {coverSubtitle}
        </div>

        {/* 信息条 */}
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            padding: "12px 28px",
            borderRadius: 999,
            border: `1px solid rgba(255,255,255,0.15)`,
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
    </AbsoluteFill>
  );
};
