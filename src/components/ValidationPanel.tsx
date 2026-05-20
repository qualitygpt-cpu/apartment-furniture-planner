import { usePlanStore } from '../state/usePlanStore';

export function ValidationPanel() {
  const { errors, warnings } = usePlanStore();
  return (
    <div>
      <h3>Validation</h3>
      {errors.length === 0 ? <div>No errors</div> : <ul>{errors.map((e) => <li key={e}>{e}</li>)}</ul>}
      <h4>Warnings</h4>
      {warnings.length === 0 ? <div>No warnings</div> : <ul>{warnings.map((w) => <li key={w}>{w}</li>)}</ul>}
    </div>
  );
}
