import type { Point } from '../types/geometry';

const orient = (a: Point, b: Point, c: Point) => (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);

export const segmentsIntersect = (p1: Point, q1: Point, p2: Point, q2: Point) => {
  const o1 = orient(p1, q1, p2);
  const o2 = orient(p1, q1, q2);
  const o3 = orient(p2, q2, p1);
  const o4 = orient(p2, q2, q1);
  return o1 * o2 < 0 && o3 * o4 < 0;
};
