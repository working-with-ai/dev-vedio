import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { PencilDevProps } from "../schema";
import {
  fadeIn,
  fadeInUp,
  lineGrow,
  pipelineNodeReveal,
  pulseGlow,
  staggerDelay,
  typewriterLength,
} from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

/** Decorative project labels — visual evidence of “几个项目” (not schema; story beat only). */
const PROJECT_TABS = ["项目 smoke-test", "CLI 面板", "落地页迭代"];

export const ProofScene: React.FC<PencilDevProps> = ({
  proofTopTag,
  proofTitle,
  proofCenterNodeId,
  proofNodes,
  proofIntegrationLine,
  proofLogPreview,
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
  const titleAnim = fadeInUp(frame, fps, Math.round(fps * 0.1), 40);

  const center = proofNodes.find((n) => n.id === proofCenterNodeId);
  const orbit = proofNodes.filter((n) => n.id !== proofCenterNodeId);
  const orbitAngles = orbit.map((_, i) => (Math.PI * 2 * i) / Math.max(orbit.length, 1) - Math.PI / 2);
  const cx = 200;
  const cy = 200;
  const r = 118;

  const diagramDelay = Math.round(fps * 0.35);
  const centerNodeAnim = pipelineNodeReveal(frame, fps, 0, diagramDelay);

  const lineStart = diagramDelay + Math.round(fps * 0.25);
  const flicker = 0.4 + 0.5 * pulseGlow(frame, fps, 1.8);

  const logPanelDelay = Math.round(fps * 0.2);
  const logFade = fadeIn(frame, logPanelDelay, 14);

  const tabCycle = Math.floor(frame / Math.round(fps * 1.1)) % PROJECT_TABS.length;

  const verdictAnim = fadeInUp(frame, fps, Math.round(fps * 2.4), 32);

  return (
    <SceneBackground
      backgroundColor={backgroundColor}
      accentColor={accentColor}
      particles={{ count: 22, speed: 0.33, color: accentColor, opacity: 0.32 }}
      glow={{
        orbs: [
          {
            x: "42%",
            y: "38%",
            color: secondaryColor,
            radius: 440,
            opacity: 0.1,
            pulseSpeed: 0.55,
            pulseAmount: 0.2,
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
          padding: "0 28px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 10,
            opacity: tagAnim.opacity,
            transform: `translateY(${tagAnim.y}px)`,
          }}
        >
          <div
            style={{
              fontSize: 19,
              color: accentColor,
              letterSpacing: 6,
              fontWeight: 800,
            }}
          >
            {proofTopTag}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: 16,
            opacity: titleAnim.opacity,
            transform: `translateY(${titleAnim.y}px)`,
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: textColor,
              lineHeight: 1.25,
              maxWidth: 980,
              margin: "0 auto",
            }}
          >
            {proofTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            gap: 16,
            minHeight: 420,
          }}
        >
          <div
            style={{
              flex: 1.05,
              minWidth: 0,
              position: "relative",
              borderRadius: 14,
              border: `1px solid ${secondaryColor}44`,
              background: panelColor,
              overflow: "hidden",
              aspectRatio: "1",
              maxHeight: 420,
              alignSelf: "center",
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              preserveAspectRatio="xMidYMid meet"
              style={{ position: "absolute", inset: 0, display: "block" }}
            >
              {orbit.map((node, i) => {
                const angle = orbitAngles[i] ?? 0;
                const ox = cx + r * Math.cos(angle);
                const oy = cy + r * Math.sin(angle);
                const len = Math.hypot(ox - cx, oy - cy);
                const ld = lineStart + staggerDelay(i, 4);
                const grow = lineGrow(frame, fps, ld, 0.38);
                return (
                  <line
                    key={`orbit-line-${node.id}`}
                    x1={cx}
                    y1={cy}
                    x2={ox}
                    y2={oy}
                    stroke={secondaryColor}
                    strokeWidth={2}
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
                width: 120,
                height: 120,
                marginLeft: -60,
                marginTop: -60,
                borderRadius: 16,
                border: `2px solid ${accentColor}77`,
                background: `${accentColor}12`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: centerNodeAnim.opacity,
                transform: `scale(${centerNodeAnim.scale}) translateY(${centerNodeAnim.y * 0.35}px)`,
                boxShadow: `0 0 32px ${accentColor}44`,
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: highlightColor,
                  fontFamily: "monospace",
                  letterSpacing: 1,
                }}
              >
                {center?.label ?? proofCenterNodeId}
              </span>
            </div>

            {orbit.map((node, i) => {
              const angle = orbitAngles[i] ?? 0;
              const ox = cx + r * Math.cos(angle);
              const oy = cy + r * Math.sin(angle);
              const leftPct = (ox / 400) * 100;
              const topPct = (oy / 400) * 100;
              const nodeAnim = pipelineNodeReveal(frame, fps, i + 1, diagramDelay + 6);
              return (
                <div
                  key={node.id}
                  style={{
                    position: "absolute",
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: `translate(-50%, -50%) scale(${nodeAnim.scale})`,
                    opacity: nodeAnim.opacity,
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: `1px solid ${secondaryColor}55`,
                      background: "rgba(0,0,0,0.45)",
                      fontSize: 15,
                      fontWeight: 800,
                      color: accentColor,
                      fontFamily: "monospace",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {node.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: logFade,
            }}
          >
            <div
              style={{
                flex: 1,
                minHeight: 0,
                borderRadius: 12,
                border: `1px solid ${mutedTextColor}33`,
                background: "rgba(0,0,0,0.5)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  padding: "8px 10px",
                  borderBottom: `1px solid ${secondaryColor}28`,
                  background: `${secondaryColor}0c`,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: mutedTextColor,
                    letterSpacing: 2,
                    width: "100%",
                    marginBottom: 2,
                  }}
                >
                  跑过的仓库 / 会话
                </span>
                {PROJECT_TABS.map((t, idx) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "4px 8px",
                      borderRadius: 6,
                      border: `1px solid ${idx === tabCycle ? accentColor : `${mutedTextColor}44`}`,
                      color: idx === tabCycle ? accentColor : mutedTextColor,
                      background: idx === tabCycle ? `${accentColor}14` : "transparent",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div
                style={{
                  padding: "10px 12px",
                  fontFamily: "monospace",
                  fontSize: 14,
                  color: highlightColor,
                  lineHeight: 1.55,
                  flexShrink: 0,
                }}
              >
                <div style={{ color: mutedTextColor, fontSize: 12, marginBottom: 6 }}>
                  agent.trace · 对话 / 工具日志
                </div>
                {proofLogPreview.map((line, idx) => {
                  const d = logPanelDelay + 18 + staggerDelay(idx, 22);
                  const len = typewriterLength(frame, line, fps, d, 22);
                  const shown = line.slice(0, len);
                  return (
                    <div key={`log-${idx}`} style={{ marginBottom: 4 }}>
                      {shown}
                      {len < line.length && (
                        <span style={{ opacity: 0.5 }}>▍</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  margin: "0 10px",
                  height: 1,
                  background: `${secondaryColor}33`,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  padding: "10px 12px",
                  fontFamily: "monospace",
                  fontSize: 13,
                  color: mutedTextColor,
                  lineHeight: 1.5,
                  flex: 1,
                  minHeight: 0,
                  overflow: "hidden",
                }}
              >
                <div style={{ color: accentColor, fontWeight: 800, marginBottom: 8, fontSize: 12 }}>
                  LLM 工具调用节选
                </div>
                <div style={{ color: secondaryColor }}>
                  user: 把 hero 区 token 对齐到 design.json …
                </div>
                <div style={{ color: highlightColor, marginTop: 6 }}>
                  assistant: 调用 mcp.read_pen → skill.apply_tokens → 预览 diff
                </div>
                <div style={{ marginTop: 8, opacity: 0.85 }}>
                  [turn 14] reasoning_truncated …
                  <br />
                  [turn 15] tool_result: export_preview ok
                </div>
              </div>
            </div>

            <div
              style={{
                alignSelf: "flex-end",
                marginTop: 12,
                maxWidth: "100%",
                textAlign: "right",
                paddingLeft: 8,
                opacity: verdictAnim.opacity,
                transform: `translateY(${verdictAnim.y}px)`,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  maxWidth: "100%",
                  fontSize: 22,
                  fontWeight: 800,
                  color: highlightColor,
                  lineHeight: 1.35,
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: `1px solid ${highlightColor}40`,
                  background: `${highlightColor}08`,
                }}
              >
                {proofIntegrationLine}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
