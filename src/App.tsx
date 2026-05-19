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
  const loadSample = async () => setPlan(await (await fetch('./examples/apartment-plan.sample.json')).json());
  return <div style={{display:'grid', gridTemplateRows:'auto 1fr', minHeight:'100vh'}}>
    <header style={{display:'flex', gap:8, padding:8, borderBottom:'1px solid #ddd', flexWrap:'wrap'}}>
      <FileLoader onLoad={setPlan} />
      <button onClick={()=>plan && downloadJson('apartment-plan.v1.json', plan)}>Export JSON</button>
      <button onClick={loadSample}>Load Sample</button>
      <button onClick={()=>setPlan(null)}>Reset</button>
    </header>
    <main style={{display:'grid', gridTemplateColumns:'260px 1fr 320px', gap:8, padding:8}}>
      <div><LayerControls /><FurnitureLibrary /></div>
      <div style={{minHeight:'70vh', border:'1px solid #ddd'}}><PlanViewer /></div>
      <div><InspectorPanel /><ValidationPanel /><AiPromptPanel /></div>
    </main>
  </div>;
}
