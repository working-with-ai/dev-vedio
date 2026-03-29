import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneBackground } from "../../../components/SceneBackground";
import { AutoResearchProps } from "../schema";
import { fadeInUp, fadeIn, pulseGlow, staggerDelay } from "../animations";

export const PainScene: React.FC<AutoResearchProps> = ({
  backgroundColor,
  textColor,
  warningColor,
  accentColor,
  painTitle,
  painPoints,
  painQuote,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const glow = pulseGlow(frame, fps, 2);
  const titleAnim = fadeInUp(frame, fps, 0, 60);

  const terminalStart = Math.round(fps * 0.8);
  const terminalOpacity = fadeIn(frame, terminalStart, 15);

  const fakeLog = [
    "$ python train.py --lr 0.001 --epochs 50",
    "> Training... epoch 1/50  loss=2.341",
    "> Training... epoch 50/50 loss=1.892",
    "$ # 改参数，重新跑...",
    "$ python train.py --lr 0.0005 --epochs 100",
    "> Training... (又等半天)",
    "",
    "> ⚠️ 效果没变好，浪费3小时",
    "> 😴 凌晨3点还在盯Loss曲线",
  ];

  const codeLines = Math.min(
    fakeLog.length,
    Math.floor(((frame - terminalStart) / fps) * 5)
  );

  const pointsStart = Math.round(fps * 4);
  const pointsAnim = fadeInUp(frame, fps, pointsStart, 40);

  const quoteStart = Math.round(durationInFrames * 0.78);
  const quoteAnim = fadeInUp(frame, fps, quoteStart, 50);

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
            marginBottom: 28,
          }}
        >
          <div style={{ fontSize: 20, color: warningColor, letterSpacing: 10, marginBottom: 14, fontWeight: 700 }}>
            THE PROBLEM
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: textColor, lineHeight: 1.3 }}>
            {painTitle}
          </div>
        </div>

        <div style={{ opacity: terminalOpacity, marginBottom: 22 }}>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: `1px solid ${warningColor}22`,
              boxShadow: `0 0 30px ${warningColor}0a`,
            }}
          >
            <div
              style={{
                height: 34,
                background: "#1a1a2e",
                display: "flex",
                alignItems: "center",
                padding: "0 14px",
                gap: 8,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#22c55e" }} />
              <span style={{ fontSize: 12, color: "#555", marginLeft: 8 }}>train.log</span>
            </div>
            <div style={{ background: "#0d0d1a", padding: "12px 16px", minHeight: 160 }}>
              {fakeLog.slice(0, codeLines).map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 16,
                    fontFamily: "monospace",
                    lineHeight: 1.8,
                    color: line.includes("⚠️") || line.includes("😴")
                      ? warningColor
                      : line.startsWith("$")
                        ? accentColor
                        : line.startsWith(">")
                          ? "#f59e0b"
                          : "#888",
                    opacity: fadeIn(frame, terminalStart + Math.round(i * (fps / 5)), 8),
                  }}
                >
                  {line || "\u00A0"}
                </div>
              ))}
              <div style={{ width: 8, height: 16, backgroundColor: accentColor, opacity: glow > 0.5 ? 1 : 0, marginTop: 2 }} />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 20,
            opacity: pointsAnim.opacity,
            transform: `translateY(${pointsAnim.y}px)`,
          }}
        >
          {painPoints.map((point, i) => {
            const lineAnim = fadeIn(frame, pointsStart + staggerDelay(i, 10), 12);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "10px 16px",
                  borderRadius: 12,
                  background: `${warningColor}08`,
                  border: `1px solid ${warningColor}15`,
                  opacity: lineAnim,
                }}
              >
                <div style={{ fontSize: 24, flexShrink: 0, color: warningColor }}>✗</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: "#ddd" }}>{point}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            textAlign: "center",
            opacity: quoteAnim.opacity,
            transform: `translateY(${quoteAnim.y}px)`,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 38,
              fontWeight: 900,
              color: warningColor,
              padding: "14px 40px",
              borderRadius: 16,
              border: `2px solid ${warningColor}44`,
              background: `${warningColor}0a`,
              textShadow: `0 0 30px ${warningColor}44`,
            }}
          >
            {painQuote}
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
