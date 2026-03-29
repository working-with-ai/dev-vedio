import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  emoji?: string;
  order?: number;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  color?: string;
  order?: number;
}

interface HandDrawnDiagramProps {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  accentColor?: string;
  textColor?: string;
  strokeWidth?: number;
  drawFramesPerElement?: number;
  staggerFrames?: number;
  style?: React.CSSProperties;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function wobblyRect(
  x: number,
  y: number,
  w: number,
  h: number,
  seed: number,
  jitter: number = 3
): string {
  const j = (i: number) => (seededRandom(seed + i) - 0.5) * jitter;
  const corners = [
    { cx: x + j(0), cy: y + j(1) },
    { cx: x + w + j(2), cy: y + j(3) },
    { cx: x + w + j(4), cy: y + h + j(5) },
    { cx: x + j(6), cy: y + h + j(7) },
  ];
  const mid = (a: number, b: number, k: number) =>
    (a + b) / 2 + (seededRandom(seed + k + 20) - 0.5) * jitter * 0.6;

  return [
    `M ${corners[0].cx} ${corners[0].cy}`,
    `Q ${mid(corners[0].cx, corners[1].cx, 0)} ${corners[0].cy + j(10)}, ${corners[1].cx} ${corners[1].cy}`,
    `Q ${corners[1].cx + j(11)} ${mid(corners[1].cy, corners[2].cy, 1)}, ${corners[2].cx} ${corners[2].cy}`,
    `Q ${mid(corners[2].cx, corners[3].cx, 2)} ${corners[2].cy + j(12)}, ${corners[3].cx} ${corners[3].cy}`,
    `Q ${corners[3].cx + j(13)} ${mid(corners[3].cy, corners[0].cy, 3)}, ${corners[0].cx} ${corners[0].cy}`,
  ].join(" ");
}

function wobblyArrow(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  seed: number,
  jitter: number = 4
): { line: string; head: string } {
  const mx = (x1 + x2) / 2 + (seededRandom(seed) - 0.5) * jitter * 3;
  const my = (y1 + y2) / 2 + (seededRandom(seed + 1) - 0.5) * jitter * 3;
  const line = `M ${x1} ${y1} Q ${mx} ${my}, ${x2} ${y2}`;

  const angle = Math.atan2(y2 - my, x2 - mx);
  const headLen = 14;
  const headAngle = Math.PI / 6;
  const hx1 = x2 - headLen * Math.cos(angle - headAngle);
  const hy1 = y2 - headLen * Math.sin(angle - headAngle);
  const hx2 = x2 - headLen * Math.cos(angle + headAngle);
  const hy2 = y2 - headLen * Math.sin(angle + headAngle);
  const j = (i: number) => (seededRandom(seed + i + 50) - 0.5) * 2;
  const head = `M ${hx1 + j(0)} ${hy1 + j(1)} L ${x2} ${y2} L ${hx2 + j(2)} ${hy2 + j(3)}`;

  return { line, head };
}

function getEdgeEndpoints(
  fromNode: DiagramNode,
  toNode: DiagramNode
): { x1: number; y1: number; x2: number; y2: number } {
  const fromCx = fromNode.x + fromNode.width / 2;
  const fromCy = fromNode.y + fromNode.height / 2;
  const toCx = toNode.x + toNode.width / 2;
  const toCy = toNode.y + toNode.height / 2;

  const dx = toCx - fromCx;
  const dy = toCy - fromCy;

  let x1: number, y1: number, x2: number, y2: number;

  if (Math.abs(dx) > Math.abs(dy)) {
    x1 = dx > 0 ? fromNode.x + fromNode.width : fromNode.x;
    y1 = fromCy;
    x2 = dx > 0 ? toNode.x : toNode.x + toNode.width;
    y2 = toCy;
  } else {
    x1 = fromCx;
    y1 = dy > 0 ? fromNode.y + fromNode.height : fromNode.y;
    x2 = toCx;
    y2 = dy > 0 ? toNode.y : toNode.y + toNode.height;
  }

  return { x1, y1, x2, y2 };
}

const AnimatedPath: React.FC<{
  d: string;
  stroke: string;
  strokeWidth: number;
  fill: string;
  startFrame: number;
  duration: number;
}> = ({ d, stroke, strokeWidth, fill, startFrame, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 30, stiffness: 80 },
  });

  const pathLength = 2000;
  const dashOffset = interpolate(progress, [0, 1], [pathLength, 0]);
  const opacity = interpolate(frame - startFrame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeDasharray={pathLength}
      strokeDashoffset={dashOffset}
      opacity={opacity}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

const AnimatedText: React.FC<{
  x: number;
  y: number;
  text: string;
  fontSize: number;
  color: string;
  startFrame: number;
  fontWeight?: number;
}> = ({ x, y, text, fontSize, color, startFrame, fontWeight = 700 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  return (
    <text
      x={x}
      y={y}
      fontSize={fontSize}
      fill={color}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight={fontWeight}
      opacity={interpolate(sp, [0, 1], [0, 1])}
      transform={`translate(0, ${interpolate(sp, [0, 1], [8, 0])})`}
    >
      {text}
    </text>
  );
};

export const HandDrawnDiagram: React.FC<HandDrawnDiagramProps> = ({
  nodes,
  edges,
  accentColor = "#8b5cf6",
  textColor = "#ffffff",
  strokeWidth = 2.5,
  drawFramesPerElement = 20,
  staggerFrames = 12,
  style,
}) => {
  const sortedNodes = useMemo(
    () => [...nodes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [nodes]
  );
  const sortedEdges = useMemo(
    () => [...edges].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [edges]
  );

  const nodeMap = useMemo(
    () => new Map(nodes.map((n) => [n.id, n])),
    [nodes]
  );

  const totalElements = sortedNodes.length + sortedEdges.length;
  const svgWidth = Math.max(...nodes.map((n) => n.x + n.width)) + 40;
  const svgHeight = Math.max(...nodes.map((n) => n.y + n.height)) + 40;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", ...style }}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ overflow: "visible" }}
      >
        {sortedEdges.map((edge, i) => {
          const fromNode = nodeMap.get(edge.from);
          const toNode = nodeMap.get(edge.to);
          if (!fromNode || !toNode) return null;

          const orderIndex = sortedNodes.length + i;
          const startFrame = orderIndex * staggerFrames;
          const { x1, y1, x2, y2 } = getEdgeEndpoints(fromNode, toNode);
          const arrow = wobblyArrow(x1, y1, x2, y2, i * 100);
          const edgeColor = edge.color || accentColor;

          return (
            <g key={`edge-${i}`}>
              <AnimatedPath
                d={arrow.line}
                stroke={edgeColor}
                strokeWidth={strokeWidth}
                fill="none"
                startFrame={startFrame}
                duration={drawFramesPerElement}
              />
              <AnimatedPath
                d={arrow.head}
                stroke={edgeColor}
                strokeWidth={strokeWidth}
                fill="none"
                startFrame={startFrame + 5}
                duration={drawFramesPerElement}
              />
              {edge.label && (
                <AnimatedText
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2 - 14}
                  text={edge.label}
                  fontSize={16}
                  color={edgeColor}
                  startFrame={startFrame + 8}
                  fontWeight={500}
                />
              )}
            </g>
          );
        })}

        {sortedNodes.map((node, i) => {
          const startFrame = i * staggerFrames;
          const nodeColor = node.color || accentColor;
          const rectPath = wobblyRect(
            node.x,
            node.y,
            node.width,
            node.height,
            i * 200
          );

          return (
            <g key={node.id}>
              <AnimatedPath
                d={rectPath}
                stroke={nodeColor}
                strokeWidth={strokeWidth}
                fill={`${nodeColor}15`}
                startFrame={startFrame}
                duration={drawFramesPerElement}
              />
              {node.emoji && (
                <AnimatedText
                  x={node.x + node.width / 2}
                  y={node.y + node.height * 0.35}
                  text={node.emoji}
                  fontSize={28}
                  color={textColor}
                  startFrame={startFrame + 6}
                />
              )}
              <AnimatedText
                x={node.x + node.width / 2}
                y={node.y + node.height * (node.emoji ? 0.7 : 0.5)}
                text={node.label}
                fontSize={20}
                color={textColor}
                startFrame={startFrame + 8}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default HandDrawnDiagram;
