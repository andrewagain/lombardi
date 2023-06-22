import { LineSegment } from "./line-segment.ts"
import { Point } from "./point.ts"

export interface Size {
  width: number
  height: number
}

export interface Rect extends Point, Size {}

export const NULL_RECT: Rect = { x: 0, y: 0, width: 0, height: 0 }

export function getRectCorners(r: Rect): [Point, Point, Point, Point] {
  return [
    { x: r.x, y: r.y },
    { x: r.x + r.width, y: r.y },
    { x: r.x, y: r.y + r.height },
    { x: r.x + r.width, y: r.y + r.height },
  ]
}

export function getRectCenter(r: Rect): Point {
  return {
    x: r.x + r.width / 2,
    y: r.y + r.height / 2,
  }
}

export function getRectSegments(
  r: Rect
): [LineSegment, LineSegment, LineSegment, LineSegment] {
  const [tl, tr, bl, br] = getRectCorners(r)
  return [
    { from: tl, to: tr },
    { from: tr, to: br },
    { from: br, to: bl },
    { from: bl, to: tl },
  ]
}

export function getEncompassingBoundingRect(points: Point[]): Rect {
  if (points.length === 0) {
    return NULL_RECT
  }
  const xList = points.map((p) => p.x)
  const yList = points.map((p) => p.y)
  const xMin = Math.min(...xList)
  const yMin = Math.min(...yList)
  const xMax = Math.max(...xList)
  const yMax = Math.max(...yList)

  return {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin,
  }
}
