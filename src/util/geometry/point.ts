export interface Point {
  x: number
  y: number
}

export function pointCopy(p: Point): Point {
  return { x: p.x, y: p.y }
}

export function pointSub(a: Point, b: Point): Point {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  }
}

export function pointAdd(a: Point, b: Point): Point {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  }
}

export function pointMagnitude(p: Point): number {
  return Math.abs(p.x) + Math.abs(p.y)
}

// given a point, calculate a new point that is the given distance away at the given angle
export function pointMoveRadial(
  point: Point,
  angle: number,
  distance: number
): Point {
  return {
    x: point.x + Math.cos(angle) * distance,
    y: point.y + Math.sin(angle) * distance,
  }
}

export function pointSignFlip(p: Point): Point {
  return {
    x: p.x * -1,
    y: p.y * -1,
  }
}

export function isZeroPoint(p: Point): boolean {
  return p.x === 0 && p.y === 0
}
