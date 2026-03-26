import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PencilDevProps } from "../schema";
import {
  fadeInUp,
  lineGrow,
  pipelineNodeReveal,
  pulseGlow,
  staggerDelay,
} from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const AgentScene: React.FC<PencilDevProps> = ({
  agentTopTag,
  agentCanvasLabel,
  agentCards,
  agentQuote,
  backgroundColor,
  textColor,
  mutedTextColor,
  accentColor,
  highlightColor,
  secondaryColor,
  panelColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagAnim = fadeInUp(frame, fps, 0, 36);
  const canvasBreath = pulseGlow(frame, fps, 0.85);

  const baseDelay = Math.round(fps * 0.28);
  const canvasDelay = baseDelay + staggerDelay(2, 8);

  const canvasReveal = pipelineNodeReveal(frame, fps, 0, canvasDelay);
  const canvasOpacity = canvasReveal.opacity;
  const canvasScale = interpolate(canvasBreath, [0, 1], [0.98, 1.02]) * canvasReveal.scale;

  const lineBase = canvasDelay + Math.round(fps * 0.35);

  return (
    <SceneBackground
      backgroundColor={backgroundColor}
      accentColor={accentColor}
      particles={{ count: 20, speed: 0.34, color: secondaryColor, opacity: 0.38 }}
      glow={{
        orbs: [
          {
            x: "50%",
            y: "42%",
            color: accentColor,
            radius: 520,
            opacity: 0.11,
            pulseSpeed: 0.58,
            pulseAmount: 0.22,
          },
          {
            x: "30%",
            y: "58%",
            color: secondaryColor,
            radius: 280,
            opacity: 0.08,
            pulseSpeed: 0.72,
            pulseAmount: 0.18,
          },
        ],
      }}
      hud={{ color: secondaryColor, animation: "pulse" }}
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
          padding: "0 32px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 14,
            opacity: tagAnim.opacity,
            transform: `translateY(${tagAnim.y}px)`,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: secondaryColor,
              letterSpacing: 11,
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            {agentTopTag}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: 640,
            marginTop: 4,
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 640"
            preserveAspectRatio="xMidYMid meet"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            {agentCards.slice(0, 4).map((_, i) => {
              const anchors: Array<{ x1: number; y1: number; x2: number; y2: number }> = [
                { x1: 175, y1: 155, x2: 430, y2: 290 },
                { x1: 825, y1: 155, x2: 570, y2: 290 },
                { x1: 175, y1: 485, x2: 430, y2: 350 },
                { x1: 825, y1: 485, x2: 570, y2: 350 },
              ];
              const a = anchors[i];
              if (!a) {
                return null;
              }
              const len = Math.hypot(a.x2 - a.x1, a.y2 - a.y1);
              const lineDelay = lineBase + staggerDelay(i, 5);
              const grow = lineGrow(frame, fps, lineDelay, 0.45);
              const flicker = 0.35 + 0.45 * pulseGlow(frame + i * 4, fps, 2.2);
              return (
                <line
                  key={`agent-line-${i}`}
                  x1={a.x1}
                  y1={a.y1}
                  x2={a.x2}
                  y2={a.y2}
                  stroke={secondaryColor}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeOpacity={flicker * grow}
                  strokeDasharray={len}
                  strokeDashoffset={len * (1 - grow)}
                />
              );
            })}
          </svg>

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 300,
              height: 240,
              marginLeft: -150,
              marginTop: -120,
              opacity: canvasOpacity,
              transform: `scale(${canvasScale})`,
              borderRadius: 16,
              border: `2px solid ${accentColor}66`,
              background: panelColor,
              boxShadow: `0 0 ${40 + canvasBreath * 28}px ${accentColor}55, inset 0 0 50px ${accentColor}14`,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 32,
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                gap: 6,
                borderBottom: `1px solid ${accentColor}33`,
                background: "rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: highlightColor }} />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: accentColor,
                  letterSpacing: 2,
                }}
              >
                CANVAS
              </span>
            </div>
            <div style={{ flex: 1, position: "relative", padding: 14 }}>
              <div
                style={{
                  position: "absolute",
                  inset: 16,
                  borderRadius: 10,
                  border: `2px dashed ${secondaryColor}44`,
                  background: `linear-gradient(135deg, ${accentColor}10, transparent)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "14%",
                  top: "38%",
                  width: "72%",
                  height: 10,
                  borderRadius: 5,
                  background: `${highlightColor}aa`,
                  boxShadow: `0 0 18px ${highlightColor}66`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 18,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: 800,
                  color: textColor,
                }}
              >
                {agentCanvasLabel}
              </div>
            </div>
          </div>

          {agentCards.slice(0, 4).map((card, i) => {
            const node = pipelineNodeReveal(frame, fps, i, baseDelay);
            const isRight = i === 1 || i === 3;
            const isBottom = i === 2 || i === 3;
            return (
              <div
                key={`${card.title}-${i}`}
                style={{
                  position: "absolute",
                  ...(isRight ? { right: "4%" } : { left: "4%" }),
                  ...(isBottom ? { bottom: "10%" } : { top: "10%" }),
                  width: "min(42%, 400px)",
                  opacity: node.opacity,
                  transform: `translateY(${node.y}px) scale(${node.scale})`,
                  transformOrigin: isRight ? "right center" : "left center",
                }}
              >
                <div
                  style={{
                    borderRadius: 14,
                    border: `1px solid ${secondaryColor}55`,
                    background: panelColor,
                    padding: "12px 14px",
                    boxShadow: `0 0 24px ${secondaryColor}33`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 900,
                      color: accentColor,
                      letterSpacing: 0.5,
                      marginBottom: 6,
                    }}
                  >
                    {card.title}
                  </div>
                  <div style={{ fontSize: 16, color: mutedTextColor, lineHeight: 1.35 }}>
                    {card.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 8,
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 28,
              fontWeight: 900,
              color: highlightColor,
              padding: "10px 22px",
              borderRadius: 12,
              border: `1px solid ${highlightColor}44`,
              background: `${highlightColor}0c`,
              textShadow: `0 0 20px ${highlightColor}44`,
            }}
          >
            {agentQuote}
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
