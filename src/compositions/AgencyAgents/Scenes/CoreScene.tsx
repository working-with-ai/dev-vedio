import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AgencyAgentsProps } from "../schema";
import { fadeInUp, fadeIn, pulseGlow, staggerDelay } from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const CoreScene: React.FC<AgencyAgentsProps> = ({
  backgroundColor,
  textColor,
  accentColor,
  highlightColor,
  coreTitle,
  coreSubtitle,
  departments,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleAnim = fadeInUp(frame, fps, 0, 60);
  const subtitleAnim = fadeInUp(frame, fps, 10, 40);
  const glow = pulseGlow(frame, fps, 2);

  const gridStart = Math.round(fps * 1.5);

  const mdFileStart = Math.round(fps * 4);
  const mdAnim = fadeInUp(frame, fps, mdFileStart, 50);

  const sloganStart = Math.round(durationInFrames * 0.78);
  const sloganAnim = spring({
    frame: frame - sloganStart,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  return (
    <SceneBackground
      backgroundColor={backgroundColor}
      accentColor={accentColor}
      particles={{ count: 25, speed: 0.3, opacity: 0.35 }}
      glow={{
        orbs: [
          { x: "50%", y: "40%", color: accentColor, radius: 500, opacity: 0.12, pulseSpeed: 0.6 },
        ],
      }}
      scanlines
      hud={{ color: accentColor, animation: "pulse" }}
    >
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
          fontFamily: "system-ui, -apple-system, sans-serif",
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
          <div style={{ fontSize: 20, color: accentColor, letterSpacing: 10, marginBottom: 14, fontWeight: 700 }}>
            CORE CONCEPT
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: textColor, textShadow: `0 0 40px ${accentColor}44` }}>
            {coreTitle}
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
              border: `1px solid ${accentColor}22`,
              background: `${accentColor}08`,
            }}
          >
            {coreSubtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          {departments.map((dept, i) => {
            const delay = gridStart + staggerDelay(i, 5);
            const cellAnim = spring({
              frame: frame - delay,
              fps,
              config: { damping: 14, stiffness: 180 },
            });
            const isActive = frame > delay + 10;

            return (
              <div
                key={i}
                style={{
                  width: 150,
                  padding: "14px 10px",
                  borderRadius: 14,
                  background: isActive ? `${dept.color}12` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isActive ? `${dept.color}44` : "rgba(255,255,255,0.05)"}`,
                  textAlign: "center",
                  opacity: interpolate(cellAnim, [0, 1], [0, 1]),
                  transform: `scale(${interpolate(cellAnim, [0, 1], [0.5, 1])})`,
                  boxShadow: isActive ? `0 0 20px ${dept.color}15` : "none",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 6 }}>{dept.icon}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: dept.color }}>{dept.name}</div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: mdAnim.opacity,
            transform: `translateY(${mdAnim.y}px)`,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              borderRadius: 14,
              overflow: "hidden",
              border: `1px solid ${highlightColor}22`,
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            <div style={{ height: 30, background: "#1a1a2e", display: "flex", alignItems: "center", padding: "0 12px", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#22c55e" }} />
              <span style={{ fontSize: 11, color: "#555", marginLeft: 6 }}>product-manager.md</span>
            </div>
            <div style={{ background: "#0d0d1a", padding: "10px 14px" }}>
              {[
                "# 🎯 Product Manager Agent",
                "",
                "## Role & Personality",
                "  Strategic thinker, user-centric...",
                "",
                "## Workflow",
                "  1. Stakeholder interview",
                "  2. Market & competitor analysis",
                "  3. PRD generation with acceptance criteria",
              ].map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 14,
                    fontFamily: "monospace",
                    lineHeight: 1.7,
                    color: line.startsWith("#")
                      ? highlightColor
                      : line.startsWith("  ")
                        ? "#bbb"
                        : "#666",
                    opacity: fadeIn(frame, mdFileStart + Math.round(i * 3), 8),
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
              color: accentColor,
              opacity: interpolate(sloganAnim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(sloganAnim, [0, 1], [0.8, 1])})`,
              textShadow: `0 0 30px ${accentColor}44`,
              letterSpacing: 2,
            }}
          >
            一个 Markdown 文件 = 一个专家
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
