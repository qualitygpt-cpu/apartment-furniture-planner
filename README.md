# apartment-furniture-planner

Browser-based MVP apartment furniture planner (React + TypeScript + Vite + SVG).

## Features
- Import/export `apartment-plan.v1.json`
- Zod + geometry validation with readable error panel
- SVG rendering: rooms, walls, openings, fixed elements, furniture
- Layer toggles, selection inspector, basic furniture move/rotate
- Autosave to LocalStorage
- AI Recognition Prompt panel for external assistant (PDF/image to JSON)
- Responsive layout for desktop/mobile/Samsung DeX

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run typecheck
npm run build
npm run preview
```

## GitHub Pages deploy
- Workflow: `.github/workflows/pages.yml`
- Vite base path is set in `vite.config.ts` to `/apartment-furniture-planner/`.
- If repo name changes, update `base` accordingly.

## JSON format (apartment-plan.v1.json)
- Uses **millimeters only**.
- Coordinate system: origin `top_left`, xAxis `right`, yAxis `down`.
- Includes: schemaVersion, metadata, outline, rooms, walls, openings, fixed elements, furniture, materials.
- Rooms and fixed elements are orthogonal polygons.
- Walls are explicit line segments with thickness.

## External AI recognition workflow
1. Open AI Recognition Prompt panel.
2. Copy prompt.
3. Paste into external AI tool with apartment plan PDF/image.
4. Ensure output is JSON-only `apartment-plan.v1.json`.
5. Import resulting JSON into this app and correct manually.

## Limitations (MVP)
- No built-in image recognition.
- No backend/auth.
- 2D SVG only (no 3D).
- Collision checks are foundational and simplified.
- No PNG/PDF/DXF/GLTF/OBJ export yet (TODO).

## Next stages
- Better CAD-grade editing constraints.
- Stronger wall/opening projection logic.
- Richer collision/clearance analysis.
- Multi-floor and 3D migration path (Three.js).
