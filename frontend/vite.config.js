import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 allows access from network
    allowedHosts: [
      // 👇 add your ngrok domain here
      "unploughed-unrespected-rory.ngrok-free.dev"
    ]
  }
})
