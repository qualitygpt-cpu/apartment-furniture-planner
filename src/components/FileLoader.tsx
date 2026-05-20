import { useState } from 'react';

export function FileLoader({ onLoad }: { onLoad: (value: unknown) => void }) {
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <input
        type="file"
        accept="application/json"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          try {
            onLoad(JSON.parse(await f.text()));
            setError(null);
          } catch (err) {
            setError(`Invalid JSON: ${(err as Error).message}`);
          }
        }}
      />
      {error && <div style={{ color: '#b91c1c', fontSize: 12 }}>{error}</div>}
    </div>
  );
}
