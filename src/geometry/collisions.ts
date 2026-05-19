import type { ApartmentPlan } from '../types/apartment';
import { bbox, pointInBbox } from './polygon';

export const getCollisionWarnings = (plan: ApartmentPlan): string[] => {
  const warnings: string[] = [];
  const outlineBox = bbox(plan.apartmentOutline);
  plan.furniture.forEach((f) => {
    if (!pointInBbox(f.position, outlineBox)) warnings.push(`${f.name} is outside apartment outline`);
    plan.fixedElements.forEach((el) => {
      const b = bbox(el.polygon);
      if (pointInBbox(f.position, b) && f.collisionPolicy !== 'ignored') warnings.push(`${f.name} intersects fixed element ${el.id}`);
    });
  });
  return warnings;
};
