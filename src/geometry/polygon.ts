import type { Point } from '../types/geometry';

export const isOrthogonal = (p: Point[]) => p.every((pt, i) => {
  const n = p[(i + 1) % p.length];
  return pt.x === n.x || pt.y === n.y;
});

export const pointInPolygon = (point: Point, polygon: Point[]) => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersects = yi > point.y !== yj > point.y && point.x < ((xj - xi) * (point.y - yi)) / (yj - yi || 1) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
};
