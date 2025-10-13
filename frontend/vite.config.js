import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ["unploughed-unrespected-rory.ngrok-free.dev"],
  },
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
  base: "/", // ✅ Changed from "./" to "/"
});