
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
base: '/oms',
plugins: [react()],
test: {
globals: true,
environment: "jsdom",
setupFiles: "./src/tests/setup.ts",
},
});
