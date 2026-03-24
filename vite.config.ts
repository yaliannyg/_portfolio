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
              contact: env.VITE_NOTION_DB_CONTACT,
              ctaLabels: env.VITE_NOTION_DB_CTA_LABELS,
              details: env.VITE_NOTION_DB_ME_DETAILS,
              meDescriptions: env.VITE_NOTION_DB_ME_DESCRIPTIONS,
              profile: env.VITE_NOTION_DB_ME,
              projects: env.VITE_NOTION_DB_PROJECTS,
              sections: env.VITE_NOTION_DB_SECTIONS,
              skills: env.VITE_NOTION_DB_SKILLS,
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
