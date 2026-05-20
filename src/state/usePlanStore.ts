import { create } from 'zustand';
import type { ApartmentPlan } from '../types/apartment';
import { validatePlan } from '../utils/validation';

type LayerState = Record<string, boolean>;
const defaultLayers: LayerState = { grid: true, rooms: true, walls: true, openings: true, fixedElements: true, furniture: true, labels: true, dimensions: true, validation: true };

type Store = {
  plan: ApartmentPlan | null;
  errors: string[];
  warnings: string[];
  selected?: { type: string; id: string };
  layers: LayerState;
  setPlan: (input: unknown) => void;
  setSelected: (type: string, id: string) => void;
  toggleLayer: (k: string) => void;
};

export const usePlanStore = create<Store>((set) => ({
  plan: null,
  errors: [],
  warnings: [],
  layers: defaultLayers,
  setPlan: (input) => {
    const { plan, errors, warnings } = validatePlan(input);
    set({ plan: plan ?? null, errors, warnings });
    localStorage.setItem('apartment-plan-autosave', JSON.stringify(input));
  },
  setSelected: (type, id) => set({ selected: { type, id } }),
  toggleLayer: (k) => set((s) => ({ layers: { ...s.layers, [k]: !s.layers[k] } }))
}));
