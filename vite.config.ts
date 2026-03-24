import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // "" = load ALL vars, not just VITE_ prefixed

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

  async function notionQuery(alias: string) {
    const id = DB_ALIASES[alias] ?? alias;
    const r = await fetch(`https://api.notion.com/v1/databases/${id}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    return r.json();
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "notion-all-dev",
        configureServer(server) {
          server.middlewares.use("/notion/all", async (_req, res) => {
            const [profile, sections, details, skills, projects, contact, ctaLabels] =
              await Promise.all([
                notionQuery("profile"),
                notionQuery("sections"),
                notionQuery("details"),
                notionQuery("skills"),
                notionQuery("projects"),
                notionQuery("contact"),
                notionQuery("ctaLabels"),
              ]);

            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({ profile, sections, details, skills, projects, contact, ctaLabels }),
            );
          });
        },
      },
    ],
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
          rewrite: (path) =>
            path
              .replace(/^\/notion/, "")
              .replace(/\/v1\/databases\/([^/]+)\//, (_, alias) => {
                const id = DB_ALIASES[alias] ?? alias;
                return `/v1/databases/${id}/`;
              }),
          headers: {
            Authorization: `Bearer ${env.NOTION_TOKEN}`,
            "Notion-Version": "2022-06-28",
          },
        },
      },
    },
  };
});
