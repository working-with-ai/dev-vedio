import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { fadeInUp } from "./animations";

const textWrap: React.CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

export interface TitleBlockProps {
  label: string;
  title: string;
  subtitle?: string;
  sceneFrame: number;
  accentColor: string;
  highlightColor: string;
  textColor: string;
  labelDelay?: number;
}

export const TitleBlock: React.FC<TitleBlockProps> = ({
  label,
  title,
  subtitle,
  sceneFrame,
  accentColor,
  highlightColor,
  textColor,
  labelDelay = 0,
}) => {
  const { fps } = useVideoConfig();
  const labelFade = fadeInUp(sceneFrame, fps, labelDelay);
  const titleFade = fadeInUp(sceneFrame, fps, labelDelay + 6);
  const titleSpring = spring({
    frame: sceneFrame - labelDelay - 6,
    fps,
    config: { damping: 100, stiffness: 200, mass: 0.5 },
  });
  const titleScale = interpolate(titleSpring, [0, 1], [0.97, 1]);
  const subFade = subtitle
    ? fadeInUp(sceneFrame, fps, labelDelay + 18)
    : { opacity: 0, y: 12 };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        minWidth: 0,
        width: "100%",
      }}
    >
      {label ? (
        <div
          style={{
            fontSize: 20,
            letterSpacing: 10,
            color: accentColor,
            fontWeight: 800,
            opacity: labelFade.opacity,
            transform: `translateY(${labelFade.y}px)`,
            ...textWrap,
          }}
        >
          {label}
        </div>
      ) : null}
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          lineHeight: 1.08,
          background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: `0 0 28px ${highlightColor}40`,
          opacity: titleFade.opacity,
          transform: `translateY(${titleFade.y}px) scale(${titleScale})`,
          transformOrigin: "top left",
          ...textWrap,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: textColor,
            opacity: subFade.opacity,
            transform: `translateY(${subFade.y}px)`,
            ...textWrap,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};
