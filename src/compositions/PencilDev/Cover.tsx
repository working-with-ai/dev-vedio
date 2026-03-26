import React from "react";
import { AbsoluteFill } from "remotion";
import { SceneBackground } from "../../components/SceneBackground";
import { PencilDevProps } from "./schema";

export const PencilDevCover: React.FC<PencilDevProps> = ({
  coverLabel,
  coverTitle,
  coverSubtitle,
  coverStrip,
  agentCards,
  backgroundColor,
  textColor,
  mutedTextColor,
  accentColor,
  highlightColor,
  secondaryColor,
  dangerColor,
  warningColor,
  successColor,
  panelColor,
}) => {
  const stripParts = coverStrip.split("|").map((s) => s.trim());
  const coverAgentRows =
    agentCards.length > 0
      ? agentCards.slice(0, 3)
      : [{ title: "Agent", subtitle: "—" }];

  return (
    <SceneBackground
      backgroundColor={backgroundColor}
      accentColor={accentColor}
      particles={{
        count: 20,
        speed: 0.35,
        color: secondaryColor,
        opacity: 0.32,
        connectLines: false,
      }}
      glow={{
        orbs: [
          {
            x: "48%",
            y: "36%",
            color: accentColor,
            radius: 420,
            opacity: 0.14,
            pulseSpeed: 0.5,
            pulseAmount: 0.18,
          },
          {
            x: "78%",
            y: "58%",
            color: secondaryColor,
            radius: 280,
            opacity: 0.08,
            pulseSpeed: 0.55,
            pulseAmount: 0.15,
          },
        ],
      }}
      hud={{ color: accentColor, animation: "static" }}
    >
      <AbsoluteFill
        style={{
          fontFamily: "\"PingFang SC\", \"SF Pro Display\", system-ui, sans-serif",
          color: textColor,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 95% 50% at 50% 32%, ${accentColor}12 0%, transparent 55%)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "44px 40px 36px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 22 }}>
            <div
              style={{
                fontSize: 22,
                letterSpacing: 16,
                color: accentColor,
                fontWeight: 800,
                textShadow: `0 0 20px ${accentColor}55`,
              }}
            >
              {coverLabel}
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div
              style={{
                fontSize: 56,
                lineHeight: 1.12,
                fontWeight: 900,
                textShadow: `0 0 28px ${accentColor}40`,
              }}
            >
              {coverTitle}
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.35,
                fontWeight: 700,
                color: highlightColor,
                textShadow: `0 0 18px ${highlightColor}35`,
              }}
            >
              {coverSubtitle}
            </div>
          </div>

          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              alignItems: "stretch",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 1000,
                borderRadius: 14,
                border: `1px solid ${accentColor}44`,
                background: panelColor,
                boxShadow: `0 0 0 1px ${secondaryColor}22, 0 18px 48px rgba(0,0,0,0.45)`,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: 38,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 14px",
                  borderBottom: `1px solid ${accentColor}28`,
                  background: `linear-gradient(180deg, rgba(15,23,42,0.95), rgba(8,12,28,0.88))`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 7,
                    marginRight: 14,
                  }}
                >
                  {[
                    { color: dangerColor, key: "win-dot-0" },
                    { color: warningColor, key: "win-dot-1" },
                    { color: successColor, key: "win-dot-2" },
                  ].map((dot) => (
                    <div
                      key={dot.key}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: dot.color,
                        opacity: 0.85,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    letterSpacing: 2,
                    color: mutedTextColor,
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  }}
                >
                  pencil — workspace.pen
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  minHeight: 0,
                }}
              >
                <div
                  style={{
                    width: "24%",
                    minWidth: 0,
                    borderRight: `1px solid ${accentColor}22`,
                    padding: "12px 10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: 4,
                      color: accentColor,
                      fontWeight: 800,
                    }}
                  >
                    AGENTS
                  </div>
                  {coverAgentRows.map((card, i) => (
                    <div
                      key={`cover-agent-${i}`}
                      style={{
                        padding: "8px 8px",
                        borderRadius: 8,
                        border: `1px solid ${i === 0 ? accentColor : `${secondaryColor}44`}`,
                        background:
                          i === 0
                            ? `linear-gradient(135deg, ${accentColor}18, transparent)`
                            : "rgba(15,23,42,0.55)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: textColor,
                        }}
                      >
                        {card.title}
                      </div>
                      <div style={{ fontSize: 11, color: mutedTextColor, marginTop: 2 }}>
                        {card.subtitle}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(180deg, rgba(5,8,22,0.35), rgba(5,8,22,0.65))`,
                  }}
                >
                  <div
                    style={{
                      width: "88%",
                      aspectRatio: "4 / 3",
                      maxHeight: "100%",
                      borderRadius: 12,
                      border: `2px solid ${accentColor}`,
                      boxShadow: `0 0 32px ${accentColor}44, inset 0 0 0 1px ${highlightColor}33`,
                      background: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 11px,
                        ${accentColor}0f 11px,
                        ${accentColor}0f 12px
                      ),
                      repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 11px,
                        ${accentColor}0f 11px,
                        ${accentColor}0f 12px
                      ),
                      linear-gradient(145deg, rgba(15,23,42,0.9), rgba(5,8,22,0.95))`,
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "58%",
                        height: "48%",
                        borderRadius: 10,
                        border: `1px solid ${secondaryColor}66`,
                        background: `linear-gradient(135deg, ${accentColor}22, ${secondaryColor}18)`,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "18%",
                          left: "14%",
                          width: "42%",
                          height: "22%",
                          borderRadius: 6,
                          background: `${highlightColor}55`,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "20%",
                          right: "16%",
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          border: `2px solid ${accentColor}`,
                          boxShadow: `0 0 12px ${accentColor}88`,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 10,
                        right: 12,
                        fontSize: 11,
                        letterSpacing: 3,
                        color: accentColor,
                        fontWeight: 800,
                        opacity: 0.9,
                      }}
                    >
                      CANVAS
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "26%",
                    minWidth: 0,
                    borderLeft: `1px solid ${accentColor}22`,
                    padding: "12px 10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: 4,
                      color: secondaryColor,
                      fontWeight: 800,
                    }}
                  >
                    AGENT PANEL
                  </div>
                  <div
                    style={{
                      padding: "10px 10px",
                      borderRadius: 8,
                      border: `1px solid ${secondaryColor}55`,
                      background: "rgba(15,23,42,0.72)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: mutedTextColor,
                        lineHeight: 1.45,
                        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      }}
                    >
                      &gt; sync.design
                      <br />
                      &gt; apply.tokens
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      padding: "10px 10px",
                      borderRadius: 8,
                      border: `1px solid ${accentColor}40`,
                      background: `linear-gradient(135deg, ${accentColor}14, transparent)`,
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 700, color: textColor }}>
                      并行走查
                    </div>
                    <div style={{ fontSize: 11, color: mutedTextColor, marginTop: 4 }}>
                      多 Agent 围着同一份稿
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 22,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px 18px",
              padding: "14px 18px",
              borderRadius: 12,
              border: `1px solid ${accentColor}38`,
              background: `linear-gradient(90deg, ${accentColor}12, ${secondaryColor}10)`,
            }}
          >
            {stripParts.map((part, idx) => (
              <React.Fragment key={`cover-strip-${idx}`}>
                {idx > 0 && (
                  <span style={{ color: `${accentColor}99`, fontWeight: 700 }}>|</span>
                )}
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: 1,
                    color: textColor,
                  }}
                >
                  {part}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </SceneBackground>
  );
};

export default PencilDevCover;
