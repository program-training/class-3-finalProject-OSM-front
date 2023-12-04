/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: env.VITE_BASE ? `/${env.VITE_BASE}/` : "/",
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/tests/setup.ts",
    },
    server: {
      open: "/oms",
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 3000,
    },
  };
});
