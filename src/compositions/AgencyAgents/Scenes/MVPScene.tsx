import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AgencyAgentsProps } from "../schema";
import { fadeInUp, fadeIn, pipelineGrow, pulseGlow } from "../animations";

export const MVPScene: React.FC<AgencyAgentsProps> = ({
  backgroundColor,
  textColor,
  accentColor,
  highlightColor,
  mvpTitle,
  mvpSubtitle,
  mvpSteps,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleAnim = fadeInUp(frame, fps, 0, 60);
  const subtitleAnim = fadeInUp(frame, fps, 10, 40);
  const glow = pulseGlow(frame, fps, 2);

  const pipelineStart = Math.round(fps * 1.5);

  const costStart = Math.round(durationInFrames * 0.65);
  const costAnim = spring({
    frame: frame - costStart,
    fps,
    config: { damping: 8, stiffness: 120 },
  });

  const sloganStart = Math.round(durationInFrames * 0.82);
  const sloganAnim = spring({
    frame: frame - sloganStart,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${accentColor}0c 0%, transparent 50%)` }} />

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
            MVP PIPELINE
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: textColor, textShadow: `0 0 40px ${accentColor}44` }}>
            {mvpTitle}
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
            实战闭环 · 想法到产品
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {mvpSteps.map((step, i) => {
            const anim = pipelineGrow(frame, fps, i, pipelineStart);
            const isActive = frame > pipelineStart + i * 25 + 20;
            const pulseActive = isActive ? 1 + Math.sin(frame / fps * Math.PI * 3) * 0.01 : 1;

            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    width: 920,
                    padding: "22px 24px",
                    borderRadius: 18,
                    background: isActive
                      ? `linear-gradient(135deg, ${step.color}14, ${step.color}06)`
                      : "rgba(255,255,255,0.02)",
                    border: `2px solid ${isActive ? `${step.color}55` : "rgba(255,255,255,0.05)"}`,
                    opacity: anim.opacity,
                    transform: `translateX(${anim.x}px) scale(${anim.scale * pulseActive})`,
                    boxShadow: isActive ? `0 0 30px ${step.color}15` : "none",
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
                    <div style={{ fontSize: 32, fontWeight: 900, color: textColor }}>
                      {step.name}
                    </div>
                    <div style={{ fontSize: 22, color: "#bbb", marginTop: 4 }}>
                      {step.output}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 900,
                      color: step.color,
                      fontFamily: "monospace",
                      opacity: 0.5 + glow * 0.3,
                      letterSpacing: 2,
                    }}
                  >
                    STEP {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {i < mvpSteps.length - 1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 28,
                      opacity: fadeIn(frame, pipelineStart + i * 25 + 15, 10),
                    }}
                  >
                    <div
                      style={{
                        width: 3,
                        height: 16,
                        background: `linear-gradient(180deg, ${step.color}66, ${mvpSteps[i + 1].color}66)`,
                        borderRadius: 2,
                      }}
                    />
                    <div
                      style={{
                        fontSize: 18,
                        color: "#555",
                        marginLeft: 10,
                      }}
                    >
                      ▼
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 36,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 72,
              fontWeight: 900,
              color: accentColor,
              fontFamily: "monospace",
              opacity: interpolate(costAnim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(costAnim, [0, 1], [0.3, 1])})`,
              textShadow: `0 0 60px ${accentColor}66`,
              letterSpacing: 4,
            }}
          >
            {mvpSubtitle}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: highlightColor,
              opacity: interpolate(sloganAnim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(sloganAnim, [0, 1], [0.8, 1])})`,
              textShadow: `0 0 30px ${highlightColor}44`,
            }}
          >
            独立开发者和小团队的终极提效神器
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
