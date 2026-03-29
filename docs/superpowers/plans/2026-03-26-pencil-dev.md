# Pencil.dev Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 7-scene vertical short video (`PencilDev`) plus cover still, voiceover pipeline, subtitles, render scripts, and platform copy for the new Pencil.dev topic.

**Architecture:** Follow the repo's existing vertical-video pattern: one composition folder with `schema.ts`, `index.tsx`, `animations.ts`, `Cover.tsx`, and 7 scene components; register in `src/compositions/index.ts` and `src/Root.tsx`; generate audio via an explicit TTS script; derive timings from a subtitle sync script; prefer shared animation utilities from `src/shared/animations-vertical.ts`.

**Tech Stack:** Remotion, React, TypeScript, Zod, edge-tts, music-metadata

**Spec:** `docs/superpowers/specs/2026-03-26-pencil-dev-design.md`

**Testing Note:** This repo has no unit-test runner. Do not invent one. Verification should use `npm run typecheck`, script outputs, targeted Studio preview, and render smoke checks.

---

## File Structure

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/compositions/PencilDev/schema.ts` | Zod schema + typed defaults for 7-scene composition |
| Create | `src/compositions/PencilDev/animations.ts` | Re-export shared vertical animation helpers |
| Create | `src/compositions/PencilDev/index.tsx` | Main composition orchestration: sequences, audio, subtitles, progress |
| Create | `src/compositions/PencilDev/Cover.tsx` | 3:4 cover still |
| Create | `src/compositions/PencilDev/Scenes/HookScene.tsx` | Scene 1: old tools退场 Hook |
| Create | `src/compositions/PencilDev/Scenes/PainScene.tsx` | Scene 2: old workflow context switching |
| Create | `src/compositions/PencilDev/Scenes/CoreScene.tsx` | Scene 3: design + code + AI in IDE |
| Create | `src/compositions/PencilDev/Scenes/AgentScene.tsx` | Scene 4: Agent Team sci-fi shot |
| Create | `src/compositions/PencilDev/Scenes/ProofScene.tsx` | Scene 5: MCP / Skill / Agent proof |
| Create | `src/compositions/PencilDev/Scenes/DailyUseScene.tsx` | Scene 6: main-tool proof and PDF export |
| Create | `src/compositions/PencilDev/Scenes/CTAScene.tsx` | Scene 7: workflow换代 CTA |
| Modify | `src/compositions/index.ts` | Export composition, schema, cover |
| Modify | `src/Root.tsx` | Register `Composition` and `Still`; wire default props, audio files, subtitles |
| Modify | `src/server/services/renderer.ts` | Expose `PencilDev` / `PencilDevCover` to API rendering if registry is static |
| Modify | `package.json` | Add `generate:voiceover:pencildev`, `sync:subtitle:pencildev`, `render:pencildev`, `render:pencildev:cover` |
| Create | `scripts/generate-voiceover-pencildev.ts` | Generate 7 scene audio files via edge-tts |
| Create | `scripts/sync-subtitle-pencildev.ts` | Sync actual audio durations and emit subtitle JSON |
| Create | `src/data/pencildev-subtitles.json` | Synced subtitle output |
| Create | `public/audio/pencildev-scene*.mp3/.vtt` | Generated voiceover artifacts |

---

## Task 1: Schema and Animation Setup

**Files:**
- Create: `src/compositions/PencilDev/schema.ts`
- Create: `src/compositions/PencilDev/animations.ts`

- [ ] **Step 1: Create `schema.ts`**

Mirror the structure of `src/compositions/AutoResearch/schema.ts` and `src/compositions/WeChatClawBot/schema.ts`.

Include:
- Shared `SubtitleConfigSchema`
- Shared `AudioConfigSchema`
- Scene content props for all 7 scenes
- Color palette props from the spec
- `voiceoverScripts`
- `precomputedSubtitles`
- `sceneDurations`

Scene prop groups to include:
- Hook: old tool labels, main hook lines
- Pain: workflow steps / switch pain points
- Core: design + code + AI panel labels
- Agent: agent cards and center-canvas labels
- Proof: proof node labels, logs preview, integration statement
- DailyUse: usage evidence cards, PDF export badge
- CTA: slogan, subtitle, hashtags

- [ ] **Step 2: Create `animations.ts`**

Re-export from shared vertical helpers only:

```ts
export {
  fadeInUp,
  fadeIn,
  fadeOut,
  scaleIn,
  slideFromLeft,
  slideFromRight,
  glitchOffset,
  scanLineOpacity,
  typewriterLength,
  numberCountUp,
  pulseGlow,
  progressBar,
  staggerDelay,
  cardSlideIn,
  shimmer,
  pipelineNodeReveal,
  lineGrow,
  chatBubbleIn,
} from "../../shared/animations-vertical";
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck`

Expected:
- No `PencilDev/schema.ts` type errors
- No missing exports from shared animations
- Do not register `PencilDev` in `Root.tsx` yet

- [ ] **Step 4: Optional checkpoint commit**

Only if the user explicitly asks for commits:

```bash
git add src/compositions/PencilDev/schema.ts src/compositions/PencilDev/animations.ts
git commit -m "feat(pencildev): add schema and animation setup"
```

---

## Task 2: Implement Scene Batch 1 — Hook, Pain, Core

**Files:**
- Create: `src/compositions/PencilDev/Scenes/HookScene.tsx`
- Create: `src/compositions/PencilDev/Scenes/PainScene.tsx`
- Create: `src/compositions/PencilDev/Scenes/CoreScene.tsx`

- [ ] **Step 1: Implement `HookScene.tsx`**

Reference:
- `src/compositions/AutoResearch/Scenes/HookScene.tsx`
- `src/compositions/OpenClawAI/Scenes/HookScene.tsx`

Must include:
- Full-cover first frame
- Left old-tool ghost cards vs right active Pencil panel
- Big headline and subtitle from schema
- `SceneBackground` wrapper with cold blue / cyan theme
- Strong contrast and minimal text density

- [ ] **Step 2: Implement `PainScene.tsx`**

Must include:
- `CONTEXT SWITCH` label
- 3-4 app/window tiles entering and exiting
- Clear "switching cost" / "搬运成本" indicator
- Bottom quote showing old workflow now feels clumsy

- [ ] **Step 3: Implement `CoreScene.tsx`**

Must include:
- 3-column IDE-like panel layout
- Labels for design / code / AI
- One central design canvas preview
- Minimal copy; this scene should visually explain the product delta

- [ ] **Step 4: Verify**

Run: `npm run typecheck`

Expected:
- Scene props match schema
- No missing imports from shared components / Remotion

- [ ] **Step 5: Optional checkpoint commit**

```bash
git add src/compositions/PencilDev/Scenes/HookScene.tsx src/compositions/PencilDev/Scenes/PainScene.tsx src/compositions/PencilDev/Scenes/CoreScene.tsx
git commit -m "feat(pencildev): add hook pain core scenes"
```

---

## Task 3: Implement Scene Batch 2 — Agent, Proof, DailyUse, CTA

**Files:**
- Create: `src/compositions/PencilDev/Scenes/AgentScene.tsx`
- Create: `src/compositions/PencilDev/Scenes/ProofScene.tsx`
- Create: `src/compositions/PencilDev/Scenes/DailyUseScene.tsx`
- Create: `src/compositions/PencilDev/Scenes/CTAScene.tsx`

- [ ] **Step 1: Implement `AgentScene.tsx`**

Must include:
- Center design canvas
- 4 surrounding agent nodes/cards
- Connecting lines with `lineGrow`
- High sci-fi value, but still readable on mobile

- [ ] **Step 2: Implement `ProofScene.tsx`**

Must include:
- `MCP / Skill / Agent / Logs` node network
- One or two log/trace panels showing "I inspected the logs"
- Emphasis on system integration, not one-off automation

- [ ] **Step 3: Implement `DailyUseScene.tsx`**

Must include:
- Usage evidence cards
- "主力软件" conclusion
- PDF export badge
- Timeline or stacked project cards to signal repeated use over time

- [ ] **Step 4: Implement `CTAScene.tsx`**

Must include:
- Save-oriented CTA
- Headline: workflow has changed
- Hashtag / tag row
- 1-2 second hold to let viewers finish reading

- [ ] **Step 5: Verify**

Run: `npm run typecheck`

Expected:
- All 7 scene imports resolve in `index.tsx`
- No duplicate symbol / prop mismatches

- [ ] **Step 6: Optional checkpoint commit**

```bash
git add src/compositions/PencilDev/Scenes/AgentScene.tsx src/compositions/PencilDev/Scenes/ProofScene.tsx src/compositions/PencilDev/Scenes/DailyUseScene.tsx src/compositions/PencilDev/Scenes/CTAScene.tsx
git commit -m "feat(pencildev): add remaining scene components"
```

---

## Task 4: Main Composition Integration

**Files:**
- Create: `src/compositions/PencilDev/index.tsx`

- [ ] **Step 1: Create `index.tsx`**

Mirror `src/compositions/AutoResearch/index.tsx`.

Must include:
- `SCENE_COUNT = 7`
- imports for all 7 scene components created in Tasks 2-3
- `sceneStartFrames` derived from `sceneDurations`
- Sequence per scene
- Voiceover sequences offset by `Math.round(fps * 0.3)`
- `precomputedSubtitles` first, `voiceoverScripts` fallback
- `KaraokeSubtitle` pinned to `bottom: 380`
- Right-side scene progress bar
- Background music fade in/out logic

- [ ] **Step 2: Verify**

Run: `npm run typecheck`

Expected:
- `index.tsx` resolves all 7 scenes
- No missing imports / prop mismatches

- [ ] **Step 3: Optional checkpoint commit**

```bash
git add src/compositions/PencilDev/index.tsx
git commit -m "feat(pencildev): add main composition orchestration"
```

---

## Task 5: Cover Still

**Files:**
- Create: `src/compositions/PencilDev/Cover.tsx`

- [ ] **Step 1: Implement `Cover.tsx`**

Must include:
- 1080 x 1440 design
- Top label `PENCIL.DEV`
- Big title `Figma 我真不开了`
- Subtitle `主力设计软件，已经换了`
- IDE workbench visual with Agent panel
- Info bar `IDE 内设计 | Agent 共创 | PDF 导出`

Reference:
- `src/compositions/GSDIntro/Cover.tsx`
- `src/compositions/WeChatClawBot/Cover.tsx`

- [ ] **Step 2: Verify**

Run: `npm run typecheck`

Expected:
- `Cover.tsx` compiles standalone
- No missing schema props

- [ ] **Step 3: Optional checkpoint commit**

```bash
git add src/compositions/PencilDev/Cover.tsx
git commit -m "feat(pencildev): add cover still"
```

---

## Task 6: Export, Root Registration, Render API Integration

**Files:**
- Modify: `src/compositions/index.ts`
- Modify: `src/Root.tsx`
- Modify: `src/server/services/renderer.ts`
- Modify: `package.json`

- [ ] **Step 1: Update `src/compositions/index.ts`**

Add exports:

```ts
export { PencilDev } from "./PencilDev";
export { PencilDevCover } from "./PencilDev/Cover";
export { PencilDevSchema, type PencilDevProps } from "./PencilDev/schema";
```

- [ ] **Step 2: Update `src/Root.tsx`**

Add:
- Composition registration for `PencilDev`
- Still registration for `PencilDevCover`
- Default props with placeholder `sceneDurations`
- `pencildev` audio file names
- subtitle config matching the cold-blue theme

Use the same default-props style as `GSDIntro`, `WeChatClawBot`, and `AutoResearch`.
At this point, both `src/compositions/PencilDev/index.tsx` and `src/compositions/PencilDev/Cover.tsx` already exist, so registration should typecheck cleanly.

- [ ] **Step 3: Update `src/server/services/renderer.ts`**

Inspect whether composition IDs are statically enumerated.

If static, add:
- `PencilDev`
- `PencilDevCover` if Still IDs are also surfaced

If dynamic, make only the minimal change needed for the new composition to be renderable via the API.

- [ ] **Step 4: Update `package.json` scripts**

Add:

```json
"generate:voiceover:pencildev": "npx tsx scripts/generate-voiceover-pencildev.ts",
"sync:subtitle:pencildev": "npx tsx scripts/sync-subtitle-pencildev.ts",
"render:pencildev": "remotion render src/index.ts PencilDev --output=out/PencilDev.mp4",
"render:pencildev:cover": "remotion still src/index.ts PencilDevCover --output=out/PencilDev-cover.png"
```

- [ ] **Step 5: Verify**

Run: `npm run typecheck`

Expected:
- `PencilDev` shows up as a valid composition in imports
- No `Root.tsx` or `renderer.ts` type errors

- [ ] **Step 6: Optional checkpoint commit**

```bash
git add src/compositions/index.ts src/Root.tsx src/server/services/renderer.ts package.json
git commit -m "feat(pencildev): register composition and render scripts"
```

---

## Task 7: Voiceover Script and Audio Generation

**Files:**
- Create: `scripts/generate-voiceover-pencildev.ts`
- Generate: `public/audio/pencildev-scene1.mp3` ... `public/audio/pencildev-scene7.mp3`
- Generate: `public/audio/pencildev-scene1.vtt` ... `public/audio/pencildev-scene7.vtt`

- [ ] **Step 1: Create `generate-voiceover-pencildev.ts`**

Mirror:
- `scripts/generate-voiceover-autoresearch.ts`
- `scripts/generate-voiceover-wechatclawbot.ts`

Requirements:
- Use `zh-CN-YunyangNeural`
- Use `+3%` rate
- Use 7 scene scripts matching the approved spec
- Insert natural pauses with `...`
- Normalize `...` to Chinese comma before TTS invocation

- [ ] **Step 2: Run generation**

Run: `npm run generate:voiceover:pencildev`

Expected:
- 7 mp3 files in `public/audio/`
- 7 vtt files in `public/audio/`
- No missing `edge-tts` / path errors

- [ ] **Step 3: Sanity check output**

Confirm:
- All 7 files exist
- Names match the `Root.tsx` audio paths exactly

- [ ] **Step 4: Optional checkpoint commit**

```bash
git add scripts/generate-voiceover-pencildev.ts public/audio/pencildev-scene*.mp3 public/audio/pencildev-scene*.vtt
git commit -m "feat(pencildev): generate voiceover audio"
```

---

## Task 8: Subtitle Sync and Final Timing Update

**Files:**
- Create: `scripts/sync-subtitle-pencildev.ts`
- Create: `src/data/pencildev-subtitles.json`
- Modify: `src/Root.tsx`

- [ ] **Step 1: Create `sync-subtitle-pencildev.ts`**

Mirror:
- `scripts/sync-subtitle-autoresearch.ts`
- `scripts/sync-subtitle-wechatclawbot.ts`

Requirements:
- Read actual durations from generated mp3 files
- Segment script text into frame-level subtitle data
- Output `src/data/pencildev-subtitles.json`
- Print `durationInFrames` and `sceneDurations`

- [ ] **Step 2: Run sync**

Run: `npm run sync:subtitle:pencildev`

Expected:
- JSON file created
- Console prints real `durationInFrames`
- Console prints `sceneDurations` array of length 7

- [ ] **Step 3: Update `src/Root.tsx` with real timing**

Replace placeholder values with:
- imported `pencildevSubtitles`
- actual `sceneDurations`
- actual `durationInFrames`

- [ ] **Step 4: Verify**

Run: `npm run typecheck`

Expected:
- No JSON import or schema mismatches
- `PencilDev` is renderable with real timing

- [ ] **Step 5: Optional checkpoint commit**

```bash
git add scripts/sync-subtitle-pencildev.ts src/data/pencildev-subtitles.json src/Root.tsx
git commit -m "feat(pencildev): sync subtitles and update timing"
```

---

## Task 9: Preview, Polish, and Render Smoke

**Files:**
- Modify as needed based on preview findings

- [ ] **Step 1: Preview in Studio**

Run: `npm run studio`

Check:
- Composition is visible in sidebar
- First frame is a strong cover frame
- Each scene reads clearly on mobile
- Subtitle safe area stays above bottom UI

- [ ] **Step 2: Fix any layout or timing bugs**

Typical issues to watch:
- Text overflow in Hook / CTA
- Agent nodes overcrowding center canvas
- ProofScene being too abstract or text-heavy
- DailyUseScene evidence cards colliding with subtitles

- [ ] **Step 3: Typecheck after fixes**

Run: `npm run typecheck`

- [ ] **Step 4: Render smoke tests**

Run:

```bash
npm run render:pencildev
npm run render:pencildev:cover
```

Expected:
- `out/PencilDev.mp4`
- `out/PencilDev-cover.png`

- [ ] **Step 5: Optional checkpoint commit**

```bash
git add -A
git commit -m "fix(pencildev): polish scenes and render outputs"
```

---

## Task 10: Platform Copy Generation and Repo Notes

**Files:**
- Modify: `AGENTS.md`
- Delivery in final response (no repo file for copy unless user requests one)

- [ ] **Step 1: Generate 微信视频号文案**

Deliver:
- 1 short title (<=16字)
- 2-3 backup titles
- multiline description
- 6-8 hashtags

Direction:
- Emphasize "主力设计软件变了"
- Avoid pure feature dump
- Keep save-worthy tone

- [ ] **Step 2: Generate 抖音/小红书适配版**

Deliver:
- more conversational title
- 3-5 lines shorter description
- 4-6 hashtags

- [ ] **Step 3: Update `AGENTS.md`**

Add the new composition and script names to the relevant sections:
- Composition catalog entry for `PencilDev`
- Render commands if needed
- Any new script names introduced during implementation

- [ ] **Step 4: Final verification summary**

Summarize:
- files changed
- outputs rendered
- residual risks if any

- [ ] **Step 5: Optional final commit**

```bash
git add -A
git commit -m "feat(pencildev): complete video assets and launch copy"
```
