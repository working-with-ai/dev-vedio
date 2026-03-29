import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ClawSkillsProps } from "../schema";
import { fadeInUp, fadeIn, numberCountUp } from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const CTAScene: React.FC<ClawSkillsProps> = ({
  backgroundColor,
  textColor,
  accentColor,
  highlightColor,
  goldColor,
  ctaTitle,
  ctaContent,
  ctaSlogan,
  categories,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleReveal = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const contentAnim = fadeInUp(frame, fps, Math.round(fps * 1.2), 50);
  const interactionStart = Math.round(durationInFrames * 0.4);
  const interactionAnim = fadeInUp(frame, fps, interactionStart, 40);

  const sloganStart = Math.round(durationInFrames * 0.7);
  const sloganAnim = spring({
    frame: frame - sloganStart,
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  const pulseScale = 1 + Math.sin(frame / fps * Math.PI * 3) * 0.02;
  const totalSkills = numberCountUp(frame, fps, 20, 1.5, 5);

  const starCount = 5;
  const starDelay = Math.round(fps * 0.8);

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
          inset: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >

      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: accentColor,
            fontFamily: "monospace",
            opacity: interpolate(titleReveal, [0, 1], [0, 1]),
            transform: `scale(${interpolate(titleReveal, [0, 1], [0.3, 1])})`,
            textShadow: `0 0 40px ${accentColor}66`,
          }}
        >
          {totalSkills}
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#888",
            marginTop: 8,
            opacity: interpolate(titleReveal, [0, 1], [0, 1]),
          }}
        >
          GOD-TIER SKILLS
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 320,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
          {Array.from({ length: starCount }).map((_, i) => {
            const starAnim = spring({
              frame: frame - starDelay - i * 4,
              fps,
              config: { damping: 10, stiffness: 150 },
            });
            return (
              <span
                key={i}
                style={{
                  fontSize: 36,
                  opacity: interpolate(starAnim, [0, 1], [0, 1]),
                  transform: `scale(${interpolate(starAnim, [0, 1], [0.2, 1])}) rotate(${interpolate(starAnim, [0, 1], [-30, 0])}deg)`,
                  filter: `drop-shadow(0 0 8px ${goldColor}88)`,
                }}
              >
                ⭐
              </span>
            );
          })}
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: goldColor,
            opacity: contentAnim.opacity,
            transform: `translateY(${contentAnim.y}px)`,
            padding: "0 60px",
            lineHeight: 1.5,
          }}
        >
          {ctaTitle}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 510,
          left: 50,
          right: 50,
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
          opacity: fadeIn(frame, Math.round(fps * 2), 20),
        }}
      >
        {categories.map((cat, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 20,
              border: `1px solid ${cat.color}44`,
              background: `${cat.color}0a`,
              fontSize: 16,
              color: cat.color,
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.skills.length}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 320,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 50px",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: highlightColor,
            opacity: interactionAnim.opacity,
            transform: `translateY(${interactionAnim.y}px) scale(${pulseScale})`,
            padding: "20px 32px",
            borderRadius: 20,
            border: `2px solid ${highlightColor}55`,
            background: `${highlightColor}08`,
            lineHeight: 1.6,
          }}
        >
          💬 {ctaContent}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: accentColor,
            opacity: interpolate(sloganAnim, [0, 1], [0, 1]),
            transform: `scale(${interpolate(sloganAnim, [0, 1], [0.8, 1])})`,
            letterSpacing: 4,
            textShadow: `0 0 40px ${accentColor}66`,
          }}
        >
          🦞 {ctaSlogan}
        </div>
      </div>
      </div>
    </SceneBackground>
  );
};
