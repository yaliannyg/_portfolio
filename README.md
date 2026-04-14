# Yalianny Gonzalez — Portfolio

A personal portfolio site built with React 19 and TypeScript, powered by Notion as a headless CMS and deployed on Netlify.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)
![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?logo=netlify&logoColor=white)
![Notion](https://img.shields.io/badge/CMS-Notion_API-000000?logo=notion&logoColor=white)
![ESLint](https://img.shields.io/badge/Linter-ESLint_9-4B32C3?logo=eslint&logoColor=white)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation & Local Development](#installation--local-development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Linting](#linting)

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19.2 |
| Language | TypeScript | 5.9 |
| Build Tool | Vite | 7.2 |
| Styling | Tailwind CSS | 4.1 |
| Icons | Tabler Icons | 3.40 |
| CMS | Notion API (`@notionhq/client`) | 5.14 |
| Serverless | Netlify Functions | 5.1 |

---

## Project Structure

```
portfolio_fe/
├── src/
│   ├── components/         # Feature components (About, Contact, Work, Skills)
│   ├── context/            # React Context (CTA labels)
│   ├── lib/                # Notion API helpers and data queries
│   ├── netlify/
│   │   └── functions/      # Serverless function — Notion proxy
│   ├── assets/             # Static assets
│   ├── App.tsx             # Root component with Suspense layout
│   └── main.tsx            # React entry point
├── public/
├── index.html
├── netlify.toml            # Netlify deployment config
├── vite.config.ts
└── package.json
```

---

## Prerequisites

- **Node.js** LTS (v20+)
- A **Notion** account with the required databases set up and a Notion integration token
- **Netlify CLI** (optional, for running serverless functions locally): `npm i -g netlify-cli`

---

## Environment Variables

Create a `.env` file at the root of `portfolio_fe/` with the following variables:

| Variable | Description |
|---|---|
| `NOTION_TOKEN` | Notion integration bearer token |
| `VITE_NOTION_DB_CONTACT` | Notion DB ID — contact entries |
| `VITE_NOTION_DB_ME` | Notion DB ID — profile |
| `VITE_NOTION_DB_ME_DETAILS` | Notion DB ID — profile details |
| `VITE_NOTION_DB_ME_DESCRIPTIONS` | Notion DB ID — bio descriptions |
| `VITE_NOTION_DB_SKILLS` | Notion DB ID — skills |
| `VITE_NOTION_DB_PROJECTS` | Notion DB ID — projects |
| `VITE_NOTION_DB_SECTIONS` | Notion DB ID — section metadata |
| `VITE_NOTION_DB_CTA_LABELS` | Notion DB ID — CTA button labels |

> Variables prefixed with `VITE_` are exposed to the browser. `NOTION_TOKEN` is server-side only and used exclusively by the Netlify function.

---

## Installation & Local Development

```bash
# From the repo root
cd portfolio_fe

# Install dependencies
npm install

# Generate the env file and fill in your Notion credentials
touch .env

# Start the dev server (exposed on local network)
npm run dev
```

The Vite dev server proxies `/notion/*` requests to the local Netlify function, so Notion data loads without needing the Netlify CLI during development.

---

## Building for Production

```bash
# Type-check and build to dist/
npm run build

# Preview the production build locally
npm run preview
```

---

## Deployment

The project is deployed on **Netlify** using the configuration in `netlify.toml`:

- **Publish directory:** `dist/`
- **Serverless functions:** `src/netlify/functions/`
- API requests to `/notion/*` are redirected to `/.netlify/functions/notion`
- All routes fall back to `index.html` for SPA navigation

To deploy:
1. Push to the connected Git branch — Netlify triggers a build automatically.
2. Set all environment variables listed above in **Netlify → Site Settings → Environment Variables**.

---

## Linting

```bash
npm run lint
```
