import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AgencyAgentsProps } from "../schema";
import { fadeInUp, nodeReveal, pulseGlow, staggerDelay, cardSlideIn } from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const AgentShowcaseScene: React.FC<AgencyAgentsProps> = ({
  backgroundColor,
  textColor,
  accentColor,
  highlightColor,
  agentRoles,
  localPlatforms,
  agentShowcaseQuote,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleAnim = fadeInUp(frame, fps, 0, 60);
  const glow = pulseGlow(frame, fps, 2);
  const rolesStart = Math.round(fps * 1.2);

  const platformStart = Math.round(fps * 6);
  const platformAnim = fadeInUp(frame, fps, platformStart, 40);

  const quoteStart = Math.round(durationInFrames * 0.82);
  const quoteAnim = spring({
    frame: frame - quoteStart,
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
          <div style={{ fontSize: 20, color: highlightColor, letterSpacing: 10, marginBottom: 14, fontWeight: 700 }}>
            AGENT SHOWCASE
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: textColor, textShadow: `0 0 40px ${highlightColor}44` }}>
            147个Agent有多专业？
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            opacity: fadeInUp(frame, fps, 10, 40).opacity,
            transform: `translateY(${fadeInUp(frame, fps, 10, 40).y}px)`,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 24,
              color: "#999",
              padding: "8px 24px",
              borderRadius: 16,
              border: `1px solid ${highlightColor}22`,
              background: `${highlightColor}08`,
            }}
          >
            覆盖12个部门 · 每个都是领域专家
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 28 }}>
          {agentRoles.map((agent, i) => {
            const anim = nodeReveal(frame, fps, i, rolesStart);
            const isActive = frame > rolesStart + i * 18 + 15;

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
                    ? `linear-gradient(135deg, ${agent.color}12, ${agent.color}06)`
                    : "rgba(255,255,255,0.02)",
                  border: `2px solid ${isActive ? `${agent.color}55` : "rgba(255,255,255,0.05)"}`,
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px) scale(${anim.scale})`,
                  boxShadow: isActive ? `0 0 30px ${agent.color}15` : "none",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: isActive
                      ? `linear-gradient(135deg, ${agent.color}44, ${agent.color}22)`
                      : `${agent.color}11`,
                    border: `2px solid ${agent.color}${isActive ? "88" : "33"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    flexShrink: 0,
                    boxShadow: isActive ? `0 0 20px ${agent.color}33` : "none",
                  }}
                >
                  {agent.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 34, fontWeight: 900, color: textColor }}>
                    {agent.role}
                  </div>
                  <div style={{ fontSize: 22, color: "#999", marginTop: 4 }}>
                    {agent.desc}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: agent.color,
                    fontFamily: "monospace",
                    opacity: 0.5 + glow * 0.3,
                  }}
                >
                  .md
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: platformAnim.opacity,
            transform: `translateY(${platformAnim.y}px)`,
            marginBottom: 20,
          }}
        >
          <div style={{ textAlign: "center", fontSize: 18, color: "#666", letterSpacing: 5, marginBottom: 12 }}>
            LOCAL MARKETING AGENTS
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            {localPlatforms.map((platform, i) => {
              const anim = cardSlideIn(frame, fps, platformStart + staggerDelay(i, 10));
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 24px",
                    borderRadius: 14,
                    border: `1px solid ${platform.color}33`,
                    background: `${platform.color}08`,
                    opacity: anim.opacity,
                    transform: `translateX(${anim.x}px) scale(${anim.scale})`,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{platform.icon}</span>
                  <span style={{ fontSize: 24, fontWeight: 700, color: platform.color }}>{platform.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 34,
              fontWeight: 900,
              color: accentColor,
              opacity: interpolate(quoteAnim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(quoteAnim, [0, 1], [0.8, 1])})`,
              textShadow: `0 0 30px ${accentColor}44`,
            }}
          >
            {agentShowcaseQuote}
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
