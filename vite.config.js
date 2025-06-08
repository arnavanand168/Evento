// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// export default defineConfig({
//   base: '/Evento/',
//   plugins: [react(),
//     tailwindcss(),
//   ],
// })
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Evento/' : '/',
  plugins: [react(), tailwindcss()],
}))
