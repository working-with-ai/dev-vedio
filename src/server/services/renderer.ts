import { bundle } from "@remotion/bundler";
import {
  getCompositions,
  renderMedia,
  selectComposition,
} from "@remotion/renderer";
import path from "path";
import { RenderRequest, RenderResponse } from "../../shared/types";

// 缓存 bundled 结果
let bundleLocation: string | null = null;

const OUT_DIR = path.join(process.cwd(), "out");

/**
 * Resolve a user-provided output name to an absolute path under `out/`.
 * Rejects traversal (../, nested paths) via basename + resolved-prefix check.
 */
function resolveSafeOutputPath(
  outputFileName: string | undefined,
  defaultBaseName: string,
): string {
  const outResolved = path.resolve(OUT_DIR);
  const raw =
    typeof outputFileName === "string" && outputFileName.trim() !== ""
      ? outputFileName.trim().replace(/\\/g, "/")
      : "";
  let base = raw ? path.basename(raw) : defaultBaseName;
  if (!base || base === "." || base === "..") {
    base = defaultBaseName;
  }
  if (base.includes("\0")) {
    base = defaultBaseName;
  }
  const resolved = path.resolve(outResolved, base);
  const guardPrefix = outResolved + path.sep;
  if (resolved !== outResolved && !resolved.startsWith(guardPrefix)) {
    throw new Error("Invalid outputFileName: must stay inside the out directory");
  }
  return resolved;
}

async function getBundleLocation(): Promise<string> {
  if (bundleLocation) {
    return bundleLocation;
  }

  console.log("📦 Bundling Remotion project...");
  const entryPoint = path.join(process.cwd(), "src/index.ts");

  bundleLocation = await bundle({
    entryPoint,
    onProgress: (progress) => {
      if (progress % 20 === 0) {
        console.log(`  Bundle progress: ${progress}%`);
      }
    },
  });

  console.log("✅ Bundle complete");
  return bundleLocation;
}

export async function renderVideo(
  request: RenderRequest
): Promise<RenderResponse> {
  const startTime = Date.now();

  try {
    const bundleLocation = await getBundleLocation();

    // 选择 composition
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: request.compositionId,
      inputProps: request.inputProps,
    });

    const defaultBaseName = `${request.compositionId}-${Date.now()}.mp4`;
    const outputPath = resolveSafeOutputPath(
      request.outputFileName,
      defaultBaseName,
    );

    console.log(`🎬 Rendering "${request.compositionId}" to ${outputPath}...`);

    // 渲染视频
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: outputPath,
      inputProps: request.inputProps,
      onProgress: ({ progress }) => {
        const percent = Math.round(progress * 100);
        if (percent % 25 === 0) {
          console.log(`  Render progress: ${percent}%`);
        }
      },
    });

    const durationMs = Date.now() - startTime;
    console.log(`✅ Render complete in ${durationMs}ms`);

    return {
      success: true,
      outputPath,
      durationMs,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`❌ Render failed: ${errorMessage}`);

    return {
      success: false,
      error: errorMessage,
      durationMs: Date.now() - startTime,
    };
  }
}

// 获取可用的 composition 列表（与 Root 注册同步，来自 bundle 内静态 compositions）
export async function getAvailableCompositions(): Promise<string[]> {
  const serveUrl = await getBundleLocation();
  const compositions = await getCompositions(serveUrl, {
    inputProps: {},
    logLevel: "error",
  });
  return compositions.map((c) => c.id);
}

// 清除 bundle 缓存（用于开发时热重载）
export function clearBundleCache(): void {
  bundleLocation = null;
  console.log("🗑️ Bundle cache cleared");
}
