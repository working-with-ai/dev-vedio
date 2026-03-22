import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AutoResearchProps } from "../schema";
import { fadeInUp, fadeIn, pulseGlow, nodeReveal } from "../animations";

export const CoreScene: React.FC<AutoResearchProps> = ({
  backgroundColor,
  textColor,
  accentColor,
  highlightColor,
  coreTitle,
  coreSubtitle,
  loopSteps,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleAnim = fadeInUp(frame, fps, 0, 60);
  const subtitleAnim = fadeInUp(frame, fps, 10, 40);
  const glow = pulseGlow(frame, fps, 2);

  const loopStart = Math.round(fps * 1.5);

  const arrowStart = Math.round(fps * 4);
  const arrowAnim = fadeInUp(frame, fps, arrowStart, 30);

  const sloganStart = Math.round(durationInFrames * 0.78);
  const sloganAnim = spring({
    frame: frame - sloganStart,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const activeStep = Math.floor(((frame - loopStart) / fps) * 0.8) % loopSteps.length;

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 40% 40%, ${accentColor}0c 0%, transparent 50%)` }} />

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
          <div style={{ fontSize: 20, color: accentColor, letterSpacing: 10, marginBottom: 14, fontWeight: 700 }}>
            CORE MECHANISM
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: textColor, textShadow: `0 0 40px ${accentColor}44` }}>
            {coreTitle}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            opacity: subtitleAnim.opacity,
            transform: `translateY(${subtitleAnim.y}px)`,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 26,
              color: "#999",
              padding: "10px 30px",
              borderRadius: 20,
              border: `1px solid ${accentColor}22`,
              background: `${accentColor}08`,
            }}
          >
            {coreSubtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 30,
            position: "relative",
          }}
        >
          {loopSteps.map((step, i) => {
            const anim = nodeReveal(frame, fps, i, loopStart);
            const isActive = frame > loopStart + 30 && activeStep === i;

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
                    ? `linear-gradient(135deg, ${step.color}18, ${step.color}08)`
                    : `${step.color}06`,
                  border: `2px solid ${isActive ? `${step.color}66` : `${step.color}22`}`,
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px) scale(${anim.scale})`,
                  boxShadow: isActive ? `0 0 40px ${step.color}22` : "none",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: isActive
                      ? `linear-gradient(135deg, ${step.color}44, ${step.color}22)`
                      : `${step.color}11`,
                    border: `2px solid ${step.color}${isActive ? "88" : "33"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    flexShrink: 0,
                    boxShadow: isActive ? `0 0 20px ${step.color}33` : "none",
                  }}
                >
                  {step.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 34, fontWeight: 900, color: textColor }}>
                    {step.name}
                  </div>
                  <div style={{ fontSize: 22, color: "#999", marginTop: 4 }}>
                    {step.desc}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 900,
                    color: step.color,
                    fontFamily: "monospace",
                    opacity: isActive ? 1 : 0.4,
                  }}
                >
                  {isActive ? "▶" : String(i + 1).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            textAlign: "center",
            opacity: arrowAnim.opacity,
            transform: `translateY(${arrowAnim.y}px)`,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 24,
              color: highlightColor,
              padding: "10px 30px",
              borderRadius: 16,
              border: `1px solid ${highlightColor}33`,
              background: `${highlightColor}08`,
              fontFamily: "monospace",
              letterSpacing: 2,
            }}
          >
            写代码 → 跑训练 → 看结果 → 改代码 → 循环
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 36,
              fontWeight: 900,
              color: accentColor,
              opacity: interpolate(sloganAnim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(sloganAnim, [0, 1], [0.8, 1])})`,
              textShadow: `0 0 30px ${accentColor}44`,
              letterSpacing: 2,
            }}
          >
            你去蒸桑拿 · AI帮你跑实验
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
