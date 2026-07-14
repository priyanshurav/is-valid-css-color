import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  target: 'es2022',
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0',
    },
  },
  clean: true,
  minify: false,
  treeshake: true,
});
