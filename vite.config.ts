import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // If repository name changes, update this base to '/<new-repo-name>/' for GitHub Pages.
  base: '/apartment-furniture-planner/'
});
