import type { Point } from '../types/geometry';
export const isOrthogonal = (p: Point[]) => p.every((pt, i) => { const n=p[(i+1)%p.length]; return pt.x===n.x || pt.y===n.y; });
export const bbox = (p: Point[]) => ({ minX: Math.min(...p.map(v=>v.x)), minY: Math.min(...p.map(v=>v.y)), maxX: Math.max(...p.map(v=>v.x)), maxY: Math.max(...p.map(v=>v.y))});
export const pointInBbox = (p: Point, b: ReturnType<typeof bbox>) => p.x>=b.minX&&p.x<=b.maxX&&p.y>=b.minY&&p.y<=b.maxY;
