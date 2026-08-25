import { defineConfig } from 'vite';

export default defineConfig({
  base: '/A2mils/', // Base path repository GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true
  }
});
