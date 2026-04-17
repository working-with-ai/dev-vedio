import React from "react";
import { AbsoluteFill } from "remotion";
import { SceneBackground } from "../../components/SceneBackground";
import type { SPXOpenAPILandscapeProps } from "./schema";
import { HookScene } from "./Scenes/HookScene";
import { PainPointsScene } from "./Scenes/PainPointsScene";
import { CapabilitiesScene } from "./Scenes/CapabilitiesScene";
import { QualityScene } from "./Scenes/QualityScene";
import { CodeGenScene } from "./Scenes/CodeGenScene";
import { ErrorAnalysisScene } from "./Scenes/ErrorAnalysisScene";
import { CTAScene } from "./Scenes/CTAScene";

// 说明：每张 Slide 对应视频里一段 Sequence。
// Scene 组件内部用 `coverPhase = frame < 5` 的分支把所有入场动画跳到终态，
// 因此在 Remotion Still 里（frame=0）直接就是"完整展开"的画面，
// 与 PPT 静态帧语义天然契合。
const createSlide = (
  SceneComponent: React.FC<SPXOpenAPILandscapeProps>,
): React.FC<SPXOpenAPILandscapeProps> => {
  const Slide: React.FC<SPXOpenAPILandscapeProps> = (props) => {
    const {
      backgroundColor,
      accentColor,
      highlightColor,
    } = props;
    return (
      <AbsoluteFill style={{ backgroundColor, overflow: "hidden" }}>
        <SceneBackground
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          particles={{ count: 36, color: accentColor }}
          hud={{ color: highlightColor, animation: "pulse", inset: 60 }}
        >
          {/* 透明背景：交给外层的 SceneBackground 负责底色 */}
          <SceneComponent {...props} backgroundColor="transparent" />
        </SceneBackground>
      </AbsoluteFill>
    );
  };
  Slide.displayName = `SPXOpenAPILandscapeSlide_${SceneComponent.name ?? "Anonymous"}`;
  return Slide;
};

export const SPXOpenAPILandscapeSlide1 = createSlide(HookScene);
export const SPXOpenAPILandscapeSlide2 = createSlide(PainPointsScene);
export const SPXOpenAPILandscapeSlide3 = createSlide(CapabilitiesScene);
export const SPXOpenAPILandscapeSlide4 = createSlide(QualityScene);
export const SPXOpenAPILandscapeSlide5 = createSlide(CodeGenScene);
export const SPXOpenAPILandscapeSlide6 = createSlide(ErrorAnalysisScene);
export const SPXOpenAPILandscapeSlide7 = createSlide(CTAScene);
