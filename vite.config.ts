import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // För Vercel ska vi INTE ha en 'base' satt till repo-namnet.
  // Om du går tillbaka till GitHub Pages, lägg tillbaka: base: '/Mudroombench/',
})