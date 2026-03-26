import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface GlowOrbConfig {
  x: string;
  y: string;
  color: string;
  radius?: number;
  opacity?: number;
  pulseSpeed?: number;
  pulseAmount?: number;
}

interface GlowOrbProps {
  orbs: GlowOrbConfig[];
}

const SingleOrb: React.FC<{ config: GlowOrbConfig }> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    x,
    y,
    color,
    radius = 400,
    opacity = 0.2,
    pulseSpeed = 0.8,
    pulseAmount = 0.15,
  } = config;

  const fadeIn = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 50 },
  });

  const time = frame / fps;
  const pulse = 1 + Math.sin(time * pulseSpeed * Math.PI * 2) * pulseAmount;
  const currentRadius = radius * pulse;
  const currentOpacity = interpolate(fadeIn, [0, 1], [0, opacity]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: currentRadius * 2,
        height: currentRadius * 2,
        marginLeft: -currentRadius,
        marginTop: -currentRadius,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: currentOpacity,
        pointerEvents: "none",
      }}
    />
  );
};

export const GlowOrb: React.FC<GlowOrbProps> = ({ orbs }) => {
  return (
    <>
      {orbs.map((orb, i) => (
        <SingleOrb key={i} config={orb} />
      ))}
    </>
  );
};

export default GlowOrb;
