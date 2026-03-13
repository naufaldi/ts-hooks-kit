import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  outDir: 'dist',
  clean: true,
  format: ['esm', 'cjs'],
  treeshake: true,
  cjsInterop: true,
})
