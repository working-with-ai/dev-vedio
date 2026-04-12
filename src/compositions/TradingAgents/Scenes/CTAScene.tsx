import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../../../components/SceneBackground";
import {
  KaraokeSubtitle,
  type SubtitleLine,
  generateSubtitleLines,
} from "../../../components/KaraokeSubtitle";
import type { TradingAgentsProps } from "../schema";
import { fadeIn, fadeInUp, slideFromLeft, slideFromRight } from "../animations";

const DEFAULT_SCENE_DURATIONS = [510, 660, 660, 600, 720, 660, 600];
const SCENE_INDEX = 6;

const textWrap: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

const safeArea: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 420,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "0 60px",
  minWidth: 0,
  overflow: "hidden",
  boxSizing: "border-box",
};

function remapSubtitleLinesToSequence(
  lines: SubtitleLine[],
  sceneGlobalStart: number,
  sceneGlobalEnd: number,
): SubtitleLine[] {
  return lines
    .filter(
      (line) =>
        line.endFrame > sceneGlobalStart && line.startFrame < sceneGlobalEnd,
    )
    .map((line) => ({
      ...line,
      startFrame: line.startFrame - sceneGlobalStart,
      endFrame: line.endFrame - sceneGlobalStart,
      words: line.words.map((w) => ({
        ...w,
        startFrame: w.startFrame - sceneGlobalStart,
        endFrame: w.endFrame - sceneGlobalStart,
      })),
    }));
}

