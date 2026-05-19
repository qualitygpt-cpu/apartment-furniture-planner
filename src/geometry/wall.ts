import type { Wall } from '../types/apartment';
export const wallLength = (w: Wall) => Math.hypot(w.end.x-w.start.x,w.end.y-w.start.y);
