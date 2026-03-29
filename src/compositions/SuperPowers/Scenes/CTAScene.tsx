import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SuperPowersProps } from "../schema";
import { fadeInUp, fadeIn, numberCountUp } from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const CTAScene: React.FC<SuperPowersProps> = ({
  backgroundColor,
  accentColor,
  highlightColor,
  ctaLine1,
  ctaLine2,
  ctaContent,
  ctaSlogan,
  githubStars,
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

  const contentStart = Math.round(durationInFrames * 0.4);
  const contentAnim = fadeInUp(frame, fps, contentStart, 50);

  const sloganStart = Math.round(durationInFrames * 0.7);
  const sloganAnim = spring({
    frame: frame - sloganStart,
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  const starCount = numberCountUp(frame, fps, githubStars / 1000, 1.5, 5);
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
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 900,
              color: accentColor,
              fontFamily: "monospace",
              opacity: interpolate(line1Anim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(line1Anim, [0, 1], [0.3, 1])})`,
              textShadow: `0 0 60px ${accentColor}66`,
            }}
          >
            {starCount}k+
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#666",
              marginTop: 8,
              letterSpacing: 6,
              opacity: interpolate(line1Anim, [0, 1], [0, 1]),
            }}
          >
            GITHUB STARS & COUNTING
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              fontSize: 48,
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
              fontSize: 54,
              fontWeight: 900,
              color: highlightColor,
              marginTop: 24,
              opacity: interpolate(line2Anim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(line2Anim, [0, 1], [0.8, 1])})`,
              textShadow: `0 0 50px ${highlightColor}44`,
              lineHeight: 1.3,
            }}
          >
            {ctaLine2}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
            opacity: contentAnim.opacity,
            transform: `translateY(${contentAnim.y}px) scale(${pulseScale})`,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 36,
              fontWeight: 700,
              color: highlightColor,
              padding: "22px 40px",
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
            fontSize: 44,
            fontWeight: 900,
            color: accentColor,
            opacity: interpolate(sloganAnim, [0, 1], [0, 1]),
            transform: `scale(${interpolate(sloganAnim, [0, 1], [0.8, 1])})`,
            letterSpacing: 4,
            textShadow: `0 0 50px ${accentColor}66`,
          }}
        >
          ⚡ {ctaSlogan}
        </div>

        <div
          style={{
            marginTop: 16,
            fontSize: 22,
            color: "#444",
            letterSpacing: 4,
            opacity: fadeIn(frame, sloganStart + 10, 15),
          }}
        >
          #AI编程 #Cursor #SuperPowers
        </div>
      </div>
    </SceneBackground>
  );
};
