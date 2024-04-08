import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'common',
      formats: ['es', 'umd'],
      name: 'common',
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
});
