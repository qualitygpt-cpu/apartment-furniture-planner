import type { ApartmentPlan, Wall } from '../types/apartment';
import { apartmentPlanSchema } from '../schema/apartmentPlanSchema';
import { segmentsIntersect } from '../geometry/collisions';
import { isOrthogonal, pointInPolygon } from '../geometry/polygon';
import { openingFitsWall } from '../geometry/openings';
import { wallLength } from '../geometry/wall';

export type ValidationResult = {
  plan?: ApartmentPlan;
  errors: string[];
  warnings: string[];
};

const furnitureRect = (f: ApartmentPlan['furniture'][number]) => [
  { x: f.position.x, y: f.position.y },
  { x: f.position.x + f.width, y: f.position.y },
  { x: f.position.x + f.width, y: f.position.y + f.depth },
  { x: f.position.x, y: f.position.y + f.depth }
];

const intersectsWall = (rect: { x: number; y: number }[], wall: Wall) =>
  rect.some((p, i) => segmentsIntersect(p, rect[(i + 1) % rect.length], wall.start, wall.end));

export const validatePlan = (input: unknown): ValidationResult => {
  const parsed = apartmentPlanSchema.safeParse(input);
  if (!parsed.success) {
    return { errors: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`), warnings: [] };
  }

  const plan = parsed.data as ApartmentPlan;
  const errors: string[] = [];
  const warnings: string[] = [];

  if (plan.units !== 'mm') errors.push('Units must be mm.');
  if (
    plan.coordinateSystem.origin !== 'top_left' ||
    plan.coordinateSystem.xAxis !== 'right' ||
    plan.coordinateSystem.yAxis !== 'down' ||
    plan.coordinateSystem.unit !== 'mm'
  ) {
    errors.push('Coordinate system must be {origin: top_left, xAxis: right, yAxis: down, unit: mm}.');
  }

  if (plan.apartmentOutline.length < 4 || !isOrthogonal(plan.apartmentOutline)) {
    errors.push('Apartment outline must be orthogonal and have at least 4 points.');
  }

  plan.rooms.forEach((room) => {
    if (room.polygon.length < 4) errors.push(`Room ${room.id}: polygon must have at least 4 points.`);
    if (!isOrthogonal(room.polygon)) errors.push(`Room ${room.id}: polygon must be orthogonal.`);
  });

  plan.walls.forEach((wall) => {
    if (wallLength(wall) <= 0) errors.push(`Wall ${wall.id}: length must be greater than zero.`);
    if (wall.thickness <= 0) errors.push(`Wall ${wall.id}: thickness must be positive.`);
  });

  const wallById = new Map(plan.walls.map((w) => [w.id, w]));
  plan.openings.forEach((opening) => {
    const wall = wallById.get(opening.wallId);
    if (!wall) {
      errors.push(`Opening ${opening.id}: references missing wallId ${opening.wallId}.`);
      return;
    }
    if (!openingFitsWall(opening, wall)) {
      errors.push(`Opening ${opening.id}: must fit within parent wall length.`);
    }
  });

  plan.fixedElements.forEach((element) => {
    if (element.polygon.length < 4 || !isOrthogonal(element.polygon)) {
      errors.push(`Fixed element ${element.id}: polygon must be orthogonal with at least 4 points.`);
    }
  });

  plan.furniture.forEach((furniture) => {
    if (furniture.width <= 0 || furniture.depth <= 0 || furniture.height <= 0) {
      errors.push(`Furniture ${furniture.id}: dimensions must be positive.`);
    }
    if (furniture.material && !plan.materials[furniture.material]) {
      errors.push(`Furniture ${furniture.id}: unknown material '${furniture.material}'.`);
    }

    const rect = furnitureRect(furniture);
    const center = { x: furniture.position.x + furniture.width / 2, y: furniture.position.y + furniture.depth / 2 };
    if (!pointInPolygon(center, plan.apartmentOutline)) {
      warnings.push(`Furniture ${furniture.id}: outside apartment outline.`);
    }

    plan.walls.forEach((wall) => {
      if (intersectsWall(rect, wall)) warnings.push(`Furniture ${furniture.id}: intersects wall ${wall.id}.`);
    });

    plan.openings
      .filter((opening) => opening.type === 'door')
      .forEach((opening) => {
        const doorWall = wallById.get(opening.wallId);
        if (!doorWall) return;
        const zoneStart = opening.positionFromStart;
        const zoneEnd = opening.positionFromStart + opening.width + 600;
        const doorBlocks = zoneEnd > 0 && zoneStart < wallLength(doorWall) && intersectsWall(rect, doorWall);
        if (doorBlocks) warnings.push(`Furniture ${furniture.id}: may block door swing zone for ${opening.id}.`);
      });
  });

  return { plan, errors, warnings };
};
