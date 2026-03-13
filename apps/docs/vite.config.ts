import { defineConfig } from 'vite'
import netlifyReactRouter from '@netlify/vite-plugin-react-router'
import { reactRouter } from '@react-router/dev/vite'

export default defineConfig({
  plugins: [reactRouter(), netlifyReactRouter()],
})
