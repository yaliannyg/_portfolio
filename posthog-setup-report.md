<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into this React/Vite portfolio application. PostHog is initialized in `src/main.tsx` using `posthog-js` and `@posthog/react`, with the app wrapped in `PostHogProvider` so all components can access the analytics client via the `usePostHog` hook. Four custom events are now tracked across four files, covering the most meaningful visitor actions on the portfolio.

| Event name | Description | File |
|---|---|---|
| `cv_downloaded` | User clicks the CV download button (navbar or hero section) | `src/components/Navbar.tsx`, `src/App.tsx` |
| `contact_link_clicked` | User clicks a contact card (LinkedIn, email, etc.) — includes `contact_type` and `link` properties | `src/components/Contact/ContactMeSection.tsx` |
| `project_viewed` | User opens the detail modal for a portfolio project — includes `project_title` and `project_subtitle` properties | `src/components/Work/ProjectCard.tsx` |
| `theme_toggled` | User switches between light and dark theme — includes `theme_to` property | `src/components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/project/421983/dashboard/1578686)
- [CV Downloads over time](/project/421983/insights/FOUlohYo) — daily trend of CV download clicks
- [Contact clicks by type](/project/421983/insights/lDTycEa9) — which contact channel (LinkedIn, email) visitors use most
- [Projects viewed by title](/project/421983/insights/Ve3Dlj7K) — which portfolio projects attract the most interest
- [Portfolio engagement funnel](/project/421983/insights/35UIthPg) — conversion from viewing a project to reaching out via contact
- [Total portfolio interactions](/project/421983/insights/nqwnDh1V) — all key events (CV downloads, contact clicks, project views) side-by-side over time

> **Note:** Run `npm install posthog-js @posthog/react` in your terminal to install the required packages (network access was not available during this setup session).

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
