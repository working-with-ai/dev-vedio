import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PencilDevProps } from "../schema";
import {
  fadeIn,
  fadeInUp,
  pulseGlow,
  progressBar,
  slideFromLeft,
  slideFromRight,
  staggerDelay,
} from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const PainScene: React.FC<PencilDevProps> = ({
  painTopTag,
  painWindows,
  painSwitchLabel,
  painQuote,
  backgroundColor,
  textColor,
  mutedTextColor,
  accentColor,
  dangerColor,
  warningColor,
  panelColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const tagAnim = fadeInUp(frame, fps, 0, 40);
  const glow = pulseGlow(frame, fps, 2.5);

  const cycleLen = Math.round(fps * 1.05);
  const activeIndex =
    painWindows.length > 0
      ? Math.floor(frame / cycleLen) % painWindows.length
      : 0;

  const barDelay = Math.round(fps * 0.4);
  const barPct = progressBar(frame, fps, 4.2, barDelay);
  const barPulse = interpolate(glow, [0, 1], [0.92, 1]);

  const quoteStart = Math.round(durationInFrames * 0.72);
  const quoteAnim = fadeInUp(frame, fps, quoteStart, 44);

  return (
    <SceneBackground
      backgroundColor={backgroundColor}
      accentColor={accentColor}
      particles={{ count: 24, speed: 0.36, color: warningColor, opacity: 0.32 }}
      glow={{
        orbs: [
          {
            x: "50%",
            y: "44%",
            color: warningColor,
            radius: 460,
            opacity: 0.1,
            pulseSpeed: 0.68,
            pulseAmount: 0.2,
          },
        ],
      }}
      hud={{ color: warningColor, animation: "pulse" }}
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
          padding: "0 36px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 18,
            opacity: tagAnim.opacity,
            transform: `translateY(${tagAnim.y}px)`,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: warningColor,
              letterSpacing: 10,
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            {painTopTag}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            height: 320,
            marginBottom: 22,
          }}
        >
          {painWindows.map((win, i) => {
            const isActive = i === activeIndex;
            const baseDelay = Math.round(fps * 0.25) + staggerDelay(i, 6);
            const fromLeft = i % 2 === 0;
            const slide = fromLeft
              ? slideFromLeft(frame, fps, baseDelay, 720)
              : slideFromRight(frame, fps, baseDelay, 720);
            const z = isActive ? 4 : 1;
            const scale = isActive ? 1 : 0.92;
            const opacity = fadeIn(frame, baseDelay, 10) * (isActive ? 1 : 0.42);

            return (
              <div
                key={win.title}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "min(92%, 920px)",
                  marginLeft: "min(-46%, -460px)",
                  transform: `translate(${slide}px, -50%) scale(${scale})`,
                  opacity,
                  zIndex: z,
                  transition: "none",
                }}
              >
                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    border: `2px solid ${isActive ? warningColor : `${mutedTextColor}44`}`,
                    background: panelColor,
                    boxShadow: isActive
                      ? `0 0 40px ${warningColor}44, 0 12px 40px rgba(0,0,0,0.45)`
                      : "0 8px 24px rgba(0,0,0,0.35)",
                  }}
                >
                  <div
                    style={{
                      height: 34,
                      display: "flex",
                      alignItems: "center",
                      padding: "0 14px",
                      gap: 8,
                      background: "rgba(0,0,0,0.4)",
                      borderBottom: `1px solid ${isActive ? `${warningColor}44` : `${mutedTextColor}22`}`,
                    }}
                  >
                    <div
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: isActive ? dangerColor : mutedTextColor,
                      }}
                    />
                    <div
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: isActive ? warningColor : mutedTextColor,
                      }}
                    />
                    <div
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: isActive ? accentColor : mutedTextColor,
                      }}
                    />
                    <span
                      style={{
                        marginLeft: 8,
                        fontSize: 15,
                        fontWeight: 800,
                        color: isActive ? textColor : mutedTextColor,
                        letterSpacing: 1,
                      }}
                    >
                      {win.title}
                    </span>
                  </div>
                  <div style={{ padding: "16px 18px" }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: textColor, marginBottom: 8 }}>
                      {win.detail}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        color: mutedTextColor,
                        fontFamily: "monospace",
                        letterSpacing: 1,
                      }}
                    >
                      {isActive ? "⟳ 上下文切换中…" : "···"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginBottom: 20,
            padding: "14px 18px",
            borderRadius: 14,
            background: `${dangerColor}0c`,
            border: `1px solid ${dangerColor}40`,
            boxShadow: `0 0 ${20 + glow * 24}px ${dangerColor}22`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: warningColor,
                letterSpacing: 2,
              }}
            >
              {painSwitchLabel}
            </span>
            <span
              style={{
                fontSize: 36,
                fontWeight: 900,
                fontFamily: "monospace",
                color: dangerColor,
                transform: `scale(${barPulse})`,
                textShadow: `0 0 20px ${dangerColor}55`,
              }}
            >
              {Math.round(barPct)}
            </span>
          </div>
          <div
            style={{
              height: 10,
              borderRadius: 6,
              background: `${mutedTextColor}22`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${barPct}%`,
                borderRadius: 6,
                background: `linear-gradient(90deg, ${warningColor}, ${dangerColor})`,
                boxShadow: `0 0 16px ${warningColor}66`,
              }}
            />
          </div>
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
              fontSize: 32,
              fontWeight: 900,
              color: warningColor,
              padding: "12px 28px",
              borderRadius: 14,
              border: `2px solid ${warningColor}55`,
              background: `${warningColor}0c`,
              lineHeight: 1.35,
              maxWidth: 960,
              textShadow: `0 0 24px ${warningColor}44`,
            }}
          >
            {painQuote}
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
