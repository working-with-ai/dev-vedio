import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ClawSkillsProps } from "../schema";
import { glitchOffset, fadeInUp, pulseGlow } from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const HookScene: React.FC<ClawSkillsProps> = ({
  hookLine1,
  hookLine2,
  backgroundColor,
  textColor,
  accentColor,
  goldColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glitch = glitchOffset(frame, 1.5);
  const glow = pulseGlow(frame, fps, 3);

  const line1Anim = fadeInUp(frame, fps, 0, 80);
  const line2Anim = fadeInUp(frame, fps, Math.round(fps * 1.2), 60);

  const bgFlash = interpolate(
    frame,
    [0, 3, 6, 8],
    [0, 0.25, 0, 0.12],
    { extrapolateRight: "clamp" }
  );

  const lobsterScale = spring({
    frame: frame - Math.round(fps * 0.3),
    fps,
    config: { damping: 8, stiffness: 120 },
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
          inset: 0,
          backgroundColor: accentColor,
          opacity: bgFlash,
          pointerEvents: "none",
        }}
      />

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
          alignItems: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "0 40px",
        }}
      >
      <div
        style={{
          fontSize: 120,
          opacity: interpolate(lobsterScale, [0, 1], [0, 1]),
          transform: `scale(${interpolate(lobsterScale, [0, 1], [0.2, 1])})`,
          marginBottom: 30,
          filter: `drop-shadow(0 0 30px ${accentColor}66)`,
        }}
      >
        🦞
      </div>

      <div
        style={{
          position: "relative",
          transform: `translateY(${line1Anim.y}px) translateX(${glitch.x}px) skewX(${glitch.skew}deg)`,
          opacity: line1Anim.opacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            fontSize: 52,
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
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: textColor,
            textAlign: "center",
            padding: "0 60px",
            lineHeight: 1.4,
            textShadow: `0 0 ${20 + glow * 20}px ${accentColor}88`,
          }}
        >
          {hookLine1}
        </div>
      </div>

      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
          color: goldColor,
          textAlign: "center",
          marginTop: 40,
          padding: "0 80px",
          lineHeight: 1.5,
          opacity: line2Anim.opacity,
          transform: `translateY(${line2Anim.y}px)`,
          textShadow: `0 0 30px ${goldColor}66`,
        }}
      >
        {hookLine2}
      </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 80,
          right: 80,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          opacity: interpolate(frame, [fps * 1.5, fps * 2], [0, 0.8], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </SceneBackground>
  );
};
