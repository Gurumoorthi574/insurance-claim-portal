import { defineConfig } from 'vite'
 import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import matrialtailwindcss from '@material-tailwind/react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
})


