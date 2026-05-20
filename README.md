# apartment-furniture-planner

A browser-based **MVP 2D apartment planner** (Vite + React + TypeScript + SVG) for loading apartment JSON plans, validating them, and arranging furniture safely.

## Project purpose
- Import/export `apartment-plan.v1.json`.
- Validate geometry/schema issues early.
- Visualize apartment outline, rooms, walls, openings, fixed elements, and furniture.
- Keep the workflow lightweight and frontend-only.

## Local development
```bash
npm install
npm run dev
```

## Build and verification
```bash
npm run typecheck
npm run build
npm run preview
```
Build output goes to `dist/`.

Additional runbook: `BUILD_VERIFICATION.md`.

## GitHub Pages deployment
- Workflow: `.github/workflows/pages.yml`.
- Vite base path is configured in `vite.config.ts` as `/apartment-furniture-planner/`.
- If repository name changes, update Vite `base` to `/<new-repository-name>/`.

## JSON import/export workflow
1. Use **Load JSON** to import an `apartment-plan.v1.json` file.
2. Fix errors shown in **Validation** panel.
3. Use **Export JSON** to save the current plan.
4. Use **Load Sample** for a known-good sample.

## External AI recognition workflow
1. Open **AI Recognition Prompt** panel.
2. Copy the prompt.
3. Paste it into external AI tooling along with floor plan input (image/pdf).
4. Ask for strict JSON output in `apartment-plan.v1.json` format.
5. Import output into this app and review warnings/errors.

## Current limitations
- No backend, authentication, or image recognition.
- 2D SVG only (no 3D).
- Collision and door-swing warnings are heuristic MVP checks.
- No CAD export formats yet.

## Planned next steps
- Stronger geometric diagnostics and snapping.
- Better collision/clearance constraints.
- Richer editing tools while keeping JSON compatibility.
