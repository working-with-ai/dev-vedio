import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SubtitleWord {
  text: string;
  startFrame: number;
  endFrame: number;
}

export interface SubtitleLine {
  words: SubtitleWord[];
  startFrame: number;
  endFrame: number;
}

interface KaraokeSubtitleProps {
  lines: SubtitleLine[];
  fontSize?: number;
  textColor?: string;
  highlightColor?: string;
  backgroundColor?: string;
  position?: "top" | "center" | "bottom";
  style?: React.CSSProperties;
}

const PUNCTUATION_REGEX = /^[，。！？、：；""''（）!?,.:;…]+$/;

function groupWordsIntoVisualLines(
  words: SubtitleWord[],
): SubtitleWord[][] {
  const visualLines: SubtitleWord[][] = [];
  let currentLine: SubtitleWord[] = [];

  for (const word of words) {
    if (PUNCTUATION_REGEX.test(word.text.trim())) {
      if (currentLine.length > 0) {
        visualLines.push(currentLine);
        currentLine = [];
      }
    } else {
      currentLine.push(word);
    }
  }

  if (currentLine.length > 0) {
    visualLines.push(currentLine);
  }

  return visualLines;
}

const KaraokeWord: React.FC<{
  word: SubtitleWord;
  fontSize: number;
  textColor: string;
  highlightColor: string;
}> = ({ word, fontSize, textColor }) => {
  return (
    <span
      style={{
        fontSize,
        fontWeight: "bold",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "inline-block",
        color: textColor,
        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
      }}
    >
      {word.text}
    </span>
  );
};

export const KaraokeSubtitle: React.FC<KaraokeSubtitleProps> = ({
  lines,
  fontSize = 42,
  textColor = "#ffffff",
  highlightColor = "#ffd700",
  backgroundColor = "rgba(0, 0, 0, 0.6)",
  position = "bottom",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentLine = lines.find(
    (line) => frame >= line.startFrame && frame <= line.endFrame
  );

  const visualLines = useMemo(
    () => currentLine ? groupWordsIntoVisualLines(currentLine.words) : [],
    [currentLine?.startFrame, currentLine?.words]
  );

  if (!currentLine || visualLines.length === 0) {
    return null;
  }

  let activeIndex = 0;
  for (let i = 0; i < visualLines.length; i++) {
    if (frame >= visualLines[i][0].startFrame) {
      activeIndex = i;
    }
  }

  const activeWords = visualLines[activeIndex];
  const lineStartFrame = activeWords[0].startFrame;

  const fadeIn = spring({
    frame: frame - lineStartFrame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const positionStyle: React.CSSProperties = {
    top: position === "top" ? 80 : position === "center" ? "50%" : undefined,
    bottom: position === "bottom" ? 80 : undefined,
    transform: position === "center" ? "translateY(-50%)" : undefined,
  };

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
        zIndex: 100,
        ...positionStyle,
        ...style,
      }}
    >
      <div
        style={{
          backgroundColor,
          padding: "16px 32px",
          borderRadius: 12,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 0,
          maxWidth: "90%",
          opacity: fadeIn,
          transform: `translateY(${interpolate(fadeIn, [0, 1], [8, 0])}px)`,
        }}
      >
        {activeWords.map((word, index) => (
          <KaraokeWord
            key={`${activeIndex}-${index}`}
            word={word}
            fontSize={fontSize}
            textColor={textColor}
            highlightColor={highlightColor}
          />
        ))}
      </div>
    </div>
  );
};

// 辅助函数：从文本和时间信息生成字幕数据
export function generateSubtitleLines(
  text: string,
  startFrame: number,
  durationFrames: number,
  fps: number = 30
): SubtitleLine {
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const totalChars = words.reduce((sum, w) => sum + w.length, 0);
  
  let currentFrame = startFrame;
  const subtitleWords: SubtitleWord[] = [];

  words.forEach((word) => {
    // 根据字符比例分配时间
    const wordDuration = Math.round(
      (word.length / totalChars) * durationFrames
    );
    
    subtitleWords.push({
      text: word,
      startFrame: currentFrame,
      endFrame: currentFrame + wordDuration,
    });
    
    currentFrame += wordDuration;
  });

  return {
    words: subtitleWords,
    startFrame,
    endFrame: startFrame + durationFrames,
  };
}

// 辅助函数：从场景脚本生成完整字幕
export interface SceneScript {
  text: string;
  sceneStartFrame: number;
  sceneDuration: number;
}

export function generateSubtitlesFromScripts(
  scripts: SceneScript[],
  fps: number = 30
): SubtitleLine[] {
  return scripts.map((script) => {
    // 给每个场景的字幕留出淡入时间
    const subtitleStart = script.sceneStartFrame + Math.round(fps * 0.5); // 0.5秒后开始
    const subtitleDuration = script.sceneDuration - Math.round(fps * 1); // 留1秒缓冲
    
    return generateSubtitleLines(script.text, subtitleStart, subtitleDuration, fps);
  });
}

export default KaraokeSubtitle;
