import type { ApartmentPlan } from '../types/apartment';

export function SvgPlanRenderer({ plan, layers, onSelect }: { plan: ApartmentPlan; layers: Record<string, boolean>; onSelect: (type: string, id: string) => void }) {
  const poly = (p: { x: number; y: number }[]) => p.map((v) => `${v.x},${v.y}`).join(' ');
  const safePolygon = (points: { x: number; y: number }[]) => points.length >= 4;

  return <svg viewBox="0 0 12000 9000" style={{ width: '100%', height: '100%', background: '#f7f7f7', touchAction: 'none' }}>
    {layers.grid && <defs><pattern id="g" width="500" height="500" patternUnits="userSpaceOnUse"><path d="M 500 0 L 0 0 0 500" fill="none" stroke="#e3e3e3" /></pattern></defs>}
    {layers.grid && <rect width="12000" height="9000" fill="url(#g)" />}
    {safePolygon(plan.apartmentOutline) && <polygon points={poly(plan.apartmentOutline)} fill="none" stroke="#334155" strokeWidth="50" />}
    {layers.rooms && plan.rooms.filter((r) => safePolygon(r.polygon)).map((r) => <g key={r.id}><polygon points={poly(r.polygon)} fill="#dbeafe" stroke="#93c5fd" onClick={() => onSelect('room', r.id)} />{layers.labels && <text x={r.polygon[0].x + 80} y={r.polygon[0].y + 180} fontSize="160">{r.name}</text>}</g>)}
    {layers.walls && plan.walls.filter((w) => w.start && w.end).map((w) => <line key={w.id} x1={w.start.x} y1={w.start.y} x2={w.end.x} y2={w.end.y} stroke="#111" strokeWidth={Math.max(w.thickness, 1)} onClick={() => onSelect('wall', w.id)} />)}
    {layers.openings && plan.openings.map((o) => {
      const wall = plan.walls.find((w) => w.id === o.wallId);
      if (!wall) return null;
      const x = wall.start.x + (wall.end.x - wall.start.x) * 0.5;
      const y = wall.start.y + (wall.end.y - wall.start.y) * 0.5;
      return <g key={o.id}><circle cx={x} cy={y} r="80" fill={o.type === 'door' ? '#f97316' : '#0ea5e9'} onClick={() => onSelect('opening', o.id)} />{o.type === 'door' && <path d={`M ${x} ${y} m 0 0 A 450 450 0 0 1 ${x + 380} ${y - 250}`} stroke="#fb923c" fill="none" />}</g>;
    })}
    {layers.fixedElements && plan.fixedElements.filter((f) => safePolygon(f.polygon)).map((f) => <polygon key={f.id} points={poly(f.polygon)} fill="#fca5a5" stroke="#ef4444" onClick={() => onSelect('fixed', f.id)} />)}
    {layers.furniture && plan.furniture.filter((f) => f.width > 0 && f.depth > 0).map((f) => <g key={f.id}><rect x={f.position.x} y={f.position.y} width={f.width} height={f.depth} fill={f.color || '#a78bfa'} onClick={() => onSelect('furniture', f.id)} />{layers.labels && <text x={f.position.x} y={f.position.y - 40} fontSize="120">{f.name}</text>}</g>)}
    {layers.dimensions && <text x="200" y="8800" fontSize="140" fill="#334155">Units: mm</text>}
  </svg>;
}
