import React, { useMemo } from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneBackground } from "../../../components/SceneBackground";
import { HandDrawnDiagram, DiagramNode, DiagramEdge } from "../../../components/HandDrawnDiagram";
import { AutoResearchProps } from "../schema";
import { fadeInUp } from "../animations";

export const CoreScene: React.FC<AutoResearchProps> = ({
  backgroundColor,
  textColor,
  accentColor,
  highlightColor,
  coreTitle,
  coreSubtitle,
  loopSteps,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleAnim = fadeInUp(frame, fps, 0, 60);
  const subtitleAnim = fadeInUp(frame, fps, 10, 40);

  const diagramStart = Math.round(fps * 1.2);

  const sloganStart = Math.round(durationInFrames * 0.78);
  const sloganAnim = spring({
    frame: frame - sloganStart,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const diagramNodes = useMemo<DiagramNode[]>(() => {
    if (!loopSteps || loopSteps.length < 4) return [];
    return [
      { id: "step1", label: loopSteps[0].name, emoji: loopSteps[0].icon, x: 40, y: 20, width: 400, height: 120, color: loopSteps[0].color, order: 0 },
      { id: "step2", label: loopSteps[1].name, emoji: loopSteps[1].icon, x: 540, y: 20, width: 400, height: 120, color: loopSteps[1].color, order: 1 },
      { id: "step3", label: loopSteps[2].name, emoji: loopSteps[2].icon, x: 540, y: 220, width: 400, height: 120, color: loopSteps[2].color, order: 2 },
      { id: "step4", label: loopSteps[3].name, emoji: loopSteps[3].icon, x: 40, y: 220, width: 400, height: 120, color: loopSteps[3].color, order: 3 },
    ];
  }, [loopSteps]);

  const diagramEdges = useMemo<DiagramEdge[]>(() => {
    if (!loopSteps || loopSteps.length < 4) return [];
    return [
      { from: "step1", to: "step2", color: loopSteps[0].color, order: 0 },
      { from: "step2", to: "step3", color: loopSteps[1].color, order: 1 },
      { from: "step3", to: "step4", color: loopSteps[2].color, order: 2 },
      { from: "step4", to: "step1", label: "循环", color: loopSteps[3].color, order: 3 },
    ];
  }, [loopSteps]);

  const diagramOpacity = interpolate(frame - diagramStart, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneBackground
      backgroundColor={backgroundColor}
      accentColor={accentColor}
      particles={{ count: 25, speed: 0.3, opacity: 0.35 }}
      glow={{
        orbs: [
          { x: "50%", y: "40%", color: accentColor, radius: 500, opacity: 0.12, pulseSpeed: 0.6 },
        ],
      }}
      scanlines
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
          padding: "0 40px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
            opacity: titleAnim.opacity,
            transform: `translateY(${titleAnim.y}px)`,
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 20, color: accentColor, letterSpacing: 10, marginBottom: 14, fontWeight: 700 }}>
            CORE MECHANISM
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: textColor, textShadow: `0 0 40px ${accentColor}44` }}>
            {coreTitle}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            opacity: subtitleAnim.opacity,
            transform: `translateY(${subtitleAnim.y}px)`,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 26,
              color: "#999",
              padding: "10px 30px",
              borderRadius: 20,
              border: `1px solid ${accentColor}22`,
              background: `${accentColor}08`,
            }}
          >
            {coreSubtitle}
          </div>
        </div>

        {diagramNodes.length > 0 && (
          <div style={{ opacity: diagramOpacity, marginBottom: 30 }}>
            <HandDrawnDiagram
              nodes={diagramNodes}
              edges={diagramEdges}
              accentColor={accentColor}
              textColor={textColor}
              strokeWidth={3}
              drawFramesPerElement={18}
              staggerFrames={15}
            />
          </div>
        )}

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 36,
              fontWeight: 900,
              color: accentColor,
              opacity: interpolate(sloganAnim, [0, 1], [0, 1]),
              transform: `scale(${interpolate(sloganAnim, [0, 1], [0.8, 1])})`,
              textShadow: `0 0 30px ${accentColor}44`,
              letterSpacing: 2,
            }}
          >
            你去蒸桑拿 · AI帮你跑实验
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
