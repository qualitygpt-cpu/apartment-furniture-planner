import { usePlanStore } from '../state/usePlanStore';
export function LayerControls(){ const {layers,toggleLayer}=usePlanStore(); return <div><h3>Layers</h3>{Object.keys(layers).map(k=><label key={k} style={{display:'block'}}><input type='checkbox' checked={layers[k]} onChange={()=>toggleLayer(k)} /> {k}</label>)}</div>; }
