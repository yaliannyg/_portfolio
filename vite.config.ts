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
        "/notion": {
          target: "https://api.notion.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/notion/, ""),
          headers: {
            Authorization: `Bearer ${env.NOTION_TOKEN}`,
            "Notion-Version": "2022-06-28",
          },
        },
      },
    },
  };
});
