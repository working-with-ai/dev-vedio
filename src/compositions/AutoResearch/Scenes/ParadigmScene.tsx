import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneBackground } from "../../../components/SceneBackground";
import { AutoResearchProps } from "../schema";
import { fadeInUp, fadeIn } from "../animations";

export const ParadigmScene: React.FC<AutoResearchProps> = ({
  backgroundColor,
  textColor,
  accentColor,
  highlightColor,
  secondaryColor,
  paradigmTitle,
  paradigmQuote,
  paradigmBefore,
  paradigmAfter,
  programMdPreview,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleAnim = fadeInUp(frame, fps, 0, 60);

  const vsStart = Math.round(fps * 1.2);
  const vsAnim = spring({
    frame: frame - vsStart,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const arrowStart = Math.round(fps * 2.5);
  const arrowAnim = spring({
    frame: frame - arrowStart,
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  const codeStart = Math.round(fps * 3.5);
  const codeAnim = fadeInUp(frame, fps, codeStart, 50);

  const quoteStart = Math.round(fps * 7);
  const quoteAnim = fadeInUp(frame, fps, quoteStart, 40);

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
          <div style={{ fontSize: 20, color: accentColor, letterSpacing: 10, marginBottom: 14, fontWeight: 700 }}>
            PARADIGM SHIFT
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: textColor, textShadow: `0 0 40px ${accentColor}44` }}>
            {paradigmTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 24,
            marginTop: 36,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "24px 30px",
              borderRadius: 18,
              border: "2px solid #666",
              background: "rgba(255,255,255,0.03)",
              opacity: interpolate(vsAnim, [0, 1], [0, 0.6]),
              transform: `scale(${interpolate(vsAnim, [0, 1], [0.5, 1])})`,
            }}
          >
            <div style={{ fontSize: 42 }}>🧑‍🔬</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#888", marginTop: 10 }}>
              {paradigmBefore}
            </div>
            <div style={{ fontSize: 16, color: "#555", marginTop: 6 }}>旧时代</div>
          </div>

          <div
            style={{
              opacity: interpolate(arrowAnim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(arrowAnim, [0, 1], [0.3, 1])})`,
            }}
          >
            <div style={{ fontSize: 40, color: secondaryColor }}>→</div>
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "24px 30px",
              borderRadius: 18,
              border: `2px solid ${accentColor}55`,
              background: `${accentColor}0a`,
              opacity: interpolate(arrowAnim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(arrowAnim, [0, 1], [0.5, 1])})`,
              boxShadow: `0 0 40px ${accentColor}15`,
            }}
          >
            <div style={{ fontSize: 42 }}>🤖</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: accentColor, marginTop: 10 }}>
              {paradigmAfter}
            </div>
            <div style={{ fontSize: 16, color: accentColor, marginTop: 6, opacity: 0.7 }}>新时代</div>
          </div>
        </div>

        <div
          style={{
            opacity: codeAnim.opacity,
            transform: `translateY(${codeAnim.y}px)`,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              borderRadius: 14,
              overflow: "hidden",
              border: `1px solid ${accentColor}22`,
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            <div style={{ height: 30, background: "#1a1a2e", display: "flex", alignItems: "center", padding: "0 12px", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#22c55e" }} />
              <span style={{ fontSize: 11, color: "#555", marginLeft: 6 }}>program.md</span>
            </div>
            <div style={{ background: "#0d0d1a", padding: "10px 14px" }}>
              {programMdPreview.map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 14,
                    fontFamily: "monospace",
                    lineHeight: 1.7,
                    color: line.startsWith("#")
                      ? accentColor
                      : line.startsWith("  ")
                        ? "#bbb"
                        : "#666",
                    opacity: fadeIn(frame, codeStart + Math.round(i * 3), 8),
                  }}
                >
                  {line || "\u00A0"}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            opacity: quoteAnim.opacity,
            transform: `translateY(${quoteAnim.y}px)`,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 28,
              fontWeight: 700,
              color: secondaryColor,
              padding: "14px 28px",
              borderRadius: 16,
              border: `2px solid ${secondaryColor}33`,
              background: `${secondaryColor}08`,
              fontStyle: "italic",
            }}
          >
            "{paradigmQuote}" — Karpathy
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 34,
              fontWeight: 900,
              color: accentColor,
              opacity: interpolate(sloganAnim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(sloganAnim, [0, 1], [0.8, 1])})`,
              textShadow: `0 0 30px ${accentColor}44`,
              letterSpacing: 2,
            }}
          >
            你只需写好指令 · AI运行一整夜
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
