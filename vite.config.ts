import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const basePath = env.VITE_BASE_PATH || '/';

  return {
    plugins: [react()],
    // Use repository-aware base path on GitHub Pages builds (set via workflow),
    // while defaulting to root for local dev/preview.
    base: basePath
  };
});
