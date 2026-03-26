import { interpolate, spring, Easing } from "remotion";

export * from "./animations";

// ===== 管线/节点展开 =====

export const pipelineNodeReveal = (
  frame: number,
  fps: number,
  index: number,
  baseDelay: number = 0
) => {
  const delay = baseDelay + index * 10;
  const sp = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.5 },
  });
  return {
    opacity: interpolate(sp, [0, 1], [0, 1]),
    scale: interpolate(sp, [0, 1], [0.4, 1]),
    y: interpolate(sp, [0, 1], [30, 0]),
  };
};

export const lineGrow = (
  frame: number,
  fps: number,
  delay: number = 0,
  durationSec: number = 0.4
) => {
  return interpolate(frame - delay, [0, durationSec * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
};

export const chatBubbleIn = (
  frame: number,
  fps: number,
  delay: number = 0
) => {
  const sp = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 200, mass: 0.4 },
  });
  return {
    opacity: interpolate(sp, [0, 1], [0, 1]),
    scale: interpolate(sp, [0, 1], [0.6, 1]),
    y: interpolate(sp, [0, 1], [20, 0]),
  };
};

// ===== 压力/节点展示 =====

export const nodeReveal = (
  frame: number,
  fps: number,
  index: number,
  baseDelay: number = 0
) => {
  const delay = baseDelay + index * 18;
  const sp = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.5 },
  });
  return {
    opacity: interpolate(sp, [0, 1], [0, 1]),
    scale: interpolate(sp, [0, 1], [0.4, 1]),
    y: interpolate(sp, [0, 1], [30, 0]),
  };
};

export const pressureReveal = (
  frame: number,
  fps: number,
  index: number,
  baseDelay: number = 0
) => {
  const delay = baseDelay + index * 18;
  const sp = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.5 },
  });
  return {
    opacity: interpolate(sp, [0, 1], [0, 1]),
    scale: interpolate(sp, [0, 1], [0.4, 1]),
    y: interpolate(sp, [0, 1], [30, 0]),
  };
};

export const shakeEffect = (frame: number, intensity: number = 1) => {
  const shake = Math.sin(frame * 47.3) * Math.cos(frame * 31.7);
  return {
    x: shake * 3 * intensity,
    y: Math.cos(frame * 23.1) * 2 * intensity,
  };
};

export const pipelineGrow = (
  frame: number,
  fps: number,
  index: number,
  baseDelay: number = 0
) => {
  const delay = baseDelay + index * 25;
  const sp = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 140, mass: 0.5 },
  });
  return {
    opacity: interpolate(sp, [0, 1], [0, 1]),
    scale: interpolate(sp, [0, 1], [0.6, 1]),
    x: interpolate(sp, [0, 1], [80, 0]),
  };
};

export const loopRotate = (
  frame: number,
  fps: number,
  index: number,
  total: number,
  baseDelay: number = 0
) => {
  const delay = baseDelay + index * 15;
  const sp = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.5 },
  });
  const angle = (index / total) * 360;
  return {
    opacity: interpolate(sp, [0, 1], [0, 1]),
    scale: interpolate(sp, [0, 1], [0.3, 1]),
    angle,
  };
};
