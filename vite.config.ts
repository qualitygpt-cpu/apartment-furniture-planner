import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative base makes the bundle work both on GitHub Pages project sites and local preview,
  // even if the repository name/path changes.
  base: './'
});
