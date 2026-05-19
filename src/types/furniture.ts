import type { Point } from './geometry';

export type FurnitureCategory = 'wardrobe' | 'sofa' | 'table' | 'chair' | 'shelf' | 'bed' | 'custom';
export type CollisionPolicy = 'solid' | 'can_overlap_table' | 'ignored' | 'group_child';

export type FurniturePrimitive = {
  id: string;
  type: 'box' | 'cylinder' | 'rounded_box';
  localPosition: Point;
  size: { width: number; depth: number };
  height: number;
  material?: string;
  color?: string;
};

export type ClearanceZone = {
  id: string;
  type: 'door_swing' | 'wardrobe_door' | 'drawer_opening' | 'chair_pull_out';
  polygon: Point[];
};

export type FurnitureItem = {
  id: string;
  name: string;
  category: FurnitureCategory;
  position: Point;
  rotation: number;
  width: number;
  depth: number;
  height: number;
  material?: string;
  color?: string;
  primitives: FurniturePrimitive[];
  collisionPolicy: CollisionPolicy;
  clearanceZones: ClearanceZone[];
};
