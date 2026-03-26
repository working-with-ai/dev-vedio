import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PencilDevProps } from "../schema";
import { cardSlideIn, fadeInUp, shimmer, staggerDelay } from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

/** Safe rgba() for hex #rgb / #rrggbb; otherwise spec default highlight (~#bef264). */
function colorWithAlpha(cssColor: string, alpha: number): string {
  const a = Math.max(0, Math.min(1, alpha));
  const s = cssColor.trim();
  const hex6 = /^#([0-9a-fA-F]{6})$/u.exec(s);
  if (hex6) {
    const h = hex6[1];
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }
  const hex3 = /^#([0-9a-fA-F]{3})$/u.exec(s);
  if (hex3) {
    const h = hex3[1];
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return `rgba(${r},${g},${b},${a})`;
  }
  return `rgba(190, 242, 100, ${a})`;
}

export const CoreScene: React.FC<PencilDevProps> = ({
  coreTopTag,
  coreLeftColumn,
  coreCenterColumn,
  coreRightColumn,
  coreEmphasis,
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

  const tagAnim = fadeInUp(frame, fps, 0, 40);
  const emphasisDelay = Math.round(fps * 1.15);
  const sh = shimmer(frame, fps, emphasisDelay);
  const emphasisBorderAlpha = interpolate(sh, [0, 1], [0.35, 0.75]);
  const emphasisGlowAlpha = interpolate(sh, [0, 1], [0.25, 0.55]);

  const columns: Array<{
    col: typeof coreLeftColumn;
    side: "left" | "center" | "right";
    delay: number;
  }> = [
    { col: coreLeftColumn, side: "left", delay: Math.round(fps * 0.3) + staggerDelay(0, 10) },
    { col: coreCenterColumn, side: "center", delay: Math.round(fps * 0.3) + staggerDelay(1, 10) },
    { col: coreRightColumn, side: "right", delay: Math.round(fps * 0.3) + staggerDelay(2, 10) },
  ];

  const centerCard = cardSlideIn(frame, fps, columns[1].delay);

  return (
    <SceneBackground
      backgroundColor={backgroundColor}
      accentColor={accentColor}
      particles={{ count: 26, speed: 0.38, color: secondaryColor, opacity: 0.34 }}
      glow={{
        orbs: [
          {
            x: "50%",
            y: "40%",
            color: accentColor,
            radius: 480,
            opacity: 0.12,
            pulseSpeed: 0.55,
            pulseAmount: 0.2,
          },
        ],
      }}
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
          padding: "0 32px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 20,
            opacity: tagAnim.opacity,
            transform: `translateY(${tagAnim.y}px)`,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: accentColor,
              letterSpacing: 9,
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            {coreTopTag}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            gap: 14,
            marginBottom: 22,
            minHeight: 420,
          }}
        >
          {columns.map(({ col, side, delay }) => {
            const anim = cardSlideIn(frame, fps, delay);
            const isCenter = side === "center";
            const useCenterMotion = isCenter;

            const opacity = useCenterMotion ? centerCard.opacity : anim.opacity;
            const translateX = useCenterMotion ? centerCard.x : anim.x;
            const scale = useCenterMotion ? centerCard.scale : anim.scale;

            return (
              <div
                key={side}
                style={{
                  flex: isCenter ? 1.15 : 1,
                  minWidth: 0,
                  opacity,
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  borderRadius: 14,
                  border: `1px solid ${isCenter ? `${accentColor}55` : `${secondaryColor}33`}`,
                  background: panelColor,
                  padding: 14,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: isCenter ? `0 0 36px ${accentColor}33` : `0 0 20px ${secondaryColor}18`,
                }}
              >
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: isCenter ? accentColor : secondaryColor,
                    letterSpacing: 3,
                    marginBottom: 8,
                    textTransform: "uppercase",
                  }}
                >
                  {col.label}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: textColor,
                    lineHeight: 1.35,
                    marginBottom: 12,
                  }}
                >
                  {col.detail}
                </div>

                {side === "left" && (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                    {[0, 1, 2].map((row) => (
                      <div
                        key={row}
                        style={{
                          height: 36,
                          borderRadius: 8,
                          background: `${secondaryColor}14`,
                          border: `1px solid ${secondaryColor}28`,
                          opacity: 0.75 - row * 0.12,
                        }}
                      />
                    ))}
                  </div>
                )}

                {side === "center" && (
                  <div
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      position: "relative",
                      overflow: "hidden",
                      background: `linear-gradient(160deg, ${accentColor}12, transparent 55%)`,
                      border: `1px dashed ${accentColor}44`,
                      minHeight: 200,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: "10%",
                        top: "22%",
                        width: "55%",
                        height: 56,
                        border: `2px solid ${colorWithAlpha(highlightColor, 0.47)}`,
                        borderRadius: 8,
                        transform: "rotate(-4deg)",
                        boxShadow: `0 0 20px ${colorWithAlpha(highlightColor, 0.2)}`,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: "14%",
                        bottom: "28%",
                        width: "38%",
                        height: 10,
                        borderRadius: 5,
                        background: accentColor,
                        opacity: 0.85,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: "18%",
                        bottom: "18%",
                        fontSize: 14,
                        fontFamily: "monospace",
                        color: mutedTextColor,
                      }}
                    >
                      .pen / components
                    </div>
                  </div>
                )}

                {side === "right" && (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
                    <div
                      style={{
                        flex: 1,
                        borderRadius: 8,
                        background: "rgba(0,0,0,0.35)",
                        border: `1px solid ${accentColor}30`,
                        padding: 10,
                        fontSize: 15,
                        fontFamily: "monospace",
                        color: highlightColor,
                        lineHeight: 1.5,
                      }}
                    >
                      AI ▸ sync
                      <br />
                      <span style={{ color: mutedTextColor }}># props · tokens</span>
                    </div>
                    <div
                      style={{
                        height: 64,
                        borderRadius: 8,
                        background: `${accentColor}10`,
                        border: `1px solid ${accentColor}35`,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 40,
              fontWeight: 900,
              fontFamily: "monospace",
              letterSpacing: 2,
              color: highlightColor,
              padding: "12px 28px",
              borderRadius: 14,
              border: `2px solid ${colorWithAlpha(highlightColor, emphasisBorderAlpha)}`,
              background: colorWithAlpha(highlightColor, 0.07),
              textShadow: `0 0 ${interpolate(sh, [0, 1], [12, 36])}px ${colorWithAlpha(highlightColor, emphasisGlowAlpha)}`,
              boxShadow: `0 0 ${interpolate(sh, [0, 1], [8, 28])}px ${accentColor}44`,
            }}
          >
            {coreEmphasis}
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
