import { describe, expect, it } from "vitest";
import type { VideoBrief } from "./video-brief";
import {
  assertRegistryCoverage,
  buildDiscoveryPayload,
  resolveRenderInput,
} from "./render-contract";
import {
  type VideoCompositionCatalogEntry,
  videoCompositionCatalog,
  videoStillCatalog,
} from "../compositions/catalog";

const brief: VideoBrief = {
  topic: "AI Harness Engineer",
  coreConclusion: "稳定系统比一次性 Demo 更值钱",
  coreFacts: ["Harness 统一 prompt、工具与校验", "生产环境要求可重复与可追踪"],
  sourceLinks: [
    {
      label: "OpenAI",
      url: "https://platform.openai.com/docs",
    },
  ],
  hookLine: "Prompt 之后，真正值钱的是 Harness",
  hookProof: "团队最后买单的是稳定运行，不是你演示时那一下能跑。",
  coreContrast: "Demo 能跑，不等于生产能跑。",
  coverTitle: "AI工程师价值变了",
  coverSubtitle: "会搭 Harness 的人更贵",
  shortTitle: "AI工程师价值变了",
  shortDescription: "能把 AI 跑稳的人，开始变贵了",
  cta: "先把 AI 跑稳，再谈规模化。",
  visualTheme: {
    name: "signal-tech",
    accentColor: "#00e5ff",
  },
  targetDurationSec: 75,
  visualModules: ["hook-proof-card", "contrast-split", "system-diagram"],
  sceneResetPlan: ["scene-1 promise", "scene-3 proof"],
  sceneLayoutHints: ["top-safe"],
  subtitleDensityMode: "balanced",
};

describe("resolveRenderInput", () => {
  it("merges brief-derived publishing fields into render input props", () => {
    const resolved = resolveRenderInput({
      compositionId: "AIHarnessEngineer",
      inputProps: {
        custom: "value",
      },
      brief,
    });

    expect(resolved.registryEntry.templateType).toBe("vertical-7-scene");
    expect(resolved.inputProps.custom).toBe("value");
    expect(resolved.inputProps.brief).toEqual(brief);
    expect(resolved.inputProps.publishingSeed).toMatchObject({
      heroClaim: brief.hookLine,
      cover: {
        title: brief.coverTitle,
      },
    });
  });
});

describe("buildDiscoveryPayload", () => {
  it("returns still, output, templateType and platformProfiles metadata", () => {
    const payload = buildDiscoveryPayload(["AIHarnessEngineer", "PencilDev"]);
    const harnessEntry = payload.find(
      (entry) => entry.compositionId === "AIHarnessEngineer",
    );

    expect(payload).toHaveLength(2);
    expect(harnessEntry).toMatchObject({
      stillId: "AIHarnessEngineerCover",
      templateType: "vertical-7-scene",
      output: {
        cover: "out/AIHarnessEngineer-cover.png",
      },
      platformProfiles: {
        videoChannel: {
          titleMaxChars: 16,
        },
      },
    });
  });
});

describe("assertRegistryCoverage", () => {
  it("passes when catalog and registry stay aligned", () => {
    expect(assertRegistryCoverage()).toBe(true);
  });

  it("fails when a catalog composition is missing from the comparison set", () => {
    const brokenCatalog = videoCompositionCatalog.filter(
      (entry) => entry.id !== "HelloWorld",
    );

    expect(() =>
      assertRegistryCoverage(
        brokenCatalog as readonly VideoCompositionCatalogEntry[],
        videoStillCatalog,
      ),
    ).toThrow();
  });
});
