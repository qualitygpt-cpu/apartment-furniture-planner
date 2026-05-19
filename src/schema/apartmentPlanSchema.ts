import { z } from 'zod';

const pointSchema = z.object({ x: z.number(), y: z.number() });
const polygonSchema = z.array(pointSchema).min(4);

export const apartmentPlanSchema = z.object({
  schemaVersion: z.literal('apartment-plan.v1.json'),
  projectName: z.string().min(1),
  units: z.literal('mm'),
  coordinateSystem: z.object({ origin: z.literal('top_left'), xAxis: z.literal('right'), yAxis: z.literal('down'), unit: z.literal('mm') }),
  metadata: z.object({ createdAt: z.string(), updatedAt: z.string(), source: z.string(), warnings: z.array(z.string()).optional() }),
  apartmentOutline: polygonSchema,
  rooms: z.array(z.object({ id: z.string(), name: z.string(), type: z.string(), polygon: polygonSchema, height: z.number().positive(), floorMaterial: z.string().optional(), wallFinish: z.string().optional(), confidence: z.number().min(0).max(1), sourceNotes: z.string().optional() })),
  walls: z.array(z.object({ id: z.string(), start: pointSchema, end: pointSchema, thickness: z.number().positive(), type: z.string(), roomIds: z.array(z.string()), height: z.number().positive(), confidence: z.number().min(0).max(1) })),
  openings: z.array(z.object({ id: z.string(), type: z.enum(['door','window']), wallId: z.string(), positionFromStart: z.number().nonnegative(), width: z.number().positive(), height: z.number().positive(), sillHeight: z.number().nonnegative(), confidence: z.number().min(0).max(1), swingDirection: z.string().optional(), hingeSide: z.string().optional(), opensIntoRoomId: z.string().optional() })),
  fixedElements: z.array(z.object({ id: z.string(), type: z.string(), polygon: polygonSchema, height: z.number().positive(), confidence: z.number().min(0).max(1) })),
  furniture: z.array(z.object({ id: z.string(), name: z.string(), category: z.string(), position: pointSchema, rotation: z.number(), width: z.number().positive(), depth: z.number().positive(), height: z.number().positive(), material: z.string().optional(), color: z.string().optional(), collisionPolicy: z.string(), primitives: z.array(z.object({ id: z.string(), type: z.enum(['box','cylinder','rounded_box']), localPosition: pointSchema, size: z.object({ width: z.number().positive(), depth: z.number().positive() }), height: z.number().positive(), material: z.string().optional(), color: z.string().optional() })), clearanceZones: z.array(z.object({ id: z.string(), type: z.string(), polygon: polygonSchema })) })),
  materials: z.record(z.object({ color: z.string(), texture: z.string().optional() }))
});