export const CTAScene: React.FC<TradingAgentsProps> = (props) => {
  const sceneFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    ctaTitle,
    ctaLinks,
    subtitle,
    voiceoverScripts,
    precomputedSubtitles,
    accentColor,
    highlightColor,
    successColor,
    dangerColor,
    mutedTextColor,
    textColor,
    sceneDurations,
  } = props;

  const durations =
    sceneDurations?.length === 7 ? sceneDurations : DEFAULT_SCENE_DURATIONS;
  const sceneDuration = durations[SCENE_INDEX] ?? 600;
  const sceneGlobalStart = useMemo(
    () => durations.slice(0, SCENE_INDEX).reduce((a, b) => a + b, 0),
    [durations],
  );
  const sceneGlobalEnd = sceneGlobalStart + sceneDuration;

  const subtitleLines = useMemo<SubtitleLine[]>(() => {
    if (!subtitle.enabled) {
      return [];
    }
    if (precomputedSubtitles && precomputedSubtitles.length > 0) {
      return remapSubtitleLinesToSequence(
        precomputedSubtitles,
        sceneGlobalStart,
        sceneGlobalEnd,
      );
    }
    const script = voiceoverScripts[SCENE_INDEX] ?? "";
    return [
      generateSubtitleLines(
        script,
        Math.round(fps * 0.3),
        sceneDuration - Math.round(fps * 1),
        fps,
      ),
    ];
  }, [
    fps,
    precomputedSubtitles,
    sceneDuration,
    sceneGlobalEnd,
    sceneGlobalStart,
    subtitle.enabled,
    voiceoverScripts,
  ]);

  const titleAnim = fadeInUp(sceneFrame, fps, 0);
  const leftX = slideFromLeft(sceneFrame, fps, 0, 420);
  const rightX = slideFromRight(sceneFrame, fps, 0, 420);
  const verdictRowOpacity = fadeIn(sceneFrame, 0, 14);

  const quoteDelay = Math.round(fps * 0.85);
  const quoteAnim = fadeInUp(sceneFrame, fps, quoteDelay, 48);
  const quoteSpring = spring({
    frame: sceneFrame - quoteDelay,
    fps,
    config: { damping: 100, stiffness: 180, mass: 0.5 },
  });
  const quoteScale = interpolate(quoteSpring, [0, 1], [0.98, 1]);

  const linksOpacity = fadeIn(sceneFrame, Math.round(fps * 2.2), 20);
  const disclaimerOpacity = fadeIn(sceneFrame, Math.round(fps * 2.8), 18);

  const gradientText: React.CSSProperties = {
    textAlign: "center",
    lineHeight: 1.15,
    fontSize: 48,
    fontWeight: 900,
    background: "linear-gradient(135deg, #2563eb, #f59e0b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow:
      "0 0 32px rgba(37, 99, 235, 0.45), 0 0 48px rgba(245, 158, 11, 0.25)",
    ...textWrap,
  };

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <SceneBackground
        backgroundColor="#060a12"
        accentColor="#2563eb"
        particles={{ count: 18, color: "#2563eb", opacity: 0.35 }}
        hud={{ color: "#2563eb", animation: "static", inset: 80 }}
        glow={{
          orbs: [
            {
              x: "50%",
              y: "42%",
              color: "#2563eb",
              radius: 520,
              opacity: 0.07,
              pulseSpeed: 0.4,
              pulseAmount: 0.12,
            },
          ],
        }}
      >
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 70% 45% at 50% 36%, rgba(37, 99, 235, 0.14), transparent 72%)",
          }}
        />

        <div
          style={{
            ...safeArea,
            fontFamily: '"PingFang SC", "SF Pro Display", system-ui, sans-serif',
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              minWidth: 0,
              width: "100%",
              opacity: titleAnim.opacity,
              transform: `translateY(${titleAnim.y}px)`,
            }}
          >
            <div
              style={{
                fontSize: 18,
                letterSpacing: 10,
                color: accentColor,
                fontWeight: 800,
                ...textWrap,
              }}
            >
              VERDICT
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 900,
                lineHeight: 1.08,
                background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: `0 0 20px ${highlightColor}28`,
                ...textWrap,
              }}
            >
              {ctaTitle}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "stretch",
              justifyContent: "center",
              gap: 16,
              width: "100%",
              minWidth: 0,
              opacity: verdictRowOpacity,
            }}
          >
            <div
              style={{
                flex: "1 1 0",
                minWidth: 0,
                padding: "14px 12px",
                borderRadius: 12,
                border: `1px solid ${successColor}55`,
                background: "rgba(16, 185, 129, 0.06)",
                color: successColor,
                fontSize: 26,
                fontWeight: 800,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `translateX(${leftX}px)`,
                ...textWrap,
              }}
            >
              值得研究 ✅
            </div>
            <div
              style={{
                flex: "1 1 0",
                minWidth: 0,
                padding: "14px 12px",
                borderRadius: 12,
                border: `1px solid ${dangerColor}55`,
                background: "rgba(239, 68, 68, 0.06)",
                color: dangerColor,
                fontSize: 26,
                fontWeight: 800,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `translateX(${rightX}px)`,
                ...textWrap,
              }}
            >
              不值得盲信 ⚠️
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "center",
              width: "100%",
              minWidth: 0,
            }}
          >
            <div
              style={{
                ...gradientText,
                opacity: quoteAnim.opacity,
                transform: `translateY(${quoteAnim.y}px) scale(${quoteScale})`,
                transformOrigin: "center center",
              }}
            >
              AI 不能替你赚钱
            </div>
            <div
              style={{
                ...gradientText,
                opacity: quoteAnim.opacity,
                transform: `translateY(${quoteAnim.y}px) scale(${quoteScale})`,
                transformOrigin: "center center",
              }}
            >
              但能替你想清楚
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              width: "100%",
              minWidth: 0,
              opacity: linksOpacity,
            }}
          >
            {ctaLinks.map((link) => (
              <div
                key={`${link.label}-${link.url}`}
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: textColor,
                  textAlign: "center",
                  ...textWrap,
                }}
              >
                <span style={{ color: mutedTextColor }}>{link.label} → </span>
                <span style={{ color: highlightColor }}>{link.url}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: 19,
              color: mutedTextColor,
              textAlign: "center",
              opacity: disclaimerOpacity,
              ...textWrap,
            }}
          >
            ⚠️ 仅供研究，不构成投资建议
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
