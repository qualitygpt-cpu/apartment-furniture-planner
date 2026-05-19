import { usePlanStore } from '../state/usePlanStore';
export function ValidationPanel(){ const {errors}=usePlanStore(); return <div><h3>Validation</h3>{errors.length===0?'No errors':<ul>{errors.map(e=><li key={e}>{e}</li>)}</ul>}</div>; }
