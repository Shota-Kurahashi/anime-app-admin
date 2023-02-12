/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "dist",
  root: "./src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
  },
  server: {
    port: 3000,
    open: true,
  },
});
