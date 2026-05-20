import { FileLoader } from './components/FileLoader';
import { LayerControls } from './components/LayerControls';
import { PlanViewer } from './components/PlanViewer';
import { InspectorPanel } from './components/InspectorPanel';
import { ValidationPanel } from './components/ValidationPanel';
import { FurnitureLibrary } from './components/FurnitureLibrary';
import { AiPromptPanel } from './components/AiPromptPanel';
import { usePlanStore } from './state/usePlanStore';
import { downloadJson } from './utils/downloadJson';

export default function App() {
  const { plan, setPlan } = usePlanStore();

  const loadSample = async () => {
    try {
      const data = await (await fetch('./examples/apartment-plan.sample.json')).json();
      setPlan(data);
    } catch {
      setPlan({});
    }
  };

  return <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', minHeight: '100vh' }}>
    <header style={{ display: 'flex', gap: 8, padding: 8, borderBottom: '1px solid #ddd', flexWrap: 'wrap' }}>
      <FileLoader onLoad={setPlan} />
      <button onClick={() => plan && downloadJson('apartment-plan.v1.json', plan)}>Export JSON</button>
      <button onClick={loadSample}>Load Sample</button>
      <button onClick={() => setPlan(null)}>Reset</button>
    </header>
    <main style={{ display: 'grid', gridTemplateColumns: 'minmax(220px,260px) 1fr minmax(260px,320px)', gap: 8, padding: 8 }}>
      <div style={{ overflow: 'auto' }}><LayerControls /><FurnitureLibrary /></div>
      <div style={{ minHeight: '60vh', border: '1px solid #ddd', overflow: 'hidden', touchAction: 'none' }}><PlanViewer /></div>
      <div style={{ overflow: 'auto' }}><InspectorPanel /><ValidationPanel /><AiPromptPanel /></div>
    </main>
  </div>;
}
