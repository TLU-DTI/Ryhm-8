import type { Point } from "./Engine";

export function getPathPoint(path: SVGPathElement, distance: number = 0): Point {
  const pt = path.getPointAtLength(distance);

  return { x: pt.x, y: pt.y } as Point;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}