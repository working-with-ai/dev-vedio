# Quick Task 260322-uyb Plan

## Goal

Create a new standalone 9:16 knowledge video about the public signal of WeChat chat-entry integration around OpenClaw/ClawBot, based on the user-provided Twitter screenshots and verified public sources. Deliver the composition, cover, voiceover scripts, subtitle sync pipeline, render scripts, and publish copy without overwriting the existing `OpenClawAI` video.

## Constraints

- Keep the factual wording conservative: present this as a verified ecosystem/integration signal, not as a blanket claim that WeChat has fully and officially integrated OpenClaw everywhere.
- Reuse the existing Remotion vertical-video pipeline and subtitle workflow.
- Do not break or replace existing compositions.

## Tasks

### 1. Add the new video composition
- Files: `src/compositions/WeChatClawBot/*`, `src/compositions/index.ts`, `src/Root.tsx`
- Action: Create a standalone vertical composition and cover, register both in exports and `Root.tsx`, and wire default props around seven scenes: hook, signal, architecture, use cases, ecosystem, risk boundary, CTA.
- Verify: `npm run typecheck` passes and the new IDs appear in Remotion composition registration.
- Done: New `WeChatClawBot` video and `WeChatClawBotCover` still can be rendered through Remotion.

### 2. Add audio, subtitle, and render pipeline
- Files: `scripts/generate-voiceover-wechatclawbot.ts`, `scripts/sync-subtitle-wechatclawbot.ts`, `package.json`, `src/data/wechatclawbot-subtitles.json`
- Action: Add the dedicated voiceover generator and subtitle sync scripts, register render commands, generate fresh audio/subtitle outputs, and connect the resulting subtitle JSON to `Root.tsx`.
- Verify: `npm run generate:voiceover:wechatclawbot`, `npm run sync:subtitle:wechatclawbot`, and `npm run typecheck` succeed.
- Done: The composition uses real voiceover files and precomputed subtitles with synced scene durations.

### 3. Add publish copy and validate outputs
- Files: `docs/wechat-openclaw-copy.md`, `out/WeChatClawBot.mp4`, `out/WeChatClawBot-cover.png`
- Action: Write the platform copy artifact, render the cover and video, and check that the final output matches the factual positioning and visual goal.
- Verify: `npm run render:wechatclawbot:cover` and `npm run render:wechatclawbot` succeed.
- Done: The repo contains a renderable end-to-end deliverable plus publish copy.
