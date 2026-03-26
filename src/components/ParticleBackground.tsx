import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  phase: number;
  opacity: number;
}

interface ParticleBackgroundProps {
  color?: string;
  particleCount?: number;
  speed?: number;
  maxSize?: number;
  minSize?: number;
  opacity?: number;
  connectLines?: boolean;
  connectDistance?: number;
  connectOpacity?: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  color = "#8b5cf6",
  particleCount = 30,
  speed = 0.5,
  maxSize = 4,
  minSize = 1,
  opacity = 0.6,
  connectLines = false,
  connectDistance = 150,
  connectOpacity = 0.15,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: seededRandom(i * 7 + 1) * width,
      y: seededRandom(i * 13 + 3) * height,
      size: minSize + seededRandom(i * 19 + 5) * (maxSize - minSize),
      speedX: (seededRandom(i * 31 + 7) - 0.5) * 2,
      speedY: (seededRandom(i * 37 + 11) - 0.5) * 2,
      phase: seededRandom(i * 43 + 13) * Math.PI * 2,
      opacity: 0.3 + seededRandom(i * 53 + 17) * 0.7,
    }));
  }, [particleCount, width, height, maxSize, minSize]);

  const time = frame / fps;

  const currentPositions = particles.map((p) => {
    const drift = time * speed * 30;
    const wobbleX = Math.sin(time * 0.8 + p.phase) * 20;
    const wobbleY = Math.cos(time * 0.6 + p.phase * 1.3) * 20;
    const x = ((p.x + p.speedX * drift + wobbleX) % (width + 40)) - 20;
    const y = ((p.y + p.speedY * drift + wobbleY) % (height + 40)) - 20;
    return { ...p, cx: x < -20 ? x + width + 40 : x, cy: y < -20 ? y + height + 40 : y };
  });

  const fadeInOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const breathe = 0.7 + 0.3 * Math.sin(time * 1.2);

  return (
    <AbsoluteFill style={{ opacity: fadeInOpacity * opacity, pointerEvents: "none" }}>
      <svg width={width} height={height} style={{ position: "absolute", top: 0, left: 0 }}>
        {connectLines &&
          currentPositions.map((a, i) =>
            currentPositions.slice(i + 1).map((b) => {
              const dx = a.cx - b.cx;
              const dy = a.cy - b.cy;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist > connectDistance) return null;
              const lineOpacity = (1 - dist / connectDistance) * connectOpacity;
              return (
                <line
                  key={`${a.id}-${b.id}`}
                  x1={a.cx}
                  y1={a.cy}
                  x2={b.cx}
                  y2={b.cy}
                  stroke={color}
                  strokeWidth={1}
                  opacity={lineOpacity * breathe}
                />
              );
            })
          )}
        {currentPositions.map((p) => (
          <circle
            key={p.id}
            cx={p.cx}
            cy={p.cy}
            r={p.size}
            fill={color}
            opacity={p.opacity * breathe}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

export default ParticleBackground;
