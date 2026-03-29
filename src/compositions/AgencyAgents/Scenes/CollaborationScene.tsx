import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AgencyAgentsProps } from "../schema";
import { fadeInUp, fadeIn, nodeReveal, cardSlideIn, staggerDelay } from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const CollaborationScene: React.FC<AgencyAgentsProps> = ({
  backgroundColor,
  textColor,
  accentColor,
  secondaryColor,
  collaborationTitle,
  collaborationSubtitle,
  collaborationFeatures,
  supportedTools,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleAnim = fadeInUp(frame, fps, 0, 60);
  const subtitleAnim = fadeInUp(frame, fps, 10, 40);

  const featuresStart = Math.round(fps * 1.5);
  const toolsStart = Math.round(fps * 5);

  const sloganStart = Math.round(durationInFrames * 0.8);
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
          <div style={{ fontSize: 20, color: secondaryColor, letterSpacing: 10, marginBottom: 14, fontWeight: 700 }}>
            ORCHESTRATION
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: textColor, textShadow: `0 0 40px ${secondaryColor}44` }}>
            {collaborationTitle}
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
            {collaborationSubtitle}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
          {collaborationFeatures.map((feature, i) => {
            const anim = nodeReveal(frame, fps, i, featuresStart);
            const isActive = frame > featuresStart + i * 18 + 15;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "18px 22px",
                  borderRadius: 16,
                  background: isActive ? `${secondaryColor}10` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isActive ? `${secondaryColor}44` : "rgba(255,255,255,0.05)"}`,
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px) scale(${anim.scale})`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: isActive
                      ? `linear-gradient(135deg, ${secondaryColor}44, ${secondaryColor}22)`
                      : `${secondaryColor}11`,
                    border: `2px solid ${secondaryColor}${isActive ? "66" : "33"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 900,
                    color: secondaryColor,
                    fontFamily: "monospace",
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontSize: 30, fontWeight: 700, color: textColor }}>
                  {feature}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ textAlign: "center", fontSize: 18, color: "#666", letterSpacing: 5, marginBottom: 14, opacity: fadeIn(frame, toolsStart, 15) }}>
            SUPPORTED PLATFORMS
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            {supportedTools.map((tool, i) => {
              const anim = cardSlideIn(frame, fps, toolsStart + staggerDelay(i, 6));
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 16px",
                    borderRadius: 12,
                    border: `1px solid ${tool.color}33`,
                    background: `${tool.color}08`,
                    opacity: anim.opacity,
                    transform: `translateX(${anim.x}px) scale(${anim.scale})`,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{tool.icon}</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: tool.color }}>{tool.name}</span>
                </div>
              );
            })}
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
            .md 丢进上下文 · AI 秒变专家
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
