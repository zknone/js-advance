// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  assetsInclude: ['**/*.hbs'],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
