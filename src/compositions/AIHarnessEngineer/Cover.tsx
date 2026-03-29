import React from "react";
import { AbsoluteFill } from "remotion";
import { SceneBackground } from "../../components/SceneBackground";
import { AIHarnessEngineerProps } from "./schema";

export const AIHarnessEngineerCover: React.FC<AIHarnessEngineerProps> = ({
  coverLabel,
  coverTitle,
  coverSubtitle,
  sceneCards,
  backgroundColor,
  textColor,
  mutedTextColor,
  accentColor,
  highlightColor,
  successColor,
  warningColor,
  panelColor,
}) => {
  const focusChips = sceneCards.flatMap((card) => card.chips).slice(0, 4);

  return (
    <SceneBackground
      backgroundColor={backgroundColor}
      accentColor={accentColor}
      particles={{
        count: 26,
        speed: 0.28,
        color: highlightColor,
        opacity: 0.25,
        connectLines: false,
      }}
      glow={{
        orbs: [
          {
            x: "30%",
            y: "22%",
            color: accentColor,
            radius: 340,
            opacity: 0.18,
            pulseSpeed: 0.5,
            pulseAmount: 0.15,
          },
          {
            x: "74%",
            y: "64%",
            color: highlightColor,
            radius: 260,
            opacity: 0.14,
            pulseSpeed: 0.55,
            pulseAmount: 0.14,
          },
        ],
      }}
      hud={{ color: accentColor, animation: "static" }}
    >
      <AbsoluteFill
        style={{
          fontFamily: "\"PingFang SC\", \"SF Pro Display\", system-ui, sans-serif",
          color: textColor,
          padding: "54px 44px 42px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 14,
            color: accentColor,
            fontWeight: 800,
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          {coverLabel}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 26,
          }}
        >
          <div
            style={{
              width: 170,
              height: 170,
              borderRadius: 32,
              border: `1px solid ${accentColor}44`,
              background: `linear-gradient(180deg, rgba(0,229,255,0.14), rgba(77,124,255,0.12))`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 16px 40px rgba(0,0,0,0.3)`,
            }}
          >
            <div
              style={{
                fontSize: 58,
                fontWeight: 900,
                color: "#fbbf24",
                lineHeight: 1,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              2026
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 22,
                fontWeight: 700,
                color: mutedTextColor,
              }}
            >
              AGENTS
            </div>
          </div>

          <div style={{ flex: 1, marginLeft: 28 }}>
            <div
              style={{
                fontSize: 68,
                lineHeight: 1.05,
                fontWeight: 900,
                textShadow: `0 0 28px ${accentColor}33`,
                marginBottom: 14,
              }}
            >
              {coverTitle}
            </div>
            <div
              style={{
                fontSize: 42,
                lineHeight: 1.25,
                color: highlightColor,
                fontWeight: 800,
              }}
            >
              {coverSubtitle}
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: 28,
            border: `1px solid ${accentColor}33`,
            background: panelColor,
            padding: "28px 30px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.28)",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 16,
            }}
          >
            {[
              { label: "系统重心", value: "Runtime" },
              { label: "核心能力", value: "Evals" },
              { label: "关键边界", value: "Controls" },
              { label: "最终目标", value: "Reliable AI" },
            ].map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                style={{
                  padding: "18px 20px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${index % 2 === 0 ? accentColor : highlightColor}33`,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    color: mutedTextColor,
                    letterSpacing: 2,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {item.label.toUpperCase()}
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: index < 2 ? textColor : index === 2 ? warningColor : successColor,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
          }}
        >
          {focusChips.map((chip, index) => (
            <div
              key={`${chip}-${index}`}
              style={{
                padding: "12px 18px",
                borderRadius: 999,
                border: `1px solid ${highlightColor}44`,
                background: "rgba(255,255,255,0.04)",
                fontSize: 18,
                fontWeight: 800,
                color: highlightColor,
                letterSpacing: 1,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </SceneBackground>
  );
};

export default AIHarnessEngineerCover;
