import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { HermesAgentProps } from "../schema";
import { fadeInUp, staggerDelay, pulseGlow } from "../animations";

const textSafe: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

export const CTAScene: React.FC<HermesAgentProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    ctaTitle,
    ctaCards,
    ctaSlogan,
    ctaBody,
    ctaTags,
    backgroundColor,
    textColor,
    accentColor,
    highlightColor,
    openclawColor,
    panelColor,
  } = props;

  const headerLabel = fadeInUp(frame, fps, 0);
  const headerTitle = fadeInUp(frame, fps, 6);
  const glow = pulseGlow(frame, fps, 0.9);
  const sloganPulse = interpolate(glow, [0, 1], [0.94, 1]);

  const leftCard = ctaCards[0];
  const rightCard = ctaCards[1];

  return (
    <AbsoluteFill style={{ backgroundColor, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 60,
          right: 60,
          bottom: 420,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 22,
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            minWidth: 0,
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 10,
              color: accentColor,
              fontWeight: 800,
              opacity: headerLabel.opacity,
              transform: `translateY(${headerLabel.y}px)`,
              ...textSafe,
            }}
          >
            VERDICT
          </div>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.06,
              fontWeight: 900,
              background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 40px ${accentColor}33`,
              opacity: headerTitle.opacity,
              transform: `translateY(${headerTitle.y}px)`,
              ...textSafe,
            }}
          >
            {ctaTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            minWidth: 0,
            width: "100%",
          }}
        >
          {[
            {
              card: leftCard,
              borderColor: openclawColor,
              delay: 14,
            },
            {
              card: rightCard,
              borderColor: highlightColor,
              delay: 24,
            },
          ].map(({ card, borderColor, delay }, idx) => {
            const anim = fadeInUp(frame, fps, delay);
            return (
              <div
                key={idx}
                style={{
                  flex: "1 1 0",
                  minWidth: 0,
                  padding: "18px 16px",
                  borderRadius: 18,
                  border: `3px solid ${borderColor}`,
                  backgroundColor: panelColor,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px)`,
                  boxSizing: "border-box",
                }}
              >
                <span style={{ fontSize: 40, lineHeight: 1 }}>{card.icon}</span>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: textColor,
                    ...textSafe,
                  }}
                >
                  {card.title}
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 22,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    minWidth: 0,
                  }}
                >
                  {card.points.map((p, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: textColor,
                        ...textSafe,
                      }}
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {(() => {
          const d = 36;
          const anim = fadeInUp(frame, fps, d);
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                minWidth: 0,
                opacity: anim.opacity,
                transform: `translateY(${anim.y}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 900,
                  lineHeight: 1.25,
                  background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: `drop-shadow(0 0 ${12 + glow * 10}px ${accentColor}66)`,
                  opacity: sloganPulse,
                  ...textSafe,
                }}
              >
                {ctaSlogan}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: highlightColor,
                  ...textSafe,
                }}
              >
                {ctaBody}
              </div>
            </div>
          );
        })()}

        {(() => {
          const d = 48;
          const anim = fadeInUp(frame, fps, d);
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                opacity: anim.opacity,
                transform: `translateY(${anim.y}px)`,
                minWidth: 0,
              }}
            >
              {ctaTags.map((tag, i) => {
                const tagAnim = fadeInUp(frame, fps, d + staggerDelay(i, 6));
                return (
                  <span
                    key={i}
                    style={{
                      backgroundColor: panelColor,
                      color: accentColor,
                      borderRadius: 20,
                      padding: "8px 14px",
                      fontSize: 18,
                      fontWeight: 700,
                      maxWidth: "100%",
                      boxSizing: "border-box",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                      opacity: tagAnim.opacity,
                      transform: `translateY(${tagAnim.y}px)`,
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};
