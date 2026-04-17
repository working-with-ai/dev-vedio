import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { SPXOpenAPIProps } from "../schema";
import {
  fadeInUp,
  lineGrow,
  slideFromRight,
  staggerDelay,
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

/** 排障决策树：根节点 + 分支 + 右侧 Playbook 列表 */
export const TroubleshootScene: React.FC<SPXOpenAPIProps> = (props) => {
  const {
    troubleshootTitle,
    troubleshootBranches,
    troubleshootPlaybooks,
    troubleshootHighlightPath,
    troubleshootHighlightCode,
    accentColor,
    highlightColor,
    goldColor,
    textColor,
    mutedTextColor,
    panelColor,
  } = props;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleGradient: React.CSSProperties = {
    backgroundImage: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    ...textWrap,
  };

  const titleAnim = fadeInUp(frame, fps, 0, 48);
  const lineDelay = 18;
  const lineProgress = lineGrow(frame, fps, lineDelay, 0.35);
  const highlightActive =
    frame > fps * 12 && troubleshootHighlightCode.trim().length > 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={safeArea}>
        {/* TitleBlock */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            width: "100%",
            minWidth: 0,
            opacity: titleAnim.opacity,
            transform: `translateY(${titleAnim.y}px)`,
          }}
        >
          <span
            style={{
              fontSize: 20,
              letterSpacing: 10,
              color: mutedTextColor,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            TROUBLESHOOTING
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: 52,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.15,
              ...titleGradient,
            }}
          >
            {troubleshootTitle}
          </h2>
        </div>

        {/* 中间决策树 + 右侧 Playbook */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 24,
            width: "100%",
            maxWidth: 1000,
            minWidth: 0,
          }}
        >
          {/* 树状决策图 */}
          <div
            style={{
              flex: "1 1 0",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
            }}
          >
            {/* 根节点 */}
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: textColor,
                backgroundColor: panelColor,
                border: `1px solid ${accentColor}`,
                borderRadius: 8,
                padding: "8px 16px",
                textAlign: "center",
                ...textWrap,
              }}
            >
              用户报告问题
            </div>

            {/* 竖线（lineGrow） */}
            <div
              style={{
                width: 2,
                height: 20 * lineProgress,
                backgroundColor: accentColor,
                borderRadius: 1,
                transformOrigin: "top center",
              }}
            />

            {/* 分支节点 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                width: "100%",
                maxWidth: 560,
                minWidth: 0,
              }}
            >
              {troubleshootBranches.map((branch, index) => {
                const delay = staggerDelay(index, 8) + 28;
                const anim = fadeInUp(frame, fps, delay, 36);
                const isABranch = index === 0;
                const highlighted = highlightActive && isABranch;
                return (
                  <div
                    key={`${branch.label}-${index}`}
                    style={{
                      backgroundColor: panelColor,
                      border: highlighted
                        ? `2px solid ${goldColor}`
                        : `1px solid ${accentColor}`,
                      borderRadius: 8,
                      padding: "8px 16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      minWidth: 0,
                      boxSizing: "border-box",
                      opacity: anim.opacity,
                      transform: `translateY(${anim.y}px)`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          color: textColor,
                          ...textWrap,
                          flex: "1 1 0",
                          minWidth: 0,
                        }}
                      >
                        {branch.label}
                      </span>
                      <span
                        style={{
                          fontSize: 18,
                          color: mutedTextColor,
                          fontWeight: 600,
                          flexShrink: 0,
                          ...textWrap,
                        }}
                      >
                        → {branch.target}
                      </span>
                    </div>
                    {highlighted ? (
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: goldColor,
                          ...textWrap,
                        }}
                      >
                        {troubleshootHighlightPath}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Playbook 列表 */}
          <div
            style={{
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              minWidth: 0,
              maxWidth: 200,
            }}
          >
            {troubleshootPlaybooks.map((name, index) => {
              const pbDelay = staggerDelay(index, 8) + 22;
              const x = slideFromRight(frame, fps, pbDelay, 120);
              return (
                <div
                  key={`${name}-${index}`}
                  style={{
                    fontSize: 18,
                    color: textColor,
                    fontWeight: 600,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    transform: `translateX(${x}px)`,
                    ...textWrap,
                  }}
                >
                  <span aria-hidden>📖</span>
                  <span>{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
