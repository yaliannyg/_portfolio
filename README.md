# Yalianny Gonzalez — Portfolio

A personal portfolio site built with React 19 and TypeScript, fetching content from a CloudFront-backed API and deployed on Netlify.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)
![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?logo=netlify&logoColor=white)
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
| Utilities | clsx, tailwind-merge | — |

---

## Project Structure

```
portfolio_fe/
├── src/
│   ├── components/         # Feature components (About, Contact, Work, Skills)
│   ├── context/            # React Context (CTA labels)
│   ├── lib/                # API helpers and data queries
│   ├── utils/              # Shared utility functions
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

---

## Environment Variables

Create a `.env` file at the root of `portfolio_fe/` with the following:

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the CloudFront distribution serving portfolio data |

---

## Installation & Local Development

```bash
# From the repo root
cd portfolio_fe

# Install dependencies
npm install

# Create the env file and set VITE_API_BASE_URL
touch .env

# Start the dev server (exposed on local network)
npm run dev
```

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
- All routes fall back to `index.html` for SPA navigation

To deploy:
1. Push to the connected Git branch — Netlify triggers a build automatically.
2. Set `VITE_API_BASE_URL` in **Netlify → Site Settings → Environment Variables**.

---

## Linting

```bash
npm run lint
```
