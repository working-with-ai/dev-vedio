import {
  getCatalogCompositionIds,
  getCatalogStillIds,
  type VideoCompositionCatalogEntry,
  type VideoStillCatalogEntry,
  videoCompositionCatalog,
  videoStillCatalog,
} from "../compositions/catalog";
import {
  derivePublishingSeed,
  type PublishingSeed,
  type VideoBrief,
} from "./video-brief";
import {
  getVideoTemplateByCompositionId,
  videoTemplateRegistry,
  type VideoTemplateRegistryEntry,
} from "./video-registry";

export interface ResolveRenderInputArgs {
  compositionId: string;
  inputProps?: Record<string, unknown>;
  brief?: VideoBrief;
}

export interface ResolvedRenderInput {
  compositionId: string;
  registryEntry: VideoTemplateRegistryEntry;
  inputProps: Record<string, unknown>;
  publishingSeed?: PublishingSeed;
}

export interface DiscoverableComposition {
  compositionId: string;
  stillId: string | null;
  templateType: string;
  aspectRatio: string;
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  safeAreaProfile: VideoTemplateRegistryEntry["safeAreaProfile"];
  subtitleMode: VideoTemplateRegistryEntry["subtitleMode"];
  supports: VideoTemplateRegistryEntry["supports"];
  output: VideoTemplateRegistryEntry["output"];
  platformProfiles: VideoTemplateRegistryEntry["platformProfiles"];
}

const getRuntimeCatalogEntry = (
  compositionId: string,
  catalog: readonly VideoCompositionCatalogEntry[] = videoCompositionCatalog,
): VideoCompositionCatalogEntry => {
  const catalogEntry = catalog.find((entry) => entry.id === compositionId);
  if (!catalogEntry) {
    throw new Error(`Composition "${compositionId}" is not registered in catalog`);
  }
  return catalogEntry;
};

export const resolveRenderInput = ({
  compositionId,
  inputProps = {},
  brief,
}: ResolveRenderInputArgs): ResolvedRenderInput => {
  const registryEntry = getVideoTemplateByCompositionId(compositionId);
  if (!registryEntry) {
    throw new Error(`Composition "${compositionId}" is not registered in videoTemplateRegistry`);
  }

  getRuntimeCatalogEntry(compositionId);

  const publishingSeed = brief ? derivePublishingSeed(brief) : undefined;
  const mergedInputProps = {
    ...inputProps,
    ...(brief ? { brief } : {}),
    ...(publishingSeed ? { publishingSeed } : {}),
  };

  return {
    compositionId,
    registryEntry,
    inputProps: mergedInputProps,
    publishingSeed,
  };
};

export const buildDiscoveryPayload = (
  runtimeCompositionIds: readonly string[] = getCatalogCompositionIds(),
): DiscoverableComposition[] =>
  videoCompositionCatalog
    .filter((entry) => runtimeCompositionIds.includes(entry.id))
    .map((entry) => ({
      compositionId: entry.id,
      stillId: entry.registryEntry.stillId,
      templateType: entry.registryEntry.templateType,
      aspectRatio: entry.registryEntry.aspectRatio,
      width: entry.width,
      height: entry.height,
      fps: entry.fps,
      durationInFrames: entry.durationInFrames,
      safeAreaProfile: entry.registryEntry.safeAreaProfile,
      subtitleMode: entry.registryEntry.subtitleMode,
      supports: entry.registryEntry.supports,
      output: entry.registryEntry.output,
      platformProfiles: entry.registryEntry.platformProfiles,
    }));

export const assertRegistryCoverage = (
  compositionCatalog: readonly VideoCompositionCatalogEntry[] = videoCompositionCatalog,
  stillCatalog: readonly VideoStillCatalogEntry[] = videoStillCatalog,
): true => {
  const registryCompositionIds = new Set(
    videoTemplateRegistry.map((entry) => entry.compositionId),
  );
  const catalogCompositionIds = new Set(
    compositionCatalog.map((entry) => entry.id),
  );

  for (const compositionId of registryCompositionIds) {
    if (!catalogCompositionIds.has(compositionId)) {
      throw new Error(
        `Registry composition "${compositionId}" is missing from videoCompositionCatalog`,
      );
    }
  }

  for (const compositionId of catalogCompositionIds) {
    if (!registryCompositionIds.has(compositionId)) {
      throw new Error(
        `Catalog composition "${compositionId}" is missing from videoTemplateRegistry`,
      );
    }
  }

  const registryStillIds = new Set(
    videoTemplateRegistry
      .map((entry) => entry.stillId)
      .filter((value): value is string => Boolean(value)),
  );
  const catalogStillIds = new Set(stillCatalog.map((entry) => entry.id));

  for (const stillId of registryStillIds) {
    if (!catalogStillIds.has(stillId)) {
      throw new Error(`Registry still "${stillId}" is missing from videoStillCatalog`);
    }
  }

  for (const stillId of catalogStillIds) {
    if (!registryStillIds.has(stillId)) {
      throw new Error(`Catalog still "${stillId}" is missing from videoTemplateRegistry`);
    }
  }

  const knownStillIds = new Set(getCatalogStillIds());
  for (const entry of compositionCatalog) {
    const stillId = entry.registryEntry.stillId;
    if (stillId && !knownStillIds.has(stillId)) {
      throw new Error(
        `Composition "${entry.id}" references still "${stillId}" which is not in videoStillCatalog`,
      );
    }
  }

  return true;
};
