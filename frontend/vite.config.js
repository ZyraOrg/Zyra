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
    outDir: "../docs", // ✅ output to 'docs' for GitHub Pages
    emptyOutDir: true, // ✅ ensures old files are cleared before each build
  },
  base: "./", // ✅ makes sure assets load correctly on GitHub Pages
});
