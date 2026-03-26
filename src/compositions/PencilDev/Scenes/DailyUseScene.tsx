import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PencilDevProps } from "../schema";
import { fadeInUp, pulseGlow, slideFromLeft, staggerDelay } from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const DailyUseScene: React.FC<PencilDevProps> = ({
  dailyTopTag,
  dailyTitle,
  dailyEvidence,
  dailyPdfBadge,
  dailyTimelineLabel,
  backgroundColor,
  textColor,
  mutedTextColor,
  accentColor,
  highlightColor,
  secondaryColor,
  successColor,
  panelColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagAnim = fadeInUp(frame, fps, 0, 36);
  const titleAnim = fadeInUp(frame, fps, Math.round(fps * 0.12), 44);

  const cardBase = Math.round(fps * 0.35);
  const pdfPop = spring({
    frame: frame - Math.round(fps * 2.15),
    fps,
    config: { damping: 12, stiffness: 220 },
  });
  const pdfScale = interpolate(pdfPop, [0, 1], [0.65, 1]);
  const pdfOpacity = interpolate(pdfPop, [0, 1], [0, 1]);

  const timelineGlow = pulseGlow(frame, fps, 0.45);
  const timelineProgress = interpolate(frame, [Math.round(fps * 0.8), Math.round(fps * 5.5)], [0.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneBackground
      backgroundColor={backgroundColor}
      accentColor={accentColor}
      particles={{ count: 24, speed: 0.35, color: successColor, opacity: 0.34 }}
      glow={{
        orbs: [
          {
            x: "55%",
            y: "44%",
            color: highlightColor,
            radius: 480,
            opacity: 0.09,
            pulseSpeed: 0.52,
            pulseAmount: 0.2,
          },
        ],
      }}
      hud={{ color: successColor, animation: "pulse" }}
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
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div style={{ flex: 1, textAlign: "center", opacity: tagAnim.opacity, transform: `translateY(${tagAnim.y}px)` }}>
            <div
              style={{
                fontSize: 20,
                color: successColor,
                letterSpacing: 10,
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              {dailyTopTag}
            </div>
          </div>
          <div
            style={{
              opacity: pdfOpacity,
              transform: `scale(${pdfScale})`,
              padding: "8px 14px",
              borderRadius: 10,
              border: `2px solid ${accentColor}`,
              background: `linear-gradient(135deg, ${accentColor}22, ${secondaryColor}18)`,
              boxShadow: `0 0 28px ${accentColor}55`,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 900,
                color: highlightColor,
                letterSpacing: 3,
              }}
            >
              {dailyPdfBadge}
            </span>
            <div style={{ fontSize: 11, color: mutedTextColor, marginTop: 4, fontWeight: 600 }}>
              新功能 · 交付更顺
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: 22,
            opacity: titleAnim.opacity,
            transform: `translateY(${titleAnim.y}px)`,
          }}
        >
          <div
            style={{
              fontSize: 38,
              fontWeight: 900,
              color: textColor,
              lineHeight: 1.25,
              maxWidth: 960,
              margin: "0 auto",
              textShadow: `0 0 24px ${accentColor}44`,
            }}
          >
            {dailyTitle}
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: 22,
              fontWeight: 700,
              color: mutedTextColor,
            }}
          >
            主力软件 · 近 1 个月高频打开
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 22 }}>
          {dailyEvidence.map((ev, i) => {
            const delay = cardBase + staggerDelay(i, 11);
            const slide = slideFromLeft(frame, fps, delay, 520);
            const slideX = Math.min(0, slide);
            const op = interpolate(slideX, [-520, -180, 0], [0, 0.92, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={`${ev.title}-${i}`}
                style={{
                  borderRadius: 14,
                  border: `1px solid ${secondaryColor}44`,
                  background: panelColor,
                  padding: "16px 18px",
                  boxShadow: `0 8px 28px rgba(0,0,0,0.35)`,
                  opacity: op,
                  transform: `translateX(${slideX}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: accentColor,
                    marginBottom: 8,
                  }}
                >
                  {ev.title}
                </div>
                <div style={{ fontSize: 20, color: textColor, lineHeight: 1.4, fontWeight: 600 }}>
                  {ev.detail}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            borderRadius: 14,
            padding: "16px 18px",
            border: `1px solid ${mutedTextColor}33`,
            background: "rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: mutedTextColor,
              letterSpacing: 3,
              marginBottom: 12,
              textTransform: "uppercase",
            }}
          >
            {dailyTimelineLabel}
          </div>
          <div style={{ position: "relative", height: 10, borderRadius: 5, background: `${mutedTextColor}22` }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${timelineProgress * 100}%`,
                borderRadius: 5,
                background: `linear-gradient(90deg, ${secondaryColor}, ${accentColor})`,
                boxShadow: `0 0 ${12 + timelineGlow * 16}px ${accentColor}66`,
              }}
            />
            {[0, 0.33, 0.66, 1].map((mark, idx) => (
              <div
                key={`mark-${idx}`}
                style={{
                  position: "absolute",
                  left: `${mark * 100}%`,
                  top: "50%",
                  width: 12,
                  height: 12,
                  marginLeft: -6,
                  marginTop: -6,
                  borderRadius: "50%",
                  border: `2px solid ${timelineProgress >= mark - 0.02 ? accentColor : mutedTextColor}`,
                  background: timelineProgress >= mark ? `${accentColor}44` : "rgba(0,0,0,0.5)",
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              fontSize: 15,
              color: mutedTextColor,
              fontWeight: 600,
            }}
          >
            <span>周 1</span>
            <span>日常小改</span>
            <span>共改设计</span>
            <span>今天</span>
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
