import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AgencyAgentsProps } from "../schema";
import { glitchOffset, fadeInUp, pulseGlow, numberCountUp } from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const HookScene: React.FC<AgencyAgentsProps> = ({
  hookLine1,
  hookLine2,
  backgroundColor,
  textColor,
  accentColor,
  highlightColor,
  githubStars,
  agentCount,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glitch = glitchOffset(frame, 1.5);
  const glow = pulseGlow(frame, fps, 3);
  const coverPhase = frame < 3;

  const logoAnim = spring({
    frame,
    fps,
    config: { damping: 6, stiffness: 200 },
  });

  const line2Anim = fadeInUp(frame, fps, Math.round(fps * 1.2), 60);

  const statsStart = Math.round(fps * 1.8);
  const starCount = numberCountUp(frame, fps, githubStars / 1000, 1.8, statsStart);
  const agentCountAnim = numberCountUp(frame, fps, agentCount, 1.8, statsStart + 8);
  const statsAnim = fadeInUp(frame, fps, statsStart, 40);

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
        <div
          style={{
            fontSize: 120,
            opacity: coverPhase ? 1 : interpolate(logoAnim, [0, 1], [0.8, 1]),
            transform: coverPhase
              ? "scale(1)"
              : `scale(${interpolate(logoAnim, [0, 1], [0.9, 1])})`,
            marginBottom: 10,
            filter: `drop-shadow(0 0 50px ${accentColor}aa)`,
          }}
        >
          🤖
        </div>

        <div
          style={{
            fontSize: 24,
            color: accentColor,
            letterSpacing: 14,
            fontWeight: 800,
            opacity: 1,
            marginBottom: 50,
            textShadow: `0 0 30px ${accentColor}88`,
          }}
        >
          AGENCY AGENTS
        </div>

        <div
          style={{
            position: "relative",
            transform: frame > 10
              ? `translateX(${glitch.x}px) skewX(${glitch.skew}deg)`
              : undefined,
            opacity: 1,
          }}
        >
          {frame > 10 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                fontSize: 60,
                fontWeight: 900,
                color: accentColor,
                textAlign: "center",
                transform: `translateX(${glitch.x > 0 ? 3 : -3}px)`,
                opacity: Math.abs(glitch.x) > 1 ? 0.7 : 0,
                mixBlendMode: "screen",
              }}
            >
              {hookLine1}
            </div>
          )}
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: textColor,
              textAlign: "center",
              lineHeight: 1.3,
              textShadow: `0 0 ${20 + glow * 20}px ${accentColor}88`,
            }}
          >
            {hookLine1}
          </div>
        </div>

        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: highlightColor,
            textAlign: "center",
            marginTop: 40,
            lineHeight: 1.4,
            opacity: coverPhase ? 1 : line2Anim.opacity,
            transform: coverPhase ? undefined : `translateY(${line2Anim.y}px)`,
            textShadow: `0 0 30px ${highlightColor}66`,
          }}
        >
          {hookLine2}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 80,
            marginTop: 60,
            opacity: coverPhase ? 1 : statsAnim.opacity,
            transform: coverPhase ? undefined : `translateY(${statsAnim.y}px)`,
          }}
        >
          {[
            { value: coverPhase ? "46.8k" : `${(starCount / 10).toFixed(1)}k`, label: "Stars", icon: "⭐", color: "#fbbf24" },
            { value: coverPhase ? "147" : `${agentCountAnim}`, label: "Agents", icon: "🤖", color: accentColor },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40 }}>{stat.icon}</div>
              <div
                style={{
                  fontSize: 60,
                  fontWeight: 900,
                  color: stat.color,
                  fontFamily: "monospace",
                  textShadow: `0 0 25px ${stat.color}44`,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 22, color: "#666", marginTop: 4, letterSpacing: 3 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 20,
            color: "#555",
            letterSpacing: 4,
            opacity: coverPhase ? 1 : fadeInUp(frame, fps, Math.round(fps * 2.5), 30).opacity,
          }}
        >
          GitHub 46.8k Stars · 还在暴涨
        </div>
      </div>
    </SceneBackground>
  );
};
