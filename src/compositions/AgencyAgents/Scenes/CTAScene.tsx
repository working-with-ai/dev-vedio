import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AgencyAgentsProps } from "../schema";
import { fadeInUp, fadeIn, numberCountUp, cardSlideIn, staggerDelay } from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const CTAScene: React.FC<AgencyAgentsProps> = ({
  backgroundColor,
  accentColor,
  highlightColor,
  ctaLine1,
  ctaLine2,
  ctaContent,
  ctaSlogan,
  githubStars,
  agentCount,
  supportedTools,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const line1Anim = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const line2Start = Math.round(fps * 1.5);
  const line2Anim = spring({
    frame: frame - line2Start,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const platformStart = Math.round(fps * 3);

  const contentStart = Math.round(durationInFrames * 0.45);
  const contentAnim = fadeInUp(frame, fps, contentStart, 50);

  const sloganStart = Math.round(durationInFrames * 0.72);
  const sloganAnim = spring({
    frame: frame - sloganStart,
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  const agentCountAnim = numberCountUp(frame, fps, agentCount, 1.5, 5);
  const pulseScale = 1 + Math.sin(frame / fps * Math.PI * 3) * 0.02;

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
          alignItems: "center",
          justifyContent: "center",
          padding: "0 40px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: accentColor,
              fontFamily: "monospace",
              opacity: interpolate(line1Anim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(line1Anim, [0, 1], [0.3, 1])})`,
              textShadow: `0 0 60px ${accentColor}66`,
            }}
          >
            {agentCountAnim}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#666",
              marginTop: 6,
              letterSpacing: 6,
              opacity: interpolate(line1Anim, [0, 1], [0, 1]),
            }}
          >
            PROFESSIONAL AGENTS · ZERO COST
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              fontSize: 46,
              fontWeight: 700,
              color: "#999",
              opacity: interpolate(line1Anim, [0, 1], [0, 1]),
              lineHeight: 1.4,
            }}
          >
            {ctaLine1}
          </div>
          <div
            style={{
              fontSize: 50,
              fontWeight: 900,
              color: highlightColor,
              marginTop: 18,
              opacity: interpolate(line2Anim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(line2Anim, [0, 1], [0.8, 1])})`,
              textShadow: `0 0 50px ${highlightColor}44`,
              lineHeight: 1.3,
            }}
          >
            {ctaLine2}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ textAlign: "center", fontSize: 18, color: "#666", letterSpacing: 5, marginBottom: 12, opacity: fadeIn(frame, platformStart, 15) }}>
            SUPPORTED PLATFORMS
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {supportedTools.map((tool, i) => {
              const anim = cardSlideIn(frame, fps, platformStart + staggerDelay(i, 6));
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 18px",
                    borderRadius: 12,
                    border: `1px solid ${tool.color}33`,
                    background: `${tool.color}08`,
                    opacity: anim.opacity,
                    transform: `translateX(${anim.x}px) scale(${anim.scale})`,
                  }}
                >
                  <span style={{ fontSize: 22 }}>{tool.icon}</span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: tool.color }}>{tool.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: 20,
            opacity: contentAnim.opacity,
            transform: `translateY(${contentAnim.y}px) scale(${pulseScale})`,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 32,
              fontWeight: 700,
              color: highlightColor,
              padding: "18px 36px",
              borderRadius: 20,
              border: `2px solid ${highlightColor}44`,
              background: `${highlightColor}08`,
              lineHeight: 1.5,
            }}
          >
            💬 {ctaContent}
          </div>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            fontSize: 40,
            fontWeight: 900,
            color: accentColor,
            opacity: interpolate(sloganAnim, [0, 1], [0, 1]),
            transform: `scale(${interpolate(sloganAnim, [0, 1], [0.8, 1])})`,
            letterSpacing: 4,
            textShadow: `0 0 50px ${accentColor}66`,
          }}
        >
          🤖 {ctaSlogan}
        </div>

        <div
          style={{
            marginTop: 14,
            fontSize: 20,
            color: "#444",
            letterSpacing: 4,
            opacity: fadeIn(frame, sloganStart + 10, 15),
          }}
        >
          #AgencyAgents #AI团队 #Markdown #零成本
        </div>
      </div>
    </SceneBackground>
  );
};
