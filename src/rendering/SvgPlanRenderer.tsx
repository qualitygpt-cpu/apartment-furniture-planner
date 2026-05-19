import type { ApartmentPlan } from '../types/apartment';

export function SvgPlanRenderer({ plan, layers, onSelect }: { plan: ApartmentPlan; layers: Record<string, boolean>; onSelect: (type: string, id: string) => void }) {
  const poly = (p: {x:number;y:number}[]) => p.map(v=>`${v.x},${v.y}`).join(' ');
  return <svg viewBox="0 0 12000 9000" style={{ width: '100%', height: '100%', background: '#f7f7f7' }}>
    {layers.grid && <defs><pattern id="g" width="500" height="500" patternUnits="userSpaceOnUse"><path d="M 500 0 L 0 0 0 500" fill="none" stroke="#e3e3e3"/></pattern></defs>}
    {layers.grid && <rect width="12000" height="9000" fill="url(#g)" />}
    {layers.rooms && plan.rooms.map(r=><polygon key={r.id} points={poly(r.polygon)} fill="#dbeafe" stroke="#93c5fd" onClick={()=>onSelect('room',r.id)} />)}
    {layers.walls && plan.walls.map(w=><line key={w.id} x1={w.start.x} y1={w.start.y} x2={w.end.x} y2={w.end.y} stroke="#111" strokeWidth={w.thickness} onClick={()=>onSelect('wall',w.id)} />)}
    {layers.openings && plan.openings.map(o=><circle key={o.id} cx={plan.walls.find(w=>w.id===o.wallId)?.start.x ?? 0} cy={plan.walls.find(w=>w.id===o.wallId)?.start.y ?? 0} r="80" fill={o.type==='door'?'#f97316':'#0ea5e9'} onClick={()=>onSelect('opening',o.id)} />)}
    {layers.fixedElements && plan.fixedElements.map(f=><polygon key={f.id} points={poly(f.polygon)} fill="#fca5a5" stroke="#ef4444" onClick={()=>onSelect('fixed',f.id)} />)}
    {layers.furniture && plan.furniture.map(f=><rect key={f.id} x={f.position.x} y={f.position.y} width={f.width} height={f.depth} fill={f.color||'#a78bfa'} onClick={()=>onSelect('furniture',f.id)} />)}
  </svg>;
}
