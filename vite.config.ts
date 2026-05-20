import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative base keeps asset URLs working on both:
  // - user pages: https://<user>.github.io/
  // - project pages: https://<user>.github.io/<repo>/
  base: './'
});
