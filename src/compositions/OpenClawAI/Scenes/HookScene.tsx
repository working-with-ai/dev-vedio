import React from "react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { OpenClawAIProps } from "../schema";
import { glitchOffset, fadeInUp, typewriterLength, pulseGlow } from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const HookScene: React.FC<OpenClawAIProps> = ({
  hookLine1,
  hookLine2,
  hookStyle,
  backgroundColor,
  textColor,
  accentColor,
  warningColor,
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
    [0, 0.3, 0, 0.15],
    { extrapolateRight: "clamp" }
  );

  const revealLength = hookStyle === "typewriter"
    ? typewriterLength(frame, hookLine1, fps, 5, 24)
    : hookLine1.length;

  const displayLine1 = hookStyle === "typewriter"
    ? hookLine1.slice(0, revealLength)
    : hookLine1;

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
      scanlineColor="#00f0ff"
      hud={{ color: accentColor, animation: "pulse" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: warningColor,
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
      {/* 主标题行1 - 带故障效果 */}
      <div
        style={{
          position: "relative",
          transform: `translateY(${line1Anim.y}px) translateX(${glitch.x}px) skewX(${glitch.skew}deg)`,
          opacity: line1Anim.opacity,
        }}
      >
        {/* 红色偏移层 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            fontSize: 56,
            fontWeight: 900,
            color: warningColor,
            textAlign: "center",
            transform: `translateX(${glitch.x > 0 ? 3 : -3}px)`,
            opacity: Math.abs(glitch.x) > 1 ? 0.7 : 0,
            mixBlendMode: "screen",
          }}
        >
          {displayLine1}
        </div>
        {/* 主文字 */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: textColor,
            textAlign: "center",
            padding: "0 60px",
            lineHeight: 1.4,
            textShadow: `0 0 ${20 + glow * 20}px ${accentColor}88`,
          }}
        >
          {displayLine1}
          {hookStyle === "typewriter" && revealLength < hookLine1.length && (
            <span
              style={{
                opacity: frame % 16 < 8 ? 1 : 0,
                color: accentColor,
              }}
            >
              |
            </span>
          )}
        </div>
      </div>

      {/* 副标题行2 */}
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: accentColor,
          textAlign: "center",
          marginTop: 40,
          padding: "0 80px",
          lineHeight: 1.5,
          opacity: line2Anim.opacity,
          transform: `translateY(${line2Anim.y}px)`,
          textShadow: `0 0 30px ${accentColor}66`,
        }}
      >
        {hookLine2}
      </div>
      </div>

      {/* 底部警示条 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 80,
          right: 80,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${warningColor}, transparent)`,
          opacity: interpolate(frame, [fps * 1.5, fps * 2], [0, 0.8], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </SceneBackground>
  );
};
