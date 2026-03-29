# Quick Task 260328-gsb: 接入 AI Harness Engineer voiceoverScripts 并生成配音

**Created:** 2026-03-28  
**Status:** Done

## Goal

把 AI Harness Engineer 的完整旁白稿接进工程里的独立 composition，并成功生成 7 段可用于后续字幕同步的音频文件。

## Tasks

### Task 1

- **files**: `src/compositions/AIHarnessEngineer/schema.ts`, `src/compositions/AIHarnessEngineer/index.tsx`, `src/compositions/index.ts`, `src/Root.tsx`
- **action**: 新建最小可用 composition，接入 `voiceoverScripts` 与默认音频路径
- **verify**: composition 在工程中可被识别，类型检查通过
- **done**: 工程里存在独立的 AIHarnessEngineer 入口

### Task 2

- **files**: `scripts/generate-voiceover-aiharnessengineer.ts`, `package.json`
- **action**: 增加配音生成脚本与 npm 命令
- **verify**: 可通过 npm 命令实际生成音频
- **done**: 7 段 mp3 成功输出到 `public/audio/`
