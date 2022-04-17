import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VantResolve, createStyleImportPlugin } from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: "import { h } from 'vue';",
  },
  build: {
    rollupOptions: {
      input: {
        client: "./client/main.js",
        // server: "./server/main.js",
      },
    },
  },
  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [VantResolve()],
    }),
  ],
});
