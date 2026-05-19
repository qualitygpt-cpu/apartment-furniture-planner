import { SvgPlanRenderer } from '../rendering/SvgPlanRenderer';
import { usePlanStore } from '../state/usePlanStore';

export function PlanViewer() {
  const { plan, layers, setSelected } = usePlanStore();
  if (!plan) return <div style={{padding:12}}>Load JSON to begin.</div>;
  return <SvgPlanRenderer plan={plan} layers={layers} onSelect={setSelected} />;
}
