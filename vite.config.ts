import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vi tar bort "base: './'" eftersom Vercel/Netlify hanterar detta automatiskt vid roten.
})