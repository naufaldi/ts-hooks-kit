import tailwindcss from '@tailwindcss/vite'
import netlifyReactRouter from '@netlify/vite-plugin-react-router'
import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), netlifyReactRouter()],
  resolve: {
    alias: {
      '@ts-hooks-kit/core': resolve(__dirname, '../../packages/core/src'),
    },
  },
})
