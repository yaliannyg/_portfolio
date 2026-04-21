import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // "" = load ALL vars, not just VITE_ prefixed

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/airtable": {
          target: "https://api.airtable.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/airtable/, ""),
          headers: {
            Authorization: `Bearer ${env.AIRTABLE_TOKEN}`,
          },
        },
      },
    },
  };
});
