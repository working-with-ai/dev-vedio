import React from "react";
import { AbsoluteFill } from "remotion";
import { SceneBackground } from "../../components/SceneBackground";
import type { TradingAgentsProps } from "./schema";

export const TradingAgentsCover: React.FC<TradingAgentsProps> = ({
  coverLabel,
  backgroundColor,
  mutedTextColor,
  accentColor,
  highlightColor,
  goldColor,
  panelColor,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor, overflow: "hidden" }}>
      <SceneBackground
        backgroundColor={backgroundColor}
        accentColor={accentColor}
        glow={{
          orbs: [
            {
              x: "42%",
              y: "32%",
              color: accentColor,
              radius: 560,
              opacity: 0.26,
              pulseSpeed: 0.5,
              pulseAmount: 0.14,
            },
            {
              x: "58%",
              y: "58%",
              color: goldColor,
              radius: 420,
              opacity: 0.18,
              pulseSpeed: 0.55,
              pulseAmount: 0.12,
            },
          ],
        }}
        particles={{ count: 28, color: accentColor }}
        scanlines
        hud={{ color: highlightColor, animation: "static", inset: 80 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "48px 40px",
            gap: 20,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: 72,
              letterSpacing: 16,
              color: accentColor,
              fontWeight: 900,
              textAlign: "center",
              textShadow: `0 0 36px ${accentColor}70, 0 0 72px ${accentColor}35`,
            }}
          >
            {coverLabel}
          </div>

          <div style={{ fontSize: 100, lineHeight: 1 }}>📊⚔️</div>

          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              fontFamily: "monospace",
              color: goldColor,
              textShadow: `0 0 28px ${goldColor}55`,
            }}
          >
            49,000+ Stars
          </div>

          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              fontFamily: "monospace",
              color: accentColor,
              textShadow: `0 0 24px ${accentColor}50`,
            }}
          >
            9 AI Agents
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: "#f8fafc",
                textShadow: `0 0 20px ${accentColor}40`,
              }}
            >
              让 AI 团队先吵一架
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: "#f8fafc",
                textShadow: `0 0 20px ${highlightColor}35`,
              }}
            >
              再给你结论
            </div>
          </div>

          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: highlightColor,
              textAlign: "center",
              maxWidth: "100%",
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            多空辩论 × 全流程风控 × A 股支持
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
              padding: "14px 22px",
              border: `1px solid ${mutedTextColor}55`,
              borderRadius: 14,
              backgroundColor: panelColor,
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            {["UCLA × MIT", "Apache 2.0", "A 股/港股"].map((segment, i) => (
              <React.Fragment key={segment}>
                {i > 0 ? (
                  <div style={{ color: mutedTextColor, fontSize: 22, fontWeight: 700 }}>|</div>
                ) : null}
                <div
                  style={{
                    color: mutedTextColor,
                    fontSize: 22,
                    fontWeight: 700,
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {segment}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </SceneBackground>
    </AbsoluteFill>
  );
};
