---
title: 竖屏进度条被字幕组件遮挡
date: "2026-04-12"
category: ui-bugs
module: TradingAgents 竖屏视频合成
problem_type: ui_bug
component: tooling
severity: medium
symptoms:
  - "进度条（bottom: 450px）被 KaraokeSubtitle（bottom: 380px）的文字和背景遮罩覆盖"
  - "AGENTS.md 规范中 70px 间距（450 - 380）不足以容纳字幕渲染高度"
root_cause: config_error
resolution_type: code_fix
tags:
  - remotion
  - vertical-video
  - progress-bar
  - subtitle
  - layout
  - karaoke-subtitle
---

# 竖屏进度条被字幕组件遮挡

## Problem

TradingAgents 竖屏合成（9:16, 1080×1920）中，底部进度条设置在 `bottom: 450px`，而 KaraokeSubtitle 字幕设置在 `bottom: 380px`。字幕的文字高度（fontSize: 44px ≈ 59px 渲染高度）加上背景遮罩的 padding 向上延伸，覆盖了进度条。

## Symptoms

- 进度条看起来缺失或被截断，因为它位于字幕层的下方
- 即便遵循了 AGENTS.md 中 `bottom: 450` 的规范，70px 的垂直间距仍不足以容纳字幕的实际渲染区域

## What Didn't Work

- **保持 `bottom: 450`（字幕 `bottom: 380` + 70px 间距）**：失败。字幕占用的空间超过 70px — fontSize 44px 渲染为 ~59px 文字高度，加上背景遮罩的垂直 padding，进度条仍落在字幕的绘制区域内。

## Solution

修改 `src/compositions/TradingAgents/index.tsx` 中进度条容器的 `bottom` 值：

**Before:**

```tsx
<div style={{
  position: "absolute",
  bottom: 450,
  left: 80,
  right: 80,
  height: 3,
  ...
}}>
```

**After:**

```tsx
<div style={{
  position: "absolute",
  bottom: 490,
  left: 80,
  right: 80,
  height: 3,
  ...
}}>
```

## Why This Works

遮挡由字幕的**完整绘制边界框**（文字尺寸 + padding）决定，而非仅对比两个组件的 `bottom` 值。字幕锚点在 `bottom: 380`，内容和背景向上延伸约 70px（至 ~450px）。将进度条移至 `bottom: 490` 后，与字幕视觉区域顶端保留 ~40px 的净空。

**经验公式**：进度条 `bottom` ≥ 字幕 `bottom` + 110px（380 + 110 = 490），而非之前假设的 70px。

## Prevention

- **更新 AGENTS.md 规范**：将进度条默认位置从 `bottom: 450` 改为 `bottom: 490`
- **110px 净空规则**：当字幕使用 `bottom: 380`、fontSize 44px 时，进度条至少需要 110px 的垂直间距
- **联动检查**：修改字幕的 fontSize、padding 或遮罩高度时，需同步检查进度条间距是否仍然充足

## Related Issues

- `AGENTS.md` §7「场景设计模式 — 进度条」和「字幕规范」中的 `bottom: 450` 规范已过时
- 其他合成（如 `HermesAgent/index.tsx`）可能存在相同的 `bottom: 450` 问题，需逐一排查
- `src/components/KaraokeSubtitle.tsx` 使用 `zIndex: 100`，进度条若无更高 z-index 也可能被覆盖
