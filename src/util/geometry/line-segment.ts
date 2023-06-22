import { Point } from "./point.ts"

export interface LineSegment {
  from: Point
  to: Point
}

export function pathSegmentAt(p: Point[], i: number) {
  if (i < 0 || i >= p.length) {
    throw new Error(
      `Segment index${i} outside range (0,${p.length - 1}) inclusive`
    )
  }
  return { from: p[i], to: p[i + 1] }
}

export function pathFirstSegment(p: Point[]): LineSegment {
  return pathSegmentAt(p, 0)
}

export function pathFinalSegment(p: Point[]): LineSegment {
  const pl = p.length
  return { from: p[pl - 2], to: p[pl - 1] }
}

export function calculateSegmentAngle(segment: LineSegment): number {
  const { from, to } = segment
  const vector = { x: to.x - from.x, y: to.y - from.y }
  const angle = Math.atan(vector.y / vector.x)
  if (vector.x < 0) {
    return angle - Math.PI
  }
  return angle
}

export function calculateSegmentLength(segment: LineSegment) {
  const a = segment.from.x - segment.to.x
  const b = segment.from.y - segment.to.y
  return Math.sqrt(a * a + b * b)
}

// https://www.xarg.org/2010/02/reduce-the-length-of-a-line-segment-by-a-certain-amount/
export function truncateLineEnd(
  segment: LineSegment,
  lengthReduction: number
): LineSegment {
  const { from, to } = segment
  const r = lengthReduction
  const dx = to.x - from.x
  const dy = to.y - from.y
  const mag = Math.hypot(dx, dy)
  return {
    from: segment.from,
    to: {
      x: to.x - (r * dx) / mag,
      y: to.y - (r * dy) / mag,
    },
  }
}

export function truncateLineStart(
  segment: LineSegment,
  lengthReduction: number
): LineSegment {
  const { from, to } = segment
  const r = lengthReduction

  const dx = to.x - from.x
  const dy = to.y - from.y
  const mag = Math.hypot(dx, dy)
  return {
    from: {
      x: from.x + (r * dx) / mag,
      y: from.y + (r * dy) / mag,
    },
    to: segment.to,
  }
}

export function getPathLineSegments(path: Point[]): LineSegment[] {
  const segments: LineSegment[] = []
  for (let i = 0; i < path.length - 1; i++) {
    const p1 = path[i]
    const p2 = path[i + 1]
    segments.push({ from: p1, to: p2 })
  }
  return segments
}
