import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneBackground } from "../../../components/SceneBackground";
import { AutoResearchProps } from "../schema";
import { fadeInUp, fadeIn, nodeReveal } from "../animations";

export const SmartScene: React.FC<AutoResearchProps> = ({
  backgroundColor,
  textColor,
  accentColor,
  highlightColor,
  smartTitle,
  experimentLoop,
  benchmark,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleAnim = fadeInUp(frame, fps, 0, 60);

  const loopStart = Math.round(fps * 1.2);

  const benchStart = Math.round(fps * 5);
  const benchAnim = fadeInUp(frame, fps, benchStart, 50);

  const vsStart = Math.round(fps * 6.5);
  const vsAnim = spring({
    frame: frame - vsStart,
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
          justifyContent: "center",
          padding: "0 40px",
          fontFamily: "system-ui, -apple-system, sans-serif",
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
          <div style={{ fontSize: 20, color: highlightColor, letterSpacing: 10, marginBottom: 14, fontWeight: 700 }}>
            AI INTELLIGENCE
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: textColor, textShadow: `0 0 40px ${highlightColor}44` }}>
            {smartTitle}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            opacity: fadeInUp(frame, fps, 10, 40).opacity,
            transform: `translateY(${fadeInUp(frame, fps, 10, 40).y}px)`,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 24,
              color: "#999",
              padding: "8px 24px",
              borderRadius: 16,
              border: `1px solid ${highlightColor}22`,
              background: `${highlightColor}08`,
            }}
          >
            不是瞎撞 · 是逻辑推演
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
          {experimentLoop.map((step, i) => {
            const anim = nodeReveal(frame, fps, i, loopStart);
            const isLast = i === experimentLoop.length - 1;

            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    padding: "18px 20px",
                    borderRadius: 16,
                    background: `${step.color}0c`,
                    border: `2px solid ${step.color}33`,
                    opacity: anim.opacity,
                    transform: `translateY(${anim.y}px) scale(${anim.scale})`,
                    minWidth: 120,
                  }}
                >
                  <div style={{ fontSize: 36 }}>{step.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: step.color, textAlign: "center" }}>
                    {step.step}
                  </div>
                </div>
                {!isLast && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 24,
                      color: "#555",
                      opacity: fadeIn(frame, loopStart + i * 18 + 10, 10),
                    }}
                  >
                    →
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div
          style={{
            opacity: benchAnim.opacity,
            transform: `translateY(${benchAnim.y}px)`,
            marginBottom: 24,
          }}
        >
          <div style={{ textAlign: "center", fontSize: 18, color: "#666", letterSpacing: 5, marginBottom: 14 }}>
            BENCHMARK RESULT
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "20px 30px",
                borderRadius: 18,
                border: `2px solid ${accentColor}44`,
                background: `${accentColor}0a`,
              }}
            >
              <div style={{ fontSize: 18, color: "#888", marginBottom: 8 }}>AI跑出的</div>
              <div style={{ fontSize: 56, fontWeight: 900, color: accentColor, fontFamily: "monospace" }}>
                {benchmark.smallModel}
              </div>
              <div style={{ fontSize: 16, color: "#666", marginTop: 4 }}>小模型</div>
            </div>

            <div
              style={{
                opacity: interpolate(vsAnim, [0, 1], [0, 1]),
                transform: `scale(${interpolate(vsAnim, [0, 1], [0.5, 1])})`,
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 900, color: "#ef4444", textShadow: "0 0 20px #ef444444" }}>
                {">"}&nbsp;
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "20px 30px",
                borderRadius: 18,
                border: `2px solid #666`,
                background: "rgba(255,255,255,0.02)",
                opacity: 0.7,
              }}
            >
              <div style={{ fontSize: 18, color: "#888", marginBottom: 8 }}>人类微调</div>
              <div style={{ fontSize: 56, fontWeight: 900, color: "#999", fontFamily: "monospace" }}>
                {benchmark.largeModel}
              </div>
              <div style={{ fontSize: 16, color: "#666", marginTop: 4 }}>大模型</div>
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: 14,
            opacity: fadeIn(frame, benchStart + Math.round(fps * 1.5), 15),
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 26,
              fontWeight: 700,
              color: accentColor,
              padding: "10px 24px",
              borderRadius: 14,
              border: `1px solid ${accentColor}33`,
              background: `${accentColor}08`,
            }}
          >
            {benchmark.result}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 34,
              fontWeight: 900,
              color: highlightColor,
              opacity: interpolate(sloganAnim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(sloganAnim, [0, 1], [0.8, 1])})`,
              textShadow: `0 0 30px ${highlightColor}44`,
            }}
          >
            一夜之间 · 小模型碾压大模型
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
