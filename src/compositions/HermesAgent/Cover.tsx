import React from "react";
import { AbsoluteFill } from "remotion";
import { SceneBackground } from "../../components/SceneBackground";
import type { HermesAgentProps } from "./schema";

export const HermesAgentCover: React.FC<HermesAgentProps> = ({
  coverLabel,
  coverTitle,
  coverSubtitle,
  coverMetrics,
  backgroundColor,
  mutedTextColor,
  accentColor,
  highlightColor,
  panelColor,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor, overflow: "hidden" }}>
      <SceneBackground
        backgroundColor={backgroundColor}
        accentColor={accentColor}
        particles={{ count: 30, color: accentColor }}
        hud={{ color: highlightColor, animation: "static" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "60px 60px",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 72,
              letterSpacing: 20,
              color: accentColor,
              fontWeight: 900,
              textShadow: `0 0 30px ${accentColor}60`,
            }}
          >
            {coverLabel}
          </div>

          <div style={{ fontSize: 100 }}>⚡</div>

          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              fontFamily: "monospace",
              color: highlightColor,
              textShadow: `0 0 30px ${highlightColor}60`,
            }}
          >
            {coverMetrics[0]}
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              textAlign: "center",
              background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 40px ${accentColor}40`,
            }}
          >
            {coverTitle}
          </div>

          <div
            style={{
              fontSize: 42,
              color: highlightColor,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {coverSubtitle}
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              padding: "12px 24px",
              border: `1px solid ${mutedTextColor}40`,
              borderRadius: 12,
              backgroundColor: `${panelColor}`,
            }}
          >
            {coverMetrics.map((metric, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ color: mutedTextColor }}>|</div>}
                <div style={{ color: mutedTextColor, fontSize: 18, fontWeight: 600 }}>{metric}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </SceneBackground>
    </AbsoluteFill>
  );
};
