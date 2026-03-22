import React from "react";
import { AbsoluteFill } from "remotion";
import { AutoResearchProps } from "./schema";

export const AutoResearchCover: React.FC<AutoResearchProps> = ({
  backgroundColor,
  textColor,
  accentColor,
  highlightColor,
  secondaryColor,
  githubStars,
  codeLines,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 35%, ${accentColor}30 0%, transparent 55%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 30% 70%, ${highlightColor}15 0%, transparent 40%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accentColor}06 2px, ${accentColor}06 4px)`,
          pointerEvents: "none",
        }}
      />

      {[
        { top: 50, left: 50 },
        { top: 50, right: 50 },
        { bottom: 50, left: 50 },
        { bottom: 50, right: 50 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 70,
            height: 70,
            opacity: 0.6,
            borderTop: i < 2 ? `3px solid ${accentColor}` : "none",
            borderBottom: i >= 2 ? `3px solid ${accentColor}` : "none",
            borderLeft: i % 2 === 0 ? `3px solid ${accentColor}` : "none",
            borderRight: i % 2 === 1 ? `3px solid ${accentColor}` : "none",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: accentColor,
            letterSpacing: 16,
            fontWeight: 800,
            marginBottom: 40,
            textShadow: `0 0 30px ${accentColor}88`,
          }}
        >
          AUTORESEARCH
        </div>

        <div
          style={{
            fontSize: 100,
            marginBottom: 30,
            filter: `drop-shadow(0 0 40px ${accentColor}aa)`,
          }}
        >
          🔬
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 60,
            marginBottom: 50,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: "#fbbf24",
                fontFamily: "monospace",
                textShadow: "0 0 40px #fbbf2466",
                lineHeight: 1,
              }}
            >
              {(githubStars / 10000).toFixed(1)}w+
            </div>
            <div style={{ fontSize: 22, color: "#888", marginTop: 8, letterSpacing: 4 }}>
              ⭐ STARS
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: accentColor,
                fontFamily: "monospace",
                textShadow: `0 0 40px ${accentColor}66`,
                lineHeight: 1,
              }}
            >
              {codeLines}
            </div>
            <div style={{ fontSize: 22, color: "#888", marginTop: 8, letterSpacing: 4 }}>
              📝 LINES
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: textColor,
            textAlign: "center",
            lineHeight: 1.35,
            textShadow: `0 0 40px ${accentColor}44`,
            marginBottom: 24,
          }}
        >
          AI自己写代码
          <br />
          跑实验
        </div>

        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: highlightColor,
            textAlign: "center",
            lineHeight: 1.4,
            textShadow: `0 0 30px ${highlightColor}66`,
            marginBottom: 40,
          }}
        >
          你去蒸桑拿，AI替你搞科研
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "14px 36px",
            borderRadius: 20,
            border: `2px solid ${secondaryColor}44`,
            background: `${secondaryColor}0a`,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 800, color: secondaryColor, letterSpacing: 2 }}>
            Karpathy
          </div>
          <div style={{ width: 2, height: 20, background: `${secondaryColor}44` }} />
          <div style={{ fontSize: 24, fontWeight: 800, color: secondaryColor, letterSpacing: 2 }}>
            单张GPU
          </div>
          <div style={{ width: 2, height: 20, background: `${secondaryColor}44` }} />
          <div style={{ fontSize: 24, fontWeight: 800, color: secondaryColor, letterSpacing: 2 }}>
            一夜百轮实验
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 50,
          }}
        >
          {[
            { label: "0.8B", sub: "AI小模型", color: accentColor },
            { label: ">", sub: "", color: "#ef4444" },
            { label: "1.6B", sub: "人类大模型", color: "#888" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: item.label === ">" ? 40 : 48,
                  fontWeight: 900,
                  color: item.color,
                  fontFamily: "monospace",
                  textShadow: item.label !== ">" ? `0 0 20px ${item.color}44` : undefined,
                }}
              >
                {item.label}
              </div>
              {item.sub && (
                <div style={{ fontSize: 18, color: "#666", marginTop: 4 }}>
                  {item.sub}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
