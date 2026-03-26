import React from "react";
import { AbsoluteFill } from "remotion";
import { ParticleBackground } from "./ParticleBackground";
import { GlowOrb } from "./GlowOrb";
import { HudFrame } from "./HudFrame";

interface GlowOrbConfig {
  x: string;
  y: string;
  color: string;
  radius?: number;
  opacity?: number;
  pulseSpeed?: number;
  pulseAmount?: number;
}

interface ParticleConfig {
  count?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  connectLines?: boolean;
  connectDistance?: number;
  maxSize?: number;
  minSize?: number;
}

interface HudConfig {
  color?: string;
  cornerSize?: number;
  strokeWidth?: number;
  inset?: number;
  animation?: "static" | "pulse" | "scan";
  scanSpeed?: number;
}

interface SceneBackgroundProps {
  backgroundColor?: string;
  accentColor?: string;
  particles?: ParticleConfig | false;
  glow?: { orbs: GlowOrbConfig[] } | false;
  scanlines?: boolean;
  scanlineColor?: string;
  scanlineOpacity?: number;
  hud?: HudConfig | false;
  children?: React.ReactNode;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({
  backgroundColor = "#070810",
  accentColor = "#8b5cf6",
  particles = {},
  glow = false,
  scanlines = true,
  scanlineColor,
  scanlineOpacity = 0.03,
  hud = {},
  children,
}) => {
  const resolvedScanlineColor = scanlineColor || accentColor;

  const defaultGlow: { orbs: GlowOrbConfig[] } = glow || {
    orbs: [
      {
        x: "50%",
        y: "40%",
        color: accentColor,
        radius: 500,
        opacity: 0.12,
        pulseSpeed: 0.6,
        pulseAmount: 0.2,
      },
    ],
  };

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {/* Glow orbs layer */}
      {glow !== false && <GlowOrb orbs={defaultGlow.orbs} />}

      {/* Particles layer */}
      {particles !== false && (
        <ParticleBackground
          color={particles.color || accentColor}
          particleCount={particles.count ?? 25}
          speed={particles.speed ?? 0.4}
          opacity={particles.opacity ?? 0.5}
          connectLines={particles.connectLines ?? false}
          connectDistance={particles.connectDistance}
          maxSize={particles.maxSize ?? 3}
          minSize={particles.minSize ?? 1}
        />
      )}

      {/* Scanlines layer */}
      {scanlines && (
        <AbsoluteFill
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              ${resolvedScanlineColor}${Math.round(scanlineOpacity * 255).toString(16).padStart(2, "0")},
              ${resolvedScanlineColor}${Math.round(scanlineOpacity * 255).toString(16).padStart(2, "0")} 1px,
              transparent 1px,
              transparent 4px
            )`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* HUD frame layer */}
      {hud !== false && (
        <HudFrame
          color={hud.color || accentColor}
          cornerSize={hud.cornerSize}
          strokeWidth={hud.strokeWidth}
          inset={hud.inset}
          animation={hud.animation || "pulse"}
          scanSpeed={hud.scanSpeed}
        />
      )}

      {children}
    </AbsoluteFill>
  );
};

export default SceneBackground;
