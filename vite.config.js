import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/pages/index.html'),
        dbrain: resolve(__dirname, 'src/pages/dbrain.html'),
        projekty: resolve(__dirname, 'src/pages/projekty.html'),
        sigma: resolve(__dirname, 'src/pages/sigma_official.html'),
        SigmaPoe_01: resolve(__dirname, 'src/pages/SigmaPoe_01.html'),
        SigmaPoe_02: resolve(__dirname, 'src/pages/SigmaPoe_02.html'),
        SigmaPoe_03: resolve(__dirname, 'src/pages/SigmaPoe_03.html'),
        SigmaPoe_04: resolve(__dirname, 'src/pages/SigmaPoe_04.html'),
      }
    }
  }
});
