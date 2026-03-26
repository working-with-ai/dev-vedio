import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface HudFrameProps {
  color?: string;
  cornerSize?: number;
  strokeWidth?: number;
  inset?: number;
  animation?: "static" | "pulse" | "scan";
  scanSpeed?: number;
}

export const HudFrame: React.FC<HudFrameProps> = ({
  color = "#8b5cf6",
  cornerSize = 60,
  strokeWidth = 2,
  inset = 40,
  animation = "pulse",
  scanSpeed = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const fadeIn = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 80 },
  });

  let baseOpacity: number;
  if (animation === "pulse") {
    const pulse = 0.4 + 0.3 * Math.sin((frame / fps) * Math.PI * 2 * 0.5);
    baseOpacity = interpolate(fadeIn, [0, 1], [0, pulse]);
  } else if (animation === "scan") {
    baseOpacity = interpolate(fadeIn, [0, 1], [0, 0.6]);
  } else {
    baseOpacity = interpolate(fadeIn, [0, 1], [0, 0.6]);
  }

  const scanProgress = animation === "scan"
    ? ((frame / fps) * scanSpeed) % 1
    : 0;

  const cornerStyle = (
    top: boolean,
    left: boolean
  ): React.CSSProperties => ({
    position: "absolute",
    width: cornerSize,
    height: cornerSize,
    ...(top ? { top: inset } : { bottom: inset }),
    ...(left ? { left: inset } : { right: inset }),
    borderColor: color,
    borderStyle: "solid",
    borderWidth: 0,
    ...(top && left
      ? { borderTopWidth: strokeWidth, borderLeftWidth: strokeWidth }
      : top && !left
        ? { borderTopWidth: strokeWidth, borderRightWidth: strokeWidth }
        : !top && left
          ? { borderBottomWidth: strokeWidth, borderLeftWidth: strokeWidth }
          : { borderBottomWidth: strokeWidth, borderRightWidth: strokeWidth }),
    opacity: baseOpacity,
    pointerEvents: "none" as const,
  });

  const innerWidth = width - inset * 2;
  const innerHeight = height - inset * 2;
  const perimeter = 2 * (innerWidth + innerHeight);
  const scanDotPos = scanProgress * perimeter;

  let scanX: number, scanY: number;
  if (scanDotPos < innerWidth) {
    scanX = inset + scanDotPos;
    scanY = inset;
  } else if (scanDotPos < innerWidth + innerHeight) {
    scanX = inset + innerWidth;
    scanY = inset + (scanDotPos - innerWidth);
  } else if (scanDotPos < 2 * innerWidth + innerHeight) {
    scanX = inset + innerWidth - (scanDotPos - innerWidth - innerHeight);
    scanY = inset + innerHeight;
  } else {
    scanX = inset;
    scanY = inset + innerHeight - (scanDotPos - 2 * innerWidth - innerHeight);
  }

  return (
    <>
      <div style={cornerStyle(true, true)} />
      <div style={cornerStyle(true, false)} />
      <div style={cornerStyle(false, true)} />
      <div style={cornerStyle(false, false)} />

      {animation === "scan" && (
        <div
          style={{
            position: "absolute",
            left: scanX - 6,
            top: scanY - 6,
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: color,
            boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
            opacity: baseOpacity * 1.5,
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
};

export default HudFrame;
