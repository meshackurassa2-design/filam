import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 2000
  },
  build: {
    target: 'es2015',
    chunkSizeWarningLimit: 1000
  }
});
