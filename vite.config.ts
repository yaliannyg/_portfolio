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
          rewrite: (path) => {
            const DB_ALIASES: Record<string, string> = {
              contact: env.NOTION_DB_CONTACT,
              ctaLabels: env.NOTION_DB_CTA_LABELS,
              details: env.NOTION_DB_ME_DETAILS,
              profile: env.NOTION_DB_ME,
              projects: env.NOTION_DB_PROJECTS,
              sections: env.NOTION_DB_SECTIONS,
              skills: env.NOTION_DB_SKILLS,
            };
            return path
              .replace(/^\/notion/, "")
              .replace(/\/v1\/databases\/([^/]+)\//, (_, alias) => {
                const id = DB_ALIASES[alias] ?? alias;
                return `/v1/databases/${id}/`;
              });
          },
          headers: {
            Authorization: `Bearer ${env.NOTION_TOKEN}`,
            "Notion-Version": "2022-06-28",
          },
        },
      },
    },
  };
});
