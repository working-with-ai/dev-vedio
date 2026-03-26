import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PencilDevProps } from "../schema";
import { fadeInUp, glitchOffset, pulseGlow } from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const HookScene: React.FC<PencilDevProps> = ({
  hookTopTag,
  hookMainLine,
  hookSubLine,
  hookOldTools,
  hookPencilLabel,
  backgroundColor,
  textColor,
  accentColor,
  dangerColor,
  highlightColor,
  panelColor,
  successColor,
  warningColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const coverPhase = frame < 3;

  const glitch = glitchOffset(frame, 1.35);
  const useGlitch = !coverPhase && frame > 12;
  const glow = pulseGlow(frame, fps, 3);

  const titleAnim = fadeInUp(frame, fps, 0, 56);
  const titleOpacity = coverPhase ? 1 : titleAnim.opacity;
  const titleY = coverPhase ? 0 : titleAnim.y;

  const subAnim = fadeInUp(frame, fps, Math.round(fps * 0.55), 44);
  const subOpacity = coverPhase ? 1 : subAnim.opacity;
  const subY = coverPhase ? 0 : subAnim.y;

  const pencilSpring = spring({
    frame: coverPhase ? 40 : frame - Math.round(fps * 0.12),
    fps,
    config: { damping: 16, stiffness: 200 },
  });
  const pencilScale = coverPhase ? 1 : interpolate(pencilSpring, [0, 1], [0.92, 1]);

  const ghostFade = interpolate(frame, [0, 8, 52], [1, 0.92, 0.22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rowAnim = fadeInUp(frame, fps, Math.round(fps * 0.35), 40);
  const rowOpacity = coverPhase ? 1 : rowAnim.opacity;
  const rowY = coverPhase ? 0 : rowAnim.y;

  const tagPulse = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  return (
    <SceneBackground
      backgroundColor={backgroundColor}
      accentColor={accentColor}
      particles={{
        count: 22,
        speed: 0.38,
        color: accentColor,
        opacity: 0.42,
        connectLines: false,
      }}
      glow={{
        orbs: [
          {
            x: "28%",
            y: "48%",
            color: dangerColor,
            radius: 320,
            opacity: 0.09,
            pulseSpeed: 0.62,
            pulseAmount: 0.2,
          },
          {
            x: "72%",
            y: "42%",
            color: accentColor,
            radius: 400,
            opacity: 0.13,
            pulseSpeed: 0.52,
            pulseAmount: 0.22,
          },
        ],
      }}
      hud={{ color: accentColor, animation: "pulse" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 90% 55% at 50% 38%, ${accentColor}14 0%, transparent 58%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 36px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: accentColor,
            letterSpacing: 12,
            fontWeight: 800,
            marginBottom: 22,
            textTransform: "uppercase",
            opacity: interpolate(tagPulse, [0, 1], [0.88, 1]),
          }}
        >
          {hookTopTag}
        </div>

        <div
          style={{
            position: "relative",
            textAlign: "center",
            marginBottom: 16,
            maxWidth: 1000,
            opacity: titleOpacity,
            transform: useGlitch
              ? `translateY(${titleY}px) translateX(${glitch.x}px) skewX(${glitch.skew}deg)`
              : `translateY(${titleY}px)`,
          }}
        >
          {useGlitch && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 50,
                fontWeight: 900,
                color: dangerColor,
                transform: `translateX(${glitch.x > 0 ? 3 : -3}px)`,
                opacity: Math.abs(glitch.x) > 0.5 ? 0.55 : 0,
                mixBlendMode: "screen",
                pointerEvents: "none",
                lineHeight: 1.2,
              }}
            >
              {hookMainLine}
            </div>
          )}
          <div
            style={{
              position: "relative",
              fontSize: 50,
              fontWeight: 900,
              color: textColor,
              lineHeight: 1.2,
              textShadow: `0 0 ${18 + glow * 18}px ${accentColor}77`,
            }}
          >
            {hookMainLine}
          </div>
        </div>

        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: highlightColor,
            textAlign: "center",
            lineHeight: 1.35,
            marginBottom: 28,
            maxWidth: 920,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            textShadow: `0 0 22px ${highlightColor}44`,
          }}
        >
          {hookSubLine}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "center",
            gap: 22,
            width: "100%",
            maxWidth: 980,
            opacity: rowOpacity,
            transform: `translateY(${rowY}px)`,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              minWidth: 0,
            }}
          >
            {hookOldTools.map((tool, i) => (
              <div
                key={`hook-old-tool-${i}-${tool.name}`}
                style={{
                  position: "relative",
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: `1px solid ${tool.ghostColor}55`,
                  background: `${panelColor}`,
                  opacity: ghostFade * (0.55 + i * 0.06),
                  transform: `translateX(${interpolate(frame, [10 + i * 5, 40 + i * 8], [0, -18], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
                  boxShadow: `0 0 28px ${tool.ghostColor}22`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: -2,
                    borderRadius: 16,
                    background: `linear-gradient(120deg, ${tool.ghostColor}18, transparent)`,
                    opacity: 0.85,
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: tool.ghostColor,
                    letterSpacing: 1,
                  }}
                >
                  {tool.name}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                  }}
                  aria-hidden
                >
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: tool.ghostColor,
                        opacity: 0.35 - dot * 0.08,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              flex: 1.05,
              minWidth: 0,
              borderRadius: 16,
              border: `2px solid ${accentColor}66`,
              background: panelColor,
              overflow: "hidden",
              transform: `scale(${pencilScale})`,
              boxShadow: `0 0 48px ${accentColor}44, inset 0 0 60px ${accentColor}12`,
            }}
          >
            <div
              style={{
                height: 36,
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                gap: 8,
                borderBottom: `1px solid ${accentColor}33`,
                background: "rgba(0,0,0,0.35)",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: dangerColor }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: warningColor }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: successColor }} />
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  color: accentColor,
                  letterSpacing: 2,
                }}
              >
                {hookPencilLabel}
              </span>
            </div>
            <div style={{ padding: 16, display: "flex", gap: 12, minHeight: 200 }}>
              <div
                style={{
                  width: 56,
                  borderRadius: 8,
                  background: `${accentColor}10`,
                  border: `1px solid ${accentColor}28`,
                }}
              />
              <div style={{ flex: 1, borderRadius: 10, position: "relative", overflow: "hidden" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(145deg, ${accentColor}14 0%, transparent 45%)`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "12%",
                    top: "18%",
                    right: "12%",
                    bottom: "22%",
                    border: `2px dashed ${accentColor}55`,
                    borderRadius: 8,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "18%",
                    top: "32%",
                    width: "64%",
                    height: 8,
                    borderRadius: 4,
                    background: `${highlightColor}88`,
                    boxShadow: `0 0 16px ${highlightColor}66`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: 14,
                    bottom: 14,
                    fontSize: 15,
                    fontWeight: 800,
                    color: accentColor,
                    letterSpacing: 3,
                  }}
                >
                  ACTIVE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
