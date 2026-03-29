import { z } from "zod";

export const subtitleDensityModes = [
  "compact",
  "balanced",
  "dense",
] as const;

export const SubtitleDensityModeSchema = z.enum(subtitleDensityModes);

export const visualModuleKinds = [
  "hook-proof-card",
  "contrast-split",
  "system-diagram",
  "scoreboard",
  "timeline",
  "case-study-card",
  "cta-panel",
] as const;

export const VisualModuleKindSchema = z.enum(visualModuleKinds);

export const SourceLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

export const VisualThemeSchema = z.object({
  name: z.string().min(1),
  backgroundColor: z.string().min(1).optional(),
  accentColor: z.string().min(1).optional(),
  highlightColor: z.string().min(1).optional(),
  tone: z.string().min(1).optional(),
});

export const VideoBriefSchema = z.object({
  topic: z.string().min(1),
  coreConclusion: z.string().min(1),
  coreFacts: z.array(z.string().min(1)).min(1),
  sourceLinks: z.array(SourceLinkSchema).min(1),
  hookLine: z.string().min(1),
  hookProof: z.string().min(1),
  coreContrast: z.string().min(1),
  coverTitle: z.string().min(1),
  coverSubtitle: z.string().min(1),
  shortTitle: z.string().min(1).max(16),
  shortDescription: z.string().min(1).max(40),
  cta: z.string().min(1),
  visualTheme: VisualThemeSchema,
  targetDurationSec: z.number().int().positive().max(300),
  visualModules: z.array(VisualModuleKindSchema).min(3),
  sceneResetPlan: z.array(z.string().min(1)).min(1),
  sceneLayoutHints: z.array(z.string().min(1)).default([]),
  subtitleDensityMode: SubtitleDensityModeSchema,
});

export type VideoBriefInput = z.input<typeof VideoBriefSchema>;
export type VideoBrief = z.infer<typeof VideoBriefSchema>;

export const PublishingSeedSchema = z.object({
  topic: z.string(),
  heroClaim: z.string(),
  proofLine: z.string(),
  cover: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  feed: z.object({
    shortTitle: z.string(),
    shortDescription: z.string(),
    cta: z.string(),
  }),
  script: z.object({
    openingHook: z.string(),
    proofBeat: z.string(),
    contrastLine: z.string(),
    factHighlights: z.array(z.string()),
  }),
  production: z.object({
    targetDurationSec: z.number(),
    visualModules: z.array(VisualModuleKindSchema),
    sceneResetPlan: z.array(z.string()),
    sceneLayoutHints: z.array(z.string()),
    subtitleDensityMode: SubtitleDensityModeSchema,
  }),
  sources: z.array(SourceLinkSchema),
  visualTheme: VisualThemeSchema,
});

export type PublishingSeed = z.infer<typeof PublishingSeedSchema>;

export const derivePublishingSeed = (
  input: VideoBriefInput,
): PublishingSeed => {
  const brief = VideoBriefSchema.parse(input);

  return PublishingSeedSchema.parse({
    topic: brief.topic,
    heroClaim: brief.hookLine,
    proofLine: brief.hookProof,
    cover: {
      title: brief.coverTitle,
      subtitle: brief.coverSubtitle,
    },
    feed: {
      shortTitle: brief.shortTitle,
      shortDescription: brief.shortDescription,
      cta: brief.cta,
    },
    script: {
      openingHook: brief.hookLine,
      proofBeat: brief.hookProof,
      contrastLine: brief.coreContrast,
      factHighlights: brief.coreFacts,
    },
    production: {
      targetDurationSec: brief.targetDurationSec,
      visualModules: brief.visualModules,
      sceneResetPlan: brief.sceneResetPlan,
      sceneLayoutHints: brief.sceneLayoutHints,
      subtitleDensityMode: brief.subtitleDensityMode,
    },
    sources: brief.sourceLinks,
    visualTheme: brief.visualTheme,
  });
};
