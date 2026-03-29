import { describe, expect, it } from "vitest";
import {
  VideoBriefSchema,
  derivePublishingSeed,
  type VideoBriefInput,
} from "./video-brief";

const createBrief = (
  overrides: Partial<VideoBriefInput> = {},
): VideoBriefInput => ({
  topic: "AI Harness Engineer",
  coreConclusion: "工程师价值正在转向搭建可靠的 AI 运行系统",
  coreFacts: [
    "Prompt 不再是最终交付",
    "Harness 决定稳定性与可复用性",
  ],
  sourceLinks: [
    {
      label: "OpenAI docs",
      url: "https://platform.openai.com/docs",
    },
  ],
  hookLine: "会搭 AI Harness 的工程师更值钱",
  hookProof: "因为团队真正买单的是稳定运行，不是单次 demo。",
  coreContrast: "Demo 能跑，不等于生产能跑。",
  coverTitle: "AI 最贵能力变了",
  coverSubtitle: "Prompt 之后是 Harness",
  shortTitle: "AI最贵能力变了",
  shortDescription: "会搭系统的人，正在吃到新红利",
  cta: "先学会把 AI 跑稳，再谈规模化提效。",
  visualTheme: {
    name: "signal-tech",
    accentColor: "#00e5ff",
    highlightColor: "#fbbf24",
  },
  targetDurationSec: 75,
  visualModules: [
    "hook-proof-card",
    "contrast-split",
    "system-diagram",
  ],
  sceneResetPlan: ["scene-1 promise", "scene-3 proof", "scene-5 system map"],
  sceneLayoutHints: ["top-safe", "single-line-subtitle"],
  subtitleDensityMode: "balanced",
  ...overrides,
});

describe("VideoBriefSchema", () => {
  it("accepts a valid structured brief", () => {
    const result = VideoBriefSchema.safeParse(createBrief());

    expect(result.success).toBe(true);
  });

  it("rejects a brief without coreFacts", () => {
    const result = VideoBriefSchema.safeParse(
      createBrief({
        coreFacts: [],
      }),
    );

    expect(result.success).toBe(false);
  });

  it("rejects a brief without valid sourceLinks", () => {
    const missingLinksResult = VideoBriefSchema.safeParse(
      createBrief({
        sourceLinks: [],
      }),
    );
    const invalidLinkResult = VideoBriefSchema.safeParse(
      createBrief({
        sourceLinks: [
          {
            label: "bad-link",
            url: "not-a-url",
          },
        ],
      }),
    );

    expect(missingLinksResult.success).toBe(false);
    expect(invalidLinkResult.success).toBe(false);
  });
});

describe("derivePublishingSeed", () => {
  it("returns publishing fields that stay aligned across script, cover, and feed", () => {
    const seed = derivePublishingSeed(createBrief());

    expect(seed.heroClaim).toBe("会搭 AI Harness 的工程师更值钱");
    expect(seed.proofLine).toBe("因为团队真正买单的是稳定运行，不是单次 demo。");
    expect(seed.cover.title).toBe("AI 最贵能力变了");
    expect(seed.feed.shortTitle).toBe("AI最贵能力变了");
    expect(seed.feed.shortDescription).toBe("会搭系统的人，正在吃到新红利");
    expect(seed.script.openingHook).toBe(seed.heroClaim);
    expect(seed.script.proofBeat).toBe(seed.proofLine);
    expect(seed.production.visualModules).toHaveLength(3);
  });
});
