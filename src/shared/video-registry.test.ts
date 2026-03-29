import { describe, expect, it } from "vitest";
import {
  VideoTemplateRegistryEntrySchema,
  getPlatformProfile,
  getVideoTemplateByCompositionId,
  listVideoTemplates,
  videoTemplateRegistry,
} from "./video-registry";

describe("videoTemplateRegistry", () => {
  it("validates every registry entry against the schema", () => {
    for (const entry of videoTemplateRegistry) {
      expect(() => VideoTemplateRegistryEntrySchema.parse(entry)).not.toThrow();
    }
  });

  it("keeps compositionId values unique", () => {
    const compositionIds = videoTemplateRegistry.map((entry) => entry.compositionId);
    const uniqueIds = new Set(compositionIds);

    expect(uniqueIds.size).toBe(compositionIds.length);
  });

  it("exposes output, templateType, safeAreaProfile, subtitleMode and videoChannel metadata", () => {
    for (const entry of videoTemplateRegistry) {
      expect(entry.output.video).toMatch(/^out\//);
      expect(entry.templateType.length).toBeGreaterThan(0);
      expect(entry.safeAreaProfile.id.length).toBeGreaterThan(0);
      expect(entry.subtitleMode.length).toBeGreaterThan(0);
      expect(entry.platformProfiles.videoChannel.platform).toBe("videoChannel");
    }
  });

  it("returns still, output and platform metadata from helpers", () => {
    const entry = getVideoTemplateByCompositionId("AIHarnessEngineer");
    const profile = getPlatformProfile("AIHarnessEngineer");
    const templates = listVideoTemplates();

    expect(entry?.stillId).toBe("AIHarnessEngineerCover");
    expect(entry?.output.cover).toBe("out/AIHarnessEngineer-cover.png");
    expect(profile?.titleMaxChars).toBe(16);
    expect(templates.some((item) => item.compositionId === "AIHarnessEngineer")).toBe(true);
  });
});
