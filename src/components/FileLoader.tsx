export function FileLoader({ onLoad }: { onLoad: (value: unknown) => void }) {
  return <input type="file" accept="application/json" onChange={async(e)=>{ const f=e.target.files?.[0]; if(!f) return; onLoad(JSON.parse(await f.text())); }} />;
}
