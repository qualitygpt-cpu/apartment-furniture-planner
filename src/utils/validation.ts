import type { ApartmentPlan } from '../types/apartment';
import { apartmentPlanSchema } from '../schema/apartmentPlanSchema';
import { isOrthogonal } from '../geometry/polygon';
import { wallLength } from '../geometry/wall';
import { openingFitsWall } from '../geometry/openings';

export const validatePlan = (input: unknown): { plan?: ApartmentPlan; errors: string[] } => {
  const parsed = apartmentPlanSchema.safeParse(input);
  if (!parsed.success) return { errors: parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`) };
  const plan = parsed.data as ApartmentPlan;
  const errors: string[] = [];
  if (plan.units !== 'mm') errors.push('Units must be mm');
  if (!isOrthogonal(plan.apartmentOutline)) errors.push('Apartment outline must be orthogonal');
  plan.rooms.forEach(r => { if (r.polygon.length < 4) errors.push(`Room ${r.id}: polygon too short`); if (!isOrthogonal(r.polygon)) errors.push(`Room ${r.id}: polygon not orthogonal`); });
  plan.walls.forEach(w => { if (wallLength(w) <= 0) errors.push(`Wall ${w.id}: zero length`); if (w.thickness <= 0) errors.push(`Wall ${w.id}: thickness must be positive`); });
  plan.openings.forEach(o => { const w=plan.walls.find(x=>x.id===o.wallId); if (!w) errors.push(`Opening ${o.id}: unknown wallId`); else if (!openingFitsWall(o, w)) errors.push(`Opening ${o.id}: exceeds wall length`); });
  plan.furniture.forEach(f => { if (f.width<=0 || f.depth<=0 || f.height<=0) errors.push(`Furniture ${f.id}: dimensions must be positive`); });
  return { plan, errors };
};
