<<<<<<< HEAD
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/oms',
  plugins: [react()],
});


// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// /// <reference types="vitest" />
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// // https://vitejs.dev/config/
// export default defineConfig({
// plugins: [react()],
// test: {
// globals: true,
// environment: "jsdom",
// setupFiles: "./src/tests/setup.ts",
// },
// });
=======
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
test: {
globals: true,
environment: "jsdom",
setupFiles: "./src/tests/setup.ts",
},server: {
    open: '/oms'
  }
});
>>>>>>> 47b06e0c3f57853c17d933ba7856a3433e793b74
