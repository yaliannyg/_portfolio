# Yalianny Gonzalez — Portfolio

A personal portfolio site built with React 19 and TypeScript, powered by Airtable as a headless CMS and deployed on Netlify.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)
![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?logo=netlify&logoColor=white)
![Airtable](https://img.shields.io/badge/CMS-Airtable_API-18BFFF?logo=airtable&logoColor=white)
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
| CMS | Airtable API | — |
| Serverless | Netlify Functions | 5.1 |

---

## Project Structure

```
portfolio_fe/
├── src/
│   ├── components/         # Feature components (About, Contact, Work, Skills)
│   ├── context/            # React Context (CTA labels)
│   ├── lib/                # Airtable API helpers and data queries
│   ├── netlify/
│   │   └── functions/      # Serverless function — Airtable proxy
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
- An **Airtable** account with the required base and tables set up, and a personal access token
- **Netlify CLI** (optional, for running serverless functions locally): `npm i -g netlify-cli`

---

## Environment Variables

Create a `.env` file at the root of `portfolio_fe/` with the following variables:

| Variable | Description |
|---|---|
| `AIRTABLE_TOKEN` | Airtable personal access token (server-side only) |
| `VITE_AIRTABLE_BASE_ID` | Airtable base ID |

> `VITE_AIRTABLE_BASE_ID` is exposed to the browser to construct API paths. `AIRTABLE_TOKEN` is server-side only and used exclusively by the Netlify function.

---

## Installation & Local Development

```bash
# From the repo root
cd portfolio_fe

# Install dependencies
npm install

# Generate the env file and fill in your Airtable credentials
touch .env

# Start the dev server (exposed on local network)
npm run dev
```

The Vite dev server proxies `/airtable/*` requests to the local Netlify function, so Airtable data loads without needing the Netlify CLI during development.

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
- API requests to `/airtable/*` are redirected to `/.netlify/functions/airtable`
- All routes fall back to `index.html` for SPA navigation

To deploy:
1. Push to the connected Git branch — Netlify triggers a build automatically.
2. Set all environment variables listed above in **Netlify → Site Settings → Environment Variables**.

---

## Linting

```bash
npm run lint
```
