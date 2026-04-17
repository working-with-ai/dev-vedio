import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { SPXOpenAPIProps } from "../schema";
import {
  fadeInUp,
  lineGrow,
  pipelineNodeReveal,
  pulseGlow,
} from "../animations";

const safeArea: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 60,
  right: 60,
  bottom: 420,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 28,
  minWidth: 0,
  overflow: "hidden",
};

const textWrap: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

/**
 * 场景：8 步上线垂直管线 + 排障决策树标签与虚线箭头
 */
export const OnboardingScene: React.FC<SPXOpenAPIProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const {
    onboardingTitle,
    onboardingSteps,
    onboardingPassScore,
    accentColor,
    highlightColor,
    dangerColor,
    goldColor,
    textColor,
    mutedTextColor,
    panelColor,
  } = props;

  const titleAnim = fadeInUp(frame, fps, 0, 50);
  const lastIndex = Math.max(0, onboardingSteps.length - 1);

  // 估算每步垂直中心（用于右侧 SVG 虚线路径）
  const rowHeight = 28;
  const lineH = 20;
  const stepCenters = onboardingSteps.map((_, i) => {
    const top = i * (rowHeight + lineH);
    return top + rowHeight / 2;
  });
  const totalH =
    onboardingSteps.length * rowHeight +
    Math.max(0, onboardingSteps.length - 1) * lineH;
  const pathD = stepCenters
    .map((y, i) => `${i === 0 ? "M" : "L"} 8 ${y}`)
    .join(" ");

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={safeArea}>
        {/* 顶部标题 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            width: "100%",
            minWidth: 0,
            transform: `translateY(${titleAnim.y}px)`,
            opacity: titleAnim.opacity,
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: 10,
              color: mutedTextColor,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            ONBOARDING
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              textAlign: "center",
              ...textWrap,
              backgroundImage: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {onboardingTitle}
          </div>
        </div>

        {/* 中部：管线 + 右侧装饰 */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 920,
            minWidth: 0,
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "16px 100px 120px 24px",
            boxSizing: "border-box",
            borderRadius: 20,
            backgroundColor: panelColor,
            border: `1px solid ${accentColor}33`,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              minHeight: Math.max(totalH, 80),
            }}
          >
          {/* 垂直管线 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 0,
              minWidth: 0,
            }}
          >
            {onboardingSteps.map((step, index) => {
              const isLast = index === lastIndex;
              const reveal = pipelineNodeReveal(frame, fps, index, 5);
              const glow = pulseGlow(frame, fps, 1.2);
              const lineOpacity = lineGrow(
                frame,
                fps,
                5 + index * 10 + 6,
                0.25,
              );

              const dotColor = isLast ? goldColor : step.color;
              const dotShadow = isLast
                ? `0 0 ${12 + glow * 16}px ${goldColor}aa`
                : "none";

              return (
                <React.Fragment key={`${step.label}-${index}`}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 14,
                      minWidth: 0,
                      opacity: reveal.opacity,
                      transform: `translateY(${reveal.y}px) scale(${reveal.scale})`,
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 999,
                        flexShrink: 0,
                        backgroundColor: dotColor,
                        boxShadow: dotShadow,
                      }}
                    />
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: textColor,
                        ...textWrap,
                      }}
                    >
                      {step.label}
                    </div>
                  </div>
                  {index < onboardingSteps.length - 1 ? (
                    <div
                      style={{
                        width: 2,
                        height: lineH,
                        marginLeft: 7,
                        borderRadius: 1,
                        backgroundColor: "rgba(255,255,255,0.15)",
                        transformOrigin: "top",
                        transform: `scaleY(${lineOpacity})`,
                      }}
                    />
                  ) : null}
                </React.Fragment>
              );
            })}
            <div
              style={{
                marginTop: 8,
                marginLeft: 30,
                fontSize: 18,
                fontWeight: 600,
                color: mutedTextColor,
              }}
            >
              上线建议分 ≥{onboardingPassScore} 分
            </div>
          </div>

          {/* 右侧：虚线路径 + 浮动标签 */}
          <svg
            width={56}
            height={Math.max(totalH, 120)}
            viewBox={`0 0 56 ${Math.max(totalH, 120)}`}
            style={{
              position: "absolute",
              right: 12,
              top: 16,
              overflow: "visible",
            }}
            aria-hidden
          >
            <defs>
              <marker
                id="spx-onboard-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 8 4, 0 8" fill={dangerColor} />
              </marker>
            </defs>
            <path
              d={pathD}
              fill="none"
              stroke={dangerColor}
              strokeWidth={2}
              strokeDasharray="6 5"
              strokeLinecap="round"
              markerEnd="url(#spx-onboard-arrow)"
              opacity={0.85}
            />
          </svg>
          </div>

          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 200,
              fontSize: 20,
              fontWeight: 800,
              color: textColor,
              padding: "10px 14px",
              borderRadius: 12,
              border: `2px dashed ${dangerColor}`,
              backgroundColor: "rgba(7, 10, 16, 0.75)",
              boxSizing: "border-box",
              maxWidth: "min(200px, 42%)",
              ...textWrap,
              textAlign: "center",
            }}
          >
            排障决策树 🔧
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
