import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../../../components/SceneBackground";
import { KaraokeSubtitle } from "../../../components/KaraokeSubtitle";
import type { TradingAgentsProps } from "../schema";
import { fadeInUp, lineGrow, numberCountUp, staggerDelay } from "../animations";
import { buildSceneSubtitleLines } from "../sceneHelpers";
import { TitleBlock } from "../TitleBlock";

const textWrap: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

const SCENE_INDEX = 1;

const PIPELINE_STEPS = ["交易", "风控", "审批", "执行"];

const parseRoleCount = (value: string): number => {
  const n = parseInt(value.replace(/\D/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 9;
};

export const ArchScene: React.FC<TradingAgentsProps> = (props) => {
  const {
    archTitle,
    archAnalysts,
    archRoleCount,
    archPaperRef,
    accentColor,
    highlightColor,
    goldColor,
    textColor,
    mutedTextColor,
    panelColor,
    subtitle,
  } = props;

  const sceneFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const subtitleLines = useMemo(
    () => buildSceneSubtitleLines(props, SCENE_INDEX, fps),
    [props, fps],
  );

  const nineTarget = parseRoleCount(archRoleCount);
  const nineDelay = 78;
  const nineFrame = Math.max(0, sceneFrame - nineDelay);
  const nineValue = numberCountUp(nineFrame, fps, nineTarget, 1, 0);
  const nineOpacity = interpolate(sceneFrame, [nineDelay - 6, nineDelay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const vConnector1 = lineGrow(sceneFrame, fps, 42, 0.35);
  const vConnector2 = lineGrow(sceneFrame, fps, 118, 0.35);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <SceneBackground
        backgroundColor="#060a12"
        accentColor={accentColor}
        particles={{ count: 28, color: accentColor }}
        hud={{ color: goldColor, animation: "pulse", inset: 80 }}
      >
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 60,
            fontSize: 18,
            color: mutedTextColor,
            letterSpacing: 1,
            textAlign: "right",
            maxWidth: "72%",
            ...textWrap,
            opacity: fadeInUp(sceneFrame, fps, 4).opacity,
            transform: `translateY(${fadeInUp(sceneFrame, fps, 4).y}px)`,
          }}
        >
          {archPaperRef}
        </div>

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
            padding: "0 60px",
            boxSizing: "border-box",
            fontFamily: '"PingFang SC", "SF Pro Display", system-ui, sans-serif',
            gap: 20,
          }}
        >
          <TitleBlock
            label="ARCHITECTURE"
            title={archTitle}
            sceneFrame={sceneFrame}
            accentColor={accentColor}
            highlightColor={goldColor}
            textColor={textColor}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              width: "100%",
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                width: "100%",
                minWidth: 0,
                justifyContent: "center",
              }}
            >
              {archAnalysts.map((a, index) => {
                const delay = staggerDelay(index, 10);
                const fade = fadeInUp(sceneFrame, fps, delay);
                return (
                  <div
                    key={`${a.label}-${index}`}
                    style={{
                      flex: "1 1 0",
                      minWidth: 0,
                      borderRadius: 12,
                      border: `1px solid ${accentColor}99`,
                      background: panelColor,
                      padding: "12px 8px",
                      boxSizing: "border-box",
                      textAlign: "center",
                      opacity: fade.opacity,
                      transform: `translateY(${fade.y}px)`,
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{a.emoji}</div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: textColor,
                        ...textWrap,
                      }}
                    >
                      {a.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                width: 3,
                height: `${Math.round(44 * vConnector1)}px`,
                marginTop: 6,
                marginBottom: 4,
                borderRadius: 999,
                background: `linear-gradient(180deg, ${accentColor}, ${goldColor})`,
                opacity: 0.85,
              }}
            />

            <div
              style={{
                borderRadius: 999,
                border: `1px solid ${highlightColor}`,
                background: panelColor,
                padding: "10px 22px",
                fontSize: 26,
                fontWeight: 900,
                color: highlightColor,
                opacity: fadeInUp(sceneFrame, fps, 52).opacity,
                transform: `translateY(${fadeInUp(sceneFrame, fps, 52).y}px)`,
                ...textWrap,
              }}
            >
              ⚔️ 多空辩论
            </div>

            <div
              style={{
                width: 3,
                height: `${Math.round(44 * vConnector2)}px`,
                marginTop: 4,
                marginBottom: 8,
                borderRadius: 999,
                background: `linear-gradient(180deg, ${goldColor}, ${accentColor})`,
                opacity: 0.85,
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                width: "100%",
                minWidth: 0,
                flexWrap: "wrap",
              }}
            >
              {PIPELINE_STEPS.map((label, index) => {
                const stepDelay = 130 + index * 14;
                const fade = fadeInUp(sceneFrame, fps, stepDelay);
                const grow = lineGrow(sceneFrame, fps, stepDelay - 6, 0.28);
                const showArrow = index < PIPELINE_STEPS.length - 1;
                const arrowGrow = lineGrow(sceneFrame, fps, stepDelay + 4, 0.22);
                return (
                  <React.Fragment key={label}>
                    <div
                      style={{
                        borderRadius: 12,
                        border: `1px solid ${accentColor}`,
                        background: panelColor,
                        padding: "12px 14px",
                        fontSize: 22,
                        fontWeight: 800,
                        color: textColor,
                        opacity: fade.opacity,
                        transform: `translateY(${fade.y}px) scale(${0.92 + 0.08 * grow})`,
                        ...textWrap,
                      }}
                    >
                      {label}
                    </div>
                    {showArrow ? (
                      <div
                        style={{
                          fontSize: 22,
                          fontWeight: 900,
                          color: goldColor,
                          opacity: arrowGrow,
                          flexShrink: 0,
                        }}
                      >
                        →
                      </div>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginTop: 6,
              opacity: nineOpacity,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: mutedTextColor,
                  letterSpacing: 4,
                }}
              >
                ROLES
              </div>
              <div
                style={{
                  fontSize: 110,
                  fontWeight: 900,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
                  color: goldColor,
                  textShadow: `0 0 40px ${goldColor}55`,
                  lineHeight: 1,
                }}
              >
                {nineValue}
              </div>
            </div>
          </div>
        </div>

        {subtitle.enabled && subtitleLines.length > 0 ? (
          <KaraokeSubtitle
            lines={subtitleLines}
            fontSize={subtitle.fontSize}
            textColor={subtitle.textColor}
            highlightColor={subtitle.highlightColor}
            backgroundColor={subtitle.backgroundColor}
            position={subtitle.position}
            style={{ bottom: 380 }}
          />
        ) : null}
      </SceneBackground>
    </AbsoluteFill>
  );
};
