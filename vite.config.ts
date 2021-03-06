import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    manifest: true,
    rollupOptions: {
      input: [path.resolve(process.cwd(), "client/vue/main.ts"), path.resolve(process.cwd(), "client/scripts/main.ts")],
    },
  },
});
