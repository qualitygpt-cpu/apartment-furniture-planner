import type { FurnitureItem } from './furniture';
import type { Point, Polygon } from './geometry';

export type RoomType = 'living_room' | 'bedroom' | 'kitchen' | 'bathroom' | 'toilet' | 'hallway' | 'corridor' | 'storage' | 'balcony' | 'loggia' | 'technical' | 'unknown';
export type WallType = 'exterior' | 'interior' | 'load_bearing' | 'partition' | 'wet_zone' | 'shaft' | 'unknown';

export type Room = { id: string; name: string; type: RoomType; polygon: Polygon; height: number; floorMaterial?: string; wallFinish?: string; confidence: number; sourceNotes?: string };
export type Wall = { id: string; start: Point; end: Point; thickness: number; type: WallType; roomIds: string[]; height: number; confidence: number };
export type Opening = { id: string; type: 'door' | 'window'; wallId: string; positionFromStart: number; width: number; height: number; sillHeight: number; confidence: number; swingDirection?: 'inward_left'|'inward_right'|'outward_left'|'outward_right'|'sliding'|'unknown'; hingeSide?: 'left'|'right'|'unknown'; opensIntoRoomId?: string };
export type FixedElement = { id: string; type: 'ventilation_shaft'|'plumbing_riser'|'electrical_panel'|'radiator'|'column'|'niche'|'technical_box'; polygon: Polygon; height: number; confidence: number };

export type ApartmentPlan = {
  schemaVersion: 'apartment-plan.v1.json';
  projectName: string;
  units: 'mm';
  coordinateSystem: { origin: 'top_left'; xAxis: 'right'; yAxis: 'down'; unit: 'mm' };
  metadata: { createdAt: string; updatedAt: string; source: string; warnings?: string[] };
  apartmentOutline: Polygon;
  rooms: Room[];
  walls: Wall[];
  openings: Opening[];
  fixedElements: FixedElement[];
  furniture: FurnitureItem[];
  materials: Record<string, { color: string; texture?: string }>;
};
