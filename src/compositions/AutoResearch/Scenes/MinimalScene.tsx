import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AutoResearchProps } from "../schema";
import { fadeInUp, fadeIn, pulseGlow, nodeReveal } from "../animations";

export const MinimalScene: React.FC<AutoResearchProps> = ({
  backgroundColor,
  textColor,
  accentColor,
  highlightColor,
  secondaryColor,
  minimalTitle,
  minimalSubtitle,
  projectFiles,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleAnim = fadeInUp(frame, fps, 0, 60);
  const subtitleAnim = fadeInUp(frame, fps, 10, 40);
  const glow = pulseGlow(frame, fps, 2);

  const filesStart = Math.round(fps * 1.5);

  const codeStart = Math.round(fps * 4.5);
  const codeAnim = fadeInUp(frame, fps, codeStart, 50);

  const sloganStart = Math.round(durationInFrames * 0.78);
  const sloganAnim = spring({
    frame: frame - sloganStart,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${secondaryColor}0c 0%, transparent 50%)` }} />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 420,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            opacity: titleAnim.opacity,
            transform: `translateY(${titleAnim.y}px)`,
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 20, color: secondaryColor, letterSpacing: 10, marginBottom: 14, fontWeight: 700 }}>
            MINIMAL IS POWER
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: textColor, textShadow: `0 0 40px ${secondaryColor}44` }}>
            {minimalTitle}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            opacity: subtitleAnim.opacity,
            transform: `translateY(${subtitleAnim.y}px)`,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 26,
              color: "#999",
              padding: "10px 30px",
              borderRadius: 20,
              border: `1px solid ${secondaryColor}22`,
              background: `${secondaryColor}08`,
            }}
          >
            {minimalSubtitle}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
          {projectFiles.map((file, i) => {
            const anim = nodeReveal(frame, fps, i, filesStart);
            const isActive = frame > filesStart + i * 18 + 15;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "22px 24px",
                  borderRadius: 18,
                  background: isActive
                    ? `linear-gradient(135deg, ${file.color}12, ${file.color}06)`
                    : "rgba(255,255,255,0.02)",
                  border: `2px solid ${isActive ? `${file.color}55` : "rgba(255,255,255,0.05)"}`,
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px) scale(${anim.scale})`,
                  boxShadow: isActive ? `0 0 30px ${file.color}15` : "none",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: isActive
                      ? `linear-gradient(135deg, ${file.color}44, ${file.color}22)`
                      : `${file.color}11`,
                    border: `2px solid ${file.color}${isActive ? "88" : "33"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    flexShrink: 0,
                    boxShadow: isActive ? `0 0 20px ${file.color}33` : "none",
                  }}
                >
                  {file.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: textColor, fontFamily: "monospace" }}>
                      {file.name}
                    </div>
                    {file.editable && (
                      <div
                        style={{
                          fontSize: 13,
                          color: "#fff",
                          background: file.color,
                          padding: "3px 10px",
                          borderRadius: 8,
                          fontWeight: 800,
                        }}
                      >
                        {file.name === "train.py" ? "AI修改" : "人类编写"}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 22, color: "#999", marginTop: 4 }}>
                    {file.desc}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 900,
                    color: file.color,
                    fontFamily: "monospace",
                    opacity: 0.5 + glow * 0.3,
                  }}
                >
                  .py
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: codeAnim.opacity,
            transform: `translateY(${codeAnim.y}px)`,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              borderRadius: 14,
              overflow: "hidden",
              border: `1px solid ${accentColor}22`,
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            <div style={{ height: 30, background: "#1a1a2e", display: "flex", alignItems: "center", padding: "0 12px", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#22c55e" }} />
              <span style={{ fontSize: 11, color: "#555", marginLeft: 6 }}>project structure</span>
            </div>
            <div style={{ background: "#0d0d1a", padding: "10px 14px" }}>
              {[
                "autoresearch/",
                "  prepare.py  — 数据准备 (固定)",
                "  train.py    — 核心文件 (AI改)",
                "  program.md  — 指令文件 (你写)",
                "",
                "  # 就这三个文件，没了",
                "  # 真正的核弹不需要万行代码",
              ].map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 14,
                    fontFamily: "monospace",
                    lineHeight: 1.7,
                    color: line.startsWith("  #")
                      ? "#555"
                      : line.includes("AI改")
                        ? "#ef4444"
                        : line.includes("你写")
                          ? accentColor
                          : line.startsWith("autoresearch")
                            ? highlightColor
                            : "#bbb",
                    opacity: fadeIn(frame, codeStart + Math.round(i * 3), 8),
                  }}
                >
                  {line || "\u00A0"}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 36,
              fontWeight: 900,
              color: secondaryColor,
              opacity: interpolate(sloganAnim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(sloganAnim, [0, 1], [0.8, 1])})`,
              textShadow: `0 0 30px ${secondaryColor}44`,
              letterSpacing: 2,
            }}
          >
            真正的核弹 · 极简到极致
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
