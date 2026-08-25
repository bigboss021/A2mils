import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Relative base path so it works on any GitHub Pages subfolder or root
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true
  }
});
