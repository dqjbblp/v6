import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["@solana/web3.js"],
  },
  plugins: [react()],
  server: {
    port: 3001,
    host: true,
  },
});
