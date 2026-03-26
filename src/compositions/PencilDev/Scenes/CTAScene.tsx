import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PencilDevProps } from "../schema";
import { fadeInUp, pulseGlow, staggerDelay } from "../animations";
import { SceneBackground } from "../../../components/SceneBackground";

export const CTAScene: React.FC<PencilDevProps> = ({
  ctaTopTag,
  ctaMainLine,
  ctaSubLine,
  ctaClosing,
  ctaTags,
  backgroundColor,
  textColor,
  mutedTextColor,
  accentColor,
  highlightColor,
  secondaryColor,
  panelColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  /** 仅当场景时长大于 1.5s 时，末段冻结 1.5s；过短则全程正常播动画 */
  const holdFramesTarget = Math.round(fps * 1.5);
  const canHold = durationInFrames > holdFramesTarget;
  const holdStart = canHold ? durationInFrames - holdFramesTarget : durationInFrames;
  const animFrame =
    canHold && frame >= holdStart ? Math.max(0, holdStart - 1) : frame;

  const tagAnim = fadeInUp(animFrame, fps, 0, 36);
  const mainAnim = fadeInUp(animFrame, fps, Math.round(fps * 0.15), 52);
  const subAnim = fadeInUp(animFrame, fps, Math.round(fps * 0.55), 40);
  const glow = pulseGlow(animFrame, fps, 1.1);

  const closingDelay = Math.round(fps * 1.05);
  const closingAnim = fadeInUp(animFrame, fps, closingDelay, 36);

  const mainShadow = 18 + glow * 32;

  return (
    <SceneBackground
      backgroundColor={backgroundColor}
      accentColor={accentColor}
      particles={{ count: 22, speed: 0.32, color: accentColor, opacity: 0.36 }}
      glow={{
        orbs: [
          {
            x: "50%",
            y: "40%",
            color: highlightColor,
            radius: 520,
            opacity: 0.11,
            pulseSpeed: 0.5,
            pulseAmount: 0.22,
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
          alignItems: "center",
          padding: "0 40px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            marginBottom: 22,
            opacity: tagAnim.opacity,
            transform: `translateY(${tagAnim.y}px)`,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: highlightColor,
              letterSpacing: 12,
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            {ctaTopTag}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div
            aria-hidden
            style={{
              width: 22,
              height: 56,
              borderRadius: "4px 4px 10px 10px",
              background: `linear-gradient(180deg, ${accentColor}, ${secondaryColor})`,
              boxShadow: `0 0 20px ${accentColor}55`,
              opacity: interpolate(animFrame, [8, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          />
          <div
            style={{
              textAlign: "left",
              opacity: mainAnim.opacity,
              transform: `translateY(${mainAnim.y}px)`,
            }}
          >
            <div
              style={{
                fontSize: 46,
                fontWeight: 900,
                color: textColor,
                lineHeight: 1.18,
                maxWidth: 920,
                textShadow: `0 0 ${mainShadow}px ${accentColor}66`,
              }}
            >
              {ctaMainLine}
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: 28,
            opacity: subAnim.opacity,
            transform: `translateY(${subAnim.y}px)`,
            maxWidth: 940,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: mutedTextColor,
              lineHeight: 1.45,
            }}
          >
            {ctaSubLine}
          </div>
        </div>

        <div
          style={{
            opacity: closingAnim.opacity,
            transform: `translateY(${closingAnim.y}px) scale(${interpolate(closingAnim.opacity, [0, 1], [0.96, 1])})`,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 36px",
              borderRadius: 16,
              border: `2px solid ${highlightColor}`,
              background: `${highlightColor}12`,
              boxShadow: `0 0 ${26 + glow * 20}px ${highlightColor}44`,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 4v16l6-4 6 4V4H6z"
                stroke={highlightColor}
                strokeWidth="2"
                strokeLinejoin="round"
                fill={`${highlightColor}22`}
              />
            </svg>
            <span
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: highlightColor,
                letterSpacing: 2,
              }}
            >
              {ctaClosing}
            </span>
          </div>
          <div
            style={{
              marginTop: 12,
              textAlign: "center",
              fontSize: 17,
              color: mutedTextColor,
              fontWeight: 600,
            }}
          >
            视频号 · 点「收藏」稍后再看
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
            maxWidth: 960,
          }}
        >
          {ctaTags.map((tag, i) => {
            const lightOn = Math.round(fps * 1.35) + staggerDelay(i, 14);
            const sp = spring({
              frame: animFrame - lightOn,
              fps,
              config: { damping: 16, stiffness: 260, mass: 0.45 },
            });
            const lit = interpolate(sp, [0, 1], [0.2, 1]);
            const hot = pulseGlow(Math.max(0, animFrame - lightOn), fps, 2.4);
            const isActive = animFrame >= lightOn && animFrame < lightOn + Math.round(fps * 0.55);
            return (
              <span
                key={`cta-tag-${i}`}
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: accentColor,
                  opacity: lit,
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: `2px solid ${isActive ? highlightColor : `${secondaryColor}99`}`,
                  background: isActive ? `${highlightColor}18` : panelColor,
                  letterSpacing: 1,
                  textShadow: isActive ? `0 0 ${10 + hot * 12}px ${highlightColor}88` : "none",
                  boxShadow: isActive ? `0 0 ${16 + hot * 14}px ${accentColor}55` : "none",
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </SceneBackground>
  );
};
