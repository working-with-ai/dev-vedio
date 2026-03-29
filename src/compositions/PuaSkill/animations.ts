import { interpolate, Easing } from "remotion";

export {
  fadeInUp,
  fadeIn,
  scaleIn,
  glitchOffset,
  pulseGlow,
  numberCountUp,
  staggerDelay,
  cardSlideIn,
  pressureReveal,
  shakeEffect,
} from "../../shared/animations-vertical";

/**
 * PuaSkill-specific progressBar: returns 0..1 (not 0..100),
 * with param order (frame, fps, delay, durationSec).
 * Kept for backward compatibility with BenchmarkScene.
 */
export const progressBar = (
  frame: number,
  fps: number,
  delay: number = 0,
  durationSec: number = 1.5
) => {
  return interpolate(frame - delay, [0, durationSec * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
};
